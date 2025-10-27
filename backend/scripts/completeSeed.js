const { Course, Semester, Subject, Resource, syncDatabase } = require('../models');
require('dotenv').config();

async function completeSeed() {
  try {
    // Sync database first
    await syncDatabase();

    console.log('🌱 Starting complete database seeding...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Resource.destroy({ where: {} });
    await Subject.destroy({ where: {} });
    await Semester.destroy({ where: {} });
    await Course.destroy({ where: {} });

    // Create MCA Course
    const mca = await Course.create({
      name: 'Master of Computer Applications',
      code: 'MCA',
      description: 'MCA program at NMIMS',
      imageUrl: '/assets/mca.jpeg',
      totalSemesters: 3
    });

    // Create BTECH Course
    const btech = await Course.create({
      name: 'Bachelor of Technology',
      code: 'BTECH',
      description: 'B.Tech program at NMIMS',
      imageUrl: '/assets/BTECH.jpg',
      totalSemesters: 8
    });

    // Create BTECH-Int Course
    const btechInt = await Course.create({
      name: 'Bachelor of Technology - Integrated',
      code: 'BTECH-INT',
      description: 'B.Tech Integrated program at NMIMS',
      imageUrl: '/assets/btechint.png',
      totalSemesters: 12
    });

    console.log('✅ Courses created');

    // Create MCA Semesters
    const mcaSem1 = await Semester.create({
      courseId: mca.id,
      semesterNumber: 1,
      name: 'Semester 1'
    });

    const mcaSem2 = await Semester.create({
      courseId: mca.id,
      semesterNumber: 2,
      name: 'Semester 2'
    });

    const mcaSem3 = await Semester.create({
      courseId: mca.id,
      semesterNumber: 3,
      name: 'Semester 3'
    });

    console.log('✅ Semesters created');

    // Create Subjects for MCA Semester 1
    const dsa = await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Data Structures and Algorithms',
      code: 'DSA',
      description: 'Fundamental data structures and algorithms',
      imageUrl: '/assets/dsaaa.png'
    });

    const cn = await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Computer Networks',
      code: 'CN',
      description: 'Networking fundamentals and protocols',
      imageUrl: '/assets/maxresdefault.jpg'
    });

    const os = await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Operating Systems',
      code: 'OS',
      description: 'Operating system concepts and principles',
      imageUrl: '/assets/images.png'
    });

    const dbms = await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Database Management Systems',
      code: 'DBMS',
      description: 'Database design and SQL',
      imageUrl: '/assets/db.png'
    });

    const wt = await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Web Technologies',
      code: 'WT',
      description: 'Web development fundamentals',
      imageUrl: '/assets/wp.png'
    });

    const java = await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Java Programming',
      code: 'JAVA',
      description: 'Object-oriented programming with Java',
      imageUrl: '/assets/java.jpg'
    });

    console.log('✅ Subjects for Semester 1 created');

    // Create Subjects for MCA Semester 2
    const python = await Subject.create({
      semesterId: mcaSem2.id,
      name: 'Python Programming',
      code: 'PYTHON',
      description: 'Advanced Python programming concepts',
      imageUrl: '/assets/python.jpg'
    });

    const softEng = await Subject.create({
      semesterId: mcaSem2.id,
      name: 'Software Engineering',
      code: 'SE',
      description: 'Software development lifecycle and methodologies',
      imageUrl: '/assets/sof.jpg'
    });

    const mobile = await Subject.create({
      semesterId: mcaSem2.id,
      name: 'Mobile Application Development',
      code: 'MAD',
      description: 'Android and iOS app development',
      imageUrl: '/assets/mobile.jpeg'
    });

    const stats = await Subject.create({
      semesterId: mcaSem2.id,
      name: 'Probability and Statistics',
      code: 'STATS',
      description: 'Statistical methods and probability theory',
      imageUrl: '/assets/prob.jpg'
    });

    const advWeb = await Subject.create({
      semesterId: mcaSem2.id,
      name: 'Advanced Web Development',
      code: 'AWD',
      description: 'Modern web frameworks and technologies',
      imageUrl: '/assets/Advanced-Web-Development-1-500x385-1.png'
    });

    console.log('✅ Subjects for Semester 2 created');

    // Create Subjects for MCA Semester 3
    const ai = await Subject.create({
      semesterId: mcaSem3.id,
      name: 'Artificial Intelligence',
      code: 'AI',
      description: 'AI concepts and applications',
      imageUrl: '/assets/ai.jpg'
    });

    const ml = await Subject.create({
      semesterId: mcaSem3.id,
      name: 'Machine Learning',
      code: 'ML',
      description: 'Machine learning algorithms and techniques',
      imageUrl: '/assets/ml3.jpg'
    });

    const cloud = await Subject.create({
      semesterId: mcaSem3.id,
      name: 'Cloud Computing',
      code: 'CLOUD',
      description: 'Cloud platforms and services',
      imageUrl: '/assets/cloud.jpg'
    });

    const cyber = await Subject.create({
      semesterId: mcaSem3.id,
      name: 'Cyber Security',
      code: 'CYBER',
      description: 'Information security and cryptography',
      imageUrl: '/assets/cyber.jpg'
    });

    const asp = await Subject.create({
      semesterId: mcaSem3.id,
      name: 'ASP.NET',
      code: 'ASP',
      description: 'Web development with ASP.NET',
      imageUrl: '/assets/asp.jpg'
    });

    console.log('✅ Subjects for Semester 3 created');

    // ======================================
    // CREATE SAMPLE RESOURCES
    // ======================================

    console.log('📚 Creating sample resources...');

    // Computer Networks - Notes
    await Resource.create({
      subjectId: cn.id,
      title: 'Introduction to Computer Networks',
      type: 'notes',
      resourceType: 'pdf',
      unitNumber: 1,
      description: 'Basic concepts of computer networks',
      url: null
    });

    await Resource.create({
      subjectId: cn.id,
      title: 'Network Models and Protocols',
      type: 'notes',
      resourceType: 'ppt',
      unitNumber: 2,
      description: 'OSI and TCP/IP models',
      url: null
    });

    await Resource.create({
      subjectId: cn.id,
      title: 'Data Link Layer',
      type: 'notes',
      resourceType: 'pdf',
      unitNumber: 3,
      description: 'Error detection and correction',
      url: null
    });

    // Computer Networks - Videos
    await Resource.create({
      subjectId: cn.id,
      title: 'Computer Networks Full Course',
      type: 'video',
      resourceType: 'video_url',
      url: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
      description: 'Complete computer networks course'
    });

    await Resource.create({
      subjectId: cn.id,
      title: 'Networking Basics',
      type: 'video',
      resourceType: 'video_url',
      url: 'https://www.youtube.com/watch?v=DrI2lUXL1no',
      description: 'Networking fundamentals explained'
    });

    // Computer Networks - Reference Books
    await Resource.create({
      subjectId: cn.id,
      title: 'Computer Networking: A Top-Down Approach',
      type: 'reference_book',
      resourceType: 'pdf',
      imageUrl: '/assets/cnbook.png',
      description: 'By Kurose and Ross'
    });

    await Resource.create({
      subjectId: cn.id,
      title: 'Data Communications and Networking',
      type: 'reference_book',
      resourceType: 'pdf',
      imageUrl: '/assets/cnbook1.jpeg',
      description: 'By Behrouz A. Forouzan'
    });

    await Resource.create({
      subjectId: cn.id,
      title: 'Computer Networks',
      type: 'reference_book',
      resourceType: 'pdf',
      imageUrl: '/assets/fororzan.jpeg',
      description: 'By Andrew S. Tanenbaum'
    });

    // DSA Resources
    await Resource.create({
      subjectId: dsa.id,
      title: 'Introduction to Data Structures',
      type: 'notes',
      resourceType: 'pdf',
      unitNumber: 1,
      description: 'Basic data structures concepts'
    });

    await Resource.create({
      subjectId: dsa.id,
      title: 'Arrays and Linked Lists',
      type: 'notes',
      resourceType: 'ppt',
      unitNumber: 2,
      description: 'Linear data structures'
    });

    await Resource.create({
      subjectId: dsa.id,
      title: 'Data Structures Tutorial',
      type: 'video',
      resourceType: 'video_url',
      url: 'https://www.youtube.com/watch?v=B31LgI4Y4DQ',
      description: 'Complete DSA course'
    });

    await Resource.create({
      subjectId: dsa.id,
      title: 'Data Structures Using C',
      type: 'reference_book',
      resourceType: 'pdf',
      imageUrl: '/assets/dsabook.jpg',
      description: 'By Reema Thareja'
    });

    // Operating Systems Resources
    await Resource.create({
      subjectId: os.id,
      title: 'OS Overview',
      type: 'notes',
      resourceType: 'pdf',
      unitNumber: 1,
      description: 'Introduction to operating systems'
    });

    await Resource.create({
      subjectId: os.id,
      title: 'Process Management',
      type: 'notes',
      resourceType: 'ppt',
      unitNumber: 2,
      description: 'Processes and threads'
    });

    await Resource.create({
      subjectId: os.id,
      title: 'Operating Systems Full Course',
      type: 'video',
      resourceType: 'video_url',
      url: 'https://www.youtube.com/watch?v=vBURTt97EkA',
      description: 'Complete OS tutorial'
    });

    await Resource.create({
      subjectId: os.id,
      title: 'Operating System Concepts',
      type: 'reference_book',
      resourceType: 'pdf',
      imageUrl: '/assets/osbook1.png',
      description: 'By Silberschatz, Galvin, Gagne'
    });

    // DBMS Resources
    await Resource.create({
      subjectId: dbms.id,
      title: 'Introduction to Databases',
      type: 'notes',
      resourceType: 'pdf',
      unitNumber: 1,
      description: 'Database fundamentals'
    });

    await Resource.create({
      subjectId: dbms.id,
      title: 'SQL Basics',
      type: 'notes',
      resourceType: 'ppt',
      unitNumber: 2,
      description: 'Structured Query Language'
    });

    await Resource.create({
      subjectId: dbms.id,
      title: 'DBMS Complete Course',
      type: 'video',
      resourceType: 'video_url',
      url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc',
      description: 'Database management systems tutorial'
    });

    await Resource.create({
      subjectId: dbms.id,
      title: 'Database System Concepts',
      type: 'reference_book',
      resourceType: 'pdf',
      imageUrl: '/assets/db1.jpg',
      description: 'Comprehensive database book'
    });

    // Web Technologies Resources
    await Resource.create({
      subjectId: wt.id,
      title: 'HTML and CSS Basics',
      type: 'notes',
      resourceType: 'pdf',
      unitNumber: 1,
      description: 'Web development fundamentals'
    });

    await Resource.create({
      subjectId: wt.id,
      title: 'JavaScript Fundamentals',
      type: 'notes',
      resourceType: 'ppt',
      unitNumber: 2,
      description: 'Client-side programming'
    });

    await Resource.create({
      subjectId: wt.id,
      title: 'Web Development Full Course',
      type: 'video',
      resourceType: 'video_url',
      url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
      description: 'Complete web development course'
    });

    await Resource.create({
      subjectId: wt.id,
      title: 'Web Technologies Reference',
      type: 'reference_book',
      resourceType: 'pdf',
      imageUrl: '/assets/wtbook.jpg',
      description: 'Web development guide'
    });

    // Java Resources
    await Resource.create({
      subjectId: java.id,
      title: 'Java Fundamentals',
      type: 'notes',
      resourceType: 'pdf',
      unitNumber: 1,
      description: 'Introduction to Java programming'
    });

    await Resource.create({
      subjectId: java.id,
      title: 'OOP Concepts in Java',
      type: 'notes',
      resourceType: 'ppt',
      unitNumber: 2,
      description: 'Object-oriented programming'
    });

    await Resource.create({
      subjectId: java.id,
      title: 'Java Programming Full Course',
      type: 'video',
      resourceType: 'video_url',
      url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo',
      description: 'Complete Java tutorial'
    });

    await Resource.create({
      subjectId: java.id,
      title: 'Core Java Programming',
      type: 'reference_book',
      resourceType: 'pdf',
      imageUrl: '/assets/jb1.png',
      description: 'Java programming guide'
    });

    console.log('✅ Sample resources created for all subjects');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   - Courses: 3 (MCA, BTECH, BTECH-INT)`);
    console.log(`   - Semesters: 3 (MCA)`);
    console.log(`   - Subjects: 11 total`);
    console.log(`   - Resources: Notes, Videos, and Books for each subject`);
    console.log('');
    console.log('✅ Database seeding completed successfully!');
    console.log('');
    console.log('🎯 Next steps:');
    console.log('   1. Start backend: cd backend && npm run dev');
    console.log('   2. Start frontend: cd frontend && npm run dev');
    console.log('   3. Login and explore all features!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

completeSeed();

