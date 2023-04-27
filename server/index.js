const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const app = express();
require("dotenv").config()

//When using 'use', it is a middleware
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute)

// CRUD OPERATIONS END POINT
app.get("/", (req, res) => {
  res.send("Welcome to our chat app :D");
});

const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

app.listen(PORT, (req, res) => {
  console.log(`server running on port: ${PORT}`);
})

mongoose.connect(URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully Connected to MongoDB ATLAS");
}).catch((error) => {
  console.log("MongoDB Connection Failed!", error.message);
});