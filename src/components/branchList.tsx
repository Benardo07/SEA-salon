"use client";
import { Branch } from "@/app/reservation/page"
import { useState } from "react";
import PopupMaps from "./popupMaps";
import { ur } from "@faker-js/faker";

interface propsData {
    branches : Branch[];
}
export default function BranchList({branches} : propsData){
    const [popup, showPopup] = useState<boolean>(false);
    const [url, setUrl] = useState('');
    const handleMapClick = (locationURL: string | null | undefined) => {
        if (locationURL) {
            setUrl(locationURL);
            showPopup(true);
          }
    }

    
    return (
        <div className="flex w-2/3 max-w-[1260px] flex-col items-center justify-center gap-10 py-20">
            {popup && (<PopupMaps locationURL={url} onClose={() => showPopup(false)}/>)}
            <h1 className="text-3xl font-bold text-black">All Branch</h1>
            <div className="flex flex-row gap-10 flex-wrap items-center w-full justify-center">
                {branches.map((branch) => (
                    <div key={branch.id} className="flex flex-col justify-center gap-3 rounded-2xl border-2 w-80 p-4 min-h-[250px]">
                        <p className='font-bold'>{branch.name}</p>
                        <p>{branch.address}</p>
                        <p>Open {branch.openingTime} - Close {branch.closingTime}</p>
                        <p>{branch.branchTelp}</p>
                        {branch.locationURL && (
                            <div className="w-full flex justify-end">
                                <button className="px-4 py-2 font-bold bg-[#1980e6] hover:bg-opacity-55 rounded-full" onClick={() => handleMapClick(branch.locationURL)}>View Map</button>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    )
}