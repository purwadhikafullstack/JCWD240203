import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import LocationBox from "../LocationBox/locationBox";
import DateBox from "../DateBox/dateBox";
import GuestBox from "../GuestBox/guestBox";
import './cardBooking.css'


export default function CardBooking() {

  return (
    <Card className="mt-6 mb-12 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto z-10 drop-shadow-2xl bg-white rounded-lg">
      <CardBody>
        <div className="typography">
          <h5 color="blue-gray" className="mb-2 text-6xl font-bold text-gray-900 ">
            Find places to stay in Indonesia
          </h5>
          <h4>
            Whether you're looking for a cabin, a condo, or a castle—find your getaway on Rentify.
          </h4>
        </div>
        <div className="locationBox flex px-[10px] md:px-[30px]">
          <LocationBox handleFocus={() => {}} handleBlur={() => {}} />
        </div>
        <div className="dateBox relative w-full h-[100px] z-20">
          <div className="absolute w-full px-[10px] md:px-[30px] flex gap-[10px]">
            <div className="w-full">
              <DateBox label="CHECK IN" type={'checkIn'} />
            </div>
            <div className="w-full">
              <DateBox label="CHECK OUT" type={'checkOut'} />
            </div>
          </div>
        </div>
        <div className="guestBox relative w-full h-[100px] z-10">
          <div className="flex justify-center gap-[10px] px-[10px] md:px-[30px]">
            <div className="w-full">
              <GuestBox label="ADULTS" />
            </div>
            <div className="w-full">
              <GuestBox label="CHILDREN" />
            </div>
          </div>
        </div>
        <div>
          <button className="searchButton py-[8px] my-[15px] text-2xl font-sans rounded-[10px] bg-green-600 text-white font-extrabold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
            Search
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
