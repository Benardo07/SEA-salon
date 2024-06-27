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

function getRandomDuration(min: number, max: number, increment: number): number {
    return Math.floor(Math.random() * ((max - min) / increment + 1)) * increment + min;
}

async function main() {

    const fetchedServiceTypes = await prisma.serviceType.findMany();
    const branches = await prisma.branch.findMany();

    const services: Record<string, ServiceInfo[]> = {
      'Haircuts and Styling': [
          {
              title: "Men's Haircut",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/1c607c0c-e9e3-4da9-89ef-747f6ea22b1a.png",
              description: "A classic men's haircut tailored to individual style preferences, ensuring a sharp and clean look."
          },
          {
              title: "Women's Haircut",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/5c50c314-92c8-49d4-851c-aadaac0dc245.png",
              description: "Precision cuts combined with modern styling to enhance natural beauty and personalize your look."
          },
          {
              title: "Blowout",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/dc2a9ab9-59b0-4b33-b7e0-41f480971942.png",
              description: "Achieve voluminous and bouncy hair with our professional blowout service that guarantees a lasting finish."
          },
          {
              title: "Bridal Styling",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/cd450211-fc08-4126-9169-21d1b18406bf.png",
              description: "Custom bridal hair styling to complete your dream wedding look, from classic updos to contemporary styles."
          }
      ],
      'Manicure and Pedicure': [
          {
              title: "Gel Manicure",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/cb3e6623-c7d6-42ce-abf8-1e2838f49eb2.png",
              description: "Long-lasting gel manicure with a flawless finish that combines durability with a high gloss shine."
          },
          {
              title: "Acrylic Full Set",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/433dda0c-97ef-4193-aa0e-3da804ccf26e.png",
              description: "Expertly crafted acrylic nails designed for strength and beauty, tailored to your desired length and shape."
          },
          {
              title: "Dipping Powder",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/1a2da2c7-9af3-4f13-af5d-dcb131b9b9b2.png",
              description: "A healthier alternative to traditional acrylics, offering vibrant colors and a lightweight feel."
          },
          {
              title: "Spa Pedicure",
              imageUrl: "https://cdn.usegalileo.ai/replicate/5245a69a-ea22-4490-8985-892198db58d0.png",
              description: "A therapeutic pedicure treatment that soothes and rejuvenates feet with exfoliation, moisturizing, and massage."
          }
      ],
      'Facial Treatments': [
          {
              title: "Deep Cleansing",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/6bb6e0c2-6273-44d3-acc0-609c32301fd2.png",
              description: "Deep cleansing facial that exfoliates, moisturizes, and rejuvenates the skin for a clear and radiant complexion."
          },
          {
              title: "Anti-Aging",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/46accb20-badb-4564-85e0-2599dd293749.png",
              description: "Focus on minimizing signs of aging with targeted treatments that reduce wrinkles and enhance skin elasticity."
          },
          {
              title: "Acne Treatment",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/019593c9-1775-4cb7-9903-0d9dc20b9bb9.png",
              description: "Specialized acne treatment designed to reduce breakouts, improve skin clarity, and prevent future occurrences."
          },
          {
              title: "Brightening",
              imageUrl: "https://cdn.usegalileo.ai/sdxl10/f79502ac-a171-46eb-a6da-8803ef1a6e6e.png",
              description: "Brightening facial that targets discoloration and uneven skin tone, restoring a luminous complexion."
          }
      ]
  };

    for (const branch of branches) {
        for (const serviceType of fetchedServiceTypes) {
            const typeServices = services[serviceType.type];
            if (typeServices) {
                for (const service of typeServices) {
                    await prisma.service.create({
                        data: {
                            serviceName: service.title,
                            duration: getRandomDuration(40, 80, 5),
                            branchId: branch.id,
                            description: service.description,
                            typeId: serviceType.id,
                            imgUrl: service.imageUrl,
                            price: getRandomPrice(40000, 80000, 5000)
                        },
                    });
                }
            }
        }
    }

    console.log('Service Types and Services seeded successfully');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
