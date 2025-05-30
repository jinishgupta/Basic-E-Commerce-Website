import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {authRouter} from './routes/auth/auth-routes.js';

mongoose.connect("mongodb+srv://jinishgupta:Mom6october%23@cluster0.y8xqt6c.mongodb.net/").then(() => {
  console.log("Connected to MongoDB");
}
).catch(err => {
  console.error("Error connecting to MongoDB:", err);
}
);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders : ["Content-Type", "Authorization", "Cache-Control", "Expires ", "Pragma"],  
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));