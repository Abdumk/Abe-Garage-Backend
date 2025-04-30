const conn = require("../config/dbConfig");

// Get all orders with their services
async function getAllOrders() {
  try {
    // First get all orders
    const ordersQuery = `
      SELECT 
        o.order_id,
        o.employee_id,
        e.employee_first_name,
        e.employee_last_name,
        o.customer_id,
        c.customer_first_name,
        c.customer_last_name,
        o.vehicle_id,
        v.vehicle_make,
        v.vehicle_model,
        v.vehicle_year,
        o.order_description,
        o.order_date,
        o.estimated_completion_date,
        o.completion_date,
        o.order_completed
      FROM orders o
      LEFT JOIN employee_info e ON o.employee_id = e.employee_id
      LEFT JOIN customer_info c ON o.customer_id = c.customer_id
      LEFT JOIN vehicle v ON o.vehicle_id = v.vehicle_id
      ORDER BY o.order_date DESC
    `;
    
    const orders = await conn.query(ordersQuery);

    // For each order, get its services
    for (let order of orders) {
      const servicesQuery = `
        SELECT s.service_id, s.service_name 
        FROM order_services os
        JOIN service s ON os.service_id = s.service_id
        WHERE os.order_id = ?
      `;
      order.order_services = await conn.query(servicesQuery, [order.order_id]);
    }

    return orders;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Get single order by ID with services
async function getOrderById(orderId) {
  try {
    // Get the order
    const orderQuery = `
      SELECT 
        o.order_id,
        o.employee_id,
        e.employee_first_name,
        e.employee_last_name,
        o.customer_id,
        c.customer_first_name,
        c.customer_last_name,
        o.vehicle_id,
        v.vehicle_make,
        v.vehicle_model,
        v.vehicle_year,
        o.order_description,
        o.order_date,
        o.estimated_completion_date,
        o.completion_date,
        o.order_completed
      FROM orders o
      LEFT JOIN employee_info e ON o.employee_id = e.employee_id
      LEFT JOIN customer_info c ON o.customer_id = c.customer_id
      LEFT JOIN vehicle v ON o.vehicle_id = v.vehicle_id
      WHERE o.order_id = ?
    `;
    
    const order = await conn.query(orderQuery, [orderId]);
    
    if (order.length === 0) {
      return null;
    }

    // Get services for this order
    const servicesQuery = `
      SELECT s.service_id, s.service_name 
      FROM order_services os
      JOIN service s ON os.service_id = s.service_id
      WHERE os.order_id = ?
    `;
    order[0].order_services = await conn.query(servicesQuery, [orderId]);

    return order[0];
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Create new order with services
async function createOrder(orderData) {
  let createdOrder = {};
  try {
    // Start transaction
    await conn.query("START TRANSACTION");

    // Insert into orders table
    const orderQuery = `
      INSERT INTO orders (
        employee_id, 
        customer_id, 
        vehicle_id, 
        order_description, 
        order_date, 
        estimated_completion_date, 
        completion_date, 
        order_completed
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const orderResult = await conn.query(orderQuery, [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.order_description,
      orderData.order_date || new Date(),
      orderData.estimated_completion_date,
      orderData.completion_date,
      orderData.order_completed || 0
    ]);

    const orderId = orderResult.insertId;

    // Insert services into order_services table
    if (orderData.order_services && orderData.order_services.length > 0) {
      for (const service of orderData.order_services) {
        await conn.query(
          "INSERT INTO order_services (order_id, service_id) VALUES (?, ?)",
          [orderId, service.service_id]
        );
      }
    }

    // Commit transaction
    await conn.query("COMMIT");

    // Get the full order with services to return
    createdOrder = await getOrderById(orderId);
  } catch (err) {
    // Rollback transaction if error occurs
    await conn.query("ROLLBACK");
    console.log(err);
    return false;
  }

  return createdOrder;
}

// Update order by ID
async function updateOrder(orderId, orderData) {
  try {
    // Start transaction
    await conn.query("START TRANSACTION");

    // Update orders table
    const orderQuery = `
      UPDATE orders SET
        employee_id = ?,
        customer_id = ?,
        vehicle_id = ?,
        order_description = ?,
        estimated_completion_date = ?,
        completion_date = ?,
        order_completed = ?
      WHERE order_id = ?
    `;
    
    await conn.query(orderQuery, [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.order_description,
      orderData.estimated_completion_date,
      orderData.completion_date,
      orderData.order_completed,
      orderId
    ]);

    // Update services - first delete existing ones
    await conn.query("DELETE FROM order_services WHERE order_id = ?", [orderId]);

    // Then add the new ones
    if (orderData.order_services && orderData.order_services.length > 0) {
      for (const service of orderData.order_services) {
        await conn.query(
          "INSERT INTO order_services (order_id, service_id) VALUES (?, ?)",
          [orderId, service.service_id]
        );
      }
    }

    // Commit transaction
    await conn.query("COMMIT");

    return true;
  } catch (err) {
    // Rollback transaction if error occurs
    await conn.query("ROLLBACK");
    console.log(err);
    return false;
  }
}

// Delete order by ID
async function deleteOrder(orderId) {
  try {
    // Start transaction
    await conn.query("START TRANSACTION");

    // First delete from order_services (foreign key constraint)
    await conn.query("DELETE FROM order_services WHERE order_id = ?", [orderId]);

    // Then delete from orders
    const result = await conn.query("DELETE FROM orders WHERE order_id = ?", [orderId]);

    // Commit transaction
    await conn.query("COMMIT");

    return result.affectedRows > 0;
  } catch (err) {
    // Rollback transaction if error occurs
    await conn.query("ROLLBACK");
    console.log(err);
    return false;
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};