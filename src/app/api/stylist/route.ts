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

        const {stylistId} = body;

        const deleteResult = await db.stylist.delete({
          where: { id: stylistId as string },
        });



        return NextResponse.json(
          {
            message: "Delete Stylist Succesfully",

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

        const {branchId, name, gender, imgUrl, imageFile} = body;

        const createResult = await db.stylist.create({
            data: {
                name: name,
                gender: gender,
                branchId: branchId,
                imgUrl : imgUrl
            }
        });



        return NextResponse.json(
          {
            message: "Create Stylist Succesfully",

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