const ReviewBar: React.FC<{ rating: number, percentage: number }> = ({ rating, percentage }) => (
    <>
      <p className="text-[#0e141b] text-sm font-normal leading-normal">{rating}</p>
      <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#d0dbe7]">
        <div className="rounded-full bg-[#1980e6]" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-[#4e7397] text-sm font-normal leading-normal text-right ml-2">{percentage}%</p>
    </>
  );

  export default ReviewBar;