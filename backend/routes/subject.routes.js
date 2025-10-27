const express = require('express');
const router = express.Router();
const { Subject, Semester, Course, Resource } = require('../models');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get subjects by semester
router.get('/semester/:semesterId', async (req, res) => {
  try {
    const { semesterId } = req.params;

    const subjects = await Subject.findAll({
      where: { semesterId, isActive: true },
      include: [{
        model: Semester,
        as: 'semester',
        include: [{
          model: Course,
          as: 'course'
        }]
      }]
    });

    res.json({ subjects });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ error: 'Failed to fetch subjects', details: error.message });
  }
});

// Get subject by ID with resources
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: Resource,
          as: 'resources',
          where: { isActive: true },
          required: false,
          attributes: { exclude: ['fileData'] } // Exclude binary data in listing
        },
        {
          model: Semester,
          as: 'semester',
          include: [{
            model: Course,
            as: 'course'
          }]
        }
      ]
    });

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    res.json({ subject });
  } catch (error) {
    console.error('Get subject error:', error);
    res.status(500).json({ error: 'Failed to fetch subject', details: error.message });
  }
});

// Create subject (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { semesterId, name, code, description, imageUrl } = req.body;

    const subject = await Subject.create({
      semesterId,
      name,
      code,
      description,
      imageUrl
    });

    res.status(201).json({ message: 'Subject created successfully', subject });
  } catch (error) {
    console.error('Create subject error:', error);
    res.status(500).json({ error: 'Failed to create subject', details: error.message });
  }
});

module.exports = router;

