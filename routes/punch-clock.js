const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebase-config');

// Get all punch clocks
router.get('/', async (req, res) => {
  try {
    const shifts = [];
    const snapshot = await db.collection('shifts').get();
    snapshot.forEach(doc => shifts.push({ id: doc.id, ...doc.data() }));
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new punch clock
router.post('/', async (req, res) => {
  try {
    const newShift = await db.collection('shifts').add(req.body);
    res.json({ id: newShift.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a punch clock
router.put('/:id', async (req, res) => {
  try {
    await db.collection('shifts').doc(req.params.id).update(req.body);
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a punch clock
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('shifts').doc(req.params.id).delete();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;