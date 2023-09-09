require("dotenv").config();
const pool = require("./server/config/database");
const mysql = require("mysql2");
const express = require("express");
const userRouter = require("./server/api/users/user.router");

const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
