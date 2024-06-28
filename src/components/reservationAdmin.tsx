import { useState } from "react";
import { ToastState } from "./loginForm";
import Toast from "./toast";

export interface ReservationObject {
    id: string;
    reservationName: string;
    activePhone: string;
    user : {
        email: string;
    }
    service: {
        serviceName: string;
    };
    branch: {
        name : string;
    };
    reservationTime: Date;
    stylist: {
        name : string;
    },
}
interface DataProps {
    reservations: ReservationObject[];
    updateReservation: (newReservation: ReservationObject[]) => void;
}
export default function ReservationAdmin({reservations, updateReservation} : DataProps){
    const [toast, setToast] = useState<ToastState>({
        isOpen: false,
        message: "",
        type: "error",
    });

    async function handleDelete(reservationId: string) {
        if (confirm('Are you sure you want to delete this review?')) {
            try{
                const response = await fetch('/api/reservations', {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      reservationId : reservationId,
                    })
                  });
                const data = await response.json();
    
                if (response.ok) {
                    console.log('Reservation Deleted:', data);
                    updateReservation(data.newReservations)
                    setToast({ isOpen: true, message: "Delete Success", type: "success" });
    
                } else {
                    setToast({ isOpen: true, message: "Delete Failed", type: "error" });
    
                }
            }catch(error){
                setToast({ isOpen: true, message: "Delete Failed", type: "error" });
            }
              
        }
    }
    return (
        <div className="w-full flex flex-col ">
            <div className="flex w-full justify-between items-center p-10">
                <h1 className="font-bold text-4xl">All Reservations</h1>
            </div>
            {reservations.map((reservation,index) => (
                <div className="grid grid-cols-8 border-y-2 py-5 font-semibold gap-2">
                    <div className="flex flex-col items-center text-center justify-center">
                        {reservation.reservationName}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {reservation.activePhone}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {reservation.user.email}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {reservation.service.serviceName}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {reservation.branch.name}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {reservation.reservationTime.toLocaleString()}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {reservation.stylist.name}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleDelete(reservation.id)} className="bg-red-600 text-white rounded-full px-5 py-3">
                            Delete
                        </button>
                    </div>
                </div>
            ))}   
            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                closeToast={() => setToast({ ...toast, isOpen: false })}
            />    
        </div>
    )
}