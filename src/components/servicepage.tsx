import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
export default async function ServicePage(){
    const services = await db.serviceType.findMany({
      select: {
        type: true,
        imgUrl: true,
      }
    })
    
      return (
        <div className="py-10">
          <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Our Type Services</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            {services.map((service, index) => (
              <Link key={index} href="/services">
                <div  className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full relative bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${service.imgUrl})` }}
                  >
                    {service.imgUrl && (
                      <Image src={service.imgUrl} alt="typeServices" layout="fill" objectFit="cover"></Image>)}
                    
                  </div>
                  <p className="text-[#0e141b] text-base font-medium leading-normal">{service.type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
}