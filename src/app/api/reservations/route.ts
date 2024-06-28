import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    try{
        const session = await getServerSession(authOptions);
        if(!session || !session?.user.email){
            return NextResponse.json(
                {
                  message: 'Unauthorized',
                },
                { status: 404 }
              );
        }

        const body = await req.json();

        const { reservationName, activePhone, serviceId, stylistId, branchId, reservationTime } = body;

        const newReservation = await db.reservation.create({
            data: {
              reservationName,
              activePhone,
              userId: session.user.id, 
              serviceId,
              stylistId,
              branchId,
              reservationTime: new Date(reservationTime),
            },
          });

          return NextResponse.json(
            {
              message: "Succesfull Create Reservation"
            },
            { status: 201 }
          );
    }catch(error){
        return NextResponse.json(
            {
              message: "Internal Server Error"
            },
            { status: 500 }
          );
    }
}

export async function DELETE(req : Request) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session?.user.email || session.user.role != "ADMIN"){
            return NextResponse.json(
                {
                  message: 'Unauthorized',
                },
                { status: 404 }
              );
        }

        

        const body = await req.json();
        const { reservationId } = body;
        
        const deleteResult = await db.reservation.delete({
            where: { id: reservationId as string },
        });

        const fetchedReservations = await db.reservation.findMany({
            select: {
                id:true,
                reservationName: true,
                activePhone: true,
                user : {
                    select: {
                        email: true,
                    }
                },
                service: {
                    select: {
                        serviceName: true,
                    }
                },
                branch: {
                    select: {
                        name: true,
                    }
                },
                reservationTime: true,
                stylist: {
                    select: {
                        name: true,
                    }
                }
    
            }
          })

          return NextResponse.json(
            {
              message: "Delete Reservation Succesfully",
              newReservations: fetchedReservations,
            },
            { status: 201 }
          );

    }catch (error){
        return NextResponse.json(
            {
              message: "Internal Server Error"
            },
            { status: 500 }
          );  
    }
}