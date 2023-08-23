const express = require("express");
var cors = require("cors");
const { connection } = require("./db");
require("dotenv").config();
const { userRouter } =  require("./routes/userRouter");
const {doctorRouter} = require("./routes/doctorsRouter")

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send(`Welcome to Home`);
});


app.use("" , userRouter)
app.use("/doctors" , doctorRouter)
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Error while connecting with DB", error.message);
  }
  console.log(`Server is running at ${process.env.port}`);
});