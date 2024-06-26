import ReviewPage from "@/components/review";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function reviewForm(){
    const session = await getServerSession(authOptions);
    if(!session || !session?.user.email){
        redirect('/login');
    }
    return (
        <div className="w-full flex items-center justify-center">
            <ReviewPage/>
        
    </div>)
    
}