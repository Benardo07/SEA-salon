export default function ServicePage(){
    const services = [
        {
          title: "Haircuts and Styling",
          image: "https://cdn.usegalileo.ai/sdxl10/86b8056e-f5f2-46d7-8307-fc0f8224413b.png"
        },
        {
          title: "Manicure and Pedicure",
          image: "https://cdn.usegalileo.ai/sdxl10/295e6ad9-1536-4672-a392-a7e803703767.png"
        },
        {
          title: "Facial Treatments",
          image: "https://cdn.usegalileo.ai/sdxl10/f0ec4359-8b5b-488a-a12c-8c6ce3bd4621.png"
        }
      ];
    
      return (
        <div>
          <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Our Services</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>
                <p className="text-[#0e141b] text-base font-medium leading-normal">{service.title}</p>
              </div>
            ))}
          </div>
        </div>
      );
}