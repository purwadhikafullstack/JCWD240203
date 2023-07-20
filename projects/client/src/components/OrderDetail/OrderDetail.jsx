import React from "react";
import GuestBox from "../../components/GuestBox/guestBox";
import DateBox from "../../components/DateBox/dateBox";
import HotelBooking from "../../components/OrderDetail/HotelBooking.png"
import './OrderDetail.css'

export default function OrderDetail() {
    return (
        <div className="orderDetail w-[400px] py-[200px] drop-shadow-2xl rounded-2xl bg-[#F0EFE9]">
            <div className="mx-24 top-[-10px]">
                <img
                    alt=""
                    src={HotelBooking}
                    style={{ width: "200px", height: "200px" }}
                />
            </div>
            <div>
                <div className="price text-[30px] font-bold">
                    Rp1,300,000 night
                </div>
                <div className="midOrder w-full h-[100px] mx-auto" style={{ width: "calc(100% - 20px)" }}>
                    <div className="flex gap-[10px] py-[14px]">
                        <div className="w-full">
                            <DateBox label="CHECK IN" type={'checkIn'} />
                        </div>
                        <div className="w-full">
                            <DateBox label="CHECK OUT" type={'checkOut'} />
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