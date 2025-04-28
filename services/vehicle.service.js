const conn = require("../config/dbConfig");

async function createVehicle(vehicleData) {
  try {
    const query = `
      INSERT INTO customer_vehicle_info 
      (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await conn.query(query, [
      vehicleData.customer_id,
      vehicleData.vehicle_year,
      vehicleData.vehicle_make,
      vehicleData.vehicle_model,
      vehicleData.vehicle_type,
      vehicleData.vehicle_mileage,
      vehicleData.vehicle_tag,
      vehicleData.vehicle_serial,
      vehicleData.vehicle_color
    ]);
    
    return result.affectedRows === 1;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return false;
  }
}

async function getVehiclesByCustomer(customerId) {
  try {
    const query = `
      SELECT * FROM customer_vehicle_info 
      WHERE customer_id = ?
      ORDER BY vehicle_year DESC
    `;
    const rows = await conn.query(query, [customerId]);
    return rows;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
}

module.exports = {
  createVehicle,
  getVehiclesByCustomer
};