import { app } from "./src/app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Stop server if DB connection fails
    } else {
        console.log("Connected to MySQL database");
        connection.release(); // Release the connection back to the pool
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
});