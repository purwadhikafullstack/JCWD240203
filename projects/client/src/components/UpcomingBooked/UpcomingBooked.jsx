import { useEffect, useState } from "react";
import './UpcomingBooked.css'
import { useDispatch } from "react-redux";
import { getUpcoming } from "../../redux/features/transaction/transactionSlice";
import SpinnerLoader from "../SpinnerLoading/SpinnerLoading";
import { format } from "date-fns";

export default function UpcomingBooked() {
    const [loading, setLoading] = useState(true);
    const [upcoming, setUpcoming] = useState([]);
    const call = useDispatch();

    const formatDate = (date) => {
        return format(date, "MM-dd-yyyy");
    };

    useEffect(() => {
        if(localStorage.getItem('user')) {
            call(getUpcoming({userId: JSON.parse(localStorage.getItem('user')).id})).then(
                (response) => {setUpcoming(response?.data?.data?.rows); setLoading(false)},
                (error) => { console.log(error)}
            )
        }
    }, [call]);
    return (
        <div className="flex w-full bg-slate-200/25 h-[225px] overflow-x-auto mobileScroll removeScroll p-[15px] gap-[15px] rounded-[10px]">
            {
                (loading)? 
                <div className="w-full h-full flex items-center justify-center">
                    <div className='w-[100px] h-[100px]'>
                        <SpinnerLoader/>
                    </div>
                </div>
                :
                (upcoming?.length > 0)?
                upcoming.map((value, index) => {
                    return(
                    <div key={index} className="UpcomingBooked flex flex-col flex-none inline-block h-full w-[360px] bg-[#F0EFE9] drop-shadow-xl rounded-[10px] border-2">
                        <div className="px-[10px] py-[10px] text-green-800 text-[20px] font-semibold ">
                            {/* input booked date here */}
                            Booked room on {formatDate(new Date(value?.checkIn))}
                        </div>
                        <div className="flex flex-col gap-[10px] h-full px-[10px] py-[5px] w-full">
                            <div className="text-left">
                                <div className="flex items-center justify-between">
                                    <div className="buyerName text-[20px] font-bold">
                                        {/* input user's name */}
                                        {value?.user?.username}
                                    </div>
                                </div>
                                <div className="durationBooked text-[20px] font-bold">
                                    {/* total duration */}
                                    {((new Date(value?.checkOut).getTime() - new Date(value?.checkIn).getTime()) / 86400000)} Nights <span className="text-[16px] font-normal">({formatDate(new Date(value?.checkIn))} to {formatDate(new Date(value?.checkOut))})</span>
                                </div>
                                <div className="text-[18px] py-[10px]">
                                     <div>
                                        {value?.property?.name}
                                    </div>
                                    <div>
                                        {value?.stock} {value?.room?.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })
                :
                <div className="flex items-center justify-center h-full w-full font-bold">
                    No upcoming bookings
                </div>
            }
        </div>
    )
}