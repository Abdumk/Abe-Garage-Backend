const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require("../middlewares/auth.Middleware");

// Get all orders
router.get("/api/orders", [authMiddleware.verifyToken], orderController.getAllOrders);

// Get single order by ID
router.get("/api/order/:id", [authMiddleware.verifyToken], orderController.getOrderById);

// Create new order
router.post("/api/order", [authMiddleware.verifyToken], orderController.createOrder);

// Update order by ID
router.put("/api/order/:id", [authMiddleware.verifyToken], orderController.updateOrder);

// Delete order by ID
router.delete("/api/order/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], orderController.deleteOrder);

module.exports = router;