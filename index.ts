import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express()
app.use(express.json())
dotenv.config();

import { userRouter } from "./routes/user"
// CORS configuration: allow the deployed frontend, allow auth headers, enable credentials, and handle preflight
const corsOptions: cors.CorsOptions = {
    origin: [
        "https://frontend-chat-app-on7h.vercel.app/",
        "http://localhost:5173",
        "http://localhost:3000",
        "https://backend-chat-app-1-6hh7.onrender.com", // backend itself (for health checks)
        "https://" + "".trim() // placeholder to keep array format
    ].filter(Boolean),
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
   
app.use("/user", userRouter);  

async function listen(){
    //@ts-expect-error: do not know what to do here
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    }) 
}


listen();


