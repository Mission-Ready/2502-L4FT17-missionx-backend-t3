const express = require("express");
const mysql = require("mysql2");
// Load Environment Variables
require("dotenv").config();
const bodyParser = require("body-parser"); // added by takashi

// const { UploadThing } = require("uploadthing");// added by takashi for the future Mission X
const multer = require("multer"); // added by takashi
const cors = require("cors");
const app = express();

//Middlewares
app.use(bodyParser.json()); // added by takashi
app.use(cors("http://localhost:5173"));

// Create the connection with database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// MySQL server connection check
pool.getConnection((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

// Shazias Endpoints here

// Kerrys enpoints here
app.get("/api/studentProfileViewer/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  pool.query(
    "SELECT * FROM student WHERE student_id = ?",
    [studentId],
    (err, result) => {
      if (err) {
        console.log("Database query error", err);
        return res.status(500).json({
          status: "error",
          message: "something went wrong with that query",
        });
      }
      res.status(200).json({ status: "success", data: result });
    }
  );
});

app.get("/api/projectLibrary", (req, res) => {
  pool.query("SELECT * FROM project", (err, result) => {
    if (err) {
      console.error("Database query error", err);
      return res.status(500).json({
        status: "error",
        message: "Database query failed",
      });
    }
    res.status(200).json({ status: "success", data: result });
  });
});

// Solomone endpoint here
// Help-request end-point
app.get("/api/request_page", (req, res) => {
  pool.query(
    "SELECT help_request.*, student.student_id, student.name, student.gender, student.profile_pic  FROM help_request INNER JOIN student ON help_request.student_id = student.student_id;",
    (err, result) => {
      if (err) {
        console.log("Database query error", err);
        return res.status(500).json({
          status: "error",
          message: "something went wrong with that query",
        });
      }
      res.status(200).json({ status: "success", data: result });
    }
  );
});

// Update help-request end-point
app.put("/api/markAsDone", (req, res) => {
  console.log(req.body);

  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Request body is missing or improperly formatted",
      timestamp: new Date().toISOString(),
    });
  }

  const { request_id } = req.body;
  const updatedAt = new Date();
  const done = 1;

  if (!request_id) {
    return res.status(400).json({
      status: "error",
      message: "request_id is required to update the record",
    });
  }

  pool.query(
    "UPDATE help_request SET updated_at = ?, done = ? WHERE request_id = ?",
    [updatedAt, done, request_id],
    (err, result) => {
      if (err) {
        console.error("Database update error", err);
        return res.status(500).json({
          status: "error",
          message: "Failed to update the record",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "No record found with the given request_id",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Record updated successfully",
        updated_at: updatedAt,
      });
    }
  );
});

// Teacher Profile end-point
app.get("/api/teacher/:Id", (req, res) => {
  const Id = req.params.Id;
  pool.query(
    "SELECT * FROM teacher WHERE teacher_id = ?",
    [Id],
    (err, result) => {
      if (err) {
        console.log("Database query error", err);
        return res.status(500).json({
          status: "error",
          message: "something went wrong with that query",
        });
      }
      res.status(200).json({ status: "success", data: result });
    }
  );
});

// Eugenes end points here

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

// Takashis endpoints here--------------------------------------------------------------------------------------------
// Project Submission: Getting Submission Card, Patch(updating) Mark as complete Project
// Submit projects: sending the imagery

// Brown: Project Submission
// Endpoint retrieves a list of student project submissions that are currently submitted but not completed.
// One endpoint retrieves project submission data for such reasons.
// Getting the response of property from database about student_id, project_id, name of student,
// profile_pic, gender(M/F), date_submitted, submission status,

//  GET request endpoint that responds to requests made to /api/teacher-dashboard/ProjectSubmission/project-card .
app.get("/api/teacher-dashboard/ProjectSubmission/project-card", (req, res) => {
  // Selects data from the student table and student_projects tables and retrieves the following fields;
  // INNER JOIN to link the student and student_projects tables based on the same unique student_id.
  // WHERE clause filters results to include only those submissions
  // that have been submitted (date_submitted IS NOT NULL) and
  // have not been marked as completed (date_completed IS NULL)
  // because teacher needs to track who submitted projects and still working on their own project which is not marked as completed project.
  const sql = `
SELECT 
    student.student_id, 
    student_projects.project_id, 
    student.name, 
    student.profile_pic, 
    student.gender,    
    student_projects.date_submitted,
    student_projects.submission    
FROM 
    student
INNER JOIN 
    student_projects ON student.student_id = student_projects.student_id
WHERE 
    student_projects.date_submitted IS NOT NULL 
    AND student_projects.date_completed IS NULL;
  `;
  // If I need to retrieve specific information from two tables, and the keys are fixed,
  // a static query is fine.Fixed keys: In that case, use a static query so not required alley[].
  pool.query(sql, (err, results) => {
    if (err) {
      // If an error occurs during execution,
      // it responds with a 500 Internal Server Error status and a message indicating an issue in retrieving projects.
      res.status(500).send("Error retrieving projects");
      return;
    }
    // If the query is successful, it returns the results as JSON format.
    res.json(results);
  });
});

//Project marked as completed
// Endpoint allows a teacher to mark a specific project as completed for a student by updating the corresponding record in the database.
// PATCH request endpoint that responds to requests made from frontend to /api/teacher-dashboard/ProjectSubmission/markCompleted.
app.patch(
  "/api/teacher-dashboard/ProjectSubmission/markCompleted",
  (req, res) => {
    const { student_id, project_id } = req.body;

    //input validation based on extracts student_id and project_id from the request body.
    // checks if both values are provided. If either is missing,
    // it responds with a 400 Bad Request status and an error message.
    if (!student_id || !project_id) {
      return res
        .status(400)
        .json({ error: "student_id and project_id are required." });
    }

    // updates the student_projects table by setting date_completed to the current timestamp (NOW())
    // for the specified student_id and project_id.
    const sql =
      "UPDATE student_projects SET date_completed = NOW() WHERE student_id = ? AND project_id = ?";

    pool.query(sql, [student_id, project_id], (err, result) => {
      // If there’s an error during the execution,
      // it responds with a 500 Internal Server Error status and an error message.
      if (err) {
        return res
          .status(500)
          .json({ error: "Error marking project as completed" });
      }

      // when no rows are not updating return 404
      // If affectedRows is 0, it means no row matched the provided student_id and project_id,
      // so it responds with a 404 Not Found status and a message indicating that the project was not found.
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Project not found for the given student_id and project_id.",
        });
      }
      // If at least one row was updated, it responds with a success message indicating that the project was marked as completed.
      res.json({ message: "Project marked as completed" });
    });
  }
);

// Brown: Submit Project
// After clicking the button in the frontend, the URL of the image is passed to the backend server
// using Postman, and this URL is sent in the submission as a string.

app.patch(
  "/api/student-dashboard/SubmitProject/store-submission",
  (req, res) => {
    // Extract student_id, project_id, and submission from the request body.
    // submission is the URL of the file I got from uploadthings.

    const { student_id, project_id, submission } = req.body;
    console.log("PATCH endpoint hit");
    console.log("Request body:", req.body);

    // Check if ufsUrl is provided
    if (!submission) {
      return res.status(400).json({
        status: "error",
        message: "Missing ufsUrl in the request body.",
      });
    }

    // Check if student_id and project_id exist
    if (!student_id || !project_id) {
      return res.status(400).json({
        message: "student_id and project_id are required",
      });
    }

    // This SQL statement updates an existing record in the student_projects table.
    // Executes a SQL query containing data_submitted the submission and updates the record for the specified student_id and project_id.
    // The submission value changes dynamically.
    // Leave the column names as submission as they are in My SQL.
    // It is used to record the date and time that an upload occurred,
    // so that I can track the exact time and date of submitted project when a file was submitted.
    // This SQL statement updates an existing record in the student_projects table.

    const sql = `
    UPDATE student_projects
    SET date_submitted = NOW(),         
        submission = ? 
    WHERE student_id = ? AND project_id = ?; 
  `;

    // Execute the SQL query.

    // If the submission content is different each time, I will receive a dynamic URL.
    // This URL will change every time a user uploads a file, so the SQL query will be updated each time.
    // The reason why student_id and project_id are also dynamic is because these values ​​vary depending on the user and the specific request.
    // Specifically, there are the following reasons:

    // 1. Based on user input
    // Different users and projects: student_id identifies a specific student and project_id identifies a specific project.
    // These values ​​can vary for each request because we use the same endpoint for different students and projects.

    // 2. Increased flexibility
    // Multiple operations with one endpoint: This design allows me to operate on different students and projects with the same API endpoint.
    // By using dynamic parameters, I can handle many cases with the same code.

    // 3. Prevent SQL injection
    // Use placeholders: Filling in dynamic values ​​with placeholders prevents SQL injection attacks.
    // This ensures that user input is handled safely.

    // Use submission: Since the column name in the database is submission,
    // it is more consistent and logical to use that name in my code as well.
    pool.query(sql, [submission, student_id, project_id], (error, results) => {
      // project_id was added
      if (error) {
        console.error("Error updating data:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Determine the response based on affected rows.
      if (results.affectedRows > 0) {
        res.status(200).json({ message: "Submission updated successfully" });
      } else {
        res.status(404).json({ message: "No record found to update" });
      }
    }); // The query callback ends here
  } // End of endpoint processing here
);
// -----------------------------------------end_of_takashi_section---------------------------------------------------

app
  .listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  })
  .on("error", (error) => {
    console.log("Server error", error);
  });
