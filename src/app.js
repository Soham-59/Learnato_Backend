import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", postRoutes);
app.use("/api/ai", aiRoutes);

export default app;
