const fs = require('fs');
const path = require('path');
const { Subject, Resource } = require('../models');
require('dotenv').config();

// Mapping for Semester 2 subjects
const sem2SubjectMapping = {
  'python': { code: 'PYTHON', type: 'notes' },
  'Software Engineering': { code: 'SE', type: 'notes' },
  'mad': { code: 'MAD', type: 'notes' },
  'awd': { code: 'AWD', type: 'notes' },
  'prob': { code: 'STATS', type: 'notes' }
};

// Mapping for Semester 3 subjects
const sem3SubjectMapping = {
  'ai': { code: 'AI', type: 'notes' },
  'ml': { code: 'ML', type: 'notes' },
  'cloud': { code: 'CLOUD', type: 'notes' },
  'cyber': { code: 'CYBER', type: 'notes' },
  'asp': { code: 'ASP', type: 'notes' }
};

// Video links for Semester 2
const sem2Videos = {
  'PYTHON': [
    {
      title: 'Python Full Course',
      url: 'https://youtu.be/eWRfhZUzrAc?si=mQvANQ7z5_Pen08X',
      description: 'Complete Python programming tutorial'
    }
  ],
  'SE': [
    {
      title: 'Software Engineering Complete Course',
      url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2&si=t4-XVM8fndSMK3-q',
      description: 'Software Engineering full playlist'
    }
  ],
  'MAD': [
    {
      title: 'Mobile App Development Tutorial',
      url: 'https://youtu.be/7nQsQ0rvYqQ?si=IjdnokG2exxWSdFu',
      description: 'Android app development guide'
    }
  ],
  'AWD': [
    {
      title: 'Advanced Web Development Course',
      url: 'https://youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w&si=eBT6yjdKM6g92aHr',
      description: 'Modern web development frameworks'
    }
  ],
  'STATS': [
    {
      title: 'Probability and Statistics Complete Course',
      url: 'https://youtube.com/playlist?list=PLT3bOBUU3L9jex8hXzVAszMS8NOILa7IV&si=uYLCe5qxe70fHqo8',
      description: 'Comprehensive statistics tutorial'
    }
  ]
};

// Video links for Semester 3
const sem3Videos = {
  'ML': [
    {
      title: 'Machine Learning Full Course',
      url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T&si=yhnUJcUom7kV6GkR',
      description: 'Complete machine learning playlist'
    }
  ],
  'AI': [
    {
      title: 'Artificial Intelligence Complete Course',
      url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI&si=6akNBMRHn0TJOijT',
      description: 'AI concepts and applications'
    }
  ],
  'ASP': [
    {
      title: 'ASP.NET Complete Tutorial',
      url: 'https://youtube.com/playlist?list=PL6n9fhu94yhXQS_p1i-HLIftB9Y7Vnxlo&si=xf4cS3-My4OETVg2',
      description: 'ASP.NET web development'
    }
  ],
  'CYBER': [
    {
      title: 'Cyber Security Full Course',
      url: 'https://youtube.com/playlist?list=PLEiEAq2VkUUJfPOj5nRounXvf3n17PCft&si=0ub2nSR8avO6bbq1',
      description: 'Information security and cryptography'
    }
  ],
  'CLOUD': [
    {
      title: 'Cloud Computing Complete Course',
      url: 'https://youtube.com/playlist?list=PLxCzCOWd7aiHRHVUtR-O52MsrdUSrzuy4&si=mN-_wE8BCREFQ_QP',
      description: 'Cloud platforms and services'
    }
  ]
};

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

// Generate clean title from filename
function generateTitle(filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  
  let title = nameWithoutExt
    .replace(/\s*\(\d+\)\s*/g, ' ') // Remove (1), (2), etc.
    .replace(/_+/g, ' ') // Replace underscores
    .replace(/-+/g, ' ') // Replace hyphens
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
  
  // Capitalize
  title = title.replace(/\b\w/g, char => char.toUpperCase());
  
  return title || nameWithoutExt;
}

// Determine subject code from filename
function getSubjectCodeFromFile(filename, semesterMapping) {
  const lowerName = filename.toLowerCase();
  
  for (const [key, value] of Object.entries(semesterMapping)) {
    if (lowerName.includes(key.toLowerCase())) {
      return value.code;
    }
  }
  
  return null;
}

// Extract unit number from filename
function extractUnitNumber(filename) {
  // Check for (1), (2), etc.
  const numMatch = filename.match(/\((\d+)\)/);
  if (numMatch) {
    return parseInt(numMatch[1]);
  }
  
  return null;
}

async function uploadSem2Sem3Notes() {
  try {
    console.log('📚 Starting Semester 2 & 3 notes and videos upload...\n');

    const notesBaseDir = path.join(__dirname, '../../SEM2_SEM3_NOTES');
    
    if (!fs.existsSync(notesBaseDir)) {
      console.error('❌ SEM2_SEM3_NOTES folder not found!');
      return;
    }

    let totalFilesUploaded = 0;
    let totalVideosUploaded = 0;

    // ========================================
    // SEMESTER 2 NOTES
    // ========================================
    console.log('📁 Processing Semester 2 Notes...\n');
    
    const sem2Dir = path.join(notesBaseDir, 'sem2');
    const sem2Files = fs.readdirSync(sem2Dir).filter(file => {
      const fullPath = path.join(sem2Dir, file);
      return fs.statSync(fullPath).isFile() && ['.pdf', '.ppt', '.pptx'].includes(path.extname(file).toLowerCase());
    });

    for (const filename of sem2Files) {
      const subjectCode = getSubjectCodeFromFile(filename, sem2SubjectMapping);
      
      if (!subjectCode) {
        console.log(`⚠️  Skipping: ${filename} (no subject match)`);
        continue;
      }

      const subject = await Subject.findOne({ where: { code: subjectCode } });
      
      if (!subject) {
        console.log(`❌ Subject not found: ${subjectCode} for file ${filename}`);
        continue;
      }

      const filePath = path.join(sem2Dir, filename);
      const fileBuffer = fs.readFileSync(filePath);
      const resourceType = getResourceType(filename);
      const title = generateTitle(filename);
      const unitNumber = extractUnitNumber(filename);

      // Check if already exists
      const existing = await Resource.findOne({
        where: {
          subjectId: subject.id,
          fileName: filename
        }
      });

      if (existing) {
        console.log(`⏭️  Already exists: ${filename}`);
        continue;
      }

      await Resource.create({
        subjectId: subject.id,
        title: title,
        type: 'notes',
        resourceType: resourceType,
        fileData: fileBuffer,
        fileName: filename,
        fileSize: fileBuffer.length,
        mimeType: resourceType === 'pdf' ? 'application/pdf' : 'application/vnd.ms-powerpoint',
        unitNumber: unitNumber,
        description: unitNumber ? `Unit ${unitNumber} material` : `${subject.name} course material`,
        url: null,
        imageUrl: null,
        isActive: true
      });

      const sizeKB = (fileBuffer.length / 1024).toFixed(2);
      console.log(`✅ Uploaded: ${title} (${subject.name})`);
      console.log(`   File: ${filename} (${sizeKB} KB) | Type: ${resourceType.toUpperCase()}\n`);
      totalFilesUploaded++;
    }

    // ========================================
    // SEMESTER 3 NOTES
    // ========================================
    console.log('\n📁 Processing Semester 3 Notes...\n');
    
    const sem3Dir = path.join(notesBaseDir, 'sem3');
    const sem3Files = fs.readdirSync(sem3Dir).filter(file => {
      const fullPath = path.join(sem3Dir, file);
      return fs.statSync(fullPath).isFile() && ['.pdf', '.ppt', '.pptx'].includes(path.extname(file).toLowerCase());
    });

    for (const filename of sem3Files) {
      const subjectCode = getSubjectCodeFromFile(filename, sem3SubjectMapping);
      
      if (!subjectCode) {
        console.log(`⚠️  Skipping: ${filename} (no subject match)`);
        continue;
      }

      const subject = await Subject.findOne({ where: { code: subjectCode } });
      
      if (!subject) {
        console.log(`❌ Subject not found: ${subjectCode} for file ${filename}`);
        continue;
      }

      const filePath = path.join(sem3Dir, filename);
      const fileBuffer = fs.readFileSync(filePath);
      const resourceType = getResourceType(filename);
      const title = generateTitle(filename);
      const unitNumber = extractUnitNumber(filename);

      // Check if already exists
      const existing = await Resource.findOne({
        where: {
          subjectId: subject.id,
          fileName: filename
        }
      });

      if (existing) {
        console.log(`⏭️  Already exists: ${filename}`);
        continue;
      }

      await Resource.create({
        subjectId: subject.id,
        title: title,
        type: 'notes',
        resourceType: resourceType,
        fileData: fileBuffer,
        fileName: filename,
        fileSize: fileBuffer.length,
        mimeType: resourceType === 'pdf' ? 'application/pdf' : 'application/vnd.ms-powerpoint',
        unitNumber: unitNumber,
        description: unitNumber ? `Unit ${unitNumber} material` : `${subject.name} course material`,
        url: null,
        imageUrl: null,
        isActive: true
      });

      const sizeKB = (fileBuffer.length / 1024).toFixed(2);
      console.log(`✅ Uploaded: ${title} (${subject.name})`);
      console.log(`   File: ${filename} (${sizeKB} KB) | Type: ${resourceType.toUpperCase()}\n`);
      totalFilesUploaded++;
    }

    // ========================================
    // SEMESTER 2 VIDEOS
    // ========================================
    console.log('\n🎬 Processing Semester 2 Videos...\n');
    
    for (const [subjectCode, videos] of Object.entries(sem2Videos)) {
      const subject = await Subject.findOne({ where: { code: subjectCode } });
      
      if (!subject) {
        console.log(`❌ Subject not found: ${subjectCode}`);
        continue;
      }

      for (const video of videos) {
        // Check if already exists
        const existing = await Resource.findOne({
          where: {
            subjectId: subject.id,
            url: video.url
          }
        });

        if (existing) {
          console.log(`⏭️  Video already exists: ${video.title}`);
          continue;
        }

        await Resource.create({
          subjectId: subject.id,
          title: video.title,
          type: 'video',
          resourceType: 'video_url',
          fileData: null,
          fileName: null,
          fileSize: null,
          mimeType: null,
          url: video.url,
          imageUrl: null,
          unitNumber: null,
          description: video.description,
          isActive: true
        });

        console.log(`✅ Added video: ${video.title} (${subject.name})\n`);
        totalVideosUploaded++;
      }
    }

    // ========================================
    // SEMESTER 3 VIDEOS
    // ========================================
    console.log('\n🎬 Processing Semester 3 Videos...\n');
    
    for (const [subjectCode, videos] of Object.entries(sem3Videos)) {
      const subject = await Subject.findOne({ where: { code: subjectCode } });
      
      if (!subject) {
        console.log(`❌ Subject not found: ${subjectCode}`);
        continue;
      }

      for (const video of videos) {
        // Check if already exists
        const existing = await Resource.findOne({
          where: {
            subjectId: subject.id,
            url: video.url
          }
        });

        if (existing) {
          console.log(`⏭️  Video already exists: ${video.title}`);
          continue;
        }

        await Resource.create({
          subjectId: subject.id,
          title: video.title,
          type: 'video',
          resourceType: 'video_url',
          fileData: null,
          fileName: null,
          fileSize: null,
          mimeType: null,
          url: video.url,
          imageUrl: null,
          unitNumber: null,
          description: video.description,
          isActive: true
        });

        console.log(`✅ Added video: ${video.title} (${subject.name})\n`);
        totalVideosUploaded++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPLOAD SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Total notes uploaded: ${totalFilesUploaded}`);
    console.log(`✅ Total videos uploaded: ${totalVideosUploaded}`);
    console.log(`✅ Total resources: ${totalFilesUploaded + totalVideosUploaded}`);
    console.log('='.repeat(60));
    console.log('\n🎉 Semester 2 & 3 upload completed successfully!\n');

  } catch (error) {
    console.error('❌ Error uploading:', error);
    throw error;
  }
}

// Run the upload
uploadSem2Sem3Notes()
  .then(() => {
    console.log('✅ Process completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Process failed:', error);
    process.exit(1);
  });

