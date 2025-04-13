const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


//example
app.get("/api/teacherdashboard/helprequest", (req, res) => {
  pool.query("SELECT * FROM teacher", (err, result) => {
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


// Shazias Endpoints here






// Kerrys enpoints here





// Solomene endpoint here




// Eugenes end points here



// Takashis endpoints here





app
  .listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
  })
  .on(`error`, (error) => {
    console.log("Server error", error);
  });
