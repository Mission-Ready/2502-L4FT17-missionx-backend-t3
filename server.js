const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");



const app = express();


app.use(cors({origin: ['http://localhost:5173'],  // Replace with the URL of your frontend
  methods : ['GET', 'POST'],}));
app.use(express.json());
app.use(bodyParser.json()); // ✅ required to parse JSON bodies

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
// app.get("/api/teacherdashboard/helprequest", (req, res) => {
//   pool.query("SELECT * FROM teacher", (err, result) => {
//     if (err) {
//       console.error("Database query error", err);
//       return res.status(500).json({
//         status: "error",
//         message: "something went wrong with that query",
//       });
//     }
//     res.status(200).json({ status: "success", data: result });
//   });
// });


// Shazias Endpoints here
// student Log in End point 

app.post("/login", (req, res) => {
  console.log('login endpoint hit')
  console.log(req.body)
  const { email, password } = req.body;
  console.log(email, password)
  // const query = `SELECT name, password FROM Log_in_details WHERE Email = ?;`;

  pool.query(
    `SELECT name, password FROM Log_in_details WHERE Email = ?;`,
    [email],
    (err, result) => {
      console.log(result)
      if (err) {
        console.error("Database query error", err);
        return res.status(501).json({
          status: "error",
          message: "Something went wrong with the database query",
        });
      }

      // Check if no result is returned (invalid email)
      if (result.length === 0) {
        console.log("invalid email or password")
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }

      // Directly compare the password in plain text
      if (req.body.password === result[0].password) {
        // Return user info if login is successful
        return res.status(200).json({
          status: "success",
          name: result[0].name,
        });
      } else {
        // If password does not match
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
    }
  );
});


// Teacher Log in End point 

app.post("/login/teacher", (req, res) => {
  console.log("login endpoint hit");
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);
  // const query = `SELECT name, password FROM Log_in_details WHERE Email = ?;`;

  pool.query(
    `SELECT name, password FROM Teacher_log_in_details WHERE Email = ?;`,
    [email],
    (err, result) => {
      console.log(result);
      if (err) {
        console.error("Database query error", err);
        return res.status(501).json({
          status: "error",
          message: "Something went wrong with the database query",
        });
      }

      // Check if no result is returned (invalid email)
      if (result.length === 0) {
        console.log("invalid email or password");
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }

      // Directly compare the password in plain text
      if (req.body.password === result[0].password) {
        // Return user info if login is successful
        return res.status(200).json({
          status: "success",
          name: result[0].name,
        });
      } else {
        // If password does not match
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
    }
  );
});

// Student Sign Up 

app.post("/signup/student", (req, res) => {
  console.log('student signup endpoint hit');
  console.log(req.body);
  

  const { name, email, password, confirmPassword } = req.body;

  console.log(
    "Received student sign-up form:",
    name,
    email,
    password,
    confirmPassword
  );

  pool.query(
    `Select email FROM Log_in_details Where Email = ?; `, [email], (err, result) => {
      if (err) {
        console.error("Database error during email check", err);
        return res.status(500).json({
          status: "Error",
          message: "Server error during email check",
        });
      }
      if (result.length > 0) {
        return res.status(400).json(
          {
            status: "EmailError",
            message: "Email already exists",
          }
        );
      }

      pool.query(
        `INSERT INTO Log_in_details (name,email,password,confirmPassword)
VALUES (?,?,?,?);`,
        [name, email, password, confirmPassword],
        (err, result) => {
          console.log(result);
          if (err) {
            console.error("SignUp Error", err);
            return res.status(501).json({
              status: "Error",
              message: "Something went wrong with the sign up process",
            });
          }
      
          return res.status(201).json({
            status: "Success",
            message: "Student sign up successful"
          });
          
        }
      );


    });
});




// Teacher Sign up Endpoint

app.post("/signup/teacher", (req, res) => {
  console.log("teacher signup endpoint hit");
  console.log(req.body);

  const { name, email, password, confirmPassword } = req.body;

  console.log(
    "Received teacher sign-up form:",
    name,
    email,
    password,
    confirmPassword
  );

  pool.query(
    `Select email Teacher_log_in_details Where Email = ?; `,
    [email],
    (err, result) => {
      if (err) {
        console.error("Database error during email check", err);
        return res.status(500).json({
          status: "Error",
          message: "Server error during email check",
        });
      }
      if (result.length > 0) {
        return res.status(400).json({
          status: "EmailError",
          message: "Email already exists",
        });
      }

      pool.query(
        `INSERT INTO Teacher_log_in_details (name,email,password,confirmPassword)
VALUES (?,?,?,?);`,
        [name, email, password, confirmPassword],
        (err, result) => {
          console.log(result);
          if (err) {
            console.error("SignUp Error", err);
            return res.status(501).json({
              status: "Error",
              message: "Something went wrong with the sign up process",
            });
          }
          return res.status(201).json({
            status: "Success",
            message: "Teacher sign up successful",
          });
        }
      );
    }
  );
  
});

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
