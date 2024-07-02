"use client";
import { useState } from 'react';
import { Branch } from '@/app/reservation/page';
import AdminBranch from "./adminBranch";
import ReservationAdmin, { ReservationObject } from "./reservationAdmin";
import ReviewAdmin, { ReviewObjects } from "./reviewAdmin";
import { useRouter } from 'next/router';
import ServiceTypesAdmin from './serviceTypesAdmin';
export interface ServiceType {
    id: string;
    type: string;
    imgUrl : string | null;
}

interface DataProps {
    branches: Branch[];
    reviews: ReviewObjects[];
    reservations: ReservationObject[];
    servicetypes: ServiceType[];
}

export default function Dashboard({ branches, reviews, reservations,servicetypes }: DataProps) {
    const [activeTab, setActiveTab] = useState<'branches' | 'reviews' | 'reservations' | 'serviceTypes'>('branches');
    const [allReviews, setReviews] = useState<ReviewObjects[]>(reviews);
    const [allTypes, setTypes] = useState<ServiceType[]>(servicetypes);
    const [allBranches, setBranches] = useState<Branch[]>(branches);
    const [allReservations, setReservations] = useState<ReservationObject[]>(reservations);
    const getButtonClass = (tabName: 'branches' | 'reviews' | 'reservations' | 'serviceTypes') => {
        return `px-5 py-3 rounded-t-2xl transition-colors duration-300 ${
            activeTab === tabName ? 'bg-white border-t-2 border-l-2 border-r-2' : 'bg-gray-100'
        } `;
    };

   

    return (
        <div className="w-4/5 min-h-screen flex flex-col items-center py-20">
            <h1 className="text-3xl font-bold w-full mb-10">Admin Dashboard</h1>
            <div className="flex flex-row w-full">
                <button className={getButtonClass('branches')} onClick={() => setActiveTab('branches')}>
                    Branches
                </button>
                <button className={getButtonClass('reviews')} onClick={() => setActiveTab('reviews')}>
                    Reviews
                </button>
                <button className={getButtonClass('reservations')} onClick={() => setActiveTab('reservations')}>
                    Reservations
                </button>
                <button className={getButtonClass('serviceTypes')} onClick={() => setActiveTab('serviceTypes')}>
                    Service types
                </button>
            </div>
            <div className="w-full mt-4">
                {activeTab === 'branches' && <AdminBranch branches={allBranches} serviceTypes={servicetypes} updateBranch={setBranches} />}
                {activeTab === 'reviews' && <ReviewAdmin reviews={allReviews} updateReviews={setReviews} />}
                {activeTab === 'reservations' && <ReservationAdmin reservations={allReservations} updateReservation={setReservations} />}
                {activeTab === 'serviceTypes' && <ServiceTypesAdmin serviceTypes={allTypes} updateTypes={setTypes}/>}
            </div>
        </div>
    );
}
