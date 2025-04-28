const serviceService = require('../services/service.service');

async function getAllServices(req, res) {
  try {
    const services = await serviceService.getAllServices();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getServiceById(req, res) {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createService(req, res) {
  try {
    const serviceData = req.body;
    const service = await serviceService.createService(serviceData);
    if (!service) {
      return res.status(400).json({ error: "Failed to create service" });
    }
    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateService(req, res) {
  try {
    const serviceData = req.body;
    const updatedService = await serviceService.updateService(serviceData);
    if (!updatedService) {
      return res.status(400).json({ error: "Failed to update service" });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteService(req, res) {
  try {
    const serviceId = req.params.id;
    const deleted = await serviceService.deleteService(serviceId);
    if (!deleted) {
      return res.status(400).json({ error: "Failed to delete service" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};