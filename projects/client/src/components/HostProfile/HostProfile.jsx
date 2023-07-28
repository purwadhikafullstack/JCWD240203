import React from "react";

export default function HostProfile(props) {
    return (
        <div className="hostProfile bg-[#F0EFE9] p-[35px] h-[100%] rounded-xl">
            <div className="bg-white p-[20px] rounded-xl drop-shadow-2xl">
                <div className="flex flex-col gap-[10px] items-center text-center justify-center">
                    <div className="w-[100px] h-[100px]">
                        <img src={props?.user?.profilePicture} alt="" className="w-full h-full rounded-full"/>
                    </div>
                    <div className="font-bold text-[20px]">
                        {props?.user?.username || ''}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start">
                    <div className="font-bold text-[20px]">
                        About me
                    </div>
                    <div className="w-full">
                        <textarea disabled className="w-full h-[150px] bg-transparent overflow-y-auto removeScroll resize-none" value={props?.user?.desc}/>
                    </div>
                </div>
            </div>
        </div>
    )
}