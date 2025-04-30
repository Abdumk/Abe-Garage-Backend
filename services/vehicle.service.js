// const conn = require("../config/dbConfig");

// async function createVehicle(vehicleData) {
//   try {
//     const query = `
//       INSERT INTO customer_vehicle_info 
//       (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const result = await conn.query(query, [
//       vehicleData.customer_id,
//       vehicleData.vehicle_year,
//       vehicleData.vehicle_make,
//       vehicleData.vehicle_model,
//       vehicleData.vehicle_type,
//       vehicleData.vehicle_mileage,
//       vehicleData.vehicle_tag,
//       vehicleData.vehicle_serial,
//       vehicleData.vehicle_color
//     ]);
    
//     return result.affectedRows === 1;
//   } catch (error) {
//     console.error("Error creating vehicle:", error);
//     return false;
//   }
// }

// async function getVehiclesByCustomer(customerId) {
//   try {
//     const query = `
//       SELECT * FROM customer_vehicle_info 
//       WHERE customer_id = ?
//       ORDER BY vehicle_year DESC
//     `;
//     const rows = await conn.query(query, [customerId]);
//     return rows;
//   } catch (error) {
//     console.error("Error fetching vehicles:", error);
//     return [];
//   }
// }

// module.exports = {
//   createVehicle,
//   getVehiclesByCustomer
// };

const conn = require("../config/dbConfig");

async function createVehicle(vehicleData, token) {
  try {
    const query = `
      INSERT INTO customer_vehicle_info 
      (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, 
       vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await conn.query(query, [
      vehicleData.customer_id,
      vehicleData.vehicle_year,
      vehicleData.vehicle_make,
      vehicleData.vehicle_model,
      vehicleData.vehicle_type || null,
      vehicleData.vehicle_mileage || null,
      vehicleData.vehicle_tag,
      vehicleData.vehicle_serial || null,
      vehicleData.vehicle_color || null
    ]);
    
    if (result.affectedRows !== 1) {
      return null;
    }
    
    // Return the newly created vehicle
    const [vehicle] = await conn.query(
      "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?",
      [result.insertId]
    );
    
    return vehicle[0];
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
}

async function getVehiclesByCustomer(customerId, token) {
  try {
    const query = `
      SELECT 
        vehicle_id,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color
      FROM customer_vehicle_info 
      WHERE customer_id = ?
      ORDER BY vehicle_year DESC
    `;
    const rows = await conn.query(query, [customerId]);
    return rows;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
}

async function getVehicleById(vehicleId, token) {
  try {
    const query = `
      SELECT * FROM customer_vehicle_info 
      WHERE vehicle_id = ?
    `;
    const [vehicle] = await conn.query(query, [vehicleId]);
    return vehicle[0] || null;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
}

module.exports = {
  createVehicle,
  getVehiclesByCustomer,
  getVehicleById
};