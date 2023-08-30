// RoomCard.jsx

import React, { useEffect, useState } from "react";
import './RoomCard.css';

export default function RoomCard(props) {
    const [percentage, setPercentage] = useState(0);
    const handleClick = (value) => {
        if (props?.setSelectedRoom) {
            props?.setSelectedRoom(value);
        }
    };

    useEffect(() => {
        if (props?.data?.prices) {
            let temp = 0;
            props?.data?.prices?.forEach((value) => {
                if (value.type === "Mark up") {
                    temp += value.percentage;
                } else if (value.type === "Discount") {
                    temp -= value.percentage;
                }
            });
            setPercentage(temp);
        }
    }, [props?.data?.prices]);

    return (
        <div className="relative carddetailss flex w-full bg-gray-200 p-[10px] rounded-[10px] justify-between h-auto md:h-[125px] overflow-hidden">
            <div className={`${(percentage > 0 || percentage < 0) ? "ribbon" : "hidden"}`}>
                <span>{percentage < 0 ? `- ${percentage}%` : `+ ${percentage}%`}</span>
            </div>
            <div className="flex flex-col items-start text-start gap-[5px] justify-center mx-3">
                <div className="text-[22px] md:text-[24px] font-bold">
                    {props?.data?.name}
                </div>
                <div>Room capacity: {props?.data?.capacity}</div>
                <div>{props?.data.description}</div>
            </div>
            <div className="flex flex-col gap-[20px] justify-center items-end px-3">
                <div className="text-[24px] font-bold">
                    Rp.{props?.data?.price?.toLocaleString("ID-id")}
                </div>
                <div>
                    <button
                        onClick={() => handleClick(props?.data)}
                        className="w-[100px] h-[40px] bg-green-500 rounded-[5px] transition-all duration-400 hover:bg-green-600 active:bg-green-700 active:scale-95 cursor-pointer"
                    >
                        Select room
                    </button>
                </div>
            </div>
        </div>
    );
}
