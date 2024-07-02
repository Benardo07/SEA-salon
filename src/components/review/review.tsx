"use client";
import React, { useState } from 'react';
import RatingRadio from './ratingRadio';
import ReviewBar from './reviewBar';
import Star from './star';
import { useRouter } from 'next/navigation';
import Loading from '../../app/loading';
import Toast from '../toast';
import { ToastState } from '../loginForm';

const ReviewPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "error",
  });
  const [rating, setRating] = useState<number>(0); // To track the selected star rating
  const [comment, setComment] = useState<string>(''); // To track the text area input

  // Handle change on the rating radio buttons
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // Handle change on the textarea for comment
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  // Function to submit the review
  const submitReview = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating,
          comment
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Review submitted:', data);
        setToast({ isOpen: true, message: "Write Success", type: "success" });
        
        router.push('/reviewPage');
        router.refresh();
      } else {
        setToast({ isOpen: true, message: "Write Failed", type: "error" });
        throw new Error(data.message || 'Failed to submit review');
      }
    } catch (error) {
      setToast({ isOpen: true, message: "Write Failed", type: "error" });
    } finally{
      setLoading(false);
      
    }
  };

  if (loading){
    return <Loading/>
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f0f5fa] group/design-root overflow-x-hidden py-20" >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[680px] max-w-[680px] py-5 flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight min-w-72">Write a Review</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
              {/* Other contents omitted for brevity */}
            </div>
            <h3 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Overall rating</h3>
            <div className="flex flex-wrap gap-3 p-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingRadio key={index} stars={index + 1} selected={rating === (index + 1)} onClick={() => handleRatingChange(index + 1)} />
              ))}
            </div>
            <h3 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Add a detailed review</h3>
            <div className="flex max-w-[480px] max-h-[200px] flex-1 flex-wrap gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <textarea
                  placeholder="What did you like or dislike? How was the service?"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] min-h-36 placeholder:text-[#4e7397] p-[15px] text-base font-normal leading-normal"
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
              </label>
            </div>
            <div className="flex px-4 py-3 justify-end">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-75 transition duration-300 ease-in-out"
                onClick={submitReview}
              >
                <span className="truncate">Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        closeToast={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
};

export default ReviewPage;
