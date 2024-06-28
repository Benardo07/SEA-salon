"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage(){
    const router = useRouter();
    const handleSearch = () => {
      router.push('/services');
    }
    const handleBook = () => {
      router.push('/reservation');
    }
    const handleReview = () => {
      router.push('/reviewForm');
    }
    return (
        <div className="flex relative min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4">
            <Image src="https://cdn.usegalileo.ai/sdxl10/88c19344-3680-42b7-8d6a-a617329507eb.png" alt="landing page" objectFit="cover" layout="fill" className="z-0"></Image>
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] text-center z-10">
            Beauty and Elegance Redefined
          </h1>
          <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] z-10">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-[#4e7397] flex border border-[#d0dbe7] bg-slate-50 items-center justify-center pl-[15px] rounded-l-xl border-r-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for service"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-full placeholder:text-[#4e7397] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                
              />
              <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#d0dbe7] bg-slate-50 pr-[7px]">
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                  onClick={handleSearch}
                >
                  <span className="truncate">Search</span>
                </button>
              </div>
            </div>
          </label>
          <div className="z-10 flex flex-row gap-2 lg:gap-10">
                <button
                    className="flex md:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 md:h-10 px-3 md:px-4 bg-white text-black hover:bg-slate-500 duration-300 text-sm font-bold leading-normal tracking-[0.015em]"
                    onClick={handleBook}
                  >
                    <span className="">Book Now</span>
                </button>
                <button
                    className="flex md:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 md:h-10 px-3 md:px-4 bg-white text-black hover:bg-slate-500 duration-300 text-sm font-bold leading-normal tracking-[0.015em]"
                    onClick={handleReview}
                  >
                    <span className="">Write a Review</span>
                </button>
          </div>
        </div>
      );
}