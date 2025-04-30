// Import the employee service 
const employeeService = require('../services/employee.service');

// Create the add employee controller
async function createEmployee(req, res, next) {
  const employeeExists = await employeeService.checkIfEmployeeExists(req.body.employee_email);

  if (employeeExists) {
    return res.status(400).json({
      error: "This email address is already associated with another employee!"
    });
  }

  try {
    const employeeData = req.body;
    const employee = await employeeService.createEmployee(employeeData);

    if (!employee) {
      return res.status(400).json({
        error: "Failed to add the employee!"
      });
    }

    res.status(200).json({ status: "true" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong!" });
  }
}

// Get all employees
async function getAllEmployees(req, res, next) {
  const employees = await employeeService.getAllEmployees();

  if (!employees) {
    return res.status(400).json({ error: "Failed to get all employees!" });
  }

  res.status(200).json({ status: "success", data: employees });
}

// Delete employee by ID
async function deleteEmployee(req, res) {
  const id = req.params.id;

  try {
    const deleted = await employeeService.deleteEmployee(id);

    if (!deleted) {
      return res.status(404).json({ error: "Employee not found or not deleted." });
    }

    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete employee." });
  }
}

// Update employee by ID
async function updateEmployee(req, res) {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const updated = await employeeService.updateEmployee(id, updatedData);

    if (!updated) {
      return res.status(404).json({ error: "Employee not found or update failed." });
    }

    res.status(200).json({ message: "Employee updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update employee." });
  }
}
// Get employee by ID
async function getEmployeeById(req, res) {
  const id = req.params.id;

  try {
    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({ status: "success", data: employee });
  } catch (error) {
    console.error("Error getting employee by ID:", error);
    res.status(500).json({ error: "Failed to get employee." });
  }
}



// Export all controllers
module.exports = {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee
};

