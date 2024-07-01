import React, { useState, useEffect } from 'react';
import { ToastState } from './loginForm';
import { useRouter } from 'next/navigation';
import Toast from './toast';
import { Branch} from '@/app/reservation/page';
import { ServiceType } from './dashboard';
import { ServiceObject } from './adminService';

interface PropsData {
    onClose: (condition: boolean) => void;
    serviceTypes: ServiceType[];
    branchId: string | null | undefined;
}

interface FormData {
    serviceName: string;
    duration: number;
    description: string;
    typeId: string;
    imgUrl?: string;
    imageFile?: File | null;
    price: string;
}

interface FormErrors {
    serviceName?: string;
    duration?: string;
    description?: string;
    typeId?: string;
    imgUrl?: string;
    price?: string;
}

export default function ServicePopup({ onClose,serviceTypes, branchId }: PropsData) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>({ isOpen: false, message: '', type: 'error' });
    const [formData, setFormData] = useState<FormData>({
        serviceName: '',
        duration: 0,
        description: '',
        typeId: '',
        price: '',
        imgUrl: '',
        imageFile: undefined 
    });
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        // Cleanup or additional effects if needed
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files ) {
            const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
            setFormData(prev => ({ ...prev, imageFile: file }));
        }
    };


    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = {};
    
        if (!formData.serviceName.trim()) {
            newErrors.serviceName = 'Service name is required.';
            isValid = false;
        }
    
        if (formData.duration <= 0) {
            newErrors.duration = 'Duration must be a positive number.';
            isValid = false;
        }
    
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required.';
            isValid = false;
        }
    
        if (!formData.typeId) {
            newErrors.typeId = 'Please select a service type.';
            isValid = false;
        }
    
        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price.';
            isValid = false;
        }
    
        // Validate image file if required, assuming you want to check for an image
        if (formData.imageFile && !formData.imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            newErrors.imgUrl = 'Please upload a valid image (jpg, jpeg, png, gif).';
            isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
    };

    const handleServiceClick = (id: string)=> {
        setFormData(prev => ({ ...prev, typeId: id }));
    }

    const uploadFileToCloudinary = async (file : File) => {
        if (!file) return '';
    
        const { signature, timestamp } = await (await fetch('/api/signature')).json();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
    
        const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    
        if (!apiKey || !cloudName) {
          console.error('Cloudinary API key or cloud name is not defined.');
          return '';
        }
    
        formData.append('api_key', apiKey);
    
        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          console.log("ini data url",data.url);
          return response.ok ? data.url : '';
    
        } catch (error) {
          console.error('Error uploading file:', error);
          return '';
        }
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Please fill all required fields.');
            return;
        }

        setIsLoading(true);
        console.log(formData);
        let imageUrl = '';
        
        if (formData.imageFile) {
            // Assume a function uploadImage exists to handle file uploads
            imageUrl = await uploadFileToCloudinary(formData.imageFile);
        }

        console.log(imageUrl);

        const body = {
            ...formData,
            imgUrl: imageUrl,
            branchId
        };

        try {
            const response = await fetch('/api/service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (response.ok) {
                setToast({ isOpen: true, message: 'Service created successfully', type: 'success' });
                onClose(true);
                router.refresh();
            } else {
                throw new Error(data.message || 'Failed to create service');
            }
        } catch (error) {
            setToast({ isOpen: true, message: 'Service creation failed', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="w-1/2 h-2/3 min-w-[300px] max-h-[600px] bg-white rounded-3xl flex flex-col p-4">
                {isLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="loader"></div>
                    </div>
                )}
                <h1 className="font-bold text-3xl">Add New Service</h1>
                <form className="flex flex-col overflow-scroll h-full scrollable-form" onSubmit={handleSubmit}>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Service Name</p>
                            <input
                                type="text"
                                name="serviceName"
                                placeholder="Enter service name"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
                                value={formData.serviceName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        {errors.serviceName && <p className="text-red-500 text-sm mt-1">{errors.serviceName}</p>}
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Duration</p>
                            <input
                                type="number"
                                name="duration"
                                placeholder="Enter duration"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Description</p>
                            <input
                                type="text"
                                name="description"
                                placeholder="Enter description"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Type ID</p>
                            <div className="flex flex-wrap gap-3 p-4">
                                {serviceTypes.map((type, index) => (
                                <label
                                    key={index}
                                    className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe1e6] px-4 h-11 text-[#111518] relative cursor-pointer ${formData.typeId === type.id ? 'border-[3px] border-[#2094f3]' : ''}`}
                                >
                                    {type.type}
                                    <input type="radio" className="invisible absolute" name="serviceType" checked={formData.typeId === type.id} onChange={() => handleServiceClick(type.id)} />
                                </label>
                                ))}
                            </div>
                        </label>
                        {errors.typeId && <p className="text-red-500 text-sm mt-1">{errors.typeId}</p>}
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Image URL</p>
                            <p>Choose input option</p>
                            
                            <input type="file" name="imageFile" onChange={handleFileChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"/>
 
                        </label>
                        {errors.imgUrl && <p className="text-red-500 text-sm mt-1">{errors.imgUrl}</p>}
                    </div>
                    <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Price</p>
                            <input
                                type="text"
                                name="price"
                                placeholder="Enter price"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>
                    <div className="flex items-center justify-center gap-20 font-bold w-full mt-5">
                        <button type="button" onClick={() => onClose(false)} className="px-5 py-3 rounded-full border-2">Cancel</button>
                        <button type="submit" className="px-5 py-3 rounded-full bg-[#1980e6] text-white">Create</button>
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
    );
}
