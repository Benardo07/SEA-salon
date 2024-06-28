import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
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

        const {rating , comment} = body;

        const newReview = await db.review.create({
            data: {
                starRating: rating,
                comment,
                userId: session.user.id
            }
        })

        return NextResponse.json(
            {
              message: "Succesfull create review"
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

        const deleteResult = await db.review.delete({
          where: { id: id as string },
        });

        const fetchedReviews = await db.review.findMany(
          {
              select : {
                  id: true,
                  createdAt: true,
                  starRating: true,
                  comment: true,
                  user : {select : {
                      fullName: true,
                      email: true,
                  }}
              }
          }
        )

        return NextResponse.json(
          {
            message: "Delete Review Succesfully",
            newReviews: fetchedReviews,
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