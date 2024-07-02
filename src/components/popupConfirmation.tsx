
interface PropsData {
    handleDelete: () => void;
    handleCancel: (status: boolean) => void;
    type: "service" | "branch" | "stylist" | "reservation" | "serviceType" | "review";
}

export default function PopUpConfimation({handleDelete, handleCancel, type} : PropsData){
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className=" w-[300px] md:w-[400px] h-[250px] rounded-3xl bg-white flex flex-col p-10 gap-20">
                <p className="font-bold text-xl">Are you sure want to delete this {type} ?? </p>
                <div className="flex flex-row gap-10">
                        <button onClick={handleDelete} className="bg-red-600 hover:bg-opacity-75 transition duration-300 ease-in-out text-white rounded-full px-5 py-3">
                            Delete
                        </button>
                        <button onClick={() => handleCancel(false)} className="bg-red-600 hover:bg-opacity-75 transition duration-300 ease-in-out text-white rounded-full px-5 py-3">
                            Cancel
                        </button>
                </div>
            </div>
            
        </div>
    )
    
}