const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebase-config');

// Get all tabs
router.get('/', async (req, res) => {
  try {
    const tabs = [];
    const snapshot = await db.collection('tabs').get();
    snapshot.forEach(doc => tabs.push({ id: doc.id, ...doc.data() }));
    res.json(tabs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a tab by ID
router.get('/:id', async (req, res) => {
  try {
    const tab = await db.collection('tabs').doc(req.params.id).get();
    if (!tab.exists) {
      res.status(404).json({ error: 'Tab not found' });
    } else {
      res.json({ id: tab.id, ...tab.data() });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a tab
router.post('/', async (req, res) => {
  try {
    const newTab = await db.collection('tabs').add(req.body);
    res.json({ id: newTab.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a tab
router.put('/:id', async (req, res) => {
  try {
    await db.collection('tabs').doc(req.params.id).update(req.body);
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a tab
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('tabs').doc(req.params.id).delete();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;