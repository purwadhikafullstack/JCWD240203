import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidDownload } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updatePaymentProof, updateStatus } from "../../redux/features/transaction/transactionSlice";
import { format } from "date-fns";
import './TransactionCard.css'

export default function TransactionCard(props) {
    const [isSendingResponse, setIsSendingResponse] = useState(false);
    const [paymentProof, setPaymentProof] = useState(null);
    const dayMilisecond = 86400000;
    const call = useDispatch();

    const formatDate = (date) => {
        return format(date, "MM-dd-yyyy");
    };
    
    const handleChange = (event) => {
        setPaymentProof(event?.target?.files[0]);
    }

    const onSave = async() => {
        setIsSendingResponse(true);
        const loading = toast.loading('Saving ...');
        if(localStorage.getItem('user')) {
            if(paymentProof) {
                await call(updatePaymentProof({
                    id: props?.data?.id,
                    userId: JSON.parse(localStorage.getItem('user')).id,
                    paymentProof: paymentProof,
                    token: JSON.parse(localStorage.getItem('user')).token,
                    page: props?.page,
                    limit: props?.limit,
                    month: props?.month,
                    year: props?.year,
                    status: props?.status
                })).then(
                    () => {
                        toast.success('Changes saved !', {id: loading});
                        setPaymentProof(null);
                    },
                    (error) => {
                        toast.error('Network error, please try again later !', {id: loading});
                        console.log(error);
                    }
                )
            }
            else {
                toast.error('No changes made !', {id: loading});
            }
        }
        setTimeout(() => {
            setIsSendingResponse(false);
        }, 400);
    }

    const onCancel = async() => {
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
                type: 'History',
                month: props?.month,
                year: props?.year,
                status: props?.status
            })).then(
                () => {
                    toast.success('Order cancelled !', {id: loading});
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
        <div className="flex flex-col w-full h-auto lg:h-[250px] lg:flex-row gap-[15px] justify-between border-[2px] border-green-700  p-[5px] rounded-[10px] bg-neutral-200/50">
            <div className="w-full md:w-[250px] h-[250px] md:h-full">
                {
                    (props?.data?.property?.propertyimages?.length > 0)?
                    <img src={props?.data?.property?.propertyimages[0]?.url} alt="" className="w-full h-full rounded-[5px]" />
                    :
                    <img src={`${process.env.REACT_APP_API_IMG_URL}/Default/DefaultProperty.png`} alt="" className="w-full h-full rounded-[5px]" />
                }
            </div>
            <div className="flex flex-col justify-center text-start flex-[1.3] gap-[15px]">
                <div className="propsNameCard text-[20px] font-bold">
                    {props?.data?.property?.name}
                </div>
                <div className="roomNamee">
                    Room: {props?.data?.room?.name}
                </div>
                <div className="addressCard text-[14px]">
                    Address: {props?.data?.property?.address}
                </div>
            </div>
            <div className="detailsOrderr flex flex-col text-start flex-1 gap-[15px] p-[10px]">
                <div>
                    Rp.{props?.data?.room?.price.toLocaleString('ID-id')}/night
                </div>
                <div>
                    Rooms rented: {props?.data?.stock}
                </div>
                <div>
                    <div>
                        Duration: {((new  Date(props?.data?.checkOut).getTime() - new Date(props?.data?.checkIn).getTime())/ 86400000) || 0} nights
                    </div>
                    <div className="text-[14px]">
                        {formatDate(new Date(props?.data?.checkOut))} - {formatDate(new Date(props?.data?.checkIn))}
                    </div>
                </div>
                <div className="mt-auto text-[20px] font-bold">
                    Grand total: {props?.data?.price?.toLocaleString('ID-id')}
                </div>
            </div>
            <div className="paymentProoff font-bold flex flex-col items-center justify-center flex-[1.1] gap-[15px] p-[10px] text-[16px]">
                Payment proof:
                <div className="w-full h-[325px] md:h-[175px] border-[1px] border-gray-600 rounded-[5px] overflow-hidden">
                    {
                        (!paymentProof)?
                        <img src={props?.data?.paymentProof} alt="" className="w-full h-full"/>
                        :
                        <img src={URL.createObjectURL(paymentProof)} alt="" className="w-full h-full"/>
                    }
                </div>
                <div className={`${(props?.data?.status === 'pending')? '' : 'hidden'}  mt-auto`}>
                    <input onChange={handleChange} id={`paymentProof${props?.index}`} accept="image/png,image/jpeg" type="file" className="hidden"/>
                    <label htmlFor={`paymentProof${props?.index}`} className="flex items-center justify-center gap-[5px] border-[1px] rounded-[20px] font-bold bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl  text-white w-[165px] py-[5px]  hover:bg-green-900/70">
                        <BiSolidDownload size={25}/> Upload Payment
                    </label>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-[10px]">
                <div className="statusdets font-bold">
                    Status: {props?.data?.status}
                </div>
            </div>
            <div className="flex lg:flex-col justify-center items-center flex-[0.7] p-[10px] gap-[20px]">
                <button disabled={isSendingResponse} onClick={onSave} className={`${(props?.data?.status === 'pending')? '' : 'hidden'} flex justify-center items-center w-[125px] h-[40px] rounded-[8px] font-bold bg-green-700 text-white  ${(isSendingResponse)? 'cursor-not-allowed' : 'hover:bg-green-900 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px]'} transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl text-white py-[5px] `}>
                    Save Changes
                </button>
                <button disabled={isSendingResponse} onClick={onCancel} className={`${((new Date(props?.data?.checkIn).getTime() - new Date().getTime()) / dayMilisecond >= 2 && props?.data?.status === 'pending')? '' : 'hidden'} flex justify-center items-center bg-red-700 w-[125px] h-[40px] rounded-[8px]  ${(isSendingResponse)? 'cursor-not-allowed' : 'cursor-pointer font-bold select-none active:scale-95 active:shadow-[0_0px_0_0_#8B0000,0_0px_0_0_#8B0000] active:border-b-[0px] hover:bg-red-800'} transition-all duration-150 shadow-[0_10px_0_0_#8B0000,0_15px_0_0_] border-b-[1px] drop-shadow-xl  text-white py-[5px]`}>
                    Cancel Order
                </button>
            </div>
        </div>
    )
}