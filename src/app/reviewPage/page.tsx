import ReviewPage from "@/components/review";
import Reviews from "@/components/reviews";
import { db } from "@/lib/db";

export default async function Review(){
    const reviews = await db.review.findMany({
        orderBy: {
          starRating: 'desc' // Sorts the reviews by starRating in descending order
        },
        select: {
          createdAt: true,
          starRating: true,
          comment: true,
          user: { // Include user details through select
            select: {
              fullName: true, // Assuming 'fullName' is the correct field name in your User model
              email: true
            }
          }
        }
      });
      
    return (
    <div className="w-full flex items-center justify-center">
        {/* <ReviewPage/> */}
        <Reviews reviews={reviews}/>
    </div>)
}