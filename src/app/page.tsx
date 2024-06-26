import LandingPage from "@/components/landingpage";
import Image from "next/image";
import Homepage from "./homepage/page";

export default function Home() {
  return (
    <div className="flex w-full items-center justify-center bg-[#f0f5fa]">
      <Homepage/>
    </div>
  );
}
