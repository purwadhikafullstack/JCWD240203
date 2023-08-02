import { useEffect, useState } from "react";
import './CurrentlyStaying.css'
import { useDispatch } from "react-redux";
import { getCurrent } from "../../redux/features/transaction/transactionSlice";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import format from "date-fns/format";


export default function CurrentlyStaying() {
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState([]);
    const call = useDispatch();

    const formatDate = (date) => {
        return format(date, "MM-dd-yyyy");
    };

    useEffect(() => {
        if(localStorage.getItem('user')) {
            call(getCurrent({userId: JSON.parse(localStorage.getItem('user')).id})).then(
                (response) => {setCurrent(response.data.data.rows); setLoading(false)},
                (error) => {console.log(error)}
            )
        }
    }, [call]);

    return (
        <div className="flex w-full bg-slate-200/25 h-[225px] p-[15px] rounded-[10px] gap-[15px] overflow-x-auto mobileScroll removeScroll">
            {
                (loading)?
                <div className="flex justify-center h-full w-full">
                    <ThreeDots/>
                </div>
                :
                (current?.length > 0)?
                current?.map((value, index) => {
                    return(
                        <div key={index} className="currentlyStaying flex-none inline-block flex flex-col justify-center h-full w-[300px] lg:w-[360px] bg-[#F0EFE9] drop-shadow-xl rounded-[10px] border-2 ">
                            <div className="px-[10px] py-[10px] text-green-800 text-[20px] font-semibold">
                                {/* input start date here */}
                                Just check in on {formatDate(new Date(value.checkIn))}
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
                                        {((new Date(value?.checkOut).getTime() - new Date(value?.checkIn).getTime()) / 86400000)} Nights
                                    </div>
                                    <div className="chosenRoom text-[18px] py-[10px]">
                                        {value?.stock} {value?.room?.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <div className="flex items-center justify-center h-full w-full">
                    No one is currently staying
                </div>
            }
        </div>
    )
}