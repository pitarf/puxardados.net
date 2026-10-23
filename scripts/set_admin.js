const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'rfpita.ti@gmail.com';
  const pass = 'Rafael@67';
  const hash = await bcrypt.hash(pass, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash: hash,
      role: 'ADMIN',
      active: true,
      adminAttempts: 0,
      adminLockoutUntil: null,
    },
    create: {
      email,
      name: 'Rafael Admin',
      passwordHash: hash,
      role: 'ADMIN',
      balance: 100.0,
      active: true,
    },
  });

  console.log('[OK] Administrador configurado com sucesso!');
  console.log('ID:', user.id);
  console.log('E-mail:', user.email);
  console.log('Nome:', user.name);
  console.log('Role:', user.role);
  console.log('Saldo:', user.balance);
}

main()
  .catch((e) => {
    console.error('Erro ao criar admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
