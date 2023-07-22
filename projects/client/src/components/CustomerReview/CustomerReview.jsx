import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { AiFillStar } from "react-icons/ai";

export default function CustomerReview(props) {
    return (
        <Card className="w-full drop-shadow-2xl bg-white rounded-[10px] px-[5px]">
            <CardBody>
                <div className="flex gap-1.5 justify-between items-center text-[17px] text-left">
                    <div className="flex gap-[10px] items-center">
                        <div>
                            <AiFillStar size={30}/>
                        </div>
                        <div className="text-[24px] font-bold">
                            {props?.average || 0}
                        </div>
                    </div>
                    <div className="text-[24px] font-bold self-end">
                        {props?.reviews?.length || 0} reviews
                    </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                    {
                        props?.reviews?.map((value, index) => {
                            return(
                                <div key={index} className="bg-gray-200 rounded-[10px] p-[10px]">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-[10px] items-center">
                                            <div className="rounded-full overflow-hidden w-[35px] h-[35px]">
                                                <img src={value?.user?.profilePicture} alt="" className="w-full h-full object-cover"/>
                                            </div>
                                            <div>
                                                {value?.user?.username || ''}
                                            </div>
                                        </div>
                                        <div className="flex gap-[5px]">
                                            {
                                                [...Array(value?.rating)].map((value, index) => {
                                                    return(
                                                        <AiFillStar size={25} key={index}/>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="w-full text-start h-[100px]">
                                        {value?.description}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </CardBody>
        </Card>
    )
}