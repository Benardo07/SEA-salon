import React, { useEffect, useState } from 'react';
import { ToastState } from './loginForm';
import { useRouter } from 'next/navigation';
import Toast from './toast';
import { tr } from '@faker-js/faker';
import { Branch } from '@/app/reservation/page';
import Loading from '@/app/loading';

interface PropsData {
    onClose: (condition: boolean) => void;
    branch: Branch | null;
}

interface FormData {
    branchName: string;
    branchTelp: string;
    branchAddress: string;
    openTime: string;
    closeTime: string;
    gmapsUrl: string;
}

interface FormErrors {
    branchName?: string;
    branchTelp?: string;
    branchAddress?: string;
    openTime?: string;
    closeTime?: string;
    gmapsUrl?: string;
}

export default function BranchPopup({onClose , branch} : PropsData) {
    const router = useRouter();
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [isupdate, setIsUpdate] = useState<boolean>(false);
    const [toast, setToast] = useState<ToastState>({
        isOpen: false,
        message: "",
        type: "error",
      });
    const [formData, setFormData] = useState<FormData>({
        branchName: '',
        branchTelp: '',
        branchAddress: '',
        openTime: '',
        closeTime: '',
        gmapsUrl: ''
    });

    useEffect(() => {
        if (branch) {
          setFormData({
            branchName: branch.name,
            branchTelp: branch.branchTelp,
            branchAddress: branch.address,
            openTime: branch.openingTime,
            closeTime: branch.closingTime,
            gmapsUrl: branch.locationURL || ''
          });
          setIsUpdate(true);
        }
      }, [branch]);

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = {};

        if (!formData.branchName) {
            newErrors.branchName = 'Branch name is required';
            isValid = false;
        }
        if (!formData.branchTelp) {
            newErrors.branchTelp = 'Branch telephone is required';
            isValid = false;
        }
        if (!formData.branchAddress) {
            newErrors.branchAddress = 'Branch address is required';
            isValid = false;
        }
        if (!formData.openTime) {
            newErrors.openTime = 'Opening time is required';
            isValid = false;
        }
        if (!formData.closeTime) {
            newErrors.closeTime = 'Closing time is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form data:', formData);
            setIsLoading(true)
            if(isupdate){
                try {
                    const response = await fetch('/api/branch', {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: branch?.id,
                            branchName: formData.branchName,
                            gmapsUrl: formData.gmapsUrl,
                            openTime: formData.openTime,
                            closeTime: formData.closeTime,
                            branchTelp: formData.branchTelp,
                            branchAddress: formData.branchAddress,
                        })
                      });
                      const data = await response.json();
                    if (response.ok) {
                        
                        setToast({ isOpen: true, message: "Update Success", type: "success" });
                    
                        router.push('/adminDashboard');
                        router.refresh()
        
                        
                    } else {
                        setToast({ isOpen: true, message: "Write Failed", type: "error" });
                        throw new Error(data.message || 'Failed to create branch');
                    }
                }catch(error){
                    setToast({ isOpen: true, message: "Write Failed", type: "error" });
                }finally{
                    setIsLoading(false);
                }
            }else{
                try {
                    const response = await fetch('/api/branch', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                      });
                      const data = await response.json();
                    if (response.ok) {
                        
                        setToast({ isOpen: true, message: "Write Success", type: "success" });
                    
                        router.push('/adminDashboard');
                        router.refresh()
        
                        
                    } else {
                        setToast({ isOpen: true, message: "Write Failed", type: "error" });
                        throw new Error(data.message || 'Failed to create branch');
                    }
                }catch(error){
                    setToast({ isOpen: true, message: "Write Failed", type: "error" });
                }finally{
                    setIsLoading(false);
                }
            }
            
            
        } else {
            alert('Please fill all required fields.');
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="w-1/2 h-2/3 min-w-[300px] max-h-[600px] bg-white rounded-3xl flex flex-col p-4">
                {isloading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="loader"></div>
                    </div>
                )}    
                <h1 className="font-bold text-3xl">Add New Branch</h1>
                <form className="flex flex-col overflow-scroll scrollable-form" onSubmit={handleSubmit}>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Branch Name</p>
                            <input
                                type="text"
                                name='branchName'
                                placeholder="Enter your Branch name"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
                                value={formData.branchName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        {errors.branchName && <p className="text-red-500 text-sm mt-1">{errors.branchName}</p>}
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Branch Telp</p>
                            <input
                                type="text"
                                name='branchTelp'
                                placeholder="Enter your Branch Telp"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
                                value={formData.branchTelp}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        {errors.branchTelp && <p className="text-red-500 text-sm mt-1">{errors.branchTelp}</p>}
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#111518] text-base font-bold leading-normal pb-2">Branch Address</p>
                                <input
                                    type="text"
                                    name='branchAddress'
                                    placeholder="Enter your full name"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
                                    value={formData.branchAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            {errors.branchAddress && <p className="text-red-500 text-sm mt-1">{errors.branchAddress}</p>}
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#111518] text-base font-bold leading-normal pb-2">Open time</p>
                                <input
                                    type="time"
                                    name="openTime"
                                    className="form-input rounded-xl border border-[#dbe1e6] bg-white h-10 px-4"
                                    value={formData.openTime}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.openTime && <p className="text-red-500 text-sm mt-1">{errors.openTime}</p>}
                            </label>
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#111518] text-base font-bold leading-normal pb-2">Close time</p>
                                <input
                                    type="time"
                                    name="closeTime"
                                    className="form-input rounded-xl border border-[#dbe1e6] bg-white h-10 px-4"
                                    value={formData.closeTime}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.closeTime && <p className="text-red-500 text-sm mt-1">{errors.closeTime}</p>}
                            </label>
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#111518] text-base font-bold leading-normal pb-2">Embemded Gmaps URL (Optional)</p>
                                <input
                                    type="text"
                                    name='gmapsUrl'
                                    placeholder="Enter your full name"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
                                    value={formData.gmapsUrl}
                                    onChange={handleChange}
                                />
                            </label>
                    </div>
                    <div className="flex items-center justify-center gap-20 font-bold w-full mt-5">
                        <button type="button" onClick={() => onClose(false)} className="px-5 py-3 rounded-full border-2">Cancel</button>
                        <button type="submit" className="px-5 py-3 rounded-full bg-[#1980e6] text-white">{isupdate? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                closeToast={() => setToast({ ...toast, isOpen: false })}
            />
            
        </div>
    )
}