import { createConnection } from "mysql2";

// Connect to database
const db = createConnection(
  {
    host: "localhost",
    // your mysql username,
    user: "root",
    // your mysql password
    password: "586491",
    database: "theoffice",
  },
  console.log("Connected to the The Office database.")
);

export default db;
