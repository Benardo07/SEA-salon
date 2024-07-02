"use client";
import React, { useState } from 'react';
import { Branch } from "@/app/reservation/page";
import BranchPopup from "./branchPopup";
import ServicePopup from "./servicePopup";
import { ServiceType } from "./dashboard";
import { useRouter } from 'next/navigation';
import Toast from './toast';
import { ToastState } from './loginForm';
import PopUpConfimation from './popupConfirmation';
import StylistPopup from './stylistPopup';

interface DataProps {
    branches: Branch[];
    serviceTypes: ServiceType[];
    updateBranch: (newbranches: Branch[]) => void;
}

export default function AdminBranch({ branches, serviceTypes, updateBranch }: DataProps) {
    const router = useRouter();
    const [popupConfirmation, showPopupConfirmation] = useState<boolean>(false);
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [showStylistPopup, setshowStylisPopup] = useState<boolean>(false);
    const [showSerPop, setService] = useState<boolean>(false);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [toast, setToast] = useState<ToastState>({
        isOpen: false,
        message: "",
        type: "error",
    });

    const handleAddBranch = () => {
        setSelectedBranch(null);  // Ensure the form is cleared when adding a new branch
        setShowPopUp(true);
    };

    const handleViewService = (id: string) => {
        router.push(`/adminDashboard/branch/service/${id}`)
    }   
    const handleViewStylist = (id: string) => {
        router.push(`/adminDashboard/branch/stylist/${id}`)
    } 

    const handleEditBranch = (branch: Branch) => {
        setSelectedBranch(branch);  
        setShowPopUp(true);
    };

    const handleAddService = (branch: Branch) => {
        setSelectedBranch(branch);  
        setService(true);
    };

    const handleDeleteClick = (branch: Branch) => {
        setSelectedBranch(branch);
        showPopupConfirmation(true);
    }

    const handleAddStylist = (branch: Branch) => {
        setSelectedBranch(branch);
        setshowStylisPopup(true);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/branch', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  branchId: selectedBranch?.id,
                })
              });
            const data = await response.json();

            if (response.ok) {
                console.log('Branch Deleted:', data);
                
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
        <div className="w-full flex flex-col ">
            <div className="flex w-full justify-between items-center p-10">
                <h1 className="font-bold text-4xl">All Branches</h1>
                <button className="bg-[#1980e6] text-white font-bold rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out" onClick={handleAddBranch}>
                    Add Branch
                </button>
            </div>
            {branches.map((branch, index) => (
                <div key={index} className="grid grid-cols-9 border-y-2 py-5 font-semibold gap-2">
                    <div className="flex flex-col items-center text-center justify-center">
                        {branch.name}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {branch.address}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {branch.openingTime} - {branch.closingTime}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleAddService(branch)} className="bg-[#1980e6] text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            Add Service
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleAddStylist(branch)} className="bg-[#1980e6] text-white rounded-full  px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            Add Stylist
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleViewService(branch.id)} className="bg-[#1980e6] text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            View Service
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleViewStylist(branch.id)} className="bg-[#1980e6] text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            View Stylist
                        </button>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleEditBranch(branch)} className="bg-[#1980e6] text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            Edit
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleDeleteClick(branch)} className="bg-red-600 text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {popupConfirmation && (<PopUpConfimation handleCancel={showPopupConfirmation} handleDelete={handleDelete} type='branch'/>)}
            {showPopUp && <BranchPopup branch={selectedBranch} onClose={setShowPopUp}/>}
            {showSerPop && <ServicePopup branchId={selectedBranch ? selectedBranch.id : null} serviceTypes={serviceTypes} onClose={setService}/>}
            {showStylistPopup && selectedBranch && (<StylistPopup onClose={setshowStylisPopup} branchId={selectedBranch?.id}/>)}
            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                closeToast={() => setToast({ ...toast, isOpen: false })}
            />
        </div>
    );
}
