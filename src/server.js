require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const app = express();

const PORT = process.env.PORT || 5001;

connectDB();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
//check allow list
const allowedOrigins = [process.env.CLIENT_URL, process.env.API_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: false,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

//http://127.0.0.1:5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});