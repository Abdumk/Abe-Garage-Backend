const Service = require('../services/commonservice.service');

// Create customer controller
async function createService(req, res, next) {
 

  try {
    const serviceData = req.body;
    const service = await Service.createService(serviceData);

    if (!service) {
      return res.status(400).json({
        error: "Failed to add the service!"
      });
    }

    res.status(200).json({ status: "true" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong!" });
  }
}

// Get all services
async function getAllServices(req, res, next) {
  const services = await Service.getAllServices();

  if (!services) {
    return res.status(400).json({ error: "Failed to get all services!" });
  }

  res.status(200).json({ status: "success", data: services });
}

// Delete service by ID
async function deleteService(req, res) {
  const id = req.params.id;

  try {
    const deleted = await Service.deleteService(id);

    if (!deleted) {
      return res.status(404).json({ error: "service not found or not deleted." });
    }

    res.status(200).json({ message: "service deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete service." });
  }
}

// Update service by ID
async function updateService(req, res) {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const updated = await Service.updateService(id, updatedData);

    if (!updated) {
      return res.status(404).json({ error: "service not found or update failed." });
    }

    res.status(200).json({ message: "service updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update service." });
  }
}

// Get service by ID
async function getServiceById(req, res) {
  const id = req.params.id;

  try {
    const service = await Service.getServiceById(id);

    if (!service) {
      return res.status(404).json({ error: "service not found." });
    }

    res.status(200).json({ status: "success", data: service });
  } catch (error) {
    console.error("Error getting service by ID:", error);
    res.status(500).json({ error: "Failed to get service." });
  }
}

module.exports = {
  createService,
  getAllServices,
  deleteService,
  getServiceById,
  updateService
};
