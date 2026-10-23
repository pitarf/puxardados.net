const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.systemSetting.findFirst();
  console.log('--- SystemSetting Atual ---');
  console.log(settings);

  const updated = await prisma.systemSetting.upsert({
    where: { id: settings?.id || 'default' },
    update: {
      siteTitle: 'PuxarDados - Consultas Cadastrais Online',
      siteDescription: 'Plataforma profissional para consultas de CPF, CNPJ, Veículos, Telefone e muito mais.',
      siteKeywords: 'consultas, cpf, cnpj, veiculos, telefone, puxardados, dados cadastrais',
      companyName: 'PUXARDADOS TECNOLOGIA LTDA',
      companyEmail: 'contato@puxardados.net',
    },
    create: {
      id: 'default',
      siteTitle: 'PuxarDados - Consultas Cadastrais Online',
      siteDescription: 'Plataforma profissional para consultas de CPF, CNPJ, Veículos, Telefone e muito mais.',
      siteKeywords: 'consultas, cpf, cnpj, veiculos, telefone, puxardados, dados cadastrais',
      companyName: 'PUXARDADOS TECNOLOGIA LTDA',
      companyEmail: 'contato@puxardados.net',
    }
  });

  console.log('\n[✔] SystemSetting atualizado para PuxarDados:');
  console.log('siteTitle:', updated.siteTitle);
  console.log('companyName:', updated.companyName);
  console.log('companyEmail:', updated.companyEmail);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
