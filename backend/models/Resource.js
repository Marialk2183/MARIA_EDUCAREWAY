const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'subjects',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('notes', 'video', 'reference_book'),
    allowNull: false
  },
  resourceType: {
    type: DataTypes.ENUM('pdf', 'ppt', 'pptx', 'doc', 'docx', 'video_url', 'image'),
    allowNull: false
  },
  fileData: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
    comment: 'Stores the actual file content for PDFs, PPTs, DOCX (LONGBLOB in MySQL)'
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fileSize: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'File size in bytes'
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'For YouTube videos or external resources'
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Cover image for reference books'
  },
  unitNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Unit number for lecture notes'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'resources',
  timestamps: true
});

module.exports = Resource;

