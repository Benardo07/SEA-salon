import React, { useState } from 'react';
import { Branch } from "@/app/reservation/page";
import BranchPopup from "./branchPopup";
import ServicePopup from "./servicePopup";
import { ServiceType } from "./dashboard";

interface DataProps {
    branches: Branch[];
    serviceTypes: ServiceType[];
    updateBranch: (newbranches: Branch[]) => void;
}

export default function AdminBranch({ branches, serviceTypes, updateBranch }: DataProps) {
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [showSerPop, setService] = useState<boolean>(false);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

    const handleAddBranch = () => {
        setSelectedBranch(null);  // Ensure the form is cleared when adding a new branch
        setShowPopUp(true);
    };

    const handleEditBranch = (branch: Branch) => {
        setSelectedBranch(branch);  // Set the selected branch for editing
        setShowPopUp(true);
    };

    const handleAddService = (branch: Branch) => {
        setSelectedBranch(branch);  // Set the selected branch for service addition
        setService(true);
    };

    return (
        <div className="w-full flex flex-col ">
            <div className="flex w-full justify-between items-center p-10">
                <h1 className="font-bold text-4xl">All Branches</h1>
                <button className="bg-[#1980e6] text-white font-bold rounded-full px-5 py-3" onClick={handleAddBranch}>
                    Add Branch
                </button>
            </div>
            {branches.map((branch, index) => (
                <div key={index} className="grid grid-cols-7 border-y-2 py-5 font-semibold gap-2">
                    <div className="flex flex-col items-center text-center justify-center">
                        {branch.name}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {branch.address}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {branch.openingTime}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {branch.closingTime}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleAddService(branch)} className="bg-[#1980e6] text-white rounded-full px-5 py-3">
                            Add Service
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleEditBranch(branch)} className="bg-[#1980e6] text-white rounded-full px-5 py-3">
                            Edit
                        </button>
                    </div>
                </div>
            ))}
            {showPopUp && <BranchPopup branch={selectedBranch} onClose={setShowPopUp}/>}
            {showSerPop && <ServicePopup branchId={selectedBranch ? selectedBranch.id : null} serviceTypes={serviceTypes} onClose={setService}/>}
        </div>
    );
}
