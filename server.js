//express: A framework for building web applications.
const express = require("express");
const mysql = require("mysql2"); // Import mysql2
// Load Environment Variables
// dotenv: A library for managing environment variables,
// allowing me to safely manage secrets such as API keys.
require("dotenv").config();
const bodyParser = require("body-parser");
// cors: For managing cross-origin resource sharing,
// allowing requests between different domains.
const cors = require("cors"); // Make sure this is only once
//Uploadthings
const { createRouteHandler } = require("uploadthing/express");
// Import the UploadThing handler
const { uploadRouter } = require("./uploadthing"); // import uploadthing.js
// Initialize app here
// app is the main body of our web application.
// We use it to set up the various routes (URLs).
const app = express();
const { param, validationResult } = require("express-validator"); // Import param instead of body
// Middleware to handle JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

  const query = `
    SELECT student.*, teacher.name AS teacher_name FROM student LEFT JOIN teacher ON student.teacher_id 
    = teacher.teacher_id WHERE student.student_id = ?`;

  pool.query(query, [studentId], (err, result) => {
    if (err) {
      console.log("Database query error", err);
      return res.status(500).json({
        status: "error",
        message: "something went wrong with that query",
      });
    }
    res.status(200).json({ status: "success", data: result });
  });
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
// Submit projects: sending the imagery by url retured the repose fro uploadthings.

// Brown: Project Submission
// Queries for teachers join multiple tables and filter the results based on specific conditions (such as submissions being incomplete).
// Endpoint retrieves a list of student project submissions that are currently submitted but not completed.
// One endpoint retrieves project submission data for such reasons.
// Getting the response of property from database about student_id, project_id, name of student,
// profile_pic, gender(M/F), date_submitted, submission status,

