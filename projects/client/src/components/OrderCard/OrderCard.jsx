import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../redux/features/transaction/transactionSlice";
import './OrderCard.css'
import HoverProfileCard from "./HoverProfileCard";

export default function OrderCard(props) {
    const [isSendingResponse, setIsSendingResponse] = useState(false);
    const [hoverUser, setHoverUser] = useState(false);
    const dayMiliseconds = 86400000;
    const call = useDispatch();

    const handleAccept = async() => {
        setIsSendingResponse(true);
        const loading = toast.loading('Accepting order ...');
        if(localStorage.getItem('user')) {
            await call(updateStatus({
                id: props?.data?.id,
                userId: JSON.parse(localStorage.getItem('user')).id,
                response: 'completed',
                token: JSON.parse(localStorage.getItem('user')).token,
                page: props?.page,
                limit: props?.limit,
                type: 'Order',
                month: props?.month
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

    const handleReject = async() => {
        setIsSendingResponse(true);
        const loading = toast.loading('Rejecting order ...');
        if(localStorage.getItem('user')) {
            await call(updateStatus({
                id: props?.data?.id,
                userId: JSON.parse(localStorage.getItem('user')).id,
                response: 'cancelled',
                token: JSON.parse(localStorage.getItem('user')).token,
                page: props?.page,
                limit: props?.limit,
                type: 'Order',
                month: props?.month
            })).then(
                () => {
                    toast.success('Order Rejected', {id: loading});
                },
                (error) => {toast.error('Network error, please try again later !', {id: loading}); console.log(error)}
            )
        }
        else {
            toast.error('Unauthorized access !', {id: loading})
        }
        setTimeout(() => {
            setIsSendingResponse(false);
        }, 400);
    };

    return(
        <div className="flex flex-col w-full h-auto md:h-[250px] md:flex-row gap-[15px] justify-between border-[1px] border-gray-500 p-[5px] rounded-[10px] bg-neutral-200/50">
            <div className="w-full md:w-[250px] h-[250px] md:h-full">
                {
                    (props?.data?.property?.propertyImages?.length > 0)?
                    <img src={props?.data?.property?.propertyImages[0]?.url} alt="" className="w-full h-full rounded-[5px]" />
                    :
                    <img src={`${process.env.REACT_APP_API_BASE_URL}/default/DefaultProperty.png`} alt="" className="w-full h-full rounded-[5px]" />
                }
            </div>
            <div className="flex flex-col justify-center text-start flex-[1.3] gap-[15px]">
                <div className="propsNameCard text-[20px] font-bold">
                    {props?.data?.property?.name}
                </div>
                <div className="roomNamee">
                    Room: {props?.data?.room?.name}
                </div>
                <div className=" addressCard text-[14px]">
                    Address: {props?.data?.property?.address}
                </div>
            </div>
            <div className=" detailsOrderr flex flex-col text-start flex-1 gap-[15px] p-[10px]">
                <div>
                    Rp.{props?.data?.room?.price.toLocaleString('ID-id')}/night
                </div>
                <div>
                    Rooms rented: {props?.data?.stock}
                </div>
                <div>
                    Duration: {((new Date(props?.data?.checkOut).getTime() - new Date(props?.data?.checkIn).getTime())/ dayMiliseconds) || 0} nights
                </div>
                <div className="relative">
                    Tenant: <span onMouseEnter={() => setHoverUser(true)} onMouseLeave={() => setHoverUser(false)} className="hover:underline">{props?.data?.user?.username || 'N/A'}</span>
                    <div className={`${(hoverUser)? 'opacity-100 w-[150px] h-[125px]' : 'opacity-0 w-[150px] h-[125px] z-[-1]'} transition-all duration-400 absolute`}>
                        <HoverProfileCard data={props?.data?.user}/>
                    </div>
                </div>
                <div className="mt-auto text-[20px] font-bold">
                    Grand total: {props?.data?.price?.toLocaleString('ID-id')}
                </div>
            </div>
            <div className="paymentProoff flex flex-col justify-center items-center flex-1 gap-[15px] p-[10px]">
                Payment proof:
                <div className="flex w-full h-[325px] md:h-[175px]">
                    <img src={props?.data?.paymentProof} alt="" className="w-full h-full border-[1px] border-gray-600 rounded-[5px]"/>
                </div>
            </div>
            <div className=" statusdets flex flex-col justify-center items-center flex-1 p-[10px]">
                <div className="font-bold">
                    Status: {props?.data?.status}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-[10px] gap-[20px]">
                <button onClick={handleAccept} disabled={isSendingResponse} className={`${(props?.data?.status === 'pending')? '' : 'hidden'} flex justify-center items-center w-[125px] h-[40px] rounded-[8px] font-bold bg-green-700 text-white ${(isSendingResponse)? 'cursor-not-allowed' : 'hover:bg-green-900 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl  text-white py-[5px]' }`}>
                    Accept Order
                </button>
                <button onClick={handleReject} disabled={isSendingResponse} className={`${(props?.data?.status === 'pending')? '' : 'hidden'} flex justify-center items-center bg-red-700 w-[125px] h-[40px] rounded-[8px]  ${(isSendingResponse)? 'cursor-not-allowed' : 'cursor-pointer font-bold select-none active:scale-95 active:shadow-[0_0px_0_0_#8B0000,0_0px_0_0_#8B0000] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#8B0000,0_15px_0_0_] border-b-[1px] drop-shadow-xl  text-white py-[5px]  hover:bg-red-800' }`}>
                    Reject Order
                </button>
            </div>
        </div>
    )
}