import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    try{
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

        const {serviceName, duration, description,typeId,price, imgUrl,imageFile, branchId} = body;
        const newService = await db.service.create({
            data: {
                serviceName,
                duration: parseInt(duration),
                branchId,
                description,
                typeId,
                imgUrl,
                price
            }
        })
        const branch = await db.branch.findUnique({
          where: {id :branchId },
          select : {
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
                      serviceType: {
                          select: {
                              id: true,
                              type: true
                          }
                      }
                  }
              },
          }
      })

        return NextResponse.json(
            {
              message: "Succesfull Create Service",
              newServices: branch?.services
            },
            { status: 201 }
        );


    }catch(error){
        console.log(error)
        return NextResponse.json(
            {
              message: "Internal Server Error"
            },
            { status: 500 }
          );
    }
}

export async function DELETE(req : Request) {
  try{
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

      const {serviceId, branchId} = body;
      const newService = await db.service.delete({
        where: {
          id: serviceId,
        }
      })

      const branch = await db.branch.findUnique({
        where: {id :branchId },
        select : {
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
                    serviceType: {
                        select: {
                            id: true,
                            type: true
                        }
                    }
                }
            },
        }
    })

      return NextResponse.json(
          {
            message: "Succesfull Delete Service",
            newServices: branch?.services
          },
          { status: 201 }
      );


  }catch(error){
      console.log(error)
      return NextResponse.json(
          {
            message: "Internal Server Error"
          },
          { status: 500 }
        );
  }
}