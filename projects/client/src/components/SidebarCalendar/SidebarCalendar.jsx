import React from "react";
import EventCalendarModal from "../../components/EventModalCalendar/EventModalCalendar";
import { TextField } from "@mui/material";
// import "react-day-picker/lib/style.css";

export default function SidebarCalendar(props) {
    return (
        <div className="flex flex-col items-center justify-center h-auto md:h-[485px] w-full md:w-[350px] md:overflow-y-auto removeScroll">
            <div className="w-full rounded-[13px] pb-[25px] px-2 border-2 border-gray-200">
                <div className="flex flex-col gap-[10px] w-full px-2 my-2">
                    <h1 className="text-[18px] font-bold text-left">Discounts/Mark Ups</h1>
                    <h2 className="text-base text-left">
                        Adjust your pricing to attract more guests.
                    </h2>
                </div>
                <div className="flex flex-col gap-[10px] text-left px-2">
                    <div>
                        <span className="text-black text-xl underline underline-offset-4">
                            null
                        </span>
                    </div>
                    <div>
                        <span className="text-black text-4xl font-bold">
                            % off
                        </span>
                    </div>
                    {/* Calculate total price after discount */}
                    <div className="flex flex-col gap-[10px]">
                        <TextField
                            type="text"
                            fullWidth
                            size="small"
                            label="Start"
                            disabled
                        />
                        <TextField
                            type="text"
                            fullWidth
                            size="small"
                            label="End"
                            disabled
                        />
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <TextField
                            type="number"
                            fullWidth
                            size="small"
                            label="Percentage"
                        />
                        <div className="flex flex-col gap-[5px]">
                            Final Price:
                            <TextField
                                type="number"
                                fullWidth
                                size="small"
                                label="Price"
                                disabled
                            />
                        </div>
                    </div>
                    <button
                    className="exploreButton w-full mt-2 py-[4px] text-2xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl"
                    >
                        Save
                    </button>
                </div>
            </div>
            {/* Modal content and form */}
            <EventCalendarModal/>
        </div>
    );
}

