import ReservationForm from "@/components/reservationForm";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export interface Branch {
  id: string;
  name: string;
  locationURL?: string | null;  // Allow both undefined and null
  openingTime: string;
  closingTime: string;
  branchTelp: string;
  address: string;
  services?: Service[];
  stylists?: Stylist[];
}

export interface Service {
  id: string;
  serviceName: string;
  duration: number;  // Duration in minutes if that's the intended unit
  branchId: string;
  description: string;
  typeId: string;
  imgUrl: string;
  price: string;
}

// Interfaces for Stylist
export interface Stylist {
  id: string;
  name: string;
  gender: string;
  imgUrl: string;
  branchId: string;
}

const Reservation: React.FC = async () => {

  const session = await getServerSession(authOptions);
  if(!session || !session?.user.email){
    redirect('/login');
  }

  const fetchedBranches = await db.branch.findMany({
    select: {
      id: true,  // Branch ID
      name: true,  // Branch Name
      locationURL: true,
      openingTime: true,
      closingTime: true,
      branchTelp: true,  // Branch Telephone Number
      address: true,
      services: {
        select: {
          id: true,
          serviceName: true,
          duration: true,
          branchId: true,
          description: true,
          typeId: true,
          imgUrl: true,
          price: true,
        }
      },
      stylists: {
        select: {
          id: true,
          name: true,
          branchId: true,
          imgUrl: true,
          gender: true,
          
        }
      }
    }
  });

  const fetchServiceType = await db.serviceType.findMany();
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden">
        <div className="px-10 lg:px-40 flex flex-1 justify-center py-5">
          <ReservationForm branches={fetchedBranches} serviceTypes={fetchServiceType}/>
        </div>
    </div>
  );
  };

export default Reservation;