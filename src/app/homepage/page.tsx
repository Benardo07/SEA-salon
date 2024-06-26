import Contact from "@/components/contact";
import LandingPage from "@/components/landingpage";
import ServicePage from "@/components/servicepage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Homepage(){
    const session = await getServerSession(authOptions);

    console.log(session)
    return(
        <div className="max-w-[1260px] w-3/4 gap-10 flex-col ">
            <LandingPage/>
            <ServicePage/>
            <Contact/>
        </div>
    )
}