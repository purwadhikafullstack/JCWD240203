import React from "react";
import HeaderDetail from "../../components/HeaderDetail/HeaderDetail";
import { AiFillStar } from "react-icons/ai";
import GalleryProperties from "../../components/GalleryProperties/GalleryProperties";
import { LiaBedSolid } from 'react-icons/lia'
import { GiShower } from 'react-icons/gi'
import { FaHouseUser } from 'react-icons/fa'
import './ProductDetail.css'
import HighlightFeatures from "../../components/HighlightFeatures/HighlightFeatures";
import HostProfile from "../../components/HostProfile/HostProfile";
import PropertyFacilities from "../../components/PropertyFacilities/PropertyFacilities";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import CustomerReview from "../../components/CustomerReview/CustomerReview";

export default function ProductDetail() {
    return (
        <div className="w-full h-[100vh] bg-white">
            <HeaderDetail />
            <main className="bg-white w-full mx-auto mt-[30px] px-20">
                <div className="propertiesHeading text-left mt-8">
                    <div className="propertiesName text-[30px] font-black">
                        1 Bedroom Villa with Private Pool for 2 Pax
                    </div>
                    <div className="addressReview flex gap-4 items-center font-semibold">
                        <div className="review flex gap-1.5 items-center text-[17px] underline underline-offset-4">
                            <div>
                                <AiFillStar />
                            </div>
                            <div>5.0</div>
                            3 reviews
                        </div>
                        <div className="address text-[17px] underline underline-offset-4">
                            Jl. Kaya Raya UKDW Dormitory no.8 Ngropoh,  Chesurtunggal, Kec.
                            Depok Kab.Sleman, Yogyakarta
                        </div>
                    </div>
                </div>
                <div className="imageList rounded-xl">
                    <GalleryProperties />
                </div>
                <div className="flex justify-between gap-4">
                    <div className="leftSide">
                        <div className="top">
                            <div className="roomOwner flex gap-20 text-[25px] font-bold">
                                <div>
                                    Room in a villa hosted by Bohemian Jogja
                                </div>
                                <div className="profilePictureOwner rounded-full drop-shadow-2xl">
                                    <img src="" alt="profilePicture" />
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="features flex gap-20 mt-6 mb-6">
                                <div className="bed font-bold flex items-center gap-4 border-gray-400/70 px-[30px] border p-[16px] rounded-lg text-[18px]">
                                    <div>
                                        <LiaBedSolid />
                                    </div>
                                    <div>
                                        1 bed
                                    </div>
                                </div>
                                <div className="bathroom font-bold flex items-center gap-4 border-gray-400/70 px-[30px] border p-[16px] rounded-lg text-[18px]">
                                    <div>
                                        <GiShower />
                                    </div>
                                    <div>
                                        Dedicated Bathroom
                                    </div>
                                </div>
                                <div className="lock flex items-center gap-4 font-bold border-gray-400/70 px-[30px] border p-[16px] rounded-lg text-[18px]">
                                    <div>
                                        <FaHouseUser />
                                    </div>
                                    <div>
                                        Host or others may share home
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="highlightFeatures">
                                <HighlightFeatures />
                            </div>
                            <div className="hostDetail text-left">
                                <div className="text-[30px] font-bold px-[14px] py-[10px]">
                                    Meet your host
                                </div>
                                <HostProfile />
                            </div>
                            <div className="propsDesc text-left py-[30px] mt-4">
                                <div className="text-[30px] font-bold">
                                    About this place
                                </div>
                                <div className="py-[13px] text-[19px]">
                                    One Bedroom Villas for 2 is one type of our villa that can accomodate up to 2 person and free 1 child under 5 years old. It has a private pool right in front of the bedroom. It is suitable for you who want to spend your holiday.
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="amenities text-left mt-10">
                                <div className="text-[30px] mb-4 font-bold">
                                    What this place offers
                                </div>
                                <PropertyFacilities />
                            </div>
                        </div>
                    </div>
                    <div className="rightSide p-[114px] py-[149px] bg-white">
                        <OrderDetail />
                        <div>
                            <button className="text-[25px] text-white justify-center font-sans h-[45px] w-[200px] rounded-[20px] font-bold bg-green-800/50 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl hover:bg-green-800/70 mt-4">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
                <div className="review">
                    <div className="text-left">
                        <CustomerReview />
                    </div>
                </div>
            </main >
        </div >
    );
}
