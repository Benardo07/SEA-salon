"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Toast from './toast'; // Assuming you are using react-toastify for toasts
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ToastType = "info" | "error" | "success";

export interface ToastState {
  isOpen: boolean;
  message: string;
  type: ToastType;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "error",
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);
  
    // Email validation (simple regex for demonstration; consider a more comprehensive regex for production)
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(data.email)) {
      setToast({ isOpen: true, message: "Invalid email format", type: "error" });
      return;
    }
  
    // Password length validation
    if (data.password.length < 8) {
      setToast({ isOpen: true, message: "Password must be at least 8 characters long", type: "error" });
      return;
    }
  
    // Attempt to sign in
    const result = await signIn('credentials', { 
      redirect: false, // Set to false to handle redirection manually
      email: data.email,
      password: data.password
    });
  
    // Check the response from signIn
    if (result?.ok) {
      setToast({ isOpen: true, message: "Login successful", type: "success" });
      router.refresh();
      router.push("/");
      // Redirect or perform further actions after successful login
    } else {
      setToast({ isOpen: true, message: result?.error || "Login failed", type: "error" });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value, { shouldValidate: true });
    trigger("email");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("password", e.target.value, { shouldValidate: true });
    trigger("password");
  };

  return (
    <div className="w-3/4 max-w-[500px] flex flex-col items-center justify-center py-40 gap-10">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center justify-center">
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
            onChange={handleEmailChange}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
            onChange={handlePasswordChange}
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
          className="mt-4 rounded-lg py-3 px-5 sm:w-[350px] w-full text-white bg-[#1980e6] hover:bg-[#136bb3]"
        >
          Sign In
        </button>
        <div className="flex flex-row space-x-2 mt-2">
          <div className="text-gray-300">New here?</div>
          <Link href="/register" className="hover:underline hover:cursor-pointer"
          >
            Sign up now.
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

export default LoginForm;
