"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Calendar from './calendar';
import TimeSelector from './timeSelector';

const ReservationForm: React.FC = () => {

  
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleServiceClick = (service: string) => {
    setServiceType(service);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reservationData = {
      fullName,
      phoneNumber,
      serviceType,
      selectedDate,
      selectedTime,
    };
    console.log('Reservation Data:', reservationData);
    // Here you can handle the form submission, e.g., sending the data to a server
  };

  return (
    <div className="layout-content-container flex flex-col w-3/4 py-5 max-w-[1260px] flex-1">
      <div className="@container">
        <div className="@container @[480px]:px-4 @[480px]:py-3">
          <div
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-[218px] relative"
          >
            <Image
              src="https://cdn.usegalileo.ai/stability/004bfd0b-fca7-4897-bd17-0338801d5ed0.png"
              alt="Reservation"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">New reservation</p>
        </div>
        <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111518] text-base font-medium leading-normal pb-2">Full name</p>
            <input
              placeholder="Enter your full name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111518] text-base font-medium leading-normal pb-2">Active phone number</p>
            <input
              placeholder="Enter your active phone number"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </div>
        <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Service type</h3>
        <div className="flex flex-wrap gap-3 p-4">
          {['Haircut and styling', 'Manicure and pedicure', 'Facial treatments'].map((service, index) => (
            <label
              key={index}
              className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe1e6] px-4 h-11 text-[#111518] relative cursor-pointer ${serviceType === service ? 'border-[3px] border-[#2094f3]' : ''}`}
            >
              {service}
              <input type="radio" className="invisible absolute" name="serviceType" checked={serviceType === service} onChange={() => handleServiceClick(service)} />
            </label>
          ))}
        </div>
        <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Date and time</h3>
        <div className="flex flex-wrap items-center justify-center gap-10 p-4 ">
          <Calendar onDateClick={handleDateClick} selectedDate={selectedDate} />
          {selectedDate && (
            <TimeSelector selectedTime={selectedTime} selectedDate={selectedDate} onTimeClick={handleTimeClick} />
          )}
          
        </div>
        
        <div className="flex items-center justify-center gap-20 font-bold w-full mt-5">
          <button type="button" className="px-5 py-3 rounded-full border-2">Cancel</button>
          <button type="submit" className="px-5 py-3 rounded-full bg-[#1980e6] text-white">Reserve</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
