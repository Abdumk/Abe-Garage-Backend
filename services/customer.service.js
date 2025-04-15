const conn = require("../config/dbConfig");
const bcrypt = require("bcrypt");

// Check if a customer exists by email
async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
  const rows = await conn.query(query, [email]);
  return rows.length > 0;
}

// Create a new customer
async function createCustomer(customer) {
  try {
     const salt = await bcrypt.genSalt(10);
        // Hash the password 
        const hashedPassword = await bcrypt.hash("password", salt);
    const customerHash = Math.random().toString(36).substring(2, 15);

    const query1 = `
      INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash)
      VALUES (?, ?, ?)
    `;
    const result1 = await conn.query(query1, [
      customer.customer_email,
      customer.customer_phone_number,
      customerHash
    ]);

    if (result1.affectedRows !== 1) return false;

    const customer_id = result1.insertId;

    const query2 = `
      INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status)
      VALUES (?, ?, ?, ?)
    `;
    await conn.query(query2, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status
    ]);

   

   

    return { customer_id };
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Get customer by email
async function getCustomerByEmail(email) {
  const query = `
    SELECT *
    FROM customer_identifier
    JOIN customer_info USING (customer_id)
    JOIN customer_pass USING (customer_id)
    JOIN customer_role USING (customer_id)
    WHERE customer_email = ?
  `;
  const rows = await conn.query(query, [email]);
  return rows;
}

// Get all customers
async function getAllCustomers() {
  const query = `
    SELECT *
    FROM customer_identifier
    JOIN customer_info USING (customer_id)
    ORDER BY customer_id DESC
    LIMIT 10
  `;
  const rows = await conn.query(query);
  return rows;
}

// Delete customer by ID
async function deleteCustomer(customer_id) {
  try {
    await conn.query("DELETE FROM customer_info WHERE customer_id = ?", [customer_id]);
    const result = await conn.query("DELETE FROM customer_identifier WHERE customer_id = ?", [customer_id]);

    return result.affectedRows > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Update customer by ID
async function updateCustomer(customer_id, customer) {
    console.log("customer_id", customer_id);
    console.log("customer", customer);
    
  try {
    await conn.query(
      "UPDATE customer_identifier SET customer_email = ?, customer_phone_number = ? WHERE customer_id = ?",
      [customer.customer_email, customer.customer_phone, customer_id]
    );

    await conn.query(
      "UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?",
      [customer.customer_first_name, customer.customer_last_name, customer.active_customer, customer_id]
    );

    // await conn.query(
    //   "UPDATE customer_role SET company_role_id = ? WHERE customer_id = ?",
    //   [customer.company_role_id, customer_id]
    // );

    // if (customer.customer_password) {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(customer.customer_password, salt);
    //   await conn.query(
    //     "UPDATE customer_pass SET customer_password_hashed = ? WHERE customer_id = ?",
    //     [hashedPassword, customer_id]
    //   );
    

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Get customer by ID
async function getCustomerById(customer_id) {
  const query = `
    SELECT 
      ci.customer_id,
      ci.customer_email,
      ci.customer_phone_number,
      ci.customer_added_date,
      cinfo.customer_first_name,
      cinfo.customer_last_name,
      cinfo.active_customer_status 
    FROM customer_identifier ci
    JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
    WHERE ci.customer_id = ?
  `;
  const rows = await conn.query(query, [customer_id]);
  return rows;
}

// Export all
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getCustomerByEmail,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  getCustomerById
};
