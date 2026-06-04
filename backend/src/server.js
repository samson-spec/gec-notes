import express from "express" //type: module
// const express = require("express") //type: commonjs

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

import cors from "cors";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001

// -------------------------------
//Middleware

app.use(
    cors({
        origin: "http://localhost:5173",
    })
); //enable CORS for all routes

app.use(express.json()); //middleware to parse incoming JSON data: req.body
app.use(rateLimiter); //apply rate limiting to all routes


// -------------------------------

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
});

