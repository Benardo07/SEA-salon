
import SignupForm from "@/components/signUpForm"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Register(){
    const session = await getServerSession(authOptions);

    if(session && session.user.email){
        redirect('/');
    }
    return (
        <div className="flex items-center justify-center"><SignupForm/></div>
    )
}