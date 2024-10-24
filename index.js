const jsonServer = require("json-server"); // importing json-server library
const express = require('express'); // Import express for body parsing
const cors = require('cors'); // Import cors
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2");

// Create a MySQL connection
//localhost 
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'efficiencyapp'
// });

//live
const connection = mysql.createConnection({
  host: 'sql.freedb.tech',
  user: 'freedb_efficiencyapp',
  password: 'hQ2Zm!k#8!Dvs7c',
  database: 'freedb_efficiencyapp'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Use CORS middleware
server.use(cors()); // Enable CORS for all routes

const allowedOrigins = ['http://localhost:8100', 'http://localhost:8101', 'https://efficiencyapp-server.vercel.app']; // Add other allowed origins if needed

server.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  next();
});

// Set the storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Define folder to save the files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Keep the original filename
  }
});

// Set up Multer middleware to handle file uploads
const upload = multer({ storage: storage });

// File upload route
server.post("/upload", upload.single('audiofile'), (req, res) => {
  console.log('Request body:', req.body); // Log request body
  console.log('Uploaded file:', req.file); // Log file information

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ message: "File uploaded successfully", file: req.file });
});

// Middleware to parse JSON body
server.use(express.json());

// New API for creating visit_options in MySQL
server.post("/visit_options/bulk", (req, res) => {
    const visitOptions = req.body; // This will be the array of visit option objects
    console.log('Request body:', req.body); // Log request body
  
    // Validation
    if (!Array.isArray(visitOptions) || visitOptions.length === 0) {
      return res.status(400).json({ message: "An array of visit options is required" });
    }
  
    // Prepare the query and values
    const query = `INSERT INTO visit_options (idVisit, card_code, category, option1, option2, option3, option4 ) VALUES ?`;
    const values = visitOptions.map(option => [
      option.idVisit,
      option.card_code,
      option.category,
      option.option1,
      option.option2,
      option.option3,
      option.option4
      
    ]);
  
    // Execute the query
    connection.query(query, [values], (err, results) => {
      if (err) {
        console.error('Error saving visit_options:', err.stack);
        return res.status(500).json({ message: "Failed to save visit_options" });
      }
  
      res.status(201).json({
        message: "visit_options saved successfully",
        count: results.affectedRows // Number of rows affected
      });
    });
  });

  // API to get all options
server.get("/options", (req, res) => {
    const query = "SELECT * FROM options"; // Query to get all options
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving options:', err.stack);
        return res.status(500).json({ message: "Failed to retrieve options" });
      }
      res.status(200).json(results);
    });
  });
  

const port = process.env.PORT || 8080; // chose port from here like 8080, 3001
server.use(middlewares);
server.use(router);
jsonServer.rewriter({
  "/*": "/$1"
});

server.listen(port, () => {
  console.log('json server is running', port);
});

module.exports = server;
