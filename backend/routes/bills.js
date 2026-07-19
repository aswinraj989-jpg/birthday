const express = require('express');
const router = express.Router();
const { bills, orders, tables, items } = require('../models/data');

// Get all bills
router.get('/', (req, res) => {
  res.json(bills);
});

// Get bill by id
router.get('/:id', (req, res) => {
  const bill = bills.find(b => b.id === parseInt(req.params.id));
  if (!bill) return res.status(404).json({ message: 'Bill not found' });
  res.json(bill);
});

// Create bill from order
router.post('/', (req, res) => {
  const { orderId, taxRate = 5 } = req.body;
  
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  
  const taxAmount = (order.totalAmount * taxRate) / 100;
  const totalWithTax = order.totalAmount + taxAmount;
  
  const newBill = {
    id: bills.length > 0 ? Math.max(...bills.map(b => b.id)) + 1 : 1,
    orderId,
    tableId: order.tableId,
    subtotal: order.totalAmount,
    taxRate,
    taxAmount: Math.round(taxAmount * 100) / 100,
    total: Math.round(totalWithTax * 100) / 100,
    items: order.items,
    status: 'unpaid',
    createdAt: new Date(),
  };
  
  bills.push(newBill);
  
  // Update order status
  order.status = 'completed';
  
  res.status(201).json(newBill);
});

// Update bill (mark as paid)
router.put('/:id', (req, res) => {
  const bill = bills.find(b => b.id === parseInt(req.params.id));
  if (!bill) return res.status(404).json({ message: 'Bill not found' });
  
  Object.assign(bill, req.body);
  
  // If bill is paid, mark table as available
  if (req.body.status === 'paid') {
    const table = tables.find(t => t.id === bill.tableId);
    if (table) {
      table.status = 'available';
    }
  }
  
  res.json(bill);
});

// Delete bill
router.delete('/:id', (req, res) => {
  const index = bills.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Bill not found' });
  
  const deleted = bills.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
