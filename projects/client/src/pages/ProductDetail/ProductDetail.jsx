import React from "react"
import HeaderDetail from "../../components/HeaderDetai/HeaderDetail"
import { AiFillStar } from "react-icons/ai"

export default function ProductDetail() {
    return (
        <div className="w-full h-[100vh] bg-white">
            <HeaderDetail />
            <main className=" bg-white w-full mx-auto mt-[30px] px-20">
                <div className="propertiesHeading text-left">
                    <div className="propertiesName">
                        1 Bedroom Villa with Private Pool for 2 Pax
                    </div>
                    <div className="flex gap-4">
                        <div className="review flex gap-1.5 items-center">
                            <div>
                                <AiFillStar />
                            </div>
                            <div>
                                5.0
                            </div>
                            3 reviews
                        </div>
                        <div className="address">
                            Jl. Kaya Raya UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta
                        </div>
                    </div>
                </div>
                <div className=" bg-lime-700">
                    images
                </div>
            </main>
        </div>
    )
}