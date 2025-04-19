const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/commonsService.controller');
const authMiddleware = require("../middlewares/auth.Middleware");

// Create a route to handle the add customer request on post
router.post("/api/service", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.createService);

// Create a route to handle the get all customers request on get
router.get("/api/services", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.getAllServices);

// Delete service by id
router.delete("/api/service/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.deleteService);

// PUT - Update service by ID
router.put("/api/service/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.updateService);

// GET - Fetch specific service by ID
router.get("/api/service/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.getServiceById);

module.exports = router;
