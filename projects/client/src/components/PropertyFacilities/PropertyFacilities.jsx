import React from "react";
import { BsFileLock2 } from 'react-icons/bs'
import { AiOutlineCar } from 'react-icons/ai'
import { FiMonitor } from 'react-icons/fi'
import { BiCctv } from 'react-icons/bi'
import { MdWifi } from 'react-icons/md'
import { LiaSwimmingPoolSolid } from 'react-icons/lia'
import { BsSnow } from 'react-icons/bs'

export default function PropertyFacilities() {
    return (
        <div className="propsFacilities flex justify-between gap-[-40px]">
            <div className="facilitiesLeft text-[20px]">
                <div className="flex items-center gap-4">
                    <div className="text-[23px]">
                        <BsFileLock2 />
                    </div>
                    <div>
                        Lock on bedroom door
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[23px]">
                        <AiOutlineCar />
                    </div>
                    <div>
                        Free parking on premises
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[23px]">
                        <FiMonitor />
                    </div>
                    <div>
                        TV
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[23px]">
                        <BiCctv />
                    </div>
                    <div>
                        Security cameras on property
                    </div>
                </div>
            </div>
            <div className="facilitiesRight text-[20px]">
                <div className="flex items-center gap-4">
                    <div className="text-[23px]">
                        <MdWifi />
                    </div>
                    <div>
                        Wifi
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[23px]">
                        <LiaSwimmingPoolSolid />
                    </div>
                    <div>
                        Pool
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[23px]">
                        <BsSnow />
                    </div>
                    <div>
                        Air conditioning
                    </div>
                </div>
            </div>
        </div>
    )
}
