"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '../toast';
import { ToastState } from '../loginForm';

interface FormData {
  serviceType: string;
  imgUrl?: string;
  imageFile?: File | null;
}

interface FormErrors {
  serviceType?: string;
  imgUrl?: string;
}

export default function ServiceTypePopup({ onClose }: { onClose: (condition: boolean) => void }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({ isOpen: false, message: '', type: 'error' });
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    imgUrl: '',
    imageFile: null
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData(prev => ({ ...prev, imageFile: file }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Service type is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const uploadImage = async (file: File): Promise<string> => {
    const { signature, timestamp } = await (await fetch('/api/signature')).json();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return response.ok ? data.url : '';
    } catch (error) {
      console.error('Error uploading file:', error);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ isOpen: true, message: 'Please fill all required fields correctly.', type: 'error' });
      return;
    }

    setIsLoading(true);
    let imageUrl = formData.imgUrl;

    if (formData.imageFile) {
      imageUrl = await uploadImage(formData.imageFile);
    }

    const body = {
      serviceType: formData.serviceType,
      imgUrl: imageUrl,
    };

    try {
      const response = await fetch('/api/serviceType', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok) {
        setToast({ isOpen: true, message: 'Service Type created successfully', type: 'success' });
        onClose(true);
        router.refresh();
      } else {
        throw new Error(data.message || 'Failed to create service type');
      }
    } catch (error) {
      setToast({ isOpen: true, message: 'Service Type creation failed', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader"></div>
        </div>
      )}
      <div className="w-1/2 h-2/3 min-w-[300px] max-h-[600px] bg-white rounded-3xl flex flex-col p-4">
        <h1 className="font-bold text-3xl">Add New Service Type</h1>
        <form className="flex flex-col overflow-scroll h-full" onSubmit={handleSubmit}>
          {/* Service Type Input */}
          <div className="flex flex-col p-4">
            <label className="text-[#111518] text-base font-bold leading-normal pb-2">Service Type</label>
            <input type="text" name="serviceType" value={formData.serviceType} onChange={handleChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal" />
            {errors.serviceType && <p className="text-red-500">{errors.serviceType}</p>}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col p-4">
            <label className="text-[#111518] text-base font-bold leading-normal pb-2">Service Image</label>
            <input type="file" name="imageFile" onChange={handleFileChange} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal" />
            {errors.imgUrl && <p className="text-red-500">{errors.imgUrl}</p>}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 p-4">
            <button type="button" onClick={() => onClose(false)} className="px-5 py-3 rounded-full border-2 hover:bg-opacity-75 transition duration-300 ease-in-out">Cancel</button>
            <button type="submit" className="px-5 py-3 rounded-full bg-[#1980e6] text-white hover:bg-opacity-75 transition duration-300 ease-in-out">Create</button>
          </div>
        </form>

        {/* Toast for notifications */}
        <Toast
          isOpen={toast.isOpen}
          message={toast.message}
          type={toast.type}
          closeToast={() => setToast({ ...toast, isOpen: false })}
        />
      </div>
    </div>
  );
}
