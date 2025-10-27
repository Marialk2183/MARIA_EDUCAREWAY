const fs = require('fs');
const path = require('path');
const { Subject, Resource } = require('../models');
require('dotenv').config();

// Map folder names to subject codes
const subjectMapping = {
  'CN': 'CN',
  'DBMS': 'DBMS',
  'DSA': 'DSA',
  'JAVA': 'JAVA',
  'OS': 'OS',
  'WT': 'WT'
};

// Extract unit number from filename or folder
function extractUnitNumber(filePath) {
  // Check if path contains UNIT folder
  const unitMatch = filePath.match(/UNIT\s*(\d+)/i);
  if (unitMatch) {
    return parseInt(unitMatch[1]);
  }
  
  // Check if filename contains unit number
  const fileUnitMatch = path.basename(filePath).match(/unit\s*(\d+)/i);
  if (fileUnitMatch) {
    return parseInt(fileUnitMatch[1]);
  }
  
  // Check for M1, M2, etc. (Module numbers)
  const moduleMatch = filePath.match(/[Mm](\d+)/);
  if (moduleMatch) {
    return parseInt(moduleMatch[1]);
  }
  
  // Check for chapter numbers (Chap-1, Chap-2, etc.)
  const chapMatch = path.basename(filePath).match(/[Cc]hap-?(\d+)/i);
  if (chapMatch) {
    return parseInt(chapMatch[1]);
  }
  
  return null;
}

// Get resource type from file extension
function getResourceType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.pdf':
      return 'pdf';
    case '.ppt':
      return 'ppt';
    case '.pptx':
      return 'pptx';
    case '.doc':
      return 'doc';
    case '.docx':
      return 'docx';
    default:
      return null;
  }
}

// Generate a clean title from filename
function generateTitle(filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  
  // Remove common prefixes
  let title = nameWithoutExt
    .replace(/^_\$/, '') // Remove _$ prefix
    .replace(/^Chap-?\d+_?/i, '') // Remove Chap-0, Chap-1, etc.
    .replace(/^Unit\s*\d+\s*-?\s*/i, '') // Remove Unit 1 -, Unit 2, etc.
    .replace(/^M\d+\s*/i, '') // Remove M1, M2 prefix
    .replace(/_+/g, ' ') // Replace underscores with spaces
    .replace(/-+/g, ' ') // Replace hyphens with spaces
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
  
  // Capitalize first letter of each word
  title = title.replace(/\b\w/g, char => char.toUpperCase());
  
  return title || nameWithoutExt;
}

// Recursively get all files from a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      // Only include PDF, PPT, PPTX, DOC, DOCX files
      const ext = path.extname(file).toLowerCase();
      if (['.pdf', '.ppt', '.pptx', '.doc', '.docx'].includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function uploadNotes() {
  try {
    console.log('📚 Starting notes upload process...\n');

    const notesBaseDir = path.join(__dirname, '../../NOTES PDF N PPTS');
    
    if (!fs.existsSync(notesBaseDir)) {
      console.error('❌ NOTES PDF N PPTS folder not found!');
      return;
    }

    // Get all subject folders
    const subjectFolders = fs.readdirSync(notesBaseDir).filter(folder => {
      const fullPath = path.join(notesBaseDir, folder);
      return fs.statSync(fullPath).isDirectory();
    });

    console.log(`Found ${subjectFolders.length} subject folders: ${subjectFolders.join(', ')}\n`);

    let totalFilesProcessed = 0;
    let totalFilesSkipped = 0;
    let totalFilesUploaded = 0;

    for (const subjectFolder of subjectFolders) {
      const subjectCode = subjectMapping[subjectFolder];
      
      if (!subjectCode) {
        console.log(`⚠️  Skipping folder: ${subjectFolder} (no mapping found)`);
        continue;
      }

      console.log(`\n📁 Processing ${subjectFolder} (${subjectCode})...`);

      // Find subject in database
      const subject = await Subject.findOne({ where: { code: subjectCode } });
      
      if (!subject) {
        console.log(`   ❌ Subject not found in database: ${subjectCode}`);
        continue;
      }

      console.log(`   ✅ Found subject: ${subject.name} (ID: ${subject.id})`);

      // Get all files in this subject folder
      const subjectPath = path.join(notesBaseDir, subjectFolder);
      const files = getAllFiles(subjectPath);

      console.log(`   📄 Found ${files.length} files\n`);

      for (const filePath of files) {
        totalFilesProcessed++;
        
        const filename = path.basename(filePath);
        const relativePath = path.relative(subjectPath, filePath);
        const resourceType = getResourceType(filename);
        
        if (!resourceType) {
          console.log(`   ⏭️  Skipping: ${filename} (unsupported type)`);
          totalFilesSkipped++;
          continue;
        }

        // Extract unit number
        const unitNumber = extractUnitNumber(filePath);
        
        // Generate title
        const title = generateTitle(filename);

        // Read file data
        const fileBuffer = fs.readFileSync(filePath);
        const fileSize = fileBuffer.length;
        const mimeType = resourceType === 'pdf' ? 'application/pdf' : 
                        resourceType.includes('ppt') ? 'application/vnd.ms-powerpoint' :
                        'application/msword';

        // Check if resource already exists
        const existing = await Resource.findOne({
          where: {
            subjectId: subject.id,
            fileName: filename
          }
        });

        if (existing) {
          console.log(`   ⏭️  Already exists: ${filename}`);
          totalFilesSkipped++;
          continue;
        }

        // Create resource
        await Resource.create({
          subjectId: subject.id,
          title: title,
          type: 'notes',
          resourceType: resourceType,
          fileData: fileBuffer,
          fileName: filename,
          fileSize: fileSize,
          mimeType: mimeType,
          unitNumber: unitNumber,
          description: unitNumber ? `Unit ${unitNumber} material` : 'Course material',
          url: null,
          imageUrl: null,
          isActive: true
        });

        const sizeKB = (fileSize / 1024).toFixed(2);
        const unitInfo = unitNumber ? `Unit ${unitNumber}` : 'General';
        console.log(`   ✅ Uploaded: ${title}`);
        console.log(`      File: ${filename} (${sizeKB} KB)`);
        console.log(`      Type: ${resourceType.toUpperCase()} | ${unitInfo}`);
        
        totalFilesUploaded++;
      }

      console.log(`\n   📊 ${subjectFolder} Summary:`);
      console.log(`      Total files: ${files.length}`);
      console.log(`      Uploaded: ${totalFilesUploaded}`);
      console.log(`      Skipped: ${totalFilesSkipped}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPLOAD SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Total files processed: ${totalFilesProcessed}`);
    console.log(`✅ Successfully uploaded: ${totalFilesUploaded}`);
    console.log(`⏭️  Skipped (duplicates/unsupported): ${totalFilesSkipped}`);
    console.log('='.repeat(60));
    console.log('\n🎉 Notes upload completed successfully!\n');

  } catch (error) {
    console.error('❌ Error uploading notes:', error);
    throw error;
  }
}

// Run the upload
uploadNotes()
  .then(() => {
    console.log('✅ Process completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Process failed:', error);
    process.exit(1);
  });

