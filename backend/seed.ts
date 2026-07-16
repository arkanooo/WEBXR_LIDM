import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Mulai proses seeding data...');

  const accounts = [
    { email: "admin", password: "admin123", name: "Administrator", role: "Admin" },
    { email: "dosen", password: "teknik2026", name: "Dosen Teknik Mesin", role: "Dosen" },
    { email: "mahasiswa", password: "praktikum2026", name: "Mahasiswa", role: "Mahasiswa" },
  ];

  for (const acc of accounts) {
    const hashedPassword = await bcrypt.hash(acc.password, 10);
    await prisma.user.upsert({
      where: { email: acc.email },
      update: {},
      create: {
        email: acc.email,
        password: hashedPassword,
        name: acc.name,
        role: acc.role
      },
    });
    console.log(`✅ Akun ${acc.role} berhasil didaftarkan!`);
  }

  console.log('Proses seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
