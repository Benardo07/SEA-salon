"use client";
import React, { useState } from 'react';
import Toast from "../toast";
import { ToastState } from "../loginForm";
import PopUpConfimation from '../popupConfirmation';
import { ServiceType } from './dashboard';
import ServicePopup from './servicePopup';
import { useRouter } from 'next/navigation';

export interface ServiceObject {
    id: string;
    serviceName: string;
    duration: number;  // Duration in minutes if that's the intended unit
    branchId: string;
    description: string;
    typeId: string;
    imgUrl: string;
    price: string;
    serviceType : {
        id: string;
        type: string;
    };
}

interface PropsData {
    services: ServiceObject[] | null | undefined;
    branchName: string  | null | undefined;
    servicetypes: ServiceType[];
    branchId : string;
}

export default function AdminService({ services,branchName, branchId , servicetypes }: PropsData) {
    const router = useRouter()
    const [showSerPop, setService] = useState<boolean>(false);
    const [popupConfirmation, showPopupConfirmation] = useState<boolean>(false);
    const [branchservice, setBranchService] = useState<ServiceObject[] | null | undefined>(services);
    const [selectedService, setSelectedService] = useState('');
    const [toast, setToast] = useState<ToastState>({
        isOpen: false,
        message: "",
        type: "error",
    });

    const handleDeleteClick = (id: string) => {
        // Deletion logic here
        setSelectedService(id);
        showPopupConfirmation(true);
    }

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/service', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  serviceId : selectedService,
                  branchId: branchId,
                })
              });
            const data = await response.json();

            if (response.ok) {
                console.log('Service Deleted:', data);
                setBranchService(data.newServices);
                setToast({ isOpen: true, message: "Delete Success", type: "success" });

            } else {
                setToast({ isOpen: true, message: "Delete Failed", type: "error" });

            }
        }catch (error){
            setToast({ isOpen: true, message: "Delete Failed", type: "error" });
        }finally{
            showPopupConfirmation(false)
        }
        
    }
    
    const handleBack = (id: string) => {
        router.push('/adminDashboard')
        router.refresh();
    }
    const handleAddService = (id: string) => {
        setService(true);
    };
    
    return (
        <div className="w-4/5 min-h-screen flex flex-col items-center py-24">
            {popupConfirmation && (<PopUpConfimation handleCancel={showPopupConfirmation} handleDelete={handleDelete} type='review'/>)}
            {showSerPop && <ServicePopup branchId={branchId} serviceTypes={servicetypes} onClose={setService}/>}
            <div className="flex w-full justify-between items-center p-10">
                <h1 className="font-bold text-4xl">All Services in {branchName}</h1>
                <div className='flex flex-row gap-10'>
                    <button onClick={() => handleAddService(branchId)} className="bg-[#1980e6] text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                        Add Service
                    </button>
                    <button onClick={() => handleBack(branchId)} className="bg-[#1980e6] text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                        Back Dashboard
                    </button>
                </div>
                
            </div>
            {branchservice ? branchservice.map((service, index) => (
                <div key={service.id} className="w-full grid grid-cols-6 border-y-2 py-5 font-semibold gap-2">
                    <div className="flex flex-col items-center text-center justify-center">
                        {service.serviceName}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {service.duration}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {service.price}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {service.serviceType.type}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {service.description}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleDeleteClick(service.id)} className="bg-red-600 text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            Delete
                        </button>
                    </div>
                </div>
            )) : (
                <p>No services available.</p>
            )}

            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                closeToast={() => setToast({ ...toast, isOpen: false })}
            />
        </div>
    );
}
