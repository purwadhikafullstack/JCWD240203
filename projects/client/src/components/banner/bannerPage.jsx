import React from "react";
import Carousel from "../carousel/carousel";
import CardBooking from "../cardBooking/cardBooking";


export default function Banner () {
    return (
        <div className="relative bg-white">
            <div className="flex flex-col-reverse justify-between md:flex-row">
                <CardBooking className='md:w-1/2'/>
                <Carousel className="md:w-1/2 absolute top-0 left-0 right-0 z-0"/>
            </div>
        </div>
    )
}