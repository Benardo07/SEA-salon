import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedStylists() {
  // Fetch all branches
  const branches = await prisma.branch.findMany();
  let maleIndex = 1; // Start indexing male images
  let femaleIndex = 1; // Start indexing female images

  // Iterate over each branch
  for (const branch of branches) {
    // Generate 2 male and 2 female stylists
    for (let i = 0; i < 2; i++) {
      // Construct image URLs
      const maleImgUrl = `/stylist/male/male${maleIndex++}.jpeg`;
      const femaleImgUrl = `/stylist/women/women${femaleIndex++}.jpeg`;

      await prisma.stylist.create({
        data: {
          name: faker.person.firstName('male') + ' ' + faker.person.lastName('male'),
          gender: 'men',
          imgUrl: maleImgUrl,
          branchId: branch.id
        }
      });

      await prisma.stylist.create({
        data: {
          name: faker.person.firstName('female') + ' ' + faker.person.lastName('female'),
          gender: 'women',
          imgUrl: femaleImgUrl,
          branchId: branch.id
        }
      });
    }
  }

  console.log('Stylists seeded successfully.');
}

seedStylists()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
