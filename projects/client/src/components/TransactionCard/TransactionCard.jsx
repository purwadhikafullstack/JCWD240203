import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidDownload } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updatePaymentProof } from "../../redux/features/transaction/transactionSlice";

export default function TransactionCard(props) {
    const [paymentProof, setPaymentProof] = useState(null);
    const call = useDispatch();
    
    const handleChange = (event) => {
        setPaymentProof(event?.target?.files[0]);
    }

    const onSave = () => {
        const loading = toast.loading('Saving ...');
        if(localStorage.getItem('user')) {
            if(paymentProof) {
                call(updatePaymentProof({
                    id: props?.data?.id,
                    userId: JSON.parse(localStorage.getItem('user')).id,
                    paymentProof: paymentProof,
                    token: JSON.parse(localStorage.getItem('user')).token,
                    page: props?.page,
                    limit: props?.limit
                })).then(
                    () => {toast.success('Changes saved !', {id: loading})},
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
    }

    return(
        <div className="flex flex-col w-full h-auto md:h-[250px] md:flex-row gap-[15px] justify-between">
            <div className="w-full md:w-[250px] h-[250px] md:h-full">
                <img src={props?.data?.property?.propertyImages[0]?.url || ''} alt="" className="w-full h-full rounded-[5px]"/>
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
                    Rooms rented: {props?.data?.stock}
                </div>
                <div>
                    Duration: {((new  Date(props?.data?.checkOut).getTime() - new Date(props?.data?.checkIn).getTime())/ 86400000) || 0} nights
                </div>
                <div className="mt-auto text-[20px] font-bold">
                    Grand total: {((((new  Date(props?.data?.checkOut).getTime() - new Date(props?.data?.checkIn).getTime())/ 86400000) * (props?.data?.room?.price * props?.data?.stock)).toLocaleString('ID-id')) || 0}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-[1.1] gap-[15px] p-[10px]">
                Payment proof:
                <div className="w-full h-[325px] md:h-[175px] border-[1px] border-gray-600 rounded-[5px] overflow-hidden">
                    {
                        (!paymentProof)?
                        <img src={props?.data?.paymentProof} alt="" className="w-full h-full"/>
                        :
                        <img src={URL.createObjectURL(paymentProof)} alt="" className="w-full h-full"/>
                    }
                </div>
                <div className={`${((new Date(props?.data?.checkIn).getTime() - new Date().getTime()) / 86400000 >= 2)? '' : 'hidden'}  mt-auto`}>
                    <input onChange={handleChange} id={`paymentProof${props?.index}`} type="file" className="hidden"/>
                    <label htmlFor={`paymentProof${props?.index}`} className="flex items-center justify-center gap-[5px] border-[1px] border-black cursor-pointer w-[175px] h-[35px]">
                        <BiSolidDownload size={25}/> Upload Payment
                    </label>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-[10px]">
                <div className="font-bold">
                    Status: {props?.data?.status}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-[0.7] p-[10px] gap-[20px]">
                <div onClick={onSave} className={`${((new Date(props?.data?.checkIn).getTime() - new Date().getTime()) / 86400000 >= 2)? '' : 'hidden'} flex justify-center items-center bg-green-500 w-[125px] h-[40px] rounded-[5px] transition-all duration-400 hover:bg-green-600 active:bg-green-700 active:scale-95 cursor-pointer`}>
                    Save Changes
                </div>
                <div className={`${((new Date(props?.data?.checkIn).getTime() - new Date().getTime()) / 86400000 >= 2)? '' : 'hidden'} flex justify-center items-center bg-red-500 w-[125px] h-[40px] rounded-[5px] transition-all duration-400 hover:bg-red-600 active:bg-red-700 active:scale-95 cursor-pointer`}>
                    Cancel Order
                </div>
            </div>
        </div>
    )
}