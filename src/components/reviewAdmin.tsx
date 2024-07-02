import { useState } from "react";
import { ToastState } from "./loginForm";
import Toast from "./toast";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import PopUpConfimation from "./popupConfirmation";

export interface ReviewObjects {
    id: string;
    createdAt: Date;
    starRating: number;
    comment: string;
    user: {
        fullName: string;
        email: string;
    };
    
}
interface DataProps {
    reviews: ReviewObjects[];
    updateReviews: (newReviews: ReviewObjects[]) => void;
}
export default function ReviewAdmin({reviews, updateReviews} : DataProps){
    const [popupConfirmation, showPopupConfirmation] = useState<boolean>(false);
    const [selectedReview, setSelectedReview] = useState('');
    const [toast, setToast] = useState<ToastState>({
        isOpen: false,
        message: "",
        type: "error",
    });

    const handleDeleteClick = (id: string) => {
        // Deletion logic here
        setSelectedReview(id);
        showPopupConfirmation(true);
    }
    async function handleDelete() {
        try{
            const response = await fetch('/api/review', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id : selectedReview
                })
              });
            const data = await response.json();

            if (response.ok) {
                console.log('Review Deleted:', data);
                updateReviews(data.newReviews)
                setToast({ isOpen: true, message: "Delete Success", type: "success" });

            } else {
                setToast({ isOpen: true, message: "Delete Failed", type: "error" });

            }
        }catch(error){
            setToast({ isOpen: true, message: "Delete Failed", type: "error" });

        }finally{
            showPopupConfirmation(false);
        }
            
              
        
    }
    return (
        <div className="w-full flex flex-col ">
            <div className="flex w-full justify-between items-center p-10">
                <h1 className="font-bold text-4xl">All Reviews</h1>
            </div>
            {reviews.map((review,index) => (
                <div key={review.id} className="grid grid-cols-6 border-y-2 py-5 font-semibold gap-2">
                    <div className="flex flex-col items-center text-center justify-center">
                        {review.user.fullName}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {review.user.email}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {review.starRating}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {review.comment}
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                        {review.createdAt.toLocaleString()}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleDeleteClick(review.id)} className="bg-red-600 text-white rounded-full px-5 py-3 hover:bg-opacity-75 transition duration-300 ease-in-out">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                closeToast={() => setToast({ ...toast, isOpen: false })}
            />   
            {popupConfirmation && (<PopUpConfimation handleCancel={showPopupConfirmation} handleDelete={handleDelete} type='service'/>)}
        </div>
    )
}