import ServicesSection from "@/components/serviceSection";
import { db } from "@/lib/db";
import { Service } from "../reservation/page";
import fetchServices from "../actions/fetchServices";

interface ServiceData {
  title: string;
  imgUrl: string;
}

export default async function Services() {

  const serviceData = await fetchServices();

  console.log(serviceData);

  const haircuts = [
    {
      title: "Men's Haircut",
      time: "40 min",
      price: "$40",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/1c607c0c-e9e3-4da9-89ef-747f6ea22b1a.png",
    },
    {
      title: "Women's Haircut",
      time: "70 min",
      price: "$70",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/5c50c314-92c8-49d4-851c-aadaac0dc245.png",
    },
    {
      title: "Blowout",
      time: "60 min",
      price: "$60",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/dc2a9ab9-59b0-4b33-b7e0-41f480971942.png",
    },
    {
      title: "Bridal Styling",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/cd450211-fc08-4126-9169-21d1b18406bf.png",
    },
  ];

  const manicurePedicure = [
    {
      title: "Gel Manicure",
      time: "45 min",
      price: "$40",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/cb3e6623-c7d6-42ce-abf8-1e2838f49eb2.png",
    },
    {
      title: "Acrylic Full Set",
      time: "70 min",
      price: "$70",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/433dda0c-97ef-4193-aa0e-3da804ccf26e.png",
    },
    {
      title: "Dipping Powder",
      time: "60 min",
      price: "$80",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/1a2da2c7-9af3-4f13-af5d-dcb131b9b9b2.png",
    },
    {
      title: "Spa Pedicure",
      time: "90 min",
      price: "$90",
      imageUrl: "https://cdn.usegalileo.ai/replicate/5245a69a-ea22-4490-8985-892198db58d0.png",
    },
  ];

  const facialTreatments = [
    {
      title: "Deep Cleansing",
      time: "80 min",
      price: "$80",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/6bb6e0c2-6273-44d3-acc0-609c32301fd2.png",
    },
    {
      title: "Anti-Aging",
      time: "100 min",
      price: "$100",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/46accb20-badb-4564-85e0-2599dd293749.png",
    },
    {
      title: "Acne Treatment",
      time: "90 min",
      price: "$90",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/019593c9-1775-4cb7-9903-0d9dc20b9bb9.png",
    },
    {
      title: "Brightening",
      time: "90 min",
      price: "$80",
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/f79502ac-a171-46eb-a6da-8803ef1a6e6e.png",
    },
  ];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f0f5fa] group/design-root overflow-x-hidden" style={{ fontFamily: "Plus Jakarta Sans, Noto Sans, sans-serif" }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-3/4 max-w-[1260px] flex-1">
            <h1 className="text-[#0b141e] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">Our Services</h1>
            {serviceData.map((serviceType) => (
              <ServicesSection title={serviceType.type} services={serviceType.services} />
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};


