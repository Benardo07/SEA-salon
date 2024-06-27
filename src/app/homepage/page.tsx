import Contact from "@/components/contact";
import LandingPage from "@/components/landingpage";
import ServicePage from "@/components/servicepage";
import { useRef } from "react";

export default async function Homepage(){

    return(
        <div className="max-w-[1260px] w-3/4 gap-16 flex-col ">
            <LandingPage/>
            <ServicePage/>
            <div id="contact">
                    <Contact />
            </div>
        </div>
    )
}