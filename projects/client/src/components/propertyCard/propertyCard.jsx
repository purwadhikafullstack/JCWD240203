import React from "react";
import './propertyCard.css'

export default function PropertyCard(props) {
  return (
    <div className="flex flex-col h-full w-full  bg-gray-100  drop-shadow rounded-[10px] transition-all duration-500 hover:scale-105 active:scale-100 cursor-pointer hover:bg-green-800/70">
      <div className="w-full p-[5px]">
        <img src={props?.data?.propertyImages[0]?.url} alt="" className="w-full h-[175px] md:h-[200px] rounded-[10px]" />
      </div>
      <div className="flex flex-col gap-[10px] h-full px-[10px] py-[5px]">
        <div className="text-left">
          <div className="stayTitle text-[20px] sm:text-[14px]">
            {props?.data?.name || 'name'}
          </div>
          <div className="stayCity text-[14px] sm:text-[14px]">
            {props?.data?.city || 'address'}
          </div>
          <div className="flex mt-auto text-[16px]">
            {'Rp.' + props?.data?.rooms[0]?.price?.toLocaleString('ID-id') || 'price'}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="stayInfoItem text-[14px]">{props?.data?.category?.type || 'type'}</div>
          <div className="stayInfoItem text-[14px]">{(props?.data?.rooms?.length > 0) ? 'Available' : 'Unavailable'}</div>
        </div>
      </div>
    </div>
  );
};
