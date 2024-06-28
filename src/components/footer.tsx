import Link from "next/link";

export default function Footer(){
    return (
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="/">Home</Link>
                <Link className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="/services">Services</Link>
                <Link className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="/branches">Branch</Link>
                <Link className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="/reviewPage">Review</Link>
                <Link className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="/#contact">Contact</Link>
              </div>
              <p className="text-[#4e7397] text-base font-normal leading-normal">@2023 SEA Salon</p>
            </footer>
          </div>
        </footer>
      );
}