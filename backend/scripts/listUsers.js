const { User } = require('../models');
require('dotenv').config();

/**
 * Script to list all registered users
 */

async function listUsers() {
  try {
    console.log('\n📋 Fetching all registered users...\n');

    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'sapid', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    if (users.length === 0) {
      console.log('❌ No users found in the database.\n');
      console.log('Please register at least one user first.\n');
      process.exit(0);
    }

    console.log(`✅ Found ${users.length} user(s):\n`);
    console.log('═'.repeat(80));

    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   SAP ID: ${user.sapid}`);
      console.log(`   Role: ${user.role === 'admin' ? '🔐 ADMIN' : '👤 STUDENT'}`);
      console.log(`   Registered: ${new Date(user.createdAt).toLocaleString()}`);
    });

    console.log('\n' + '═'.repeat(80));
    console.log('\n💡 To make a user admin, run:');
    console.log('   node scripts/makeAdmin.js <email>\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

listUsers();

