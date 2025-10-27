const { Course, Semester, Subject, syncDatabase } = require('../models');
require('dotenv').config();

async function seedData() {
  try {
    // Sync database first
    await syncDatabase();

    console.log('🌱 Starting database seeding...');

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
    await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Data Structures and Algorithms',
      code: 'DSA',
      description: 'Fundamental data structures and algorithms',
      imageUrl: '/assets/dsaaa.png'
    });

    await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Computer Networks',
      code: 'CN',
      description: 'Networking fundamentals and protocols',
      imageUrl: '/assets/maxresdefault.jpg'
    });

    await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Operating Systems',
      code: 'OS',
      description: 'Operating system concepts and principles',
      imageUrl: '/assets/images.png'
    });

    await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Database Management Systems',
      code: 'DBMS',
      description: 'Database design and SQL',
      imageUrl: '/assets/db.png'
    });

    await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Web Technologies',
      code: 'WT',
      description: 'Web development fundamentals',
      imageUrl: '/assets/wp.png'
    });

    await Subject.create({
      semesterId: mcaSem1.id,
      name: 'Java Programming',
      code: 'JAVA',
      description: 'Object-oriented programming with Java',
      imageUrl: '/assets/java.jpg'
    });

    // Create Subjects for MCA Semester 3
    await Subject.create({
      semesterId: mcaSem3.id,
      name: 'Artificial Intelligence',
      code: 'AI',
      description: 'AI concepts and applications',
      imageUrl: '/assets/ai.jpg'
    });

    await Subject.create({
      semesterId: mcaSem3.id,
      name: 'Machine Learning',
      code: 'ML',
      description: 'Machine learning algorithms and techniques',
      imageUrl: '/assets/ml3.jpg'
    });

    await Subject.create({
      semesterId: mcaSem3.id,
      name: 'Cloud Computing',
      code: 'CLOUD',
      description: 'Cloud platforms and services',
      imageUrl: '/assets/cloud.jpg'
    });

    await Subject.create({
      semesterId: mcaSem3.id,
      name: 'Cyber Security',
      code: 'CYBER',
      description: 'Information security and cryptography',
      imageUrl: '/assets/cyber.jpg'
    });

    await Subject.create({
      semesterId: mcaSem3.id,
      name: 'ASP.NET',
      code: 'ASP',
      description: 'Web development with ASP.NET',
      imageUrl: '/assets/asp.jpg'
    });

    console.log('✅ Subjects created');
    console.log('✅ Database seeding completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedData();

