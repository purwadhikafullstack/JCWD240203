import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../redux/features/transaction/transactionSlice';
import { toast } from 'react-hot-toast';
import './PaymentModal.css'



export default function PaymentModal(props) {
    const [nights, setNights] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [isBooking, setIsBooking] = useState(false);
    const call = useDispatch();
    const handleClick = () => { if (props?.setShowPayment) { props?.setShowPayment(false) } };

    const handleBooking = () => {
        const loading = toast.loading('Checking avalability !')
        if (JSON.parse(localStorage.getItem('user'))) {
            call(createTransaction({
                userId: JSON.parse(localStorage.getItem('user'), null, 2).id,
                propertyId: props?.selectedProperty?.id,
                roomId: props?.selectedRoom?.id,
                stock: rooms,
                checkIn: props?.start,
                checkOut: props?.end
            })).then(
                () => {
                    toast.success('Room booked !', { id: loading });
                },
                (error) => {
                    toast.error('Room unavailable !', { id: loading });
                    console.log(error);
                }
            )
        }
        else {
            toast.error('You need to login to book a room !', { id: loading });
            if (props?.setShowLogin) {
                props?.setShowLogin(true);
            }
        }
    }

    useEffect(() => {
        setNights((((new Date(props?.end).getTime() - new Date(props?.start).getTime()) / 86400000)).toLocaleString('ID-id'));
        setRooms(Math.ceil(props?.guest / props?.selectedRoom?.capacity));
    }, [props?.start, props?.end, props?.guest, props?.selectedRoom])

    return (
        <div className={`${(props?.showPayment) ? '' : 'hidden'} flex justify-center items-center w-full h-full top-0 absolute z-30 bg-gray-300/80`}>
            <div className="flex flex-col w-[500px] h-[400px] bg-white rounded-[10px] p-[10px] drop-shadow-xl">
                <div className="flex w-full justify-between border-b-[1px] border-black">
                    <div className='yourOrder font-extrabold text-[24px] text-start '>
                      💳 Your Order:
                    </div>
                    <div onClick={handleClick} className='cursor-pointer'>
                        <CloseIcon />
                    </div>
                </div>
                <div className="flex flex-col w-full items-start mb-[10px]">
                    <div className="propertyName text-[21px]">
                        Property name: {props?.selectedProperty?.name}
                    </div>
                    <div className="address text-start text-[16px]">
                        {props?.selectedProperty?.address}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col w-full items-start">
                        <div className="text-[20px] text-start">
                            <div className='yourRoom'>
                                Your room:
                            </div>
                            <div className='selectedRoom capitalize font-bold text-teal-600 hover:text-teal-700'>
                                {props?.selectedRoom?.name}
                            </div>
                        </div>
                        <div className="price font-bold text-[15px]">
                            Rp.{props?.selectedRoom?.price?.toLocaleString('ID-id')}/night
                        </div>
                        <div className="capacity font-bold text-[15px]">
                            Room capacity: {props?.selectedRoom?.capacity}
                        </div>
                        <div className="totalguest font-bold text-[15px]">
                            Total guest's: {props?.guest}
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-end">
                        <div className="text-[20px] text-start">
                            <div className='duration'>
                                Duration:
                            </div>
                            <div className='totalnight font-bold text-teal-600 hover:text-teal-700'>
                                {`${nights}`} nights
                            </div>
                        </div>
                        <div className='totalRoom text-[20px] flex gap-2'>
                            <div>
                                Total room:
                            </div>
                            <div className=' font-bold text-teal-600 hover:text-teal-700'>
                                {`${rooms}`}
                            </div>
                        </div>
                        <div className="totalPrice mt-auto text-start text-[23px] font-bold flex gap-2">
                            <div className=''>
                                Total:
                            </div>
                            <div className=' text-teal-600 hover:text-teal-700 underline underline-offset-4'>
                                Rp.{((props?.selectedRoom?.price * nights) * rooms).toLocaleString('ID-id')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payNow flex flex-col flex-grow items-center justify-center">
                    <button onClick={handleBooking} className="payNow w-[200px] h-[45px] text-[28px] text-white justify-center font-sans rounded-[20px] font-bold bg-green-800/50 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl hover:bg-green-800/70">
                        Pay Now !
                    </button>
                </div>
            </div>
        </div>
    )
}