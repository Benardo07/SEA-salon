"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Star from "./star";
import ReviewBar from "./reviewBar";
import RevealDesc from "../ui/animations/revealdesc";

interface ReviewObject {
    id: string;
    createdAt: Date;
    starRating: number;
    comment: string;
    user: {
        fullName: string;
        email: string;
    };
}

interface ReviewProps {
    reviews: ReviewObject[];
}

export default function Reviews({ reviews }: ReviewProps) {
    console.log(reviews);
    const [allReviews, setReviews] = useState<ReviewObject[]>(reviews);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    // Helper function to format date
    const formattedDate = (date: Date) => {
        return new Date(date).toLocaleString('en-US', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit', 
            hour12: true 
        });
    }

    useEffect(() => {
        setReviews(reviews)
        setTotalReviews(reviews.length);
        setAverageRating(reviews.length > 0 
            ? reviews.reduce((acc, curr) => acc + curr.starRating, 0) / reviews.length
            : 0);
    }, [reviews]);  // Re-run this effect if reviews change

    // Function to calculate the percentage of each star rating for the bar display
    const calculatePercentage = (star: number) => {
        if (totalReviews === 0) return 0;
        const count = reviews.filter(review => review.starRating === star).length;
        return parseFloat(((count / totalReviews) * 100).toFixed(1));
    }

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#f0f5fa] group/design-root overflow-x-hidden">
            <div className="px-10 lg:px-40 flex flex-1 justify-center py-20">
                <div className="flex flex-col w-3/4 max-w-[1260px] py-5 flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight min-w-72">Reviews</p>
                        <Link href="/reviewForm"><button className="text-black px-3 py-1 text-base font-bold bg-[#d0dbe7] rounded-full">Write a review</button></Link>
                    </div>
                    <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-[#0e141b] text-4xl font-black leading-tight tracking-[-0.033em]">{averageRating.toFixed(1)}</p>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <Star key={index} filled={index < Math.round(averageRating)} />
                                ))}
                            </div>
                            <p className="text-[#0e141b] text-base font-normal leading-normal">{totalReviews} reviews</p>
                        </div>
                        <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
                            {Array.from({ length: 5 }, (_, index) => (
                                <ReviewBar key={5 - index} rating={5 - index} percentage={calculatePercentage(5 - index)} />
                            ))}
                        </div>
                    </div>

                    {totalReviews > 0 ? (
                        <div className="flex flex-col gap-6 px-4 py-10">
                            {allReviews.map((review, index) => (
                                <div key={review.user.email} className="flex flex-col p-4 border-b-2 border-black">
                                    <p className="text-lg font-bold text-black">{review.user.fullName}</p>
                                    <p className="text-base text-[#0e141b]">{formattedDate(review.createdAt)}</p>
                                    <div className="flex gap-0.5 mt-2 mb-2">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Star key={index} filled={index < review.starRating} />
                                    ))}
                                    </div>
                                    <p className="text-base text-wrap text-[#0e141b]">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg py-10">No reviews yet. Be the first to write a review!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
