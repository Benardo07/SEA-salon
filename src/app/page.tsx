import LandingPage from "@/components/homepage/landingpage";
import Image from "next/image";
import Homepage from "./homepage/page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f5fa]">
      <Homepage/>
    </div>
  );
}
