import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import taskRoutes from './routes/task.route.js'
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const allowedOrigins = [
  "https://task-management-woad-three.vercel.app", // Remove trailing slash
  "http://localhost:5173", // If testing locally
];

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies/auth headers
  })
);
app.options("*", cors());

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