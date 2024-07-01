"use client"
import { Stylist } from "@/app/reservation/page"
import { useRouter } from "next/navigation";
import { useState } from "react";
import PopUpConfimation from "./popupConfirmation";
import Image from "next/image";
import Toast from "./toast";
import { ToastState } from "./loginForm";
import StylistPopup from "./stylistPopup";


interface DataProps {
    stylists: Stylist[] | null | undefined;
    branchname: string | undefined;
    branchId : string ;
}

export default function AdminStylist({stylists , branchname, branchId} : DataProps){
    const router = useRouter()
    const [popupConfirmation, showPopupConfirmation] = useState<boolean>(false);
    const [showPopup, setshowPopup] = useState<boolean>(false);
    const [selectedStylist, setSelectedStylist] = useState('');
    const [toast, setToast] = useState<ToastState>({
        isOpen: false,
        message: "",
        type: "error",
    });
    const handleAddStylist = (id: string) => {
        setshowPopup(true);
    };

    const handleDeleteClick = (id: string) => {
        setSelectedStylist(id);
        showPopupConfirmation(true);
    }
    const handleBack = () => {
        router.push('/adminDashboard')
        router.refresh();
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/stylist', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  stylistId : selectedStylist
                })
              });
            const data = await response.json();

            if (response.ok) {
                setToast({ isOpen: true, message: "Delete Success", type: "success" });
                router.refresh()

            } else {
                setToast({ isOpen: true, message: "Delete Failed", type: "error" });

            }
        }catch (error){
            setToast({ isOpen: true, message: "Delete Failed", type: "error" });
        }finally{
            showPopupConfirmation(false)
        }
        
    }
    return (
        <div className="w-4/5 min-h-screen flex flex-col items-center py-24">
        {popupConfirmation && (<PopUpConfimation handleCancel={showPopupConfirmation} handleDelete={handleDelete} type='review'/>)}
        {showPopup && (<StylistPopup onClose={setshowPopup} branchId={branchId}/>)}
        <div className="flex w-full justify-between items-center p-10">
            <h1 className="font-bold text-4xl">All Stylist in {branchname}</h1>
            <div className='flex flex-row gap-10'>
                <button onClick={() => handleAddStylist(branchId)} className="bg-[#1980e6] text-white rounded-full px-5 py-3">
                    Add Stylist
                </button>
                <button onClick={() => handleBack()} className="bg-[#1980e6] text-white rounded-full px-5 py-3">
                    Back Dashboard
                </button>
            </div>
            
        </div>
        {stylists ? stylists.map((stylist, index) => (
            <div key={stylist.id} className="w-full grid grid-cols-4 border-y-2 py-5 font-semibold gap-2">
                <div className="flex flex-col items-center text-center justify-center">
                    {stylist.name}
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                    {stylist.gender}
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                    <Image src={stylist.imgUrl} width={100} height={133} alt="stylist"></Image>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <button onClick={() => handleDeleteClick(stylist.id)} className="bg-red-600 text-white rounded-full px-5 py-3">
                        Delete
                    </button>
                </div>
            </div>
        )) : (
            <p>No Stylist in this branch.</p>
        )}

        <Toast
            isOpen={toast.isOpen}
            message={toast.message}
            type={toast.type}
            closeToast={() => setToast({ ...toast, isOpen: false })}
        />
    </div>
    )
}