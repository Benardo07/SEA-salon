import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Optional: Clear existing data for development purposes
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.stylist.deleteMany();
  await prisma.service.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.user.deleteMany();

  // Create branches
  const branch1 = await prisma.branch.create({
    data: {
      name: "SEA Salon Downtown",
      location: "123 Main St, Downtown",
      openingTime: new Date("1970-01-01T09:00:00Z"),
      closingTime: new Date("1970-01-01T21:00:00Z"),
      branchTelp: "08123456789",
      address: "123 Main St, Downtown, City",
    },
  });

  const branch2 = await prisma.branch.create({
    data: {
      name: "SEA Salon Uptown",
      location: "456 High St, Uptown",
      openingTime: new Date("1970-01-01T09:00:00Z"),
      closingTime: new Date("1970-01-01T21:00:00Z"),
      branchTelp: "08123456790",
      address: "456 High St, Uptown, City",
    },
  });

  // Create services
  const haircut = await prisma.service.create({
    data: {
      serviceName: "Haircut",
      duration: 60,
      description: "A stylish haircut to suit your personality.",
      imgUrl: "https://example.com/haircut.jpg",
      branch: {
        connect: { id: branch1.id },
      },
    },
  });

  const manicure = await prisma.service.create({
    data: {
      serviceName: "Manicure",
      duration: 45,
      description: "Professional manicure service.",
      imgUrl: "https://example.com/manicure.jpg",
      branch: {
        connect: { id: branch1.id },
      },
    },
  });

  const facial = await prisma.service.create({
    data: {
      serviceName: "Facial Treatment",
      duration: 90,
      description: "Relaxing facial treatment.",
      imgUrl: "https://example.com/facial.jpg",
      branch: {
        connect: { id: branch2.id },
      },
    },
  });

  // Create stylists
  const stylist1 = await prisma.stylist.create({
    data: {
      name: "John Doe",
      gender: "Male",
      imgUrl: "https://example.com/john.jpg",
      branch: {
        connect: { id: branch1.id },
      },
    },
  });

  const stylist2 = await prisma.stylist.create({
    data: {
      name: "Jane Smith",
      gender: "Female",
      imgUrl: "https://example.com/jane.jpg",
      branch: {
        connect: { id: branch2.id },
      },
    },
  });

  // Create users
  const admin = await prisma.user.create({
    data: {
      fullName: "Thomas N",
      email: "thomas.n@compfest.id",
      phone: "08123456789",
      password: "Admin123", // Note: In a real application, passwords should be hashed
      role: "ADMIN",
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      fullName: "Alice Smith",
      email: "alice.smith@example.com",
      phone: "08123456790",
      password: "password123",
      role: "CUSTOMER",
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      fullName: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "08123456791",
      password: "password456",
      role: "CUSTOMER",
    },
  });

  // Create reviews
  await prisma.review.create({
    data: {
      starRating: 5,
      comment: "Excellent service!",
      user: {
        connect: { id: customer1.id },
      },
    },
  });

  await prisma.review.create({
    data: {
      starRating: 4,
      comment: "Great experience, will come again.",
      user: {
        connect: { id: customer2.id },
      },
    },
  });

  // Create reservations
  await prisma.reservation.create({
    data: {
      reservationName: "Alice's Haircut",
      activePhone: "08123456790",
      reservationTime: new Date("2024-06-25T10:00:00Z"),
      createdAt: new Date(),
      user: {
        connect: { id: customer1.id },
      },
      service: {
        connect: { id: haircut.id },
      },
      stylist: {
        connect: { id: stylist1.id },
      },
    },
  });

  await prisma.reservation.create({
    data: {
      reservationName: "Bob's Manicure",
      activePhone: "08123456791",
      reservationTime: new Date("2024-06-25T11:00:00Z"),
      createdAt: new Date(),
      user: {
        connect: { id: customer2.id },
      },
      service: {
        connect: { id: manicure.id },
      },
      stylist: {
        connect: { id: stylist1.id },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
