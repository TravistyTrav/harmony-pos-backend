const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebase-config');

// Get all items
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('inventory').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  try {
    const newItem = req.body;
    const docRef = await db.collection('inventory').add(newItem);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Update an item
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = req.body;
    await db.collection('inventory').doc(id).update(updatedItem);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('inventory').doc(id).delete();
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
