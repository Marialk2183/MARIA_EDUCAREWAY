const { Subject } = require('../models');
require('dotenv').config();

/**
 * Fix Image Paths Script
 * Updates subject image URLs to match actual files in assets folder
 */

async function fixImagePaths() {
  try {
    console.log('🔧 Fixing subject image paths...\n');

    const updates = [
      { code: 'ML', imageUrl: '/assets/ml.png', name: 'Machine Learning' },
      { code: 'WT', imageUrl: '/assets/wt.jpg', name: 'Web Technologies' },
      { code: 'OS', imageUrl: '/assets/os.jpg', name: 'Operating Systems' },
      { code: 'CN', imageUrl: '/assets/cn.jpg', name: 'Computer Networks' },
      { code: 'DSA', imageUrl: '/assets/dsa.jpg', name: 'Data Structures' },
      { code: 'DBMS', imageUrl: '/assets/dbms.jpg', name: 'Database Management' },
    ];

    for (const update of updates) {
      const [affectedRows] = await Subject.update(
        { imageUrl: update.imageUrl },
        { where: { code: update.code } }
      );
      
      if (affectedRows > 0) {
        console.log(`✅ Updated ${update.code.padEnd(6)} → ${update.imageUrl}`);
      } else {
        console.log(`⚠️  ${update.code} not found in database`);
      }
    }

    console.log('\n✨ Image paths updated successfully!\n');
    
    // Verify the changes
    const subjects = await Subject.findAll({
      where: { code: updates.map(u => u.code) },
      attributes: ['code', 'name', 'imageUrl']
    });
    
    console.log('📸 Current Image Paths:');
    subjects.forEach(s => {
      console.log(`   ${s.code}: ${s.imageUrl}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing image paths:', error);
    process.exit(1);
  }
}

fixImagePaths();

