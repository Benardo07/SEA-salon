"use client";

import { useEffect, useRef, useState } from "react";

interface dataProps {
    locationURL : string;
    onClose : () => void;
}
export default function PopupMaps({locationURL, onClose} : dataProps) {
    const [loading, setLoading] = useState(true);
    const handleLoad = () => {
        setLoading(false);
      };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="w-1/3 h-2/3 bg-white p-5 min-w-[300px] min-h-[200px] flex flex-col gap-10 overflow-hidden rounded-lg shadow-lg items-center">
                <div className="w-full h-4/5">
                    {loading && (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="loader"></div>
                        </div>
                        )}
                
                    <iframe
                        id="frame"
                        src={locationURL}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        onLoad={handleLoad}
                        title="Google Maps"
                    ></iframe>
              
                    
                </div>
                <button className="px-4 py-3 bg-[#1980e6] rounded-full" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}