const { messaging } = require('../config/firebase');
const { User } = require('../models');

class NotificationService {
  /**
   * Send notification to a single user
   */
  async sendToUser(userId, title, body, data = {}) {
    try {
      const user = await User.findByPk(userId);
      
      if (!user || !user.fcmToken) {
        console.log('User FCM token not found');
        return null;
      }

      const message = {
        notification: {
          title,
          body,
        },
        data,
        token: user.fcmToken,
      };

      const response = await messaging.send(message);
      console.log('Successfully sent notification:', response);
      return response;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  /**
   * Send notification to multiple users
   */
  async sendToMultipleUsers(userIds, title, body, data = {}) {
    try {
      const users = await User.findAll({
        where: {
          id: userIds,
        },
      });

      const tokens = users
        .filter((user) => user.fcmToken)
        .map((user) => user.fcmToken);

      if (tokens.length === 0) {
        console.log('No valid FCM tokens found');
        return null;
      }

      const message = {
        notification: {
          title,
          body,
        },
        data,
        tokens,
      };

      const response = await messaging.sendMulticast(message);
      console.log('Successfully sent notifications:', response);
      return response;
    } catch (error) {
      console.error('Error sending notifications:', error);
      throw error;
    }
  }

  /**
   * Send notification to all users
   */
  async sendToAllUsers(title, body, data = {}) {
    try {
      const users = await User.findAll({
        where: {
          fcmToken: {
            [require('sequelize').Op.ne]: null,
          },
        },
      });

      const tokens = users.map((user) => user.fcmToken);

      if (tokens.length === 0) {
        console.log('No valid FCM tokens found');
        return null;
      }

      // Firebase has a limit of 500 tokens per batch
      const batchSize = 500;
      const batches = [];

      for (let i = 0; i < tokens.length; i += batchSize) {
        const batchTokens = tokens.slice(i, i + batchSize);
        batches.push(batchTokens);
      }

      const responses = [];
      for (const batchTokens of batches) {
        const message = {
          notification: {
            title,
            body,
          },
          data,
          tokens: batchTokens,
        };

        const response = await messaging.sendMulticast(message);
        responses.push(response);
      }

      console.log('Successfully sent notifications to all users');
      return responses;
    } catch (error) {
      console.error('Error sending notifications to all users:', error);
      throw error;
    }
  }

  /**
   * Send notification when new resource is uploaded
   */
  async notifyNewResource(subjectId, resourceType, resourceTitle) {
    try {
      const title = 'New Resource Available!';
      const body = `New ${resourceType} uploaded: ${resourceTitle}`;
      const data = {
        type: 'new_resource',
        subjectId: subjectId.toString(),
        resourceType,
      };

      // Send to all users (in production, you'd send only to students enrolled in the subject)
      return await this.sendToAllUsers(title, body, data);
    } catch (error) {
      console.error('Error sending new resource notification:', error);
      throw error;
    }
  }

  /**
   * Send welcome notification to new user
   */
  async sendWelcomeNotification(userId) {
    try {
      const title = 'Welcome to EduCareWay! 🎓';
      const body = 'Start exploring your courses and learning materials.';
      const data = {
        type: 'welcome',
      };

      return await this.sendToUser(userId, title, body, data);
    } catch (error) {
      console.error('Error sending welcome notification:', error);
      // Don't throw error for welcome notifications
      return null;
    }
  }
}

module.exports = new NotificationService();

