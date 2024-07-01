import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session?.user.email || session.user.role != "ADMIN" ){
            return NextResponse.json(
                {
                  message: 'Unauthorized',
                },
                { status: 404 }
              );
        }

        const body = await req.json();
        const {branchName, branchTelp, branchAddress, openTime, closeTime, gmapsUrl} = body;

        const newBranch = await db.branch.create({
            data : {
                name: branchName,
                locationURL: gmapsUrl || null,
                openingTime: openTime,
                closingTime: closeTime,
                branchTelp: branchTelp,
                address: branchAddress,
            }
        })

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

        return NextResponse.json(
            {
              message: "Succesfull Create Reservation",
              newBranches: fetchedBranches
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

export async function PUT(req : Request) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session?.user.email  || session.user.role != "ADMIN"){
            return NextResponse.json(
                {
                  message: 'Unauthorized',
                },
                { status: 404 }
              );
        }

        const body = await req.json();
        const {id, branchName, branchTelp, branchAddress, openTime, closeTime, gmapsUrl} = body;

        const updatedBranch = await db.branch.update({
            where: { id: id as string },
            data: {
              name: branchName,
              locationURL: gmapsUrl !== '' ? gmapsUrl : null,
              openingTime: openTime,
              closingTime: closeTime,
              branchTelp: branchTelp,
              address: branchAddress,
            }
          });

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

        return NextResponse.json(
            {
              message: "Succesfull Updated Branch",
              newBranches: fetchedBranches
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
      if(!session || !session?.user.email  || session.user.role != "ADMIN"){
          return NextResponse.json(
              {
                message: 'Unauthorized',
              },
              { status: 404 }
            );
      }

      const body = await req.json();
      const {branchId} = body;

      const updatedBranch = await db.branch.delete({
          where: { id: branchId as string },
        });

      

      return NextResponse.json(
          {
            message: "Succesfull Delete branch",
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