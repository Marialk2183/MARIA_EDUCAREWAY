const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firebaseUid: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  sapid: {
    type: DataTypes.STRING(11),
    unique: true,
    allowNull: true,
    validate: {
      len: [11, 11]
    }
  },
  role: {
    type: DataTypes.ENUM('student', 'admin'),
    defaultValue: 'student'
  },
  fcmToken: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Firebase Cloud Messaging token for notifications'
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;

