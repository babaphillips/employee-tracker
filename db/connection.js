const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // your mysql username,
  user: "root",
  // your mysql password
  password: "586491",
  database: "theoffice",
});

module.exports = db;
