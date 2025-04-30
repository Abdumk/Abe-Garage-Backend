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

const orderService = require('../services/order.service');

// Get all orders
async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();
    
    if (!orders) {
      return res.status(400).json({ error: "Failed to get all orders!" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

// Get single order by ID
async function getOrderById(req, res) {
  const id = req.params.id;

  try {
    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).json({ error: "Failed to get order." });
  }
}

// Create new order
async function createOrder(req, res) {
  try {
    const orderData = req.body;
    const order = await orderService.createOrder(orderData);

    if (!order) {
      return res.status(400).json({
        error: "Failed to create the order!"
      });
    }

    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong!" });
  }
}

// Update order by ID
async function updateOrder(req, res) {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const updated = await orderService.updateOrder(id, updatedData);

    if (!updated) {
      return res.status(404).json({ error: "Order not found or update failed." });
    }

    res.status(200).json({ message: "Order updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update order." });
  }
}

// Delete order by ID
async function deleteOrder(req, res) {
  const id = req.params.id;

  try {
    const deleted = await orderService.deleteOrder(id);

    if (!deleted) {
      return res.status(404).json({ error: "Order not found or not deleted." });
    }

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete order." });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};