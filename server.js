const express = require("express");
const mysql = require("mysql2");
// Load Environment Variables
require("dotenv").config();
const bodyParser = require("body-parser"); // added by takashi
// const { UploadThing } = require("uploadthing");// added by takashi for the future Mission X
const multer = require("multer"); // added by takashi

const app = express();
app.use(bodyParser.json()); // added by takashi


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





// Solomene endpoint here






// Eugenes end points here





// Takashis endpoints here--------------------------------------------------------------------------------------------
// Project Submission: Getting Submission Card, Patch(updating) Mark as complete Project
// Submit projects: sending the imagery

// Middleware
app.use(bodyParser.json());

// Setting Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
app.patch("/api/teacher-dashboard/ProjectSubmission/markCompleted", (req, res) => {
  const { student_id, project_id } = req.body;

  //input validation based on extracts student_id and project_id from the request body.
  // checks if both values are provided. If either is missing,
  // it responds with a 400 Bad Request status and an error message.
  if (!student_id || !project_id) {
      return res.status(400).json({ error: "student_id and project_id are required." });
  }

  // updates the student_projects table by setting date_completed to the current timestamp (NOW())
  // for the specified student_id and project_id.
  const sql = "UPDATE student_projects SET date_completed = NOW() WHERE student_id = ? AND project_id = ?";

  pool.query(sql, [student_id, project_id], (err, result) => {
    // If there’s an error during the execution,
    // it responds with a 500 Internal Server Error status and an error message.
      if (err) {
          return res.status(500).json({ error: "Error marking project as completed" });
      }

      // when no rows are not updating return 404
      // If affectedRows is 0, it means no row matched the provided student_id and project_id,
      // so it responds with a 404 Not Found status and a message indicating that the project was not found.
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Project not found for the given student_id and project_id." });
      }
      // If at least one row was updated, it responds with a success message indicating that the project was marked as completed.
      res.json({ message: "Project marked as completed" });
  });
});



// Brown: Submit Project
// After clicking the button in frontend and pass the url of image using postman
// to backend server and send this url in the submission as url string. 
// Defines a POST API endpoint at the specified URL.
// When a request is made to this endpoint from frontend, the provided callback function is executed.
app.post('/api/student-dashboard/SubmitProject/store-submission', (req, res) => {
  
  // The code extracts student_id, project_id, and submission from the request body.
  // These values represent the student’s ID, the project’s ID, and the submission status with url string or NULL. 
  const { student_id, project_id, submission } = req.body; // Received data

  // Checks if any of the required fields are missing. If any of them are absent,
  // it responds with a 400 Bad Request status and a message indicating that all three fields are required.
  if (!student_id || !project_id || !submission) {
      return res.status(400).json({ message: 'student_id, project_id, and submission are required' });
  }
  // This SQL statement attempts to insert a new record into the student_projects table.

  // The NOW() function is used to set the current timestamp for date_submitted.
  // The ON DUPLICATE KEY UPDATE clause allows the query to update the existing record 
  // if a unique key constraint (like a combination of student_id and project_id) is violated. 
  // In this case, it updates the date_submitted and submission status fields by provided url in frontend.
  // The parameters passed in the array correspond to the placeholders (?) in the SQL query.

  const sql = `
      INSERT INTO student_projects (student_id, project_id, date_submitted, submission)
      VALUES (?, ?, NOW(), ?)
      ON DUPLICATE KEY UPDATE
          date_submitted = NOW(),
          submission = ?;
  `;

  // The pool.query method executes the SQL query.
  // The callback function handles the results or errors from the query execution.
  //Error handling
  pool.query(sql, [student_id, project_id, submission, submission], (error, results) => {
      if (error) {
        // If there's an error during the query execution,
        // it logs the error to the console and responds with a 500 Internal Server Error status.
          console.error('Error inserting/updating data:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }         
      // determines the appropriate ID to return in the response:
      let responseId;
      // If affectedRows is greater than 0, it means a record was inserted or updated.
    if (results.affectedRows > 0) {
        // When a new record is inserted because insertId is available,
        if (results.insertId) {
            //it indicates a new record was inserted, and that inserted ID is returned.
            responseId = results.insertId; 
        } else {
            responseId = student_id; // If updated, return the student_id.
        }
    } else {
        responseId = 0; // If no rows were affected, it sets responseId to 0.
    }      
      // the API responds with a 201 Created status and a JSON object 
      // containing a success message and the ID of the submission (the inserted ID).
      // However, it should ideally use responseId instead of results.insertId for accuracy, especially when an update occurs.
      res.status(201).json({ message: 'Submission stored successfully', id: results.insertId });
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