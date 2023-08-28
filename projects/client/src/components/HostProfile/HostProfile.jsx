import React from "react";

export default function HostProfile(props) {
    return (
        <div className="bg-[#F0EFE9] p-[35px] rounded-xl">
            <div className="bg-white p-[20px] rounded-xl drop-shadow-2xl">
                <div className="flex flex-col gap-[10px] items-center text-center justify-center">
                    <div className="w-[100px] h-[100px]">
                        <img src={props?.user?.profilePicture} alt="" className="w-full h-full rounded-full"/>
                    </div>
                    <div className="font-bold text-[20px]">
                        {props?.user?.username || ''}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-[15px]">
                    <div className="font-bold text-[20px]">
                        About me
                    </div>
                    <div className="w-full h-[125px] border-[1px] border-gray-600 rounded-[5px] px-[10px] py-[5px]">
                        <textarea disabled className="w-full h-full bg-transparent resize-none" value={props?.user?.desc}/>
                    </div>
                </div>
            </div>
        </div>
    )
}