import ServicesSection from "@/components/serviceSection";
import { db } from "@/lib/db";
import { Service } from "../reservation/page";
import fetchServices from "../actions/fetchServices";
import RevealTitle from "@/components/ui/animations/revealTitile";

interface ServiceData {
  title: string;
  imgUrl: string;
}

export default async function Services() {

  const serviceData = await fetchServices();


  return (
    <div className="relative flex size-full min-h-screen flex-col pb-20 bg-[#f0f5fa] overflow-x-hidden">
        <div className="px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-3/4 max-w-[1260px] flex-1 gap-10">
            <h1 className="text-[#0b141e] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">Our Services</h1>
            {serviceData.map((serviceType, index) => (
              <RevealTitle custom={index*1} key={serviceType.type}>
                <ServicesSection  title={serviceType.type} services={serviceType.services} />
               </RevealTitle>
            ))}
            
          </div>
        </div>
      </div>
  );
};


