"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/db';
import { Branch } from '@/app/reservation/page';
import { useRouter } from 'next/navigation';



interface BranchModalProps {
  isOpen: boolean;
  branches:  Branch[];
  selected: Branch | undefined;
  onSelect: (branch : Branch) => void;
  onClose: () => void;
}


const BranchModal: React.FC<BranchModalProps> = ({ isOpen,branches, selected, onSelect, onClose }) => {
  const router = useRouter();  
  const [selectedBranch, setSelectedBranch] = useState<Branch>();
    useEffect(() => {
        if (selected) {
            setSelectedBranch(selected);
        }
    }, [selected]); // Only re-run the effect if `selected` changes
    const [errorMessage, setErrorMessage] = useState('');

    const handleSelectClick = () => {
        if (selectedBranch) {
        onSelect(selectedBranch);
        setErrorMessage('');  // Clear any existing error message
        } else {
        setErrorMessage('Please select a branch first.');  // Set error message if no branch is selected
        }
    };
    if (!isOpen) return null;

    const handleCancel = () => {
      if (!selectedBranch) {
          router.push('/'); // Navigate to the main page if no branch is selected
      } else {
          onClose(); // Otherwise, just close the modal
      }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white w-3/4 max-w-[800px] h-2/3 rounded-3xl flex flex-col gap-10 p-4">
        <h2 className='text-xl md:text-3xl font-bold'>Select a Branch</h2>
        <div className='overflow-auto flex flex-row items-center gap-6 flex-wrap justify-center scrollable-form'>
          {branches.map((branch) => (
            <div key={branch.id}
            className={`w-60  md:w-80 flex flex-col justify-center px-4 py-2 cursor-pointer rounded-2xl border-2 ${
              selectedBranch?.id === branch.id ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => setSelectedBranch(branch)}
          >
              <p className='font-bold'>{branch.name}</p>
              <p>{branch.address}</p>
              <p>Open {branch.openingTime} - Close {branch.closingTime}</p>
              <p>{branch.branchTelp}</p>
            </div>
          ))}
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}
        <div className='flex justify-center gap-4'>
            <button onClick={handleSelectClick} className="mt-4 py-3 w-28 rounded-full border">Select</button>
            
            <button onClick={handleCancel} className="mt-4 py-3 w-28 rounded-full border">Cancel</button>
            
        </div>
      </div>
    </div>
  );
};

export default BranchModal;
