const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanUsers() {
  const adminEmail = 'rfpita.ti@gmail.com';

  console.log(`[*] Iniciando limpeza de usuários mantendo apenas ${adminEmail}...`);

  await prisma.$transaction(async (tx) => {
    // 1. Localizar usuários a serem excluídos
    const usersToDelete = await tx.user.findMany({
      where: { email: { not: adminEmail } },
      select: { id: true, email: true, name: true }
    });

    const userIds = usersToDelete.map(u => u.id);

    if (userIds.length === 0) {
      console.log('[!] Nenhum outro usuário encontrado para exclusão.');
      return;
    }

    // 2. Limpar referrers vinculados para evitar violação de FK
    await tx.user.updateMany({
      where: { referredById: { in: userIds } },
      data: { referredById: null }
    });

    // 3. Excluir comissões de afiliados geradas por ou para esses usuários
    await tx.referralTransaction.deleteMany({
      where: {
        OR: [
          { userId: { in: userIds } },
          { fromUserId: { in: userIds } }
        ]
      }
    });

    // 4. Excluir transações financeiras desses usuários
    const deletedTrans = await tx.transaction.deleteMany({
      where: { userId: { in: userIds } }
    });
    console.log(`[+] ${deletedTrans.count} transações removidas.`);

    // 5. Excluir histórico de pesquisas desses usuários
    const deletedSearches = await tx.searchHistory.deleteMany({
      where: { userId: { in: userIds } }
    });
    console.log(`[+] ${deletedSearches.count} registros de histórico de pesquisa removidos.`);

    // 6. Excluir tokens de reset de senha desses usuários
    const otherEmails = usersToDelete.map(u => u.email);
    await tx.passwordResetToken.deleteMany({
      where: { email: { in: otherEmails } }
    });

    // 7. Excluir os usuários
    const deletedUsers = await tx.user.deleteMany({
      where: { id: { in: userIds } }
    });
    console.log(`[+] ${deletedUsers.count} usuários excluídos com sucesso!`);
  });

  const remaining = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, balance: true }
  });

  console.log('\n--- BASE ATUALIZADA ---');
  console.log(`Total de usuários restantes: ${remaining.length}`);
  remaining.forEach(u => {
    console.log(`✔ ${u.email} (${u.name}) | Role: ${u.role} | Saldo: R$ ${u.balance}`);
  });
}

cleanUsers()
  .catch((err) => {
    console.error('[-] Erro ao executar limpeza:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
