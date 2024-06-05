import dotenv from "dotenv/config";
import connectDB from "./db/config.js";
import app from "./app.js";

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server running on port ${process.env.port}`);
        });
    })
    .catch((error) => {
        console.log("Error in connecting Database", error);
        process.exit(1);
    });
