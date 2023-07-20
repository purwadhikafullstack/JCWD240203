import React from "react";
import { RiHotelBedLine } from 'react-icons/ri'
import { PiMapPin } from 'react-icons/pi'
import { PiKeyBold } from 'react-icons/pi'

export default function HighlightFeatures() {
    return (
        <div className="highlightFeatures text-left">
            <div className="one">
                <div className="flex items-center gap-4">
                    <div className="text-[34px]">
                        <RiHotelBedLine />
                    </div>
                    <div className="font-bold text-[18px]">
                        Room in a villa
                    </div>
                </div>
                <div className="text-[18px]" style={{ textIndent: "46px" }}>
                    Your own room in a home, plus access to shared spaces.
                </div>
            </div>
            <div className="two mt-6">
                <div className="greatLocation flex items-center gap-4">
                    <div className="text-[34px]">
                        <PiMapPin />
                    </div>
                    <div className="font-bold text-[18px]">
                        Great location
                    </div>
                </div>
                <div className="text-[18px]" style={{ textIndent: "46px" }}>
                    100% of recent guests gave the location a 5-star rating.
                </div>
            </div>
            <div className="three mt-6">
                <div className="checkIn flex items-center gap-4">
                    <div className="text-[34px]">
                        <PiKeyBold />
                    </div>
                    <div className="font-bold text-[18px]">
                        Great Check-in experience
                    </div>
                </div>
                <div className="text-[18px]" style={{ textIndent: "46px" }}>
                    100% of recent guests gave the check-in process a 5-star rating.
                </div>
            </div>
            <hr className="my-4 border-gray-300" />
        </div>
    )
}