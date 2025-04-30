// const express = require('express');
// const router = express.Router();
// const vehicleController = require('../controllers/vehicle.controller');
// const authMiddleware = require("../middlewares/auth.Middleware");

// router.post("/api/vehicle", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.createVehicle);
// router.get("/api/vehicles/customer/:customerId", [authMiddleware.verifyToken], vehicleController.getVehiclesByCustomer);

// module.exports = router;
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const authMiddleware = require("../middlewares/auth.Middleware");

// Add vehicle
router.post("/api/vehicle", [authMiddleware.verifyToken], vehicleController.createVehicle);

// Get vehicles by customer
router.get("/api/vehicles/customer/:customerId", [authMiddleware.verifyToken], vehicleController.getVehiclesByCustomer);

// Get single vehicle by ID
router.get("/api/vehicle/:vehicleId", [authMiddleware.verifyToken], vehicleController.getVehicleById);

module.exports = router;