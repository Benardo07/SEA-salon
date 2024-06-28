import { db } from "@/lib/db";
import Dashboard from "../../components/dashboard";
import { tr } from "@faker-js/faker";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function adminDashboard() {

    const session = await getServerSession(authOptions)

    if(!session || !session.user.email){
        redirect('/login');
        
    }

    if(session.user.role != "ADMIN"){
        redirect('/notAdmin');
    }
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

      const fetchedServiceType = await db.serviceType.findMany();
    return (
        <div className="w-full flex items-center justify-center">
            <Dashboard branches={fetchedBranches} reviews={fetchedReviews} reservations={fetchedReservations} servicetypes={fetchedServiceType}/>
        </div>
    )
}