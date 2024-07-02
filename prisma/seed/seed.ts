import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ServiceInfo {
  title: string;
  imageUrl: string;
  description: string;
}

function getRandomPrice(min: number, max: number, increment: number): string {
    const num = Math.floor(Math.random() * ((max - min) / increment + 1)) * increment + min;
    return `Rp${num.toLocaleString()}`; // Format price with grouping and currency
}



async function main() {
    const newAdmin = await prisma.user.create({
        data: {
            fullName: "Thomas N",
            email : "thomas.n@compfest.id",
            phone: "08123456789",
            password :""
        }
    })
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
