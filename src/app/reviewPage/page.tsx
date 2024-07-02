import ReviewPage from "@/components/review/review";
import Reviews from "@/components/review/reviews";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic'

export default async function ReviewList(){
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
    return (
    <div className="w-full flex items-center justify-center">
        {/* <ReviewPage/> */}
        <Reviews reviews={fetchedReviews}/>
    </div>)
}