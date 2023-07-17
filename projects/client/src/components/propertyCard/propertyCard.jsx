import React from "react";
import './PropertyCard.css'

export default function PropertyCard(props) {
  return (
    <div className="flex flex-col h-full w-full bg-gray-200 rounded-[10px] transition-all duration-500 hover:scale-105 active:scale-100 cursor-pointer">
      <div className="w-full p-[5px]">
        <img src={props?.data?.propertyImages[0]?.url} alt="" className="w-full h-[175px] md:h-[200px] rounded-[10px]" />
      </div>
      <div className="flex flex-col gap-[10px] h-full px-[10px] py-[5px]">
        <div className="stayTitle text-[12px] sm:text-[14px]">{props?.data?.name || 'name'}</div>
        <div className="flex mt-auto justify-center text-[16px]">{props?.data?.price || 'price'}</div>
        <div className="flex justify-between">
          <div className="stayInfoItem text-[12px]">{props?.data?.category?.type || 'type'}</div>
          <div className="stayInfoItem text-[12px]">{(props?.data?.room?.length > 0)? 'Available' : 'Unavailable'}</div>
        </div>
      </div>
    </div>
  );
};
