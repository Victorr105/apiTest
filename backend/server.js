import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import blogRoutes from "./src/routes/blogRoutes.js"
//import thr router for registration
import authRoutes from  "./src/routes/authRoutes.js"
//import user routes
import userRoutes from "./src/routes/userRoutes.js"
// import cors from cors
import cors from "cors";
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//usage of cors
// app.use(cors({ origin:"http://localhost:5001",cridentials:true}));


/// Load env
// dotenv.config({ path: path.resolve(__filename, ".env") });

// Check MONGO_URI
// if (!process.env.MONGO_URI) {
//   console.error("❌ MONGO_URI is undefined! Check your .env path.");
//   process.exit(1);
// }

// Setup express app
const app = express();
dotenv.config()

// Parse JSON bodies
app.use(express.json({limit:"10mb"}))

// Simple request logger for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} -> ${req.method} ${req.url}`)
  next()
})

// Serve uploaded files statically from /uploads
app.use('/uploads', express.static(path.resolve(__dirname, '../../uploads')))

//  base url for all blog notes 
app.use("/api/blogs",blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);
// make the uploads folder accesible publicly {access from the frontend}
app.use("uploads",express.static("uploads"));
// Routes

app.get("/test", (req, res) => {
  res.send("<h1> Test route loaded </h1>");
});


// health endpoint
app.get('/health', (req, res) => {
  res.json({ ok: true })
})



app.use((req, res) => {
  res.status(404).send("<h1> Route not Found ! </h1>");
});


const database=process.env.MONGO_URI


// DB connection
async function dbconnection() {
  try {
    await mongoose.connect(database);
    console.log("✅ Database connected successfully");

  app.listen(5001, () => {
      console.log("🚀 App running on port localhost:5001");
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB", error);
  }
}

dbconnection();


