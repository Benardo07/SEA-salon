
import LoginForm from "@/components/loginForm"
import Toast from "@/components/toast";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
export default async function Login(){
    const session = await getServerSession(authOptions);

    if(session && session.user.email){
        redirect('/');
    }
    return (
        <div className="flex items-center justify-center"><LoginForm/></div>
    )
}