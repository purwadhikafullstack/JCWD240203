import React from "react";


export default function CancelReservationCard() {
    return (
        <div className="w-full bg-slate-200/25 h-full py-1 rounded-[10px]">
            <div className="flex flex-col h-full w-[360px] bg-[#F0EFE9] drop-shadow-xl rounded-[10px] border-2 mx-3 my-6">
                <div className="px-[10px] py-[10px] text-green-800 text-[20px] font-semibold">
                    {/* input canceled reservation */}
                    Cancelled on 28-08-2023 
                </div>
                <div className="flex flex-col gap-[10px] h-full px-[10px] py-[5px] w-[360px]">
                    <div className="text-left">
                        <div className="flex items-center justify-between">
                            <div className="buyerName text-[20px] font-bold">
                                {/* input user's name */}
                                Hange
                            </div>
                        </div>
                        <div className="chosenRoom text-[18px] py-[10px]">
                         1 Bedroom Villa with Private Pool for 2 Pax
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