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
                })). then(
                    () => {toast.success('Changes saved !', {id: loading})},
                    (error) => {toast.error('Network error, please try again later !', {id: loading})}
                )
            }
            else {
                toast.error('No changes made !', {id: loading});
            }
        }
    }

    return(
        <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-[250px] h-[275px]">
                <img src={props?.data?.property?.propertyImages[0]?.url || ''} alt="" className="w-full h-full bg-black"/>
            </div>
            <div className="flex flex-col text-start flex-1 gap-[15px] p-[10px]">
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
            <div className="flex flex-col text-start flex-1 gap-[15px] p-[10px]">
                <div className="w-full h-[325px] md:h-[175px]">
                    {
                        (!paymentProof)?
                        <img src={props?.data?.paymentProof} alt="" className="w-full h-full"/>
                        :
                        <img src={URL.createObjectURL(paymentProof)} alt="" className="w-full h-full"/>
                    }
                </div>
                <div className="mt-auto">
                    <input onChange={handleChange} id={`paymentProof${props?.index}`} type="file" className="hidden"/>
                    <label htmlFor={`paymentProof${props?.index}`} className="flex items-center justify-center gap-[10px] border-[1px] border-black cursor-pointer h-[35px]">
                        <BiSolidDownload size={25}/> Upload Payment
                    </label>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-[10px]">
                <div className="font-bold">
                    Status: {props?.data?.status}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-1 p-[10px] gap-[20px]">
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