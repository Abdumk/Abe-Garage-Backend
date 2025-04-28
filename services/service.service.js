const conn = require("../config/dbConfig");

async function getAllServices() {
  const query = "SELECT * FROM common_services ORDER BY service_name ASC";
  const rows = await conn.query(query);
  return rows;
}

async function getServiceById(serviceId) {
  const query = "SELECT * FROM common_services WHERE service_id = ?";
  const rows = await conn.query(query, [serviceId]);
  return rows[0] || null;
}

async function createService(serviceData) {
  const query = `
    INSERT INTO common_services (service_name, service_description)
    VALUES (?, ?)
  `;
  const result = await conn.query(query, [
    serviceData.service_name,
    serviceData.service_description
  ]);
  return result.affectedRows === 1 ? { service_id: result.insertId, ...serviceData } : null;
}

async function updateService(serviceData) {
  const query = `
    UPDATE common_services 
    SET service_name = ?, service_description = ?
    WHERE service_id = ?
  `;
  const result = await conn.query(query, [
    serviceData.service_name,
    serviceData.service_description,
    serviceData.service_id
  ]);
  return result.affectedRows === 1 ? serviceData : null;
}

async function deleteService(serviceId) {
  const query = "DELETE FROM common_services WHERE service_id = ?";
  const result = await conn.query(query, [serviceId]);
  return result.affectedRows === 1;
}

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};