import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session?.user.email ){
            return NextResponse.json(
                {
                message: 'Unauthorized',
                },
                { status: 404 }
            );
        }

        const body = await req.json();
        const {stylistId, date} = body;

        const data = await findBookedTimes(stylistId,date);

        return NextResponse.json(
            {
            bookedTime: data,
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


async function findBookedTimes(stylistId: string, date: string): Promise<Array<{ startTime: Date, endTime: Date }>> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const reservations = await db.reservation.findMany({
        where: {
            stylistId,
            reservationTime: {
                gte: startDate,
                lt: endDate
            },
        },
        include: {
            service: true  // Include service details to access duration
        }
    });

    return reservations.map(reservation => {
        const startTime = reservation.reservationTime;
        const endTime = new Date(startTime.getTime() + reservation.service.duration * 60000); // Convert duration from minutes to milliseconds
        return {
            startTime: startTime,
            endTime: endTime,
        };
    });
}