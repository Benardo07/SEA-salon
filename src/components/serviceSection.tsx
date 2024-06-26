import React from 'react';
import ServiceItem from './serviceItem';

interface ServicesSectionProps {
  title: string;
  services: Array<{ title: string; time?: string; price?: string; imageUrl: string }>;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ title, services }) => {
  return (
    <div>
      <h2 className="text-[#0b141e] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            title={service.title}
            time={service.time}
            price={service.price}
            imageUrl={service.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
