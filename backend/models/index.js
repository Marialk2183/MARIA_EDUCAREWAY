const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course');
const Semester = require('./Semester');
const Subject = require('./Subject');
const Resource = require('./Resource');

// Define associations
Course.hasMany(Semester, { foreignKey: 'courseId', as: 'semesters' });
Semester.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

Semester.hasMany(Subject, { foreignKey: 'semesterId', as: 'subjects' });
Subject.belongsTo(Semester, { foreignKey: 'semesterId', as: 'semester' });

Subject.hasMany(Resource, { foreignKey: 'subjectId', as: 'resources' });
Resource.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('❌ Database sync error:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Course,
  Semester,
  Subject,
  Resource,
  syncDatabase
};

