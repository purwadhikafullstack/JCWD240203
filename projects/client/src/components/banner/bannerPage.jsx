import React from "react";
import Carousel from "../carousel/carousel";
import CardBooking from "../cardBooking/cardBooking";


export default function Banner () {
    return (
        <div className="relative bg-white">
            <div className="flex flex-col justify-between md:flex-row">
                <CardBooking className='flex-1'/>
                <Carousel className="flex-1 absolute top-0 left-0 right-0"/>
            </div>
        </div>
    )
}