// prisma/seed.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não está definida no ambiente.');
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Limpa o banco antes de começar (opcional)
  await prisma.event.deleteMany();

  await prisma.event.createMany({
    data: [
      {
        title: "React Next.js Summit 2026",
        shortDescription: "Aprenda arquitetura de componentes e Server Actions na prática.",
        date: new Date("2026-05-20T09:00:00Z"),
        location: "São Paulo, SP - Online",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
        status: "OPEN",
        registrationUrl: "https://inscricao.devevents.com/evt-001",
      },
      {
        title: "Hackathon FinTech 48h",
        shortDescription: "Crie a próxima solução financeira do mercado.",
        date: new Date("2026-04-10T18:00:00Z"),
        location: "Brasília, DF",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        status: "SOLD_OUT",
      }
    ]
  });

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });