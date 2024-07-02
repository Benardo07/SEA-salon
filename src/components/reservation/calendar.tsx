import React, { useState } from 'react';

interface CalendarProps {
  onDateClick: (date: string) => void;
  selectedDate: string;
}

const Calendar: React.FC<CalendarProps> = ({ onDateClick, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < todayStart;
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) setCurrentYear((prevYear) => prevYear + 1);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
      <div className="flex items-center p-1 justify-between">
        <button type="button" onClick={handlePrevMonth}>
          <div className="text-[#111518] flex size-10 items-center justify-center" data-icon="CaretLeft" data-size="18px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </div>
        </button>
        <p className="text-[#111518] text-base font-bold leading-tight flex-1 text-center pr-10">{`${monthNames[currentMonth]} ${currentYear}`}</p>
        <button type="button" onClick={handleNextMonth}>
          <div className="text-[#111518] flex size-10 items-center justify-center" data-icon="CaretRight" data-size="18px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </button>
      </div>
      <div className="grid grid-cols-7">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <p key={index} className="text-[#111518] text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5">{day}</p>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={index} className="h-12 w-full"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day, index) => (
          <button
            type="button"
            key={index}
            className={`h-12 w-full text-sm leading-normal ${isPastDate(day) ? 'text-[#6d7377] font-medium' : 'text-black font-bold'} ${selectedDate === `${monthNames[currentMonth]} ${day}, ${currentYear}` ? 'bg-[#2094f3] text-white rounded-full'  : ''}`}
            onClick={() => !isPastDate(day) && onDateClick(`${monthNames[currentMonth]} ${day}, ${currentYear}`)}
            disabled={isPastDate(day)}
          >
            <div className="flex size-full items-center justify-center rounded-full">{day}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
