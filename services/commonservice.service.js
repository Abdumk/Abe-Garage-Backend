const conn = require("../config/dbConfig");
const bcrypt = require("bcrypt");

// Check if a customer exists by email


// Create a new customer
async function createService(service) {
  try {
    const query1 = `
      INSERT INTO common_services (service_name, service_description)
      VALUES (?, ?)
    `;
    const result1 = await conn.query(query1, [
      service.service_name,
      service.service_description,
    ]);

    if (result1.affectedRows !== 1) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}


// Get all customers
async function getAllServices() {
  const query = `
    SELECT *
    FROM common_services
    LIMIT 10
  `;
  const rows = await conn.query(query);
  return rows;
}

// Delete customer by ID
async function deleteService(id) {
  try {
    await conn.query("DELETE FROM common_services WHERE service_id = ?", [
      id,
    ]);
    const result = await conn.query(
      "DELETE FROM common_services WHERE service_id = ?",
      [id]
    );

    return result.affectedRows > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Update customer by ID
async function updateService(id, service) {
  

  try {
    await conn.query(
      "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?",
      [service.service_name, service.service_description, id]
    );


    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Get customer by ID
async function getServiceById(id) {
  const query = `
    SELECT * FROM common_services where service_id = ?
  `;
  const rows = await conn.query(query, [id]);
  return rows;
}

// Export all
module.exports = {
  createService,
  getAllServices,
  deleteService,
  updateService,
  getServiceById,
};
