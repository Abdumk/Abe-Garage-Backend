const express = require("express");
const dbconnection = require('./db/dbConfig');
require('dotenv').config();

// import the userRoutes
 // const userRoutes = require("./routes/UserRoutes");
const app = express();



// use the userRoutes in app.js
// app.use("/api/users", userRoutes);
// Middleware to parse JSON
app.use(express.json());

// Define a test route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
  });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
