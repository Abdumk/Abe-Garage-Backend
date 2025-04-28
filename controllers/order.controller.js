// const orderService = require('../services/order.service');

// async function createOrder(req, res) {
//   try {
//     const orderData = req.body;
//     const order = await orderService.createOrder(orderData);
    
//     if (!order) {
//       return res.status(400).json({ error: "Failed to create order" });
//     }
    
//     res.status(201).json(order);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// async function getAllOrders(req, res) {
//   try {
//     const orders = await orderService.getAllOrders();
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// async function getOrderById(req, res) {
//   try {
//     const order = await orderService.getOrderById(req.params.id);
    
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
    
//     res.status(200).json(order);
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// async function updateOrder(req, res) {
//   try {
//     const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
    
//     if (!updatedOrder) {
//       return res.status(400).json({ error: "Failed to update order" });
//     }
    
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Error updating order:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// module.exports = {
//   createOrder,
//   getAllOrders,
//   getOrderById,
//   updateOrder
// };

// In your order controller
async function createOrder(req, res, next) {
  try {
    const { customerId, vehicleId, services, notes, estimatedCompletion } = req.body;
    
    await db.beginTransaction();

    // 1. Create the order
    const [orderResult] = await db.query(
      `INSERT INTO orders 
       (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash)
       VALUES (?, ?, ?, NOW(), 1, UUID())`,
      [req.employee.employee_id, customerId, vehicleId]
    );
    const orderId = orderResult.insertId;

    // 2. Create order info
    await db.query(
      `INSERT INTO order_info 
       (order_id, order_description, estimated_completion_date)
       VALUES (?, ?, ?)`,
      [orderId, notes, estimatedCompletion]
    );

    // 3. Add services
    for (const service of services) {
      if (service.is_custom) {
        // First create the custom service
        const [serviceResult] = await db.query(
          `INSERT INTO common_services 
           (service_name, service_description)
           VALUES (?, 'Custom service added during order creation')`,
          [service.service_name]
        );
        
        // Then add to order_services
        await db.query(
          `INSERT INTO order_services 
           (order_id, service_id, service_completed)
           VALUES (?, ?, 0)`,
          [orderId, serviceResult.insertId]
        );
      } else {
        // Add predefined service
        await db.query(
          `INSERT INTO order_services 
           (order_id, service_id, service_completed)
           VALUES (?, ?, 0)`,
          [orderId, service.service_id]
        );
      }
    }

    // 4. Set initial status
    await db.query(
      `INSERT INTO order_status 
       (order_id, order_status)
       VALUES (?, 0)`,
      [orderId]
    );

    await db.commit();
    res.status(201).json({ success: true, orderId });
  } catch (err) {
    await db.rollback();
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}