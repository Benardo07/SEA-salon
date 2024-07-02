import Image from "next/image"
import { ServiceType } from "./dashboard"
import { useState } from "react";
import Toast from "../toast";
import { ToastState } from "../loginForm";
import PopUpConfimation from "../popupConfirmation";
import ServiceTypePopup from "./serviceTypePopup";

interface PropsData {
    serviceTypes: ServiceType[]
    updateTypes: (newReviews: ServiceType[]) => void;
}
export default function ServiceTypesAdmin({serviceTypes, updateTypes} : PropsData){
    const [popupConfirmation, showPopupConfirmation] = useState<boolean>(false);
    const [showAddTypes, setShowAddTypes] = useState<boolean>(false);
    const [selectedTypes, setSelectedTypes] = useState('');
    const handleDeleteClick = (id: string) => {
        // Deletion logic here
        setSelectedTypes(id);
        showPopupConfirmation(true);
    }
    const [toast, setToast] = useState<ToastState>({
        isOpen: false,
        message: "",
        type: "error",
    });

    const handleAddService = () => {
        setShowAddTypes(true);
    }

    async function handleDelete() {
        try{
            const response = await fetch('/api/serviceType', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id : selectedTypes
                })
              });
            const data = await response.json();

            if (response.ok) {
                console.log('Review Deleted:', data);
                updateTypes(data.newTypes)
                setToast({ isOpen: true, message: "Delete Success", type: "success" });

            } else {
                setToast({ isOpen: true, message: "Delete Failed", type: "error" });

            }
        }catch(error){
            setToast({ isOpen: true, message: "Delete Failed", type: "error" });

        }finally{
            showPopupConfirmation(false);
        }
            
              
        
    }
    return (
        <div className="w-full flex flex-col ">
            {showAddTypes && <ServiceTypePopup onClose={setShowAddTypes} />}
            <div className="flex w-full justify-between items-center p-10">
                <h1 className="font-bold text-4xl">All Reviews</h1>
                <button onClick={handleAddService} className="bg-[#1980e6] text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                    Add Service Types
                </button>
            </div>
            {serviceTypes && (serviceTypes.map((serviceType,index) => (
                <div key={serviceType.id} className="grid grid-cols-3 border-y-2 py-5 font-semibold gap-2">
                    <div className="flex flex-col items-center text-center justify-center">
                        {serviceType.type}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                       {serviceType.imgUrl && (<Image alt="Service Type" src={serviceType.imgUrl} width={100} height={100}></Image>)} 
                    </div>
                    
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleDeleteClick(serviceType.id)} className="bg-red-600 text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            Delete
                        </button>
                    </div>
                </div>
            )))}
            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                closeToast={() => setToast({ ...toast, isOpen: false })}
            />   
            {popupConfirmation && (<PopUpConfimation handleCancel={showPopupConfirmation} handleDelete={handleDelete} type='serviceType'/>)}
        </div>
    )
}