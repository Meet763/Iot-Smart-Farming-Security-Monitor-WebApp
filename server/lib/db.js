import mysql from "mysql2/promise";
import dotenv from 'dotenv';
dotenv.config();



// Create a connection pool and export it
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const connectToDatabase = async () => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    // If needed, do any setup or checks here

    // Always release the connection back to the pool
    connection.release();
    return connection;
  } catch (err) {
    console.log(err);
    throw err; // It's better to throw the error again so the caller knows that the connection failed
  }
};
