import React from "react";
import Carousel from "../carousel/carousel";
import CardBooking from "../cardBooking/cardBooking";


export default function Banner () {
    return (
        <div className="relative h-[780px] bg-white">
            <div className="flex justify-between">
                <CardBooking className='z-40'/>
                <Carousel/>
            </div>
        </div>
    )
}