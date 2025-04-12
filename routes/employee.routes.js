// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the employee controller
const employeeController = require('../controllers/employee.controller');
// Import middleware 
const authMiddleware = require("../middlewares/auth.Middleware");
// Create a route to handle the add employee request on post
router.post("/api/employee", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.createEmployee);
// Create a route to handle the get all employees request on get
router.get("/api/employees", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.getAllEmployees);
// Export the router
module.exports = router;




// // Import the express module  
// const express = require('express');
// // Call the router method from express to create the router 
// const router = express.Router();
// // Import the employee controller
// const employeeController = require('../controllers/employee.controller');

// // Import middleware 
// const authMiddleware = require("../middlewares/auth.Middleware");
// // Create a route to handle the add employee request on post
// router.post("/api/employee", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.createEmployee);
// // Export the router
// module.exports = router;


// // Create a route to handle the add employee request on post
// router.post("/api/employee", employeeController.createEmployee);
// // Export the router
// module.exports = router;
