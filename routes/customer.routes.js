const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const authMiddleware = require("../middlewares/auth.Middleware");

// Create a route to handle the add customer request on post
router.post("/api/customer", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.createCustomer);

// Create a route to handle the get all customers request on get
router.get("/api/customers", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.getAllCustomers);

// Delete customer by id
router.delete("/api/customer/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.deleteCustomer);

// PUT - Update customer by ID
router.put("/api/customer/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.updateCustomer);

// GET - Fetch specific customer by ID
router.get("/api/customer/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.getCustomerById);

// get vehicles by customer ID
router.get("/api/vehicles/:customerId", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.getVehiclesByCustomerId);


module.exports = router;