//  GET request endpoint that responds to requests made to /api/teacher-dashboard/ProjectSubmission/project-card .
app.get(
  "/api/teacher-dashboard/ProjectSubmission/project-card/:teacherId",
   (req, res) => {
    console.log("project submission endpoint hit");
    const teacherId = req.params.teacherId;
    console.log("teacher_id:",teacherId);
    // Selects data from the student table and student_projects tables and retrieves the following fields;
    // INNER JOIN to link the student and student_projects tables based on the same unique student_id.
    // WHERE clause filters results to include only those submissions
    // that have been submitted (date_submitted IS NOT NULL) and
    // have not been marked as completed (date_completed IS NULL)
    // because teacher needs to track who submitted projects and still working on their own project which is not marked as completed project.
    // The SQL query retrieves relevant fields from the student and student_projects tables.
    // It filters the results to include only submissions that have been made (not NULL for date_submitted) and have not been marked as completed (where date_completed is NULL).
    // The results are linked to a specific teacher using the teacherId.
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
    AND student_projects.date_completed IS NULL
    AND student.teacher_id = (?);
  `;
    // If I need to retrieve specific information from two tables, and the keys are fixed,
    // a static query is fine.Fixed keys: In that case, use a static query so not required alley[].
    pool.query(sql, [teacherId], (error, results) => {
            if (error) {
              // If an error occurs, a 500 status code is returned.
              console.error("Error fetching data:", error);
              return res.status(500).json({ message: "Internal server error" });
            }
      
            if (results.length > 0) {
              // If successful, the results are sent back as a JSON response. 
              res.status(200).json(results);
            } else {
              // If no results are found, a 404 status is returned.
              res.status(404).json({  status: "success", data: results });
            }
          })

  }
);

// Brown: Project Submission
// Defines a PATCH endpoint at /api/teacher-dashboard/ProjectSubmission/markCompleted.
// It is designed to update the date_completed field in the student_projects table for a list of student projects that have been marked as completed.
// Handles the marking of student projects as completed by validating input, executing SQL updates, and managing responses based on the outcome of those updates.
app.patch(
  "/api/teacher-dashboard/ProjectSubmission/markCompleted",
  (req, res) => {
    //  logs the incoming request body to the console for debugging purposes.
    //  It helps in verifying what data is being sent to the server.
    console.log("Received request body:", req.body); // Output the request body to the log
    // Destructuring Request Body:
    // The studentProjectsMarked variable is extracted from the request body.
    // This variable is expected to be an array containing objects with student_id and project_id.
    const { studentProjectsMarked } = req.body;

    // Check that studentProjectsMarked is an array and is not empty
    // Check if studentProjectsMarked is provided
    // If studentProjectsMarked is not present in the request,
    // a 400 Bad Request response is returned with an error message indicating that this field is required.
    if (!studentProjectsMarked) {
      return res
        .status(400)
        .json({ error: "studentProjectsMarked is required." });
    }

    // Check if studentProjectsMarked is an array
    // This checks if studentProjectsMarked is an array.
    // If not, it returns a 400 response with a message stating that it must be an array.
    if (!Array.isArray(studentProjectsMarked)) {
      return res
        .status(400)
        .json({ error: "studentProjectsMarked must be an array." });
    }

    // Check if studentProjectsMarked is not empty
    // This checks if the array is empty. If it is,
    // a 400 response is returned indicating that the array cannot be empty.
    if (studentProjectsMarked.length === 0) {
      return res
        .status(400)
        .json({ error: "studentProjectsMarked must not be an empty array." });
    }

    // SQL statement to set date_completed to NOW()
    // This SQL statement is prepared to update the date_completed field in the student_projects table
    // to the current date and time for the specified student_id and project_id.
    const sql = `
      UPDATE student_projects 
      SET date_completed = NOW() 
      WHERE student_id = ? AND project_id = ?`;

    const results = [];

    // Process each project
    // Iterates over each object in the studentProjectsMarked array.
    // For each project, it executes the SQL query using the student_id and project_id.
    studentProjectsMarked.forEach(({ student_id, project_id }) => {
      // pool.query is used to interact with the database asynchronously.
      pool.query(sql, [student_id, project_id], (err, result) => {
        // If there is an error during the database query,
        // it logs the error and returns a 500 Internal Server Error response with a message
        // indicating a problem occurred while marking the projects as completed.
        if (err) {
          console.error("Database error:", err); // error log
          return res
            .status(500)
            .json({ error: "Error marking projects as completed" });
        }

        // checks if any rows were affected by the query.
        // If no rows were affected, it indicates that the project was not found,
        // and it pushes a corresponding message into the results array.
        if (result.affectedRows === 0) {
          results.push({ student_id, project_id, date_completed: "Not Found" });
        } else {
          // If the update was successful,
          // it pushes the updated data into the results array, including the formatted completion date.
          results.push({
            student_id,
            project_id,
            date_completed: new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " "),
          });
        }
        // Once all queries are completed, return a response
        // it checks if the number of results matches the number of projects marked.
        //  If they match, it sends a JSON response back to the client with a success message and the results data.
        if (results.length === studentProjectsMarked.length) {
          res.json({ message: "Projects marked as completed", data: results });
        }
      });
    });
  }
);

// Brown: Submit Project
// Set the route for UploadThing
// This section configures the endpoint for uploading images.
// It uses the uploadthing library to create a route to handle the images.
app.use(
  "/api/student-dashboard/SubmitProject/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      token: process.env.UPLOADTHING_TOKEN, // Get the token from an environment variable
    },
  })
);

// This is used to obtain submission information related to specific students and projects.
// This is used by students to access their own submission information.
// Define a GET endpoint to fetch submission details for a student and project
// This is where clients can request submission details.
// The query for students retrieves a single or more submission information based on the student ID and project ID using alley.
app.get(
  "/api/student-dashboard/SubmitProject/get-submission/:student_id/:project_id",
  (req, res) => {
    // Extract student_id and project_id from the request parameters
    // The req.params object contains route parameters.
    // Here, student_id and project_id are extracted from the URL.
    const { student_id, project_id } = req.params;
    console.log(
      `This is the endpoint for student_id: ${student_id}, and project_id: ${project_id}.`
    );

    // SQL query to select the submission URL from the database
    // to select the submission field from the student_projects table based on the provided student_id and project_id.
    const sql = `
      SELECT submission
      FROM student_projects
      WHERE student_id = ? AND project_id = ?;
    `;
    
    // Execute the SQL query
    // The pool.query method executes the SQL query against the database.
    // The results are processed in a callback function.
    pool.query(sql, [student_id, project_id], (error, results) => {
      // Check if there was an error executing the query
      if (error) {
        console.error("Error fetching data:", error);
        // Send a 500 Internal Server Error response if an error occurred
        return res.status(500).json({ message: "Internal server error" });
      }

      // Check if any results were returned from the query
      if (results.length > 0) {
        // If a submission was found, send it back in a 200 OK response
        res.status(200).json({ submission: results[0].submission });
      } else {
        // If no submission was found, send a 404 Not Found response
        res.status(404).json({ message: "No record found" });
      }
    });
  }
);

// Here we define the content (text and image) to be returned.
// Initially, uploadedImageUrl is set to a fixed image path.
// Image content (use URL after upload)
let uploadedImageUrl = "makeProject-screenshot.png"; // Initial

// After clicking the button in the frontend, the URL of the image is passed to the backend server
// and this created new ufsUrl is sent in the submission as a string.
// The /api/student-dashboard/SubmitProject/store-submission endpoint
// receives the submission URL from the frontend.
// The backend checks if the submission ufsUrl is provided and
// updates the database record with this ufsUrl.

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
    

        message: "Missing submission ufsUrl in the request body.",

      });
    }

    // Check if student_id and project_id exist
    if (!student_id || !project_id) {
      return res.status(400).json({
        message: "Both student_id and project_id are required",
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
        // If the update is successful, it returns a success message.
        res.status(200).json({ message: "Submission updated successfully" });
      } else {
        // If the record to be updated is not found, it returns an appropriate error message.
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
