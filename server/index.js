import express from "express";
import dotenv from "dotenv"; 
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
dotenv.config({});

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// mongodb connection
try{
  mongoose.connect(URI);
  console.log("Connected to database");
} catch (error) {
  console.log("Error: ", error);
}

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
  origin:'http://localhost:5173',
  credentials:true
};
app.use(cors(corsOption)); 

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, ()=>{
  console.log(`Server listen at prot ${PORT}`);
});