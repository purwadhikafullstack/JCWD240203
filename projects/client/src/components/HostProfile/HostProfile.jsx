import React from "react";

export default function HostProfile() {
    return (
        <div className="hostProfile bg-[#F0EFE9] p-[35px] h-[100%] rounded-xl">
            <div className="bg-white p-[20px] py-[50px] rounded-xl drop-shadow-2xl">
                <div className="items-center text-center justify-center">
                    <div className="rounded-full text-[25px]">
                        <img src="" alt="profilePictureOwner"/>
                    </div>
                    <div className="text-[20px]">
                        <div>
                            {/* Nama Owner */}
                            Bohemian Jogja 
                        </div>
                        <div className="font-bold">
                            Host
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}