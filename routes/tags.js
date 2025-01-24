const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebase-config');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('tags').get();
    const tags = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Add a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = req.body;
    const docRef = await db.collection('tags').add(newTag);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add tag' });
  }
});

// Update a tag
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTag = req.body;
    await db.collection('tags').doc(id).update(updatedTag);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

// Delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('tags').doc(id).delete();
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;