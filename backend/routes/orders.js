const express = require('express');
const router = express.Router();
const { orders, items, tables } = require('../models/data');

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get order by id
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// Create new order
router.post('/', (req, res) => {
  const { tableId, items: orderItems } = req.body;
  
  const table = tables.find(t => t.id === tableId);
  if (!table) return res.status(404).json({ message: 'Table not found' });
  
  // Calculate total
  let totalAmount = 0;
  orderItems.forEach(orderItem => {
    const item = items.find(i => i.id === orderItem.itemId);
    if (item) {
      totalAmount += item.price * orderItem.quantity;
    }
  });
  
  const newOrder = {
    id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
    tableId,
    items: orderItems,
    totalAmount,
    status: 'pending',
    createdAt: new Date(),
  };
  
  orders.push(newOrder);
  
  res.status(201).json(newOrder);
});

// Update order
router.put('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  
  Object.assign(order, req.body);
  res.json(order);
});

// Delete order
router.delete('/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Order not found' });
  
  const deleted = orders.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
