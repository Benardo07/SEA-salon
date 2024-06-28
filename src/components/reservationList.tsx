 "use client";
import { useState } from "react"

interface ReservationObject{
    reservationName: string;
    activePhone: string;
    service: {
        serviceName: string;
    };
    branch: {
        name : string;
    };
    reservationTime: Date;
    stylist: {
        name : string;
    }

}

interface ReservationProps{
    pastReservation: ReservationObject[];
    activeReservation: ReservationObject[];
}
export default function ReservationList({pastReservation,activeReservation} : ReservationProps){
    const [showPastReservation, setShowPastReservation] = useState<boolean>(false);

    const showReservation = showPastReservation? pastReservation: activeReservation;
    const statusText = showPastReservation? "passed" : "active";
    
    return (
        <div className="w-full flex flex-col items-center py-20 text-black min-h-screen">
            <h1 className="text-center text-black text-3xl font-bold xl:text-4xl">
                My Reservation
            </h1>
            <div className="flex flex-row mb-10 mt-10 text-black">
                <button onClick={() => setShowPastReservation(false)} className={`px-5 py-3 text-2xl font-bold ${!showPastReservation ? 'bg-[#1980e6] text-white' : 'bg-gray-200'}`}>Active</button>
                <button onClick={() => setShowPastReservation(true)} className={`px-5 py-3 text-2xl font-bold ${showPastReservation ? 'bg-[#1980e6] text-white' : 'bg-gray-200'}`}>Past</button>
            </div>
            <div className="w-full flex flex-col gap-10 items-center">
                {showReservation.map((reservation,index) => (
                    <div key={index} className="grid grid-cols-7 w-full gap-4 items-center justify-center border-b-2 border-b-black shadow-lg p-4">
                        <div className="flex flex-col items-center justify-center">
                            {reservation.reservationName}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-lg text-center">{reservation.activePhone}</h3>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className='text-center'>{reservation.reservationTime.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className='text-center'>{reservation.branch.name}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className='text-center'>{reservation.service.serviceName}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className='text-center'>{reservation.stylist.name}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className={`px-4 py-2 w-20 flex items-center justify-center text-center rounded-3xl ${showPastReservation ? 'bg-gray-500' : 'bg-green-500'}`}>
                            {statusText}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                </div>
    )
}