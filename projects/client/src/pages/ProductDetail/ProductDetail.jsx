import React, { useEffect, useState } from "react";
import Header from "../../components/header/headerPage";
import { AiFillStar } from "react-icons/ai";
import GalleryProperties from "../../components/GalleryProperties/GalleryProperties";
import './ProductDetail.css'
import HostProfile from "../../components/HostProfile/HostProfile";
import PropertyFacilities from "../../components/PropertyFacilities/PropertyFacilities";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import CustomerReview from "../../components/CustomerReview/CustomerReview";
import { useDispatch, useSelector } from "react-redux";
import { setStart, setEnd } from "../../redux/features/property/propertySlice";
import { getDetailed } from "../../redux/features/property/propertySlice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

export default function ProductDetail() {
    const start = useSelector((state) => state.property.start);
    const end = useSelector((state) => state.property.end);
    const [property, setProperty] = useState({});
    const [selectedRoom, setSelectedRoom] = useState({});
    const params = useParams();
    const call = useDispatch();

    const formatDate = (date) => {return format(date, "MM/dd/yyyy")};

    const handleSelect = (date) => {
        if(date?.from && date?.to) {
            if(new Date(date.from).getTime() <= new Date(date.to).getTime()) {
                call(setStart(formatDate(date.from)));
                call(setEnd(formatDate(date.to)));
            }
            else {
                call(setStart(formatDate(date.to)));
                call(setEnd(formatDate(date.from)));
            }
        }
        else if(date?.from) {
            call(setStart(formatDate(date.from)));
            call(setEnd(formatDate(date.from)));
        }
        else {
            call(setEnd(start))
        }
    }

    const handleClick = (value) => {setSelectedRoom(value)};

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
            <Header/>
            <main className="w-full px-20">
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
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="leftSide">
                        <div className="top">
                            <div className="propsDesc text-left py-[30px] mt-4">
                                <div className="text-[30px] font-bold">
                                    About this place
                                </div>
                                <div className="py-[13px] text-[19px]">
                                    {property?.description || ''}
                                </div>
                            </div>
                            <div className="roomOwner flex items-center gap-20 text-[25px] font-bold">
                                <div>
                                    Hosted by {property?.user?.username || ''}
                                </div>
                                <div className="w-[75px] h-[75px]">
                                    <img src={property?.user?.profilePicture} alt="" className="w-full h-full rounded-full" />
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="features flex flex-col gap-[20px] mt-6 mb-6">
                                {
                                    property?.rooms?.map((value, index) => {
                                        return(
                                            <div key={index} className="flex w-full bg-gray-200 p-[10px] rounded-[10px] justify-between h-[125px]">
                                                <div className="flex flex-col items-start gap-[30px] justify-center">
                                                    <div className="text-[24px] font-bold">
                                                        {value?.name} 
                                                    </div>
                                                    <div>
                                                        {value?.description}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-[20px] justify-center items-end">
                                                    <div className="text-[24px] font-bold">
                                                        Rp.{value?.price?.toLocaleString('ID-id')}
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleClick(value)} className="w-[100px] h-[40px] bg-green-500 rounded-[5px] transition-all duration-400 hover:bg-green-600 active:bg-green-700 active:scale-95 cursor-pointer">
                                                            Book room
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="hostDetail text-left">
                                <div className="text-[30px] font-bold px-[14px] py-[10px]">
                                    Meet your host
                                </div>
                                <HostProfile user={property.user} />
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="flex flex-col w-full justify-center items-center text-left">
                                <div className="text-[30px] font-bold px-[14px] py-[10px]">
                                    Check in & Check out
                                </div>
                                <div className="hidden md:flex">
                                    <DayPicker
                                    selected={{
                                        from: (start !== '')? new Date(start) : '',
                                        to: (end !== '')?new Date(end) : ''
                                    }}
                                    mode="range"
                                    disabled={{before: new Date()}}
                                    fromMonth={new Date()}
                                    onSelect={handleSelect}
                                    numberOfMonths={2}
                                    />
                                </div>
                                <div className="flex md:hidden">
                                    <DayPicker
                                    selected={{
                                        from: new Date(start) || '',
                                        to: new Date(end) || ''
                                    }}
                                    mode="range"
                                    disabled={{before: new Date()}}
                                    fromMonth={new Date()}
                                    onSelect={handleSelect}
                                    numberOfMonths={1}
                                    />
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
                        <OrderDetail selectedRoom={selectedRoom}/>
                        <div>
                            <button className="mb-[10px] text-[25px] text-white justify-center font-sans h-[45px] w-[250px] rounded-[20px] font-bold bg-green-800/50 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl hover:bg-green-800/70 mt-4">
                                Reserve room
                            </button>
                        </div>
                    </div>
                </div>
                <div className="review w-full">
                    <CustomerReview reviews={property?.reviews} average={property?.average}/>
                </div>
            </main >
        </div >
    );
}
