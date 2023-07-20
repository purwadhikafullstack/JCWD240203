import React from "react";
import { AiFillStar } from "react-icons/ai";
import './ListingCard.css';

export default function ListingCard(props) {
  return (
    <div className="flex flex-col h-full w-full bg-gray-200 rounded-[10px] transition-all duration-500 hover:scale-105 active:scale-100 cursor-pointer">
        <div className="w-full p-[5px]">
          <img src={props?.data?.propertyImages[0]?.url} alt="" className="w-full h-[175px] md:h-[200px] rounded-[10px]" />
        </div>
        <div className="flex flex-col w-full items-start gap-[5px] h-full px-[10px] py-[5px]">
            <div className="font-bold text-start text-[12px] sm:text-[14px]">
                {props?.data?.name || 'name'}
            </div>
            <div className="w-full flex mt-auto justify-between py-[5px]">
                <div className="listingDesc text-start text-[14px]">
                    {props?.data?.category?.type || 'type'}
                </div>
                <div className="text-start text-[14px]">
                    <div className="flex gap-[5px] items-center justify-center">
                        {console.log(props?.data)}
                        <AiFillStar size={20}/> {props?.data?.average}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};