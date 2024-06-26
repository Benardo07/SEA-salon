import React from 'react';

interface RatingRadioProps {
  stars: number;
  selected: boolean;
  onClick: () => void; // Function to handle click event
}

const RatingRadio: React.FC<RatingRadioProps> = ({ stars, selected, onClick }) => (
  <label
    className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-[#0e141b] cursor-pointer ${
      selected ? 'border-[#1980e6] border-2 px-3' : 'border-[#d0dbe7]'
    }`}
    onClick={onClick} // Attach the onClick handler
  >
    {stars} star{stars > 1 ? 's' : ''}
    <input
      type="radio"
      className="opacity-0 absolute" // Make radio button invisible but accessible
      name="overallRating"
      value={stars}
      checked={selected} // Control component via props
      onChange={onClick} // Handle changes
    />
  </label>
);

export default RatingRadio;
