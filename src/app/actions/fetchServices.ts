import { db } from "@/lib/db";
import { ServiceType, Service } from '@prisma/client';

interface DeduplicatedService {
  serviceName: string;
  imgUrl: string;
}

interface DeduplicatedServiceType {
  type: string;
  imgUrl: string | null;
  services: DeduplicatedService[];
}

export default async function fetchServices(): Promise<DeduplicatedServiceType[]> {
  const serviceData = await db.serviceType.findMany({
    select: {
      type: true,
      imgUrl: true,
      services: {
        select: {
          serviceName: true,
          imgUrl: true,
        }
      }
    }
  });

  // Deduplicate services
  const deduplicatedServices = serviceData.map(serviceType => ({
    ...serviceType,
    services: deduplicateServices(serviceType.services)
  }));

  return deduplicatedServices;
}

function deduplicateServices(services: { serviceName: string; imgUrl: string | null }[]): DeduplicatedService[] {
  const uniqueServices = new Map<string, DeduplicatedService>();
  services.forEach(service => {
    if (!uniqueServices.has(service.serviceName)) {
      uniqueServices.set(service.serviceName, {
        serviceName: service.serviceName,
        imgUrl: service.imgUrl || ''
      });
    }
  });
  return Array.from(uniqueServices.values());
}
