// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
const installRouter = require('./install.routes');
// Import the employee routes 
const employeeRouter = require('./employee.routes');
// Import the login routes 
const loginRoutes = require("./login.routes");
// Import the customerRouter
const customerRouter = require('./customer.routes');
// Import the commonServiceRouter
const commonServiceRouter = require('./commonsService.routes');
// Import the vehicle router
const vehicleRouter = require('./vehicle.routes');
// import the service router
const serviceRouter = require('./service.routes');
// import the orders Router
const orderRouter = require('./order.routes');
// Add the install router to the main router 
router.use(installRouter);
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the customer routes to the main router
router.use(customerRouter); 
// Add the login routes to the main router
router.use(loginRoutes);

router.use(commonServiceRouter);
// Add the vehicle routes to the main router
router.use(vehicleRouter);
// Add the service routes to the main router
router.use(serviceRouter);


// And add this with your other router.use() calls
router.use(orderRouter);
// Export the router
module.exports = router; 
