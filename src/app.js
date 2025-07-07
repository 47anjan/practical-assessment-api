const express = require("express");

const cors = require("cors");
const cookie = require("cookie-parser");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookie());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

const authRoutes = require("./routes/auth");
const profileRoute = require("./routes/profile");
const userRoute = require("./routes/user");

app.use("/api/", authRoutes);
app.use("/api/", profileRoute);
app.use("/api/", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
