// server.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Shri', // Your MySQL username
  password: '', // Your MySQL password
  database: 'realestate' // The database you created
});

// Connect to MySQL Database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// User Authentication Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else if (results.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Endpoint to Fetch Properties
app.get('/properties', (req, res) => {
  const query = 'SELECT * FROM properties';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to Fetch AI-Driven Recommendations
app.get('/recommendations', (req, res) => {
  // Here you will integrate the AI model later
  const query = 'SELECT * FROM properties ORDER BY RAND() LIMIT 5'; // Example: Random 5 properties

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Start the Server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
