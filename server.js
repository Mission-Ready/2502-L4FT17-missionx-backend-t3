const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();
const cors = require("cors"); // test

// Middleware
app.use(cors("http://localhost:5173")); //test

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Shazias Endpoints here

// Kerrys enpoints here

// Solomone endpoint here

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

app.get("/api/teacher", (req, res) => {
  pool.query("SELECT * FROM teacher;", (err, result) => {
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

// Eugenes end points here

// Takashis endpoints here

app
  .listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  })
  .on(`error`, (error) => {
    console.log("Server error", error);
  });
