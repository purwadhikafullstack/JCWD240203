import React from "react";
import './CurrentlyStaying.css'


export default function CurrentlyStaying() {
    return (
        <div className="w-full bg-slate-200/25 h-full py-1 rounded-[10px]">
            <div className="currentlyStaying flex flex-col h-full w-[360px] bg-[#F0EFE9] drop-shadow-xl rounded-[10px] border-2 mx-3 my-6">
                <div className="px-[10px] py-[10px] text-green-800 text-[20px] font-semibold">
                    {/* input start date here */}
                    Just check in on 28-07-2023
                </div>
                <div className="flex flex-col gap-[10px] h-full px-[10px] py-[5px] w-[360px]">
                    <div className="text-left">
                        <div className="flex items-center justify-between">
                            <div className="buyerName text-[20px] font-bold">
                                {/* input user's name */}
                                Eren
                            </div>
                        </div>
                        <div className="durationBooked text-[20px] font-bold">
                            {/* total duration */}
                            5 Nights
                        </div>
                        <div className="chosenRoom text-[18px] py-[10px]">
                            1 King Bedroom
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}