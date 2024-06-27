import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Stylist } from '@/app/reservation/page';
import { useState } from 'react';

interface SwiperProps {
    stylists: Stylist[] ;
    onSelectStylist :  (stylist : Stylist) => void;
}
export default function StylistSwiper({stylists , onSelectStylist} : SwiperProps){
    const [selectedStylistId, setSelectedStylistId] = useState<string | null>(null);

    const handleSelectStylist = (stylist: Stylist) => {
        setSelectedStylistId(stylist.id);  // Track the selected Stylist by its ID
        onSelectStylist(stylist);  // Propagate the selection
      };
    return (
        <Swiper
              effect={'coverflow'}
              spaceBetween={30}
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
            {stylists?.map((stylist, index) => (
              <SwiperSlide 
                    key={stylist.id} 
                    style={{
                    border: selectedStylistId === stylist.id ? '3px solid #2094F3' : '1px solid #000000',
                    width: '300px',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    borderRadius: '20px',  // Adds rounded corners
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Adds shadow effect
                    cursor: 'pointer'
                    }} 
                    onClick={() => handleSelectStylist(stylist)}
                >
                <div className="flex w-full flex-col gap-3 p-4">
                  <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl relative overflow-hidden">
                    <Image alt="stylists" src={stylist.imgUrl} layout="fill" objectFit="cover" />
                  </div>
                  <div>
                    <p className="text-[#0b141e] text-base font-medium leading-normal">{stylist.name}</p>
                    <p className="text-[#3a70a6] text-sm font-normal leading-normal">{stylist.gender}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
    )
}