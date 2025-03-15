import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // host: 'localhost',
  // user: 'root',
  // password: '2477',
  // database: "Sample_DB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const data = await pool.execute(`
  SELECT * FROM Students
  `)

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("Connected to MySQL Database");
      connection.release();
    }
  });
  
  console.log(data)

export {pool} ;
