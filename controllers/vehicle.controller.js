// const vehicleService = require('../services/vehicle.service');

// async function createVehicle(req, res) {
//   try {
//     const vehicleData = req.body;
//     const vehicle = await vehicleService.createVehicle(vehicleData);
    
//     if (!vehicle) {
//       return res.status(400).json({ error: "Failed to add vehicle" });
//     }
    
//     res.status(201).json(vehicle);
//   } catch (error) {
//     console.error("Error creating vehicle:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// async function getVehiclesByCustomer(req, res) {
//   try {
//     const customerId = req.params.customerId;
//     const vehicles = await vehicleService.getVehiclesByCustomer(customerId);
    
//     res.status(200).json(vehicles);
//   } catch (error) {
//     console.error("Error fetching vehicles:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }




// module.exports = {
//   createVehicle,
//   getVehiclesByCustomer
// };

const vehicleService = require('../services/vehicle.service');

async function createVehicle(req, res) {
  try {
    const vehicleData = req.body;
    const token = req.headers['x-access-token'];
    const vehicle = await vehicleService.createVehicle(vehicleData, token);
    
    if (!vehicle) {
      return res.status(400).json({ 
        success: false,
        message: "Failed to add vehicle" 
      });
    }
    
    res.status(201).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
}

async function getVehiclesByCustomer(req, res) {
  try {
    const customerId = req.params.customerId;
    const token = req.headers['x-access-token'];
    const vehicles = await vehicleService.getVehiclesByCustomer(customerId, token);
    
    res.status(200).json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
}

async function getVehicleById(req, res) {
  try {
    const vehicleId = req.params.vehicleId;
    const token = req.headers['x-access-token'];
    const vehicle = await vehicleService.getVehicleById(vehicleId, token);
    
    if (!vehicle) {
      return res.status(404).json({ 
        success: false,
        message: "Vehicle not found" 
      });
    }
    
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
}

module.exports = {
  createVehicle,
  getVehiclesByCustomer,
  getVehicleById
};