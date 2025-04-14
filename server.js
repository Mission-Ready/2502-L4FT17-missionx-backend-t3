const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const bodyParser = require("body-parser"); // added by takashi
// const { UploadThing } = require("uploadthing");// added by takashi
const multer = require("multer"); // added by takashi
const cors = require("cors");
const app = express();

//Middlewares
app.use(bodyParser.json()); // added by takashi
app.use(cors("http://localhost:5173"));

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// MySQL connection check
pool.getConnection((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Shazias Endpoints here

// Kerrys enpoints here

// Solomene endpoint here

// Eugene endpoints
//// Student Profile
app.get("/api/student", (req, res) => {
  pool.query(
    "SELECT name, profile_pic, student_id FROM student",
    (err, result) => {
      if (err) {
        console.error("Database query error", err);
        return res.status(500).json({
          status: "error",
          message: "something went wrong with that query",
        });
      }
      res.status(200).json({ status: "success", data: result });
    }
  );
});

////Progress Tracker
app.get("/api/completions", (req, res) => {
  pool.query(
    `SELECT student.student_id, student_projects.project_id, student.name, student_projects.date_completed
    FROM student_projects
    JOIN student ON student_projects.student_id = student.student_id
    WHERE student_projects.date_completed IS NOT NULL`,
    (err, result) => {
      if (err) {
        console.error("Database query error", err);
        return res.status(500).json({
          status: "error",
          message: "something went wrong with that query",
        });
      }
      res.status(200).json({ status: "success", data: result });
    }
  );
});

// Takashis endpoints here

// Setting Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// // テストデータの挿入
//Testing import student data by being modified with gender and succeed between backend and SQL server.--->OK
app.get("/student", (req, res) => {
  pool.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.error("Database query error", err);
      return res.status(500).json({
        status: "error",
        message: "something went wrong with that query",
      });
    }
    res.status(200).json({ status: "success", data: result });
  });
});

//Testing student projects----->Ok
app.get("/student_projects", (req, res) => {
  pool.query("SELECT * FROM student_projects", (err, result) => {
    if (err) {
      console.error("Database query error", err);
      return res.status(500).json({
        status: "error",
        message: "something went wrong with that query",
      });
    }
    res.status(200).json({ status: "success", data: result });
  });
});

// Getting the response of property from data base about student_id, project_id, name of student,
// profile_pic, gender(M/F), date_submitted, submission status,
app.get("/api/project", (req, res) => {
  const sql = `
SELECT 
    student.student_id, 
    student_projects.project_id, 
    student.name, 
    student.profile_pic, 
    student.gender,    
    student_projects.date_started, 
    student_projects.date_submitted,
    student_projects.date_completed,
    student_projects.submission    
FROM 
    student
INNER JOIN 
    student_projects ON student.student_id = student_projects.student_id
WHERE 
    student_projects.date_submitted IS NOT NULL 
    AND student_projects.date_completed IS NULL;
  `;
  pool.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving projects");
      return;
    }
    res.json(results);
  });
});

// Under testing
// app.post("/api/sendImage", (req, res) => {
//   const { student_id, project_id, image_path } = req.body;
//   const sql =
//     "UPDATE student_projects SET submission = ? WHERE student_id = ? AND project_id = ?";
//   pool.query(sql, [image_path, student_id, project_id], (err, result) => {
//     if (err) {
//       res.status(500).send("Error sending image");
//       return;
//     }
//     res.send("Image sent successfully");
//   });
// });

//Under testing
// app.patch("/api/markCompleted", (req, res) => {
//   const { student_id, project_id, completed } = req.body;
//   const sql =
//     "UPDATE student_projects SET date_completed = NOW() WHERE student_id = ? AND project_id = ?";
//   pool.query(sql, [student_id, project_id], (err, result) => {
//     if (err) {
//       res.status(500).send("Error marking project as completed");
//       return;
//     }
//     res.send("Project marked as completed");
//   });
// });

// Project update API
// 2 Update message when a student submits a project.(Brown:Submit Project)
//Resubmission: When a student resubmits a project, they are overwriting the previous link,
//in which case the submission field should contain the new link.
app.patch("/api/student_projects/update", (req, res) => {
  const { student_id, project_id, submission } = req.body;

  const sql = `
     UPDATE student_projects
SET date_submitted = NOW(), 
	date_completed = NOW(), 
    submission = 'https://images.app.goo.gl/ScG1LN8VzJDuXb3y6'
WHERE student_id = 1 AND project_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  `;

  pool.query(sql, [submission, student_id, project_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Project updated successfully",
      affectedRows: result.affectedRows,
    });
  });
});

// Project Acquisition API----->OK
app.get("/api/student_projects/date_submitted", (req, res) => {
  const sql = `
      SELECT * FROM student_projects
      WHERE date_submitted IS NOT NULL AND date_completed IS NULL
  `;

  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Update Submission Status----->OK
app.get("/api/student_projects_update_submission_status", (req, res) => {
  const sql = `
      UPDATE student_projects
SET submission = NULL
WHERE student_id = 1 AND project_id = 1;
  `;

  pool.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// API to mark the completion of a project----->Not OK still under testing
app.post("/api/projects/complete", (req, res) => {
  const { student_id, project_id } = req.body;

  const sql = `
    UPDATE student_projects
SET date_submitted = NOW(),

date_completed = NOW(),
WHERE student_id = 1 AND project_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  `;

  pool.query(sql, [student_id, project_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Project marked as completed",
      affectedRows: result.affectedRows,
    });
  });
});

// Endpoint to get project information----->OK
app.get("/api/student/:studentId/student_projects", (req, res) => {
  const studentId = req.params.studentId;
  const query = `
    SELECT * FROM student_projects
    WHERE student_id = ?
  `;

  pool.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Database query error", err);
      return res.status(500).json({
        status: "error",
        message: "An error occurred while retrieving data.",
      });
    }
    res.status(200).json({ status: "success", data: results });
  });
});

// -----------------------------------------end_of_takashi_section---------------------------------------------------

app
  .listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  })
  .on(`error`, (error) => {
    console.log("Server error", error);
  });
