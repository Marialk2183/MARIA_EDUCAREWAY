const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Resource, Subject } = require('../models');
const { verifyToken, isAdmin } = require('../middleware/auth');
const notificationService = require('../services/notificationService');

// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, PPT, PPTX, DOC, DOCX, and images are allowed.'));
    }
  }
});

// Get resources by subject and type
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { type } = req.query;

    const where = { subjectId, isActive: true };
    if (type) {
      where.type = type;
    }

    const resources = await Resource.findAll({
      where,
      attributes: { exclude: ['fileData'] }, // Exclude binary data in listing
      order: [['unitNumber', 'ASC'], ['createdAt', 'DESC']]
    });

    res.json({ resources });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ error: 'Failed to fetch resources', details: error.message });
  }
});

// Download resource file
router.get('/download/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findOne({
      where: { id, isActive: true }
    });

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    if (!resource.fileData) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.setHeader('Content-Type', resource.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${resource.fileName}"`);
    res.send(resource.fileData);
  } catch (error) {
    console.error('Download resource error:', error);
    res.status(500).json({ error: 'Failed to download resource', details: error.message });
  }
});

// Upload resource (Admin only)
router.post('/upload', verifyToken, isAdmin, upload.single('file'), async (req, res) => {
  try {
    const { subjectId, title, type, resourceType, url, imageUrl, unitNumber, description } = req.body;

    const resourceData = {
      subjectId,
      title,
      type,
      resourceType,
      url,
      imageUrl,
      unitNumber: unitNumber ? parseInt(unitNumber) : null,
      description
    };

    // If file is uploaded, store it in database
    if (req.file) {
      resourceData.fileData = req.file.buffer;
      resourceData.fileName = req.file.originalname;
      resourceData.fileSize = req.file.size;
      resourceData.mimeType = req.file.mimetype;
    }

    const resource = await Resource.create(resourceData);

    // Send notification to users
    try {
      await notificationService.notifyNewResource(
        subjectId,
        type,
        title
      );
    } catch (notifError) {
      console.error('Failed to send notification:', notifError);
      // Don't fail the upload if notification fails
    }

    // Return resource without binary data
    const { fileData, ...resourceWithoutFile } = resource.toJSON();

    res.status(201).json({ 
      message: 'Resource uploaded successfully', 
      resource: resourceWithoutFile 
    });
  } catch (error) {
    console.error('Upload resource error:', error);
    res.status(500).json({ error: 'Failed to upload resource', details: error.message });
  }
});

// Create video resource (Admin only)
router.post('/video', verifyToken, isAdmin, async (req, res) => {
  try {
    const { subjectId, title, url, description } = req.body;

    const resource = await Resource.create({
      subjectId,
      title,
      type: 'video',
      resourceType: 'video_url',
      url,
      description
    });

    res.status(201).json({ message: 'Video resource created successfully', resource });
  } catch (error) {
    console.error('Create video resource error:', error);
    res.status(500).json({ error: 'Failed to create video resource', details: error.message });
  }
});

// Delete resource (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findByPk(id);
    
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    await resource.update({ isActive: false });

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ error: 'Failed to delete resource', details: error.message });
  }
});

module.exports = router;

