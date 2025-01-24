const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebase-config');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('categories').get();
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Add a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = req.body;
    const docRef = await db.collection('categories').add(newCategory);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add category' });
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCategory = req.body;
    await db.collection('categories').doc(id).update(updatedCategory);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('categories').doc(id).delete();
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;