// Import necessary modules 
const express = require('express');
// const db = require('./config/dbConfig');
require('dotenv').config();
const sanitize = require('sanitize');
const cors = require('cors');

// Set up the CORS options to allow requests from our front-end 
const corsOptions = {
  origin: process.env.FRONTEND_URL,  // The frontend URL (make sure this is correctly set in your .env file)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
  credentials: true, // Allow cookies or credentials if required
  optionsSuccessStatus: 200 // For legacy browser support
};

// Create an Express app
const app = express();

// Add the CORS middleware before the routes
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests (for CORS)
app.options('*', cors(corsOptions));  // Allow OPTIONS preflight for all routes

// Add other middleware
app.use(express.json());
app.use(sanitize.middleware);

// Import and use routes
const router = require('./routes');
app.use(router);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;



// // Import the express module 
// const express = require('express');
// // Import the dbConfig module to connect to the database

// const db = require('./config/dbConfig');
// // Import the dotenv module and call the config method to load the environment variables
// require('dotenv').config();

// // Import the sanitizer module 
// const sanitize = require('sanitize');
// // Import the CORS module
// const cors = require('cors');
// // Set up the CORS options to allow requests from our front-end 
// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   optionsSuccessStatus: 200
// };
// // Create a variable to hold our port number 
// const port = process.env.PORT;
// // Import the router 
// const router = require('./routes');
// // Create the webserver 
// const app = express();
// // Add the CORS middleware
// app.use(cors(corsOptions));
// // Add the express.json middleware to the application
// app.use(express.json());
// // Add the sanitizer to the express middleware 
// app.use(sanitize.middleware);
// // Add the routes to the application as middleware 
// app.use(router);
// // Start the webserver
// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });
// // Export the webserver for use in the application 
// module.exports = app;



// my first app.js file code
// const express = require("express");
// const dbconnection = require('./db/dbConfig');
// require('dotenv').config();

// // import the userRoutes
//  // const userRoutes = require("./routes/UserRoutes");
// const app = express();



// // use the userRoutes in app.js
// // app.use("/api/users", userRoutes);
// // Middleware to parse JSON
// app.use(express.json());

// // Define a test route
// app.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });

// app.use((err, req, res, next) => {
//     res.status(500).json({ message: err.message });
//   });
  

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
