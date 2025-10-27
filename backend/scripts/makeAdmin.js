const { User } = require('../models');
require('dotenv').config();

/**
 * Script to make a user an admin
 * Usage: node scripts/makeAdmin.js <email>
 */

async function makeAdmin() {
  try {
    const email = process.argv[2];

    if (!email) {
      console.log('\n❌ Please provide an email address');
      console.log('Usage: node scripts/makeAdmin.js <email>\n');
      console.log('Example: node scripts/makeAdmin.js admin@nmims.edu\n');
      process.exit(1);
    }

    console.log(`\n🔍 Looking for user with email: ${email}...\n`);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`❌ User not found with email: ${email}\n`);
      console.log('Please make sure the email is correct and the user is registered.\n');
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`✅ User ${email} is already an admin!\n`);
      process.exit(0);
    }

    // Update user role to admin
    await user.update({ role: 'admin' });

    console.log('✅ Success! User role updated to admin\n');
    console.log('User Details:');
    console.log(`  Email: ${user.email}`);
    console.log(`  Name: ${user.name}`);
    console.log(`  SAP ID: ${user.sapId}`);
    console.log(`  Role: ${user.role}`);
    console.log('\n🔐 This user can now access the admin panel at /admin\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();

