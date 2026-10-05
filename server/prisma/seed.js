import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
  }

  // 1. Create Admin Account
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Super Admin',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin account seeded:', admin.email);

  // 2. Create Sample Student Accounts
  const studentPassword = await bcrypt.hash('student123', 10);
  const students = [
    { name: 'Rahul Kumar',  email: 'rahul@college.edu',  branch: 'Computer Science', semester: 3, section: 'A' },
    { name: 'Sneha Patel',  email: 'sneha@college.edu',  branch: 'Computer Science', semester: 3, section: 'A' },
    { name: 'Vikram Reddy', email: 'vikram@college.edu', branch: 'Computer Science', semester: 3, section: 'A' },
    { name: 'Priya Sharma', email: 'priya@college.edu',  branch: 'Computer Science', semester: 3, section: 'B' },
  ];

  for (const s of students) {
    await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: { ...s, password: studentPassword, role: 'STUDENT' },
    });
    console.log('✅ Student seeded:', s.email);
  }

  console.log('\n🎉 Database seeded successfully!');
  console.log('---');
  console.log('Admin login:   ' + adminEmail + ' / ' + adminPassword);
  console.log('Student login: rahul@college.edu / student123');
  console.log('---');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });