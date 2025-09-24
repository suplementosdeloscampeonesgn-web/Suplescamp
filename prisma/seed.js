import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash('Suplescampgn25HzY', 10);
  console.log('HASH ADMIN:', hashedPassword); // <-- imprime para depurar
  await prisma.user.upsert({
    where: { email: 'suplementosdeloscampeonesgn@gmail.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'suplementosdeloscampeonesgn@gmail.com',
      phone: null,
      password: hashedPassword,
      role: 'admin'
    }
  });
}
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());