const vehicleService = require('../services/vehicle.service');

async function createVehicle(req, res) {
  try {
    const vehicleData = req.body;
    const vehicle = await vehicleService.createVehicle(vehicleData);
    
    if (!vehicle) {
      return res.status(400).json({ error: "Failed to add vehicle" });
    }
    
    res.status(201).json(vehicle);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getVehiclesByCustomer(req, res) {
  try {
    const customerId = req.params.customerId;
    const vehicles = await vehicleService.getVehiclesByCustomer(customerId);
    
    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}




module.exports = {
  createVehicle,
  getVehiclesByCustomer
};