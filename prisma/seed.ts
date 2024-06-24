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
    },
  });

  const branch2 = await prisma.branch.create({
    data: {
      name: "SEA Salon Uptown",
      location: "456 High St, Uptown",
      openingTime: new Date("1970-01-01T09:00:00Z"),
      closingTime: new Date("1970-01-01T21:00:00Z"),
    },
  });

  // Create services
  const haircut = await prisma.service.create({
    data: {
      serviceName: "Haircut",
      duration: 60,
      branch: {
        connect: { id: branch1.id },
      },
    },
  });

  const manicure = await prisma.service.create({
    data: {
      serviceName: "Manicure",
      duration: 45,
      branch: {
        connect: { id: branch1.id },
      },
    },
  });

  const facial = await prisma.service.create({
    data: {
      serviceName: "Facial Treatment",
      duration: 90,
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

  // Define variables for customers
  let admin, customer1, customer2;

  // Create users
  try {
    admin = await prisma.user.create({
      data: {
        fullName: "Thomas N",
        email: "thomas.n@compfest.id",
        phone: "08123456789",
        password: "Admin123", // Note: In a real application, passwords should be hashed
        role: "ADMIN",
      },
    });

    customer1 = await prisma.user.create({
      data: {
        fullName: "Alice Smith",
        email: "alice.smith@example.com",
        phone: "08123456790",
        password: "password123",
        role: "CUSTOMER",
      },
    });

    customer2 = await prisma.user.create({
      data: {
        fullName: "Bob Johnson",
        email: "bob.johnson@example.com",
        phone: "08123456791",
        password: "password456",
        role: "CUSTOMER",
      },
    });
  } catch (e) {
    console.error("Error creating users:", e);
  }

  // Create reviews
  if (customer1 && customer2) {
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
  }

  // Create reservations
  if (customer1 && customer2) {
    await prisma.reservation.create({
      data: {
        reservationName: "Alice's Haircut",
        activePhone: "08123456790",
        reservationTime: new Date("2024-06-25T10:00:00Z"),
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
