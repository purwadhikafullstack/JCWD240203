import React from "react";
import Carousel from "../carousel/carousel";
import CardBooking from "../cardBooking/cardBooking";


export default function Banner () {
    return (
        <div className="relative bg-white">
            <div className="flex flex-col justify-between md:flex-row">
                <div className='w-full md:w-[45%]'>
                    <CardBooking/>
                </div>
                <div className='w-full md:w-[55%]'>
                    <Carousel/>
                </div>
            </div>
        </div>
    )
}