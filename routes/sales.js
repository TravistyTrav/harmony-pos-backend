const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebase-config');

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = [];
    const snapshot = await db.collection('sales').get();
    snapshot.forEach(doc => sales.push({ id: doc.id, ...doc.data() }));
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a sale by ID
router.get('/:id', async (req, res) => {
  try {
    const sale = await db.collection('sales').doc(req.params.id).get();
    if (!sale.exists) {
      res.status(404).json({ error: 'Sale not found' });
    } else {
      res.json({ id: sale.id, ...sale.data() });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a sale
router.post('/', async (req, res) => {
  try {
    const newSale = await db.collection('sales').add(req.body);
    res.json({ id: newSale.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a sale
router.put('/:id', async (req, res) => {
  try {
    await db.collection('sales').doc(req.params.id).update(req.body);
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a sale
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('sales').doc(req.params.id).delete();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;