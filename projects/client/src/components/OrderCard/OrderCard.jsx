import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../redux/features/transaction/transactionSlice";

export default function OrderCard(props) {
    const [isSendingResponse, setIsSendingResponse] = useState(false);
    const call = useDispatch();

    const handleAccept = () => {
        setIsSendingResponse(true);
        const loading = toast.loading('Accepting order ...');
        if(localStorage.getItem('user')) {
            call(updateStatus({
                id: props?.data?.id,
                userId: JSON.parse(localStorage.getItem('user')).id,
                response: 'completed',
                token: JSON.parse(localStorage.getItem('user')).token,
                page: props?.page,
                limit: props?.limit
            })).then(
                () => {toast.success('Order Accepted', {id: loading})},
                (error) => {toast.error('Network error, please try again later !', {id: loading}); console.log(error)}
            )
        }
        else {
            toast.error('Unauthorized access !', {id: loading})
        }
        setTimeout(() => {
            setIsSendingResponse(false)
        }, 400);
    }

    const handleReject = () => {
        setIsSendingResponse(true);
        const loading = toast.loading('Rejecting order ...');
        if(localStorage.getItem('user')) {
            call(updateStatus({
                id: props?.data?.id,
                userId: JSON.parse(localStorage.getItem('user')).id,
                response: 'cancelled',
                token: JSON.parse(localStorage.getItem('user')).token,
                page: props?.page,
                limit: props?.limit
            })).then(
                () => {toast.success('Order Rejected', {id: loading})},
                (error) => {toast.error('Network error, please try again later !', {id: loading}); console.log(error)}
            )
        }
        else {
            toast.error('Unauthorized access !', {id: loading})
        }
        setTimeout(() => {
            setIsSendingResponse(false);
        }, 400);
    }

    return(
        <div className="flex flex-col w-full h-auto md:h-[250px] md:flex-row gap-[15px] justify-between">
            <div className="w-full md:w-[250px] h-[250px] md:h-full">
                <img src={props?.data?.property?.propertyImages[0]?.url || ''} alt="" className="w-full h-full bg-black rounded-[5px]"/>
            </div>
            <div className="flex flex-col justify-center text-start flex-[1.3] gap-[15px]">
                <div className="text-[20px] font-bold">
                    {props?.data?.property?.name}
                </div>
                <div>
                    Room: {props?.data?.room?.name}
                </div>
                <div className="text-[14px]">
                    Address: {props?.data?.property?.address}
                </div>
            </div>
            <div className="flex flex-col text-start flex-1 gap-[15px] p-[10px]">
                <div>
                    Rp.{props?.data?.room?.price.toLocaleString('ID-id')}/night
                </div>
                <div>
                    Duration: {((new  Date(props?.data?.checkOut).getTime() - new Date(props?.data?.checkIn).getTime())/ 86400000) || 0} nights
                </div>
                <div className="mt-auto text-[20px] font-bold">
                    Grand total: {((((new  Date(props?.data?.checkOut).getTime() - new Date(props?.data?.checkIn).getTime())/ 86400000) * props?.data?.room?.price).toLocaleString('ID-id')) || 0}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 gap-[15px] p-[10px]">
                Payment proof:
                <div className="flex w-full h-[325px] md:h-[175px]">
                    <img src={props?.data?.paymentProof} alt="" className="w-full h-full border-[1px] border-gray-600 rounded-[5px]"/>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-[10px]">
                <div className="font-bold">
                    Status: {props?.data?.status}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-[10px] gap-[20px]">
                <button onClick={handleAccept} disabled={isSendingResponse} className={`${(props?.data?.status === 'pending')? '' : 'hidden'} flex justify-center items-center bg-green-500 w-[125px] h-[40px] rounded-[5px] transition-all duration-400 hover:bg-green-600 active:bg-green-700 active:scale-95 cursor-pointer`}>
                    Accept Order
                </button>
                <button onClick={handleReject} disabled={isSendingResponse} className={`${(props?.data?.status === 'pending')? '' : 'hidden'} flex justify-center items-center bg-red-500 w-[125px] h-[40px] rounded-[5px] transition-all duration-400 hover:bg-red-600 active:bg-red-700 active:scale-95 cursor-pointer`}>
                    Reject Order
                </button>
            </div>
        </div>
    )
}