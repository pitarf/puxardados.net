const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const adminEmail = 'rfpita.ti@gmail.com';
  
  const totalUsers = await prisma.user.count();
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  const otherUsers = await prisma.user.findMany({
    where: { email: { not: adminEmail } },
    select: { id: true, email: true, name: true, role: true, balance: true }
  });

  const totalTransactions = await prisma.transaction.count();
  const otherTransactions = await prisma.transaction.count({
    where: { user: { email: { not: adminEmail } } }
  });

  const totalSearches = await prisma.searchHistory.count();
  const otherSearches = await prisma.searchHistory.count({
    where: { user: { email: { not: adminEmail } } }
  });

  console.log('--- RELATÓRIO DE IMPACTO DA LIMPEZA ---');
  console.log(`Total de usuários na base: ${totalUsers}`);
  console.log(`Usuário Admin a ser PRESERVADO: ${admin?.email} (${admin?.name}) - ID: ${admin?.id}`);
  console.log(`Total de outros usuários a serem REMOVIDOS: ${otherUsers.length}`);
  console.log(`Transações de outros usuários que serão apagadas: ${otherTransactions} (de um total de ${totalTransactions})`);
  console.log(`Histórico de buscas de outros usuários que será apagado: ${otherSearches} (de um total de ${totalSearches})`);
  
  console.log('\nUsuários que serão removidos:');
  otherUsers.forEach(u => console.log(`- ${u.email} (${u.name || 'Sem nome'}) | Saldo: R$ ${u.balance} | Role: ${u.role}`));
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
