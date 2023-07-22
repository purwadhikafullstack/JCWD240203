import React from "react";
import GuestBox from "../../components/GuestBox/guestBox";
import { useSelector } from "react-redux";
import HotelBooking from "../../components/OrderDetail/HotelBooking.png"
import './OrderDetail.css'
import { TextField } from "@mui/material";

export default function OrderDetail(props) {
    const start = useSelector((state) => state.property.start);
    const end = useSelector((state) => state.property.end);

    return (
        <div className="orderDetail w-[400px] py-[20px] drop-shadow-2xl rounded-2xl bg-[#F0EFE9]">
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
                    {(props?.selectedRoom?.price && start && end)? `Rp.${(props?.selectedRoom?.price * (((new Date(end).getTime() - new Date(start).getTime()) / 86400000))).toLocaleString('ID-id')}` : '---'}
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
                            <GuestBox label="GUESTS" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}