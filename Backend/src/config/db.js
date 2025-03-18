import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'sql5.freesqldatabase.com',
  user: process.env.DB_USER || 'sql5768162',
  password: process.env.DB_PASS || 'whkCeQuapH',
  database: process.env.DB_NAME || 'sql5768162',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Async function to test connection
const testDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database");
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};

// Call the function
testDB();

export { pool };
