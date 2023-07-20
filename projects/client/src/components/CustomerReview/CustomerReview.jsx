import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { AiFillStar } from "react-icons/ai";

export default function CustomerReview() {
    return (
        <Card className="mt-6 mb-12 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto drop-shadow-2xl bg-white rounded-lg">
            <CardBody>
                <div className="review flex gap-1.5 items-center text-[17px] text-left">
                    <div>
                        <AiFillStar />
                    </div>
                    <div>
                        5.0 3 reviews
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}