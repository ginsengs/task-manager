import { Prisma, PrismaClient, UserRole } from '@prisma/client'
import { randomUUID } from 'crypto'
const prisma = new PrismaClient();

const users: Prisma.UserCreateManyInput[] = [{
  public_uuid: randomUUID(),
  username: 'pop-admin',
  beak_size: 'big',
  role: UserRole.ADMIN,
}, {
  public_uuid: randomUUID(),
  username: 'pop-manager',
  beak_size: 'middle',
  role: UserRole.MANAGER,
}];

async function main() {
  await prisma.user.createMany({
    data: users
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
