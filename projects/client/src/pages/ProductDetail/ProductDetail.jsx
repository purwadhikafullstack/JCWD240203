import React, { useEffect, useState } from "react";
import Header from "../../components/header/headerPage";
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
import { useDispatch } from "react-redux";
import { getDetailed } from "../../redux/features/property/propertySlice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProductDetail() {
    const [property, setProperty] = useState({});
    const params = useParams();
    const call = useDispatch();

    useEffect(() => {
        const loading = toast.loading('fetching property');
        call(getDetailed({id: params.id})).then(
            (response) => {
                toast.dismiss();
                setProperty(response.data.data);
            },
            (error) => {
                toast.error('network error !', {id: loading});
                console.log(error);
            }
        )
    }, [call, params.id])

    return (
        <div className="w-full h-[100vh] bg-white">
            {console.log(property)}
            <Header/>
            <main className="bg-white w-full px-20">
                <div className="propertiesHeading text-left mt-8">
                    <div className="propertiesName text-[30px] font-black">
                        {property?.name || ''}
                    </div>
                    <div className="addressReview flex gap-4 items-center font-semibold">
                        <div className="flex justify-center items-center gap-[10px] underline underline-offset-4">
                            <AiFillStar /> {property?.average || 0.00}
                        </div>
                        <div className="underline underline-offset-4">
                            {property?.reviews?.length || 0} reviews
                        </div>
                        <div className="address text-[17px] underline underline-offset-4">
                            {property?.address || ''}
                        </div>
                    </div>
                </div>
                <div className="imageList rounded-xl">
                    <GalleryProperties images={property?.propertyImages}/>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="leftSide">
                        <div className="top">
                            <div className="roomOwner flex items-center gap-20 text-[25px] font-bold">
                                <div>
                                    Hosted by {property?.user?.username || ''}
                                </div>
                                <div className="w-[75px] h-[75px]">
                                    <img src={property?.user?.profilePicture} alt="" className="w-full h-full rounded-full" />
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
                            <div className="hostDetail text-left">
                                <div className="text-[30px] font-bold px-[14px] py-[10px]">
                                    Meet your host
                                </div>
                                <HostProfile user={property.user} />
                            </div>
                            <div className="propsDesc text-left py-[30px] mt-4">
                                <div className="text-[30px] font-bold">
                                    About this place
                                </div>
                                <div className="py-[13px] text-[19px]">
                                    {property?.description || ''}
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
                    <div className="w-full flex flex-col justify-center items-center">
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
