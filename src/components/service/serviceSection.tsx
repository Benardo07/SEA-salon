"use client";
import React from 'react';
import ServiceItem from './serviceItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

interface ServiceObject {
  serviceName: string;
  imgUrl: string;
}


interface ServicesSectionProps {
  title: string;
  services: ServiceObject[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ title, services }) => {
  return (
    <div>
      <h2 className="text-[#0b141e] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{title}</h2>
      <Swiper
              effect={'coverflow'}
              spaceBetween={50}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="mySwiper"
            >
            {services?.map((service, index) => (
             <SwiperSlide 
                key={service.serviceName} 
                style={{
                
                width: '300px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '20px',  // Adds rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Adds shadow effect
                cursor: 'pointer'
                }} 
                
            >
                <div className="flex w-full flex-col gap-3 p-4">
                  <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl relative overflow-hidden">
                    <Image alt="services" src={service.imgUrl} layout="fill" objectFit="cover" />
                  </div>
                  <div>
                    <p className="text-[#0b141e] text-base font-medium leading-normal">{service.serviceName}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
    </div>
  );
};

export default ServicesSection;
