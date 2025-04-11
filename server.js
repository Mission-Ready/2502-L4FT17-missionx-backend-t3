const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const bodyParser = require('body-parser'); // added by takashi

const app = express();
app.use(bodyParser.json());// added by takashi

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
  console.log('MySQL connected...');
});

// Shazias Endpoints here

// Kerrys enpoints here

// Solomene endpoint here

// Eugenes end points here

// Takashis endpoints here

//Testing import student data by being modified with gender and succeed between backend and SQL server.
app.get("/", (req, res) => {
  pool.query("SELECT * FROM student_temp", (err, result) => {
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

// Endpoint to get project information
app.get('/api/student/:studentId/projects', (req, res) => {
  const studentId = req.params.studentId;
  const query = `
    SELECT * FROM student_projects
    WHERE student_id = ?
  `;
  
  pool.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Database query error", err);
      return res.status(500).json({ status: "error", message: "An error occurred while retrieving data." });
    }
    res.status(200).json({ status: "success", data: results });
  });
});




app
  .listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  })
  .on(`error`, (error) => {
    console.log("Server error", error);
  });
