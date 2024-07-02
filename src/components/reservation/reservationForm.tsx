"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Calendar from './calendar';
import TimeSelector, { BookedTime } from './timeSelector';
import BranchModal from './branchModal';
import { Branch, Service, Stylist } from '@/app/reservation/page';
import ServiceSwiper from './servceSwiper';
import StylistSwiper from './stylistSwiper';
import { ToastState } from '../loginForm';
import Toast from '../toast';
import { useRouter } from 'next/navigation';
import Loading from '../../app/loading';


interface ServiceTypes {
  id: string;
  type: string;
  imgUrl : string | null;
}

interface formProps {
  branches:  Branch[];
  serviceTypes: ServiceTypes[];
}

const ReservationForm: React.FC<formProps> = ({branches, serviceTypes}) => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [stylists, setStylists] = useState<Stylist[]>();
  const [bookedTime, setBookedTime] = useState<BookedTime[]>();
  const [services, setServices] = useState<Service[]>();
  const [selectedBranch, setSelectedBranch] = useState<Branch>();
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    serviceType: '',
    date: '',
    time: '',
    service: '',
    stylist: '',
  });
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "error",
  });

  const handleDateClick = async (date: string) => {
    setSelectedDate(date);

    try {
      const response = await fetch('/api/bookedTime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stylistId: selectedStylist?.id,
          date: date
        })
      });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setBookedTime(data.bookedTime)

      } else {
          

      }

    }catch(error){

    }
    
  };

  const handleStylistClick = (stylist: Stylist) => {
    setSelectedStylist(stylist);
    setSelectedDate('');
    setBookedTime(undefined);
  };

  const handleServiceClick = (servicetype: string) => {
    const filteredServices = selectedBranch?.services?.filter(service => service.typeId === serviceType);
    setServiceType(servicetype);
    setServices(filteredServices);
    console.log(filteredServices);
    
  };

  useEffect(() => {
    
    if (selectedBranch && serviceType) {
        const filteredServices = selectedBranch.services?.filter(service => service.typeId === serviceType);
        setServices(filteredServices);
    }
  }, [serviceType,selectedBranch]);

  useEffect(() => {
    setServiceType('');
    setShowBranchModal(!selectedBranch);
    setSelectedStylist(null );
    setSelectedService(null);
    setStylists(selectedBranch?.stylists);
    setServices([]); // Also clear services to ensure everything is reset
  }, [selectedBranch]);

  const combineDateTime = (selectedDate: string, selectedTime: string): Date => {
    // Parse the date and time strings directly
    const date = new Date(selectedDate);
    const timeParts = selectedTime.split(':');
  
    // Set hours and minutes from the time string
    date.setHours(parseInt(timeParts[0]));
    date.setMinutes(parseInt(timeParts[1]));
    date.setSeconds(0); // Optionally set seconds and milliseconds to zero if not needed
    date.setMilliseconds(0);
  
    return date;
  };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      let isValid = true;
      let newErrors = {
        fullName: '',
        phoneNumber: '',
        serviceType: '',
        date: '',
        time: '',
        service: '',
        stylist: '',
      };
    
      // Validate full name is not empty
      if (!fullName.trim()) {
        newErrors.fullName = 'Full name is required.';
        isValid = false;
      }
    
      // Validate phone number is all digits and length between 7 and 15
      if (!/^\d{7,15}$/.test(phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be between 7 and 15 digits and contain only numbers.';
        isValid = false;
      }
    
      // Additional validations...
      if (!serviceType) {
        newErrors.serviceType = 'Please select a service type.';
        isValid = false;
      }
    
      if (!selectedDate) {
        newErrors.date = 'Please select a date.';
        isValid = false;
      }
    
      if (!selectedTime) {
        newErrors.time = 'Please select a time.';
        isValid = false;
      }
    
      if(serviceType){
        if (!selectedService) {
          newErrors.service = 'Please select a service.';
          isValid = false;
        }
      }
     
    
      if (!selectedStylist) {
        newErrors.stylist = 'Please select a stylist.';
        isValid = false;
      }
    
      setErrors(newErrors);

    
      if (!isValid) {
        setToast({ isOpen: true, message: "Reserve Failed. Check Your Input", type: "error" });
        return; // Prevent submission if validation fails
      }
      const combinedTime = combineDateTime(selectedDate,selectedTime);
      const reservationData = {
        reservationName : fullName,
        activePhone : phoneNumber,
        serviceId : selectedService?.id,
        stylistId : selectedStylist?.id,
        branchId : selectedBranch?.id,
        reservationTime : combinedTime
      };

      try{
        setLoading(true);
        const response = await fetch('/api/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservationData)
        });

        const data = await response.json();
        if (response.ok) {
          setToast({ isOpen: true, message: "Reserve Success", type: "success" });
          router.push('/');
        } else {
          setToast({ isOpen: true, message: "Reserved Failed", type: "error" });
          throw new Error(data.message || 'Failed to submit review');
        }
      }catch(error){
        setToast({ isOpen: true, message: "Reserved Failed", type: "error" });
      }finally{
        setLoading(false);
        
      }
      
      console.log('Reservation Data:', reservationData);
      
    };
  
    if (loading){
      return <Loading/>
    }

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    setStylists(branch.stylists);
    setShowBranchModal(false);
  };

  return (
    <div className="flex flex-col w-3/4 py-5 max-w-[1260px] flex-1">
      
        <div className=" @[480px]:px-4 @[480px]:py-3">
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


      <BranchModal
        isOpen={showBranchModal}
        branches={branches}
        selected = {selectedBranch}
        onSelect={handleBranchSelect}
        onClose={() => setShowBranchModal(false)}
      />
      <form onSubmit={handleSubmit}>

        
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">New reservation</p>
        </div>

        <div className="flex  flex-col gap-4 px-4 py-3">
          <label className='flex flex-col  min-w-40 '>
            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Branch</p>
          </label>
          <div className=' flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10'>
              {selectedBranch? (
                <div className='w-60 md:w-80 flex flex-col justify-center px-4 py-2 border-2 rounded-2xl border-black'>
                    <p className=' font-bold'>{selectedBranch.name}</p>
                    <p>{selectedBranch.address}</p>
                    <p>Open {selectedBranch.openingTime} - Close {selectedBranch.closingTime}</p>
                    <p>{selectedBranch.branchTelp}</p>
                </div>
              ) : (<div className='w-80  h-24 flex flex-col items-center justify-center border-2 rounded-2xl'>None</div>)}

              <button type="button" onClick={() => setShowBranchModal(true)} className="px-3 w-40 md:w-auto md:px-5 bg-[#1980e6] hover:bg-opacity-75 transition duration-300 ease-in-out font-bold py-1 md:py-3 h-10 md:h-16 rounded-full border-2">
                  Select Branch
              </button>
            </div>
        </div>
        <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Full name</p>
            <input
              placeholder="Enter your full name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </label>
        </div>
        <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111518] text-base font-bold leading-normal pb-2">Active phone number</p>
            <input
              placeholder="Enter your active phone number"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#60778a] p-[15px] text-base font-normal leading-normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </label>
        </div>
        <div className='flex flex-col gap-4 px-4 py-3'>
          <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Service type</h3>
          <div className="flex flex-wrap gap-3 p-4">
            {serviceTypes.map((type, index) => (
              <label
                key={index}
                className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#dbe1e6] px-4 h-11 text-[#111518] relative cursor-pointer ${serviceType === type.id ? 'border-[3px] border-[#2094f3]' : ''}`}
              >
                {type.type}
                <input type="radio" className="invisible absolute" name="serviceType" checked={serviceType === type.id} onChange={() => handleServiceClick(type.id)} />
              </label>
            ))}
          </div>
          {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
        </div>
        
        {serviceType && (
          <div className='flex flex-col flex-1 px-4 py-3'>
            <h3 className="text-[#111518] text-lg font-bold leading-tight  tracking-[-0.015em] px-4 mt-10">Select Services</h3>
            <p className='px-4 mb-10'>Click to select</p>
            {services && services.length > 0 ? (
              <div>
                <ServiceSwiper services={services} onSelectService={setSelectedService}/>
              </div>
              
              
            ) : (
              <div className='w-full flex items-center justify-center h-40 text-black'>No services for this type</div>
            )}
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
          </div>
        )}

        <div className='flex flex-col px-4 py-3'>
          <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 mt-10">Select Stylist</h3> 
          <p className=' px-4 mb-10'>Click to select</p>
          {stylists ? (
            <div>
              <StylistSwiper stylists={stylists} onSelectStylist={handleStylistClick}/>
            </div>
          ): 
          <div className='w-full flex items-center justify-center h-40 text-black'>No stylist in this branch yet</div>
          }
          {errors.stylist && <p className="text-red-500 text-sm mt-1">{errors.stylist}</p>}
        </div>
        
        <div className='flex flex-col px-4 py-3'>
          <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] my-10">Date and time</h3>
          <div >
          {selectedStylist ? (
            <div className="flex flex-wrap items-center justify-center gap-10 p-4 ">
              <Calendar selectedDate={selectedDate} onDateClick={handleDateClick} />
              {selectedDate && (
                <TimeSelector selectedDate={selectedDate} selectedTime={selectedTime} bookedTime={bookedTime} onTimeClick={setSelectedTime} />
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-black">
              <p>Please select a stylist to proceed with date and time selection.</p>
            </div>
          )}
            
          </div>
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        
        
        <div className="flex items-center justify-center gap-20 font-bold w-full mt-5">
          <button type="button" className="px-5 py-3 rounded-full border-2 hover:bg-opacity-75 transition duration-300 ease-in-out">Cancel</button>
          <button type="submit" className="px-5 py-3 rounded-full bg-[#1980e6] text-white hover:bg-opacity-75 transition duration-300 ease-in-out">Reserve</button>
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
};

export default ReservationForm;
