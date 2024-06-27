import ReservationList from "@/components/reservationList";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function MyReservation(){

    const session = await getServerSession(authOptions);

    if(!session || !session.user.email){
        redirect("/login");
    }

    const now = new Date();
    const pastReservation = await db.reservation.findMany({
        where: {
            userId : session.user.id,
            reservationTime : {
                lt : now,
            },
            
        },
        orderBy: {
            reservationTime: 'desc', 
        },
        select: {
            reservationName : true,
            activePhone : true,
            service : {
                select: {
                    serviceName : true,
                },
            },
            branch : {
                select: {
                    name: true,
                }
            },
            reservationTime: true,
            stylist : {
                select: {
                    name : true,
                }
            }
        }
    });

    const activeReservation = await db.reservation.findMany({
        where: {
            userId : session.user.id,
            reservationTime : {
                gt : now,
            },
            
        },
        orderBy: {
            reservationTime: 'desc', 
        },
        select: {
            reservationName : true,
            activePhone : true,
            service : {
                select: {
                    serviceName : true,
                },
            },
            branch : {
                select: {
                    name: true,
                }
            },
            reservationTime: true,
            stylist : {
                select: {
                    name : true,
                }
            }
        }
    });
    return (    
        <div className="w-full flex items-center justify-center">
            <div className="max-w-[1260px] w-3/4 gap-10 flex items-center justify-center">
                <ReservationList pastReservation={pastReservation} activeReservation={activeReservation}/>
            </div>
        </div>
        
    )
}