"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ToastState } from "./loginForm";
import Toast from "./toast";

const paths = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "Services",
    url: "/services"
  },
  {
    name: "Reviews",
    url: "/reviewPage" // Updated to avoid repeated URLs for different navigation items
  },
  {
    name: "Contact",
    url: "/#contact" // Updated to reflect correct navigation logic
  },
  {
    name : "Branch",
    url: "/branches"
  },
  {
    name: "My Reservation",
    url: "/myReservation" // Assuming you want a separate page for reservations
  },
];

export default function Navbar() {
  const router = useRouter();
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "error",
  });
  
  const handleNavigation = (url: string) => {
    router.push(url);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      
      await signOut({ redirect: false });
      setToast({ isOpen: true, message: "Logout successful", type: "success" });

      setTimeout(() => {
        router.push('/login');
      }, 500); 
    } catch (error) {

      setToast({ isOpen: true, message: "Logout failed", type: "error" });
    }
  };

  const { data: session } = useSession();

  return (
    <header className="w-full h-20 flex items-center justify-between fixed z-[9999] border-b border-solid bg-white border-b-[#e7edf3] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0e141b]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em]">SEA Salon</h2>
      </div>

      <button
        className="flex absolute right-0 top-0 aspect-square h-full items-center justify-center xl:hidden"
        aria-label="Open Menu"
        onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
      >
        <Image src="/menu.png" alt="menu bar" width={50} height={50}></Image>
      </button>

      <div
        className={`fixed right-0 top-0 z-10 flex h-full bg-white w-[272px] flex-col items-center justify-center bg-red gap-6 duration-300 ease-in-out xl:static xl:bg-transparent xl:flex xl:h-auto xl:w-auto xl:justify-center xl:translate-x-0 xl:flex-row xl:items-center xl:gap-16 xl:bg-none ${
          isNavbarExpanded ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute right-0 top-0 aspect-square xl:hidden"
          aria-label="Open Menu"
          onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
        >
          <Image src="/arrow.png" alt="menu bar" width={50} height={50}></Image>
        </button>
        <div className="flex flex-col items-center gap-9 justify-center xl:flex-row">
          {paths.map((path) => (
            <Link key={path.name} href={path.url}>
              <span className="text-[#0e141b] text-sm font-medium leading-normal hover:underline">{path.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex xl:flex-row flex-col gap-5">
          {session && session.user ? (
              <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={handleLogout} // Add correct navigation URL
            >
              <span className="">Log Out</span>
            </button>
          ):(
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={() => handleNavigation('/login')} // Add correct navigation URL
            >
              <span className="">log In</span>
            </button>
          )}
          
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={() => handleNavigation('/reservation')} // Add correct navigation URL
          >
            <span className="">Book Now</span>
          </button>
        </div>
        
      </div>
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        closeToast={() => setToast({ ...toast, isOpen: false })}
      />
    </header>
  );
}
