const express = require('express');
const router = express.Router();
const FireWarden = require('../models/FireWarden');

// GET all wardens
router.get('/', async (req, res) => {
  try {
    const wardens = await FireWarden.find();
    res.json(wardens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new warden entry
router.post('/', async (req, res) => {
  const { staffNumber, firstName, surname, location } = req.body;
  const newWarden = new FireWarden({ staffNumber, firstName, surname, location });

  try {
    const saved = await newWarden.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update warden location
router.put('/:id', async (req, res) => {
  try {
    const updated = await FireWarden.findByIdAndUpdate(
      req.params.id,
      { ...req.body, dateTime: Date.now() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a warden entry
router.delete('/:id', async (req, res) => {
  try {
    await FireWarden.findByIdAndDelete(req.params.id);
    res.json({ message: 'Warden removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
