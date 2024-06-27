import Image from 'next/image';
import React from 'react';

interface ServiceItemProps {
  title: string;
  imageUrl: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title,imageUrl }) => {
  return (
    <div className="flex flex-col gap-3 pb-3">
      <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl relative overflow-hidden">
        <Image alt="services" src={imageUrl} layout="fill" objectFit="cover" />
      </div>
      <div>
        <p className="text-[#0b141e] text-base font-medium leading-normal">{title}</p>
      </div>
    </div>
  );
};

export default ServiceItem;
