import React from "react";
import Carousel from "../carousel/carousel";
import CardBooking from "../cardBooking/cardBooking";


export default function Banner () {
    return (
        <div className="relative bg-white">
            <div className="flex flex-col justify-between md:flex-row-reverse my-[10px] gap-[15px] mx-[15px] md:mx-[10px] min-h-[600px]">
                <div className='w-full md:w-[55%]'>
                    <Carousel/>
                </div>
                <div className='w-full md:w-[45%]'>
                    <CardBooking/>
                </div>
            </div>
        </div>
    )
}