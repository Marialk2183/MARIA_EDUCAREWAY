const express = require('express');
const router = express.Router();
const { Course, Semester, Subject } = require('../models');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isActive: true },
      include: [{
        model: Semester,
        as: 'semesters',
        where: { isActive: true },
        required: false
      }]
    });

    res.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses', details: error.message });
  }
});

// Get course by code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const course = await Course.findOne({
      where: { code, isActive: true },
      include: [{
        model: Semester,
        as: 'semesters',
        where: { isActive: true },
        required: false,
        include: [{
          model: Subject,
          as: 'subjects',
          where: { isActive: true },
          required: false
        }]
      }]
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to fetch course', details: error.message });
  }
});

// Create course (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, code, description, imageUrl, totalSemesters } = req.body;

    const course = await Course.create({
      name,
      code,
      description,
      imageUrl,
      totalSemesters
    });

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Failed to create course', details: error.message });
  }
});

module.exports = router;

