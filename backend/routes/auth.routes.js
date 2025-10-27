const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { verifyToken } = require('../middleware/auth');
const notificationService = require('../services/notificationService');

// Register/Login user
router.post('/register', async (req, res) => {
  try {
    const { firebaseUid, name, email, sapid } = req.body;

    // Check if user already exists
    let user = await User.findOne({ where: { firebaseUid } });

    if (user) {
      return res.json({ message: 'User already exists', user });
    }

    // Create new user
    user = await User.create({
      firebaseUid,
      name,
      email,
      sapid
    });

    // Send welcome notification (async, don't wait)
    setTimeout(async () => {
      try {
        await notificationService.sendWelcomeNotification(user.id);
      } catch (error) {
        console.error('Failed to send welcome notification:', error);
      }
    }, 2000);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user', details: error.message });
  }
});

// Update user FCM token for notifications
router.put('/fcm-token', verifyToken, async (req, res) => {
  try {
    const { fcmToken } = req.body;
    
    await req.user.update({ fcmToken });
    
    res.json({ message: 'FCM token updated successfully' });
  } catch (error) {
    console.error('Update FCM token error:', error);
    res.status(500).json({ error: 'Failed to update FCM token', details: error.message });
  }
});

module.exports = router;

