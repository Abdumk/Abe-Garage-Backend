const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const authMiddleware = require("../middlewares/auth.Middleware");

// Get all services
router.get("/api/services", [authMiddleware.verifyToken], serviceController.getAllServices);

// Get single service
router.get("/api/service/:id", [authMiddleware.verifyToken], serviceController.getServiceById);

// Create new service
router.post("/api/service", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.createService);

// Update service
router.put("/api/service", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.updateService);

// Delete service
router.delete("/api/service/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.deleteService);

module.exports = router;