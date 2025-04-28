const customerService = require('../services/customer.service');

// Create customer controller
async function createCustomer(req, res, next) {
  const customerExists = await customerService.checkIfCustomerExists(req.body.customer_email);

  if (customerExists) {
    return res.status(400).json({
      error: "This email address is already associated with another customer!"
    });
  }

  try {
    const customerData = req.body;
    const customer = await customerService.createCustomer(customerData);

    if (!customer) {
      return res.status(400).json({
        error: "Failed to add the customer!"
      });
    }

    res.status(200).json({ status: "true" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong!" });
  }
}

// Get all customers
async function getAllCustomers(req, res, next) {
  const customers = await customerService.getAllCustomers();

  if (!customers) {
    return res.status(400).json({ error: "Failed to get all customers!" });
  }

  res.status(200).json({ status: "success", data: customers });
}

// Delete customer by ID
async function deleteCustomer(req, res) {
  const id = req.params.id;

  try {
    const deleted = await customerService.deleteCustomer(id);

    if (!deleted) {
      return res.status(404).json({ error: "Customer not found or not deleted." });
    }

    res.status(200).json({ message: "Customer deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete customer." });
  }
}

// Update customer by ID
async function updateCustomer(req, res) {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const updated = await customerService.updateCustomer(id, updatedData);

    if (!updated) {
      return res.status(404).json({ error: "Customer not found or update failed." });
    }

    res.status(200).json({ message: "Customer updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update customer." });
  }
}

// Get customer by ID
async function getCustomerById(req, res) {
  const id = req.params.id;

  try {
    const customer = await customerService.getCustomerById(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found." });
    }

    res.status(200).json({ status: "success", data: customer });
  } catch (error) {
    console.error("Error getting customer by ID:", error);
    res.status(500).json({ error: "Failed to get customer." });
  }
}
// Get vehicles by customer ID
async function getVehiclesByCustomerId(req, res) {
  const customerId = req.params.customerId;
  
  try {
    const vehicles = await customerService.getVehiclesByCustomerId(customerId);
    
    if (!vehicles) {
      return res.status(404).json({ error: "No vehicles found for this customer" });
    }
    
    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error getting vehicles:", error);
    res.status(500).json({ error: "Failed to get vehicles" });
  }
}

module.exports = {
  createCustomer,
  getAllCustomers,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
  getVehiclesByCustomerId
};
