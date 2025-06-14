import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {authRouter} from './routes/auth/auth-routes.js';
import dotenv from 'dotenv';
import { adminProductRouter } from './routes/admin/product-routes.js';
import { userProductRouter } from './routes/shopping/product-routes.js';

dotenv.config();
const MONGODB_KEY = process.env.MONGODB_KEY;

mongoose.connect(MONGODB_KEY).then(() => {
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
app.use("/api/admin/products", adminProductRouter);
app.use("/api/shopping/products", userProductRouter); 

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
