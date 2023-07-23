import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../redux/features/transaction/transactionSlice';
import { toast } from 'react-hot-toast';



export default function PaymentModal(props) {
    const [nights, setNights] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [isBooking, setIsBooking] = useState(false);
    const call = useDispatch();
    const handleClick = () => {if(props?.setShowPayment) {props?.setShowPayment(false)}};

    const handleBooking = () => {
        const loading = toast.loading('Checking avalability !')
        if(JSON.parse(localStorage.getItem('user'))) {
            call(createTransaction({
                userId: JSON.parse(localStorage.getItem('user'), null, 2).id,
                propertyId: props?.selectedProperty?.id,
                roomId: props?.selectedRoom?.id,
                stock: rooms,
                checkIn: props?.start,
                checkOut: props?.end
            })).then(
                () => {
                    toast.success('Room booked !', {id: loading});
                },
                (error) => {
                    toast.error('Room unavailable !', {id: loading});
                    console.log(error);
                }
            )
        }
        else {
            toast.error('You need to login to book a room !', {id: loading});
            if(props?.setShowLogin) {
                props?.setShowLogin(true);
            }
        }
    }

    useEffect(() => {
        setNights((((new Date(props?.end).getTime() - new Date(props?.start).getTime()) / 86400000)).toLocaleString('ID-id'));
        setRooms(Math.ceil(props?.guest/props?.selectedRoom?.capacity));
    }, [props?.start, props?.end, props?.guest, props?.selectedRoom])

    return(
        <div className={`${(props?.showPayment)? '' : 'hidden'} flex justify-center items-center w-full h-full top-0 absolute z-30 bg-gray-300/80`}>
            <div className="flex flex-col w-[500px] h-[400px] bg-white rounded-[10px] p-[10px]">
                <div className="flex w-full justify-between border-b-[1px] border-black">
                    <div className='text-[24px] font-bold text-start '>
                        Your Order:
                    </div>
                    <div onClick={handleClick} className='cursor-pointer'>
                        <CloseIcon/>
                    </div>
                </div>
                <div className="flex flex-col w-full items-start mb-[10px]">
                    <div className="text-[20px]">
                        Property name: {props?.selectedProperty?.name}
                    </div>
                    <div className="text-start text-[14px]">
                        {props?.selectedProperty?.address}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col w-full items-start">
                        <div className="text-[20px] text-start">
                            Your room: {props?.selectedRoom?.name}
                        </div>
                        <div className="text-[14px]">
                            Rp.{props?.selectedRoom?.price?.toLocaleString('ID-id')}/night
                        </div>
                        <div className="text-[14px]">
                            Room capacity: {props?.selectedRoom?.capacity}
                        </div>
                        <div className="text-[14px]">
                            Total guest's: {props?.guest}
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-end">
                        <div className="text-[20px] text-start">
                            Duration: {nights} nights
                        </div>
                        <div>
                            Total room: {rooms}
                        </div>
                        <div className="mt-auto text-start text-[18px] font-bold">
                            Total: Rp.{((props?.selectedRoom?.price * nights) * rooms).toLocaleString('ID-id')}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-grow items-center justify-center">
                    <button onClick={handleBooking} className="w-[125px] h-[45px] bg-green-500 transition-all duration-all rounded-[5px] hover:bg-green-600 active:scale-95 active:bg-green-700">
                        Reserve room
                    </button>
                </div>
            </div>
        </div>
    )
}