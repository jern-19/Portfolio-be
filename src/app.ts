import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import projectRoutes from "./routes/project.routes";



const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is running 🚀",
  });
});

app.use("/projects", projectRoutes);

export default app;