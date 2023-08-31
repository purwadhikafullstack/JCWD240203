import React, { useEffect, useState } from "react";
import GuestBox from "../GuestBox/GuestBox";
import { useSelector } from "react-redux";
import HotelBooking from "../../components/OrderDetail/HotelBooking.png"
import './OrderDetail.css'
import { TextField } from "@mui/material";
import { toast } from "react-hot-toast";

export default function OrderDetail(props) {
    const start = useSelector((state) => state.property.start);
    const end = useSelector((state) => state.property.end);
    const guest = useSelector((state) => state.property.guest);
    const [nights, setNights] = useState(0);
    const [rooms, setRooms] = useState(1);

    useEffect(() => {
        setNights((new Date(end).getTime() - new Date(start).getTime()) / 86400000);
        setRooms(Math.ceil(guest / props?.selectedRoom?.capacity));
    }, [start, end, props?.selectedRoom, guest])

    const handleClick = () => {
        if(props?.setShowPayment) {
            if(start && end && Object.keys(props?.selectedRoom).length > 0 && (new Date(start) < new Date(end))) {
                props?.setShowPayment(true)
            }
            else if ((new Date(start) >= new Date(end))) {
                toast.error('Min duration: 1 night')
            }
            else {
                toast.error('Complete your order !');
            }
        }
    };
    return (
        <div className="orderDetail w-full md:w-[400px] py-[20px] rounded-2xl bg-[#F0EFE9]">
            <div className="mx-24 top-[-10px]">
                <img
                    alt=""
                    src={HotelBooking}
                    style={{ width: "200px", height: "200px" }}
                />
            </div>
            <div>
                <div className="text-[20px] font-bold">
                    Room Selected: {props?.selectedRoom?.name || '---'}
                </div>
                <div className="price text-[30px] font-bold">
                    {(props?.selectedRoom?.price && start && end)? `Rp.${((props?.selectedRoom?.price * nights) * rooms).toLocaleString('ID-id')}` : '---'}
                </div>
                <div className="midOrder w-full mx-auto" style={{ width: "calc(100% - 20px)" }}>
                    <div className="flex gap-[10px] py-[10px]">
                        <div className="w-full bg-white px-[5px] py-[10px] rounded-[5px]">
                            <div>
                                Check in
                            </div>
                            <TextField value={start} disabled size="medium" fullWidth/>
                        </div>
                        <div className="w-full bg-white px-[5px] py-[10px] rounded-[5px]">
                            <div>
                                Check out
                            </div>
                            <TextField value={end} disabled size="medium" fullWidth/>
                        </div>
                    </div>
                    <div className="bottomOrder flex gap-[10px px-[10px] py-[14px] mt-4 rounded-xl bg-white">
                        <div className="w-full">
                            <GuestBox label="GUESTS"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={handleClick} className="mb-[20px] text-[25px] text-white justify-center font-sans h-[45px] w-[250px] rounded-[20px] font-bold bg-green-800/50 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl hover:bg-green-800/70 mt-4">
                    Reserve room
                </button>
            </div>
        </div>
    )
}