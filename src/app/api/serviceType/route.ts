import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
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

        const {id} = body;

        const deleteResult = await db.serviceType.delete({
          where: { id: id as string },
        });

        const fetchedType = await db.serviceType.findMany();

        return NextResponse.json(
          {
            message: "Delete ServieType Succesfully",
            newTypes: fetchedType,
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

export async function POST(req: Request) {
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

        const {serviceType, imgUrl} = body;

        const createResult = await db.serviceType.create({
          data : {
            type : serviceType,
            imgUrl: imgUrl,
          }
        });

        const fetchedType = await db.serviceType.findMany();

        return NextResponse.json(
          {
            message: "Create ServieType Succesfully",
            newTypes: fetchedType,
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