import Contact from "@/components/contact";
import LandingPage from "@/components/landingpage";
import ServicePage from "@/components/servicepage";
import RevealRL from "@/components/ui/animations/revealIRL";
import RevealTitle from "@/components/ui/animations/revealTitile";
import RevealDesc from "@/components/ui/animations/revealdesc";
import { useRef } from "react";

export default async function Homepage(){

    return(
        <div className="max-w-[1260px] w-3/4 gap-16 flex-col ">
            <RevealTitle custom={1} >
                <LandingPage/>
            </RevealTitle>

            <RevealDesc custom={2}>
                <ServicePage/>
            </RevealDesc>
            <RevealRL custom={2}>
                <div id="contact">
                        <Contact />
                </div>
            </RevealRL>
        </div>
    )
}