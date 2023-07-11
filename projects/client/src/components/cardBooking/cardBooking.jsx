import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import LocationBox from "../LocationBox/locationBox";
import DateBox from "../DateBox/dateBox";
import GuestBox from "../GuestBox/guestBox";
import './cardBooking.css'


export default function CardBooking() {
  return (
    <Card className="mt-6 w-100 ml-4 z-40 drop-shadow-2xl bg-white rounded-lg">
      <CardBody>
        <div className="typography">
          <h5 color="blue-gray" className="mb-2 text-6xl font-bold text-gray-900 ">
            Find places to stay in Indonesia
          </h5>
          <h4>
            Whether you’re looking for a cabin, a condo, or a castle—find your getaway on Rentify.
          </h4>
        </div>
        <div className="locationBox flex">
          <LocationBox handleFocus={() => {}} handleBlur={() => {}} />
        </div>
        <div className="dateBox relative h-[100px] z-20">
          <div className="absolute flex left-[20px]">
            <div>
              <DateBox label="CHECK IN" handleFocus={() => {}} handleBlur={() => {}} />
            </div>
            <div>
              <DateBox label="CHECK OUT" handleFocus={() => {}} handleBlur={() => {}} />
            </div>
          </div>
        </div>
        <div className="guestBox relative h-[100px] z-10">
          <div className="absolute flex left-[20px]">
            <div>
              <GuestBox label="ADULTS" />
            </div>
            <div>
              <GuestBox label="CHILDREN" />
            </div>
          </div>
        </div>
        <div>
          <button className="searchButton px-[270px] py-[8px] mt-8 text-2xl font-sans rounded-[10px] bg-green-600 text-white font-extrabold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
            Search
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
