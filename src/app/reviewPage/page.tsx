import ReviewPage from "@/components/review/review";
import Reviews from "@/components/review/reviews";
import { db } from "@/lib/db";

export default async function ReviewList(){
    const reviews = await db.review.findMany({
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

      console.log("ini review" , reviews);
      
    return (
    <div className="w-full flex items-center justify-center">
        {/* <ReviewPage/> */}
        <Reviews reviews={fetchedReviews}/>
    </div>)
}