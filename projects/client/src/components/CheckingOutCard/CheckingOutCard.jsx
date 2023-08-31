import './CheckingOutCard.css'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCheckingOut } from "../../redux/features/transaction/transactionSlice";
import SpinnerLoader from '../SpinnerLoading/SpinnerLoading';
import format from "date-fns/format";


export default function CheckingOutCard() {
    const [loading, setLoading] = useState(true);
    const [leaving, setLeaving] = useState([]);
    const call = useDispatch();

    const formatDate = (date) => {
        return format(date, "MM-dd-yyyy");
    };

    useEffect(() => {
        if(localStorage.getItem('user')) {
            call(getCheckingOut({userId: JSON.parse(localStorage.getItem('user')).id})).then(
                (response) => {setLeaving(response.data.data.rows); setLoading(false)},
                (error) => {console.log(error)}
            )
        }
    }, [call]);

    return (
        <div className="flex w-full h-[225px] overflow-x-auto mobileScroll removeScroll p-[15px] rounded-[10px] gap-[15px] bg-slate-200/25 py-1 rounded-[10px]">
            {
                (loading)?
                <div className="flex justify-center items-center h-full w-full">
                    <div className='w-[100px] h-[100px]'>
                        <SpinnerLoader/>
                    </div>
                </div>
                :
                (leaving.length > 0) ?
                leaving?.map((value, index) => {
                    return(
                        <div key={index} className="checkingOutCard flex-none inline-block flex flex-col justify-center h-full w-[300px] lg:w-[360px] bg-[#F0EFE9] drop-shadow-xl rounded-[10px] border-2 ">
                            <div className="px-[10px] py-[10px] text-green-800 text-[20px] font-semibold">
                                {/* input start date here */}
                                Checking out in {formatDate(new Date(value.checkOut))}
                            </div>
                            <div className="flex flex-col gap-[10px] px-[10px] py-[5px] w-[360px]">
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
                <div className='flex items-center justify-center font-bold h-full w-full'>
                    No one is checking out
                </div>
            }
        </div>
    )
}