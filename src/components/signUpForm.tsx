"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Toast from './toast'; // Assuming you are using a toast component
import { ToastState } from './loginForm';
import Link from 'next/link';
import LoadingSpinner from '../app/loading';
import Loading from '../app/loading';
import { useRouter } from 'next/navigation';


interface SignupFormInputs {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<SignupFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "error",
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    console.log(data);
    setLoading(true);
    if (Object.keys(errors).length === 0) { // Make sure there are no validation errors
      try {
        const response = await fetch('/api/user', { // Change '/api/user' to your actual API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setToast({ isOpen: true, message: "Signup successful", type: "success" });
          router.push("/login");
        } else {
          throw new Error(result.message || "Failed to sign up");
        }
      } catch (error) {
          setToast({ isOpen: true, message: "Failed to Sign Up", type: "error" });
      } finally{
        setLoading(false);
      }
    } else {
      setToast({ isOpen: true, message: "Validation errors", type: "error" });
    }
  };

  const handleChange = (field: keyof SignupFormInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(field, e.target.value, { shouldValidate: true });
    trigger(field);
  };

  if(loading){
    return <Loading />;
  }

  return (
    <div className="w-3/4 max-w-[500px] flex flex-col items-center justify-center py-40 gap-10">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center justify-center w-full">
        <div className="w-full">
          <input
            {...register("fullName", {
              required: "Full name is required"
            })}
            placeholder="Full Name"
            className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border ${errors.fullName ? 'border-red-500' : 'border-[#dbe1e6]'} bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal`}
            onChange={handleChange("fullName")}
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
        </div>
        <div className="w-full">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Entered value does not match email format"
              }
            })}
            placeholder="Email"
            className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border ${errors.email ? 'border-red-500' : 'border-[#dbe1e6]'} bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal`}
            onChange={handleChange("email")}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="w-full">
          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number must be numeric"
              }
            })}
            placeholder="Phone"
            className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border ${errors.phone ? 'border-red-500' : 'border-[#dbe1e6]'} bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal`}
            onChange={handleChange("phone")}
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="w-full relative">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              }
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border ${errors.password ? 'border-red-500' : 'border-[#dbe1e6]'} bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal`}
            onChange={handleChange("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-4 flex items-center text-gray-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="mt-4 rounded-lg py-3 px-5 sm:w-[350px] w-full text-white bg-[#1980e6] hover:bg-[#136bb3] transition duration-300 ease-in-out"
        >
          Sign Up
        </button>

        <div className="flex flex-row space-x-2 mt-2">
          <div className="text-gray-300">Already have account?</div>
          <Link href="/login" className="hover:underline hover:cursor-pointer"
          >
            Log In Now.
          </Link>
        </div>
      </form>

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        closeToast={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
}

export default SignupForm;
