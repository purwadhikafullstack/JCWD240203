import React from "react";

export default function ListingListCard(props) {
    return (
        <div className="flex flex-grow  h-full w-full items-center ">
            <div className="flex justify-between w-full">
                <div className="w-[380px] px-[10px] py-[10px] ">
                    <div className="flex gap-2">
                        <div>
                            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/7f44ddd7-3cf5-4488-8f2c-b07c29439ab5.jpeg?im_w=1440" alt="listpicture" className="w-[120] h-[72px]" />
                            {/* <img src={props?.data?.propertyImages[0]?.url} alt="listpicture" className="w-[100] h-[72px]" /> */}
                        </div>
                        <div className="text-left text-[16px] w-[280px] font-bold">
                            1 Bedroom Villa with Private Pool for 2 Pax
                            {/* {props?.data?.name || 'name'} */}
                        </div>
                    </div>
                </div>
                <div className="status w-[200px] px-[10px] py-[10px] font-bold">
                    {/* status: published/in progress/bebas */}
                    <div className=" text-left ">
                        Published
                    </div>
                </div>
                <div className="roomlist w-[200px] px-[10px] py-[10px] font-bold">
                    {/* status: published/in progress/bebas */}
                    <div className="text-left ">
                        1 King Bedroom
                    </div>
                </div>
                <div className="locationlist w-[400px] px-[8px] py-[10px] font-bold flex">
                    {/* status: published/in progress/bebas */}
                    <div className=" text-left ">
                        Kecamatan Mlati, Daerah Istimewa Yogyakarta, Indonesia
                    </div>
                    <div className="text-[18px] py-1 px-2 text-white justify-center items-center font-sans h-[45px] w-[125px] rounded-[20px] font-bold bg-green-800/50 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl hover:bg-green-800/70 py-">
                   ✏️ edit
                </div>
                </div>          
            </div>
            <hr className="my-4 border-gray-300" />
        </div>
    )
}