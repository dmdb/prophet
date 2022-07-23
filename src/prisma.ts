import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [{ level: 'query', emit: 'event' }],
});
if (process.env.DEBUG) {
  prisma.$on('query', (e: unknown) => {
    console.log(e);
  });
}


export default prisma;
