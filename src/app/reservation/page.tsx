import ReservationForm from "@/components/reservationForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Reservation: React.FC = async () => {

  const session = await getServerSession(authOptions);
  if(!session || !session?.user.email){
    redirect('/login');
  }
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <ReservationForm />
        </div>
      </div>
    </div>
  );
  };

export default Reservation;