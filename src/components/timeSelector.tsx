import React from 'react';

interface TimeSelectorProps {
  selectedTime: string;
  selectedDate: string;
  bookedTime : BookedTime[] | undefined;
  onTimeClick: (time: string) => void;
}

export interface BookedTime { startTime: Date, endTime: Date }

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, selectedDate,bookedTime, onTimeClick }) => {
  const morningTimes = ['10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45'];
  const afternoonTimes = ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45'];
  const eveningTimes = ['16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00'];

  const checkTimePassed = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(`${selectedDate} ${hours}:${minutes}`);
    return selectedDateTime < new Date();
  };
  const isBooked = (time: string) => {
    return bookedTime?.some(booked => {
      const startTime = new Date(booked.startTime);
      console.log(startTime)
      const endTime = new Date(booked.endTime);
      console.log(endTime)
      const [hours, minutes] = time.split(':').map(Number);
      const checkTime =new Date(`${selectedDate} ${hours}:${minutes}`);
      console.log(checkTime)
      console.log("halo");
      return checkTime >= startTime && checkTime < endTime;
    });
  };


  return (
    <div className="flex flex-col gap-4 p-4 w-[400px] h-[400px] rounded-2xl border-2 px-4">
      <h1 className="text-black text-xl font-bold">Available time on {selectedDate}</h1>
      <div className="overflow-scroll scrollable-form border-2 p-4 scro flex flex-col gap-5">
        <div>
          <h4 className="text-[#111518] text-base font-bold leading-tight pb-2">Morning</h4>
          <div className="grid grid-cols-4 gap-2">
            {morningTimes.map((time, index) => (
              <button
               type="button"
                key={index}
                className={`py-2 px-4 rounded-md border ${selectedTime === time ? 'bg-[#2094f3] text-white' : isBooked(time) ? 'bg-red-500 text-white' : 'border-[#dbe1e6] text-[#111518]'} ${checkTimePassed(time) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !checkTimePassed(time) && !isBooked(time) && onTimeClick(time)}
                disabled={checkTimePassed(time) || isBooked(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[#111518] text-base font-bold leading-tight pb-2">Afternoon</h4>
          <div className="grid grid-cols-4 gap-2">
            {afternoonTimes.map((time, index) => (
              <button
                type="button"
                key={index}
                className={`py-2 px-4 rounded-md border ${selectedTime === time ? 'bg-[#2094f3] text-white' : isBooked(time) ? 'bg-red-500 text-white'  : 'border-[#dbe1e6] text-[#111518]'} ${checkTimePassed(time) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !checkTimePassed(time) && !isBooked(time) && onTimeClick(time)}
                disabled={checkTimePassed(time) || isBooked(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[#111518] text-base font-bold leading-tight pb-2">Evening</h4>
          <div className="grid grid-cols-4 gap-2">
            {eveningTimes.map((time, index) => (
              <button
                type="button"
                key={index}
                className={`py-2 px-4 rounded-md border ${selectedTime === time ? 'bg-[#2094f3] text-white' : isBooked(time) ? 'bg-red-500 text-white'  : 'border-[#dbe1e6] text-[#111518]'} ${checkTimePassed(time) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !checkTimePassed(time) && !isBooked(time) && onTimeClick(time)}
                disabled={checkTimePassed(time) || isBooked(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
