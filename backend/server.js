import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import taskRoutes from './routes/task.route.js'
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://task-management-woad-three.vercel.app/",
    // origin: "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout
    connectTimeoutMS: 30000,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/task", authMiddleware ,taskRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));