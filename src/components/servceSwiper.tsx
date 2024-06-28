import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Service } from '@/app/reservation/page';
import { useState } from 'react';

interface SwiperProps {
    services: Service[] ;
    onSelectService: (service: Service) => void;

}
export default function ServiceSwiper({services , onSelectService} : SwiperProps){
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const handleSelectService = (service: Service) => {
        setSelectedServiceId(service.id);  // Track the selected service by its ID
        onSelectService(service);  // Propagate the selection
      };
    return (
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
                key={service.id} 
                style={{
                border: selectedServiceId === service.id ? '3px solid #2094F3' : '1px solid #000000',
                width: '250px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '20px',  // Adds rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Adds shadow effect
                cursor: 'pointer'
                }} 
                onClick={() => handleSelectService(service)}
            >
                <div className="flex w-full flex-col gap-3 p-4">
                  <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl relative overflow-hidden">
                    <Image alt="services" src={service.imgUrl} layout="fill" objectFit="cover" />
                  </div>
                  <div>
                    <p className="text-[#0b141e] text-base font-medium leading-normal">{service.serviceName}</p>
                    <p className="text-[#3a70a6] text-sm font-normal leading-normal">{service.duration}</p>
                    <p className="text-[#3a70a6] text-sm font-normal leading-normal">{service.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
    )
}