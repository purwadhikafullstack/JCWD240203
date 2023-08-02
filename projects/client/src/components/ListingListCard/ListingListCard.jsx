import React from "react";

export default function ListingListCard(props) {
    return (
        <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="w-full md:w-[380px] px-[10px] py-[10px] ">
                <div className="flex gap-2">
                    <div className="">
                        {
                            (props?.data?.propertyImages?.length > 0)?
                            <img src={props?.data?.propertyImages[0]?.url} alt="" className="w-[100px] h-[72px]" />
                            :
                            <img src={`${process.env.REACT_APP_API_BASE_URL}/default/DefaultProperty.png`} alt="" className="w-[100px] h-[72px]" />
                        }
                    </div>
                    <div className="flex items-center justify-center md:justify-start text-left text-[16px] w-full md:w-[280px] font-bold">
                        {props?.data?.name || ''}
                    </div>
                </div>
            </div>
            <div className="status flex items-center w-full md:w-[200px] px-[10px] py-[10px] font-bold">
                {/* status: published/in progress/bebas */}
                <div className="hidden md:block text-left ">
                    {props?.data?.status || ''}
                </div>
                <div className="md:hidden text-center w-full">
                    Status: {props?.data?.status || ''}
                </div>
            </div>
            <div className="locationlist w-full md:w-[275px] px-[8px] py-[10px] font-bold flex">
                {/* status: published/in progress/bebas */}
                <div className="w-full text-left text-[14px] ">
                    {props?.data?.address || ''}
                </div>
            </div>
            <div className="flex w-full md:w-auto justify-center">
                <div className="text-[18px] flex text-white justify-center items-center font-sans h-[45px] w-[125px] rounded-[20px] font-bold bg-green-800/50 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl hover:bg-green-800/70 py-">
                    ✏️ edit
                </div>
            </div>
        </div>
    )
}