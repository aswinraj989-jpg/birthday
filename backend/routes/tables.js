const express = require('express');
const router = express.Router();
const { tables } = require('../models/data');

// Get all tables
router.get('/', (req, res) => {
  res.json(tables);
});

// Get table by id
router.get('/:id', (req, res) => {
  const table = tables.find(t => t.id === parseInt(req.params.id));
  if (!table) return res.status(404).json({ message: 'Table not found' });
  res.json(table);
});

// Create new table
router.post('/', (req, res) => {
  const { tableName, occupancy } = req.body;
  const newTable = {
    id: tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1,
    tableName,
    occupancy,
    status: 'available',
  };
  tables.push(newTable);
  res.status(201).json(newTable);
});

// Update table status
router.put('/:id', (req, res) => {
  const table = tables.find(t => t.id === parseInt(req.params.id));
  if (!table) return res.status(404).json({ message: 'Table not found' });
  
  Object.assign(table, req.body);
  res.json(table);
});

// Delete table
router.delete('/:id', (req, res) => {
  const index = tables.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Table not found' });
  
  const deleted = tables.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
