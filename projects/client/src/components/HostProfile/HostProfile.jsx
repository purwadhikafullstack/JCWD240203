import React from "react";

export default function HostProfile(props) {
    return (
        <div className="bg-[#F0EFE9] p-[35px] rounded-xl">
            <div className="bg-white p-[20px] rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center justify-center">
                    <div className="w-[100px] h-[100px] overflow-hidden rounded-full border-4 border-white">
                        <img
                            src={props?.user?.profilePicture}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="font-bold text-2xl mt-4 text-gray-800">
                        <span className="border-b-2 pb-1 ">
                            {props?.user?.username || "Username"}
                        </span>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="font-bold text-xl mb-2 text-gray-800">
                        About me
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-gray-700">{props?.user?.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}