const express = require('express');
const router = express.Router();
const { items } = require('../models/data');

// Get all items
router.get('/', (req, res) => {
  res.json(items);
});

// Get item by id
router.get('/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Add new item
router.post('/', (req, res) => {
  const { name, category, price } = req.body;
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    category,
    price,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update item
router.put('/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  
  Object.assign(item, req.body);
  res.json(item);
});

// Delete item
router.delete('/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  
  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
