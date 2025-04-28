const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const authMiddleware = require("../middlewares/auth.Middleware");

router.post("/api/vehicle", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.createVehicle);
router.get("/api/vehicles/customer/:customerId", [authMiddleware.verifyToken], vehicleController.getVehiclesByCustomer);

module.exports = router;