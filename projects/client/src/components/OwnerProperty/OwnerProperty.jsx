import React from "react";
import { AiFillStar } from "react-icons/ai";
import './OwnerProperty.css'

export default function OwnerProperty() {
    return (
        <div className="flex flex-col h-full w-[300px] bg-gray-100  drop-shadow-2xl rounded-[10px] border-2 ">
            <div className="w-full p-[10px]">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/26dffe9b-d506-4229-ae3b-a2b6ddc0fee0.jpeg?im_w=1200" alt="ownerPropertyImage" className="w-[350px] h-[230px] rounded-[10px]" />
            </div>
            <div className="flex flex-col gap-[10px] h-full px-[10px] py-[5px] w-full">
                <div className="text-left">
                    <div className="flex items-center justify-between">
                        <div className="propsName text-[20px]">
                            1 Bedroom Villa with Private Pool for 2 Pax
                        </div>
                        <div className="flex items-center gap-2 mb-6">
                            <div>
                                <AiFillStar />
                            </div>
                            <div className="rate font-bold">
                                4.5
                            </div>
                        </div>
                    </div>
                    <div className="ownerPrice text-[16px] py-[6px]">
                        Rp1,895,000 night
                    </div>
                </div>
            </div>
        </div>
    )
}