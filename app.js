const express = require("express");

const cors = require("cors");
const cookie = require("cookie-parser");
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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
