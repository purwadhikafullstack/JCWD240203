import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidDownload } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { updatePaymentProof } from "../../redux/features/transaction/transactionSlice";
import './TransactionCard.css'

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
        <div className="flex flex-col w-full h-auto lg:h-[250px] lg:flex-row gap-[15px] justify-between border-[2px] border-green-700  p-[5px] rounded-[10px] bg-neutral-200/50">
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
                    Duration: {((new  Date(props?.data?.checkOut).getTime() - new Date(props?.data?.checkIn).getTime())/ 86400000) || 0} nights
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
                <div className={`${((new Date(props?.data?.checkIn).getTime() - new Date().getTime()) / 86400000 >= 2)? '' : 'hidden'}  mt-auto`}>
                    <input onChange={handleChange} id={`paymentProof${props?.index}`} type="file" className="hidden"/>
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
            <div className="flex flex-col justify-center items-center flex-[0.7] p-[10px] gap-[20px]">
                <div onClick={onSave} className={`${((new Date(props?.data?.checkIn).getTime() - new Date().getTime()) / 86400000 >= 2)? '' : 'hidden'} flex justify-center items-center  w-[128px] h-[40px] border-[1px] rounded-[20px] font-bold bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl  text-white py-[5px]  hover:bg-green-900/70`}>
                    Save Changes
                </div>
                <div className={`${((new Date(props?.data?.checkIn).getTime() - new Date().getTime()) / 86400000 >= 2)? '' : 'hidden'} flex justify-center items-center bg-red-500 w-[128px] h-[40px] border-[1px] rounded-[20px] font-bold bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#8B0000,0_0px_0_0_#8B0000] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#8B0000,0_15px_0_0_] border-b-[1px] drop-shadow-xl  text-white py-[5px]  hover:bg-red-800/70`}>
                    Cancel Order
                </div>
            </div>
        </div>
    )
}