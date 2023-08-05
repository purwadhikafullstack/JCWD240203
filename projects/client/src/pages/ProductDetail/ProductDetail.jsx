import { useEffect, useState, useRef } from "react";
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
import { Toaster, toast } from "react-hot-toast";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import GalleryModal from "../../components/GalleryProperties/GalleryModal";

export default function ProductDetail() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const start = useSelector((state) => state.property.start);
    const end = useSelector((state) => state.property.end);
    const guest = useSelector((state) => state.property.guest);
    const [property, setProperty] = useState({});
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState({});
    const [showPayment, setShowPayment] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 8;
    const totalReview = Math.ceil(useSelector((state) => state.review.totalReview)/limit);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
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

    const listInnerRef = useRef();
    const checkScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                if(page + 1 <= totalReview) {setPage(page + 1)};
            }
        }
    };

    useEffect(() => {
        const loading = toast.loading('fetching property', {id: 'fecthingProperty'});
        call(getDetailed({
            id: params.id,
            start: start,
            end: end,
            userId: JSON.parse(localStorage.getItem('user'))?.id || null,
        })).then(
            (response) => {
                toast.dismiss(loading);
                setProperty(response.data.data);
            },
            (error) => {
                toast.error('network error !', {id: loading});
                console.log(error);
            }
        )
    }, [call, params.id, start, currentUser]);

    return (
        <div onScroll={checkScroll} ref={listInnerRef} className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            {console.log(showAllPhotos)}
            <Toaster/>
            <Header showLogin={showLogin} setShowLogin={setShowLogin} showRegister={showRegister} setShowRegister={setShowRegister}/>
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin}/>
            <RegisterModal showRegister={showRegister} setShowRegister={setShowRegister}/>
            <PaymentModal showPayment={showPayment} selectedProperty={property} selectedRoom={selectedRoom} start={start} end={end} guest={guest} setShowPayment={setShowPayment} setShowLogin={setShowLogin}/>
            <GalleryModal showAllPhotos={showAllPhotos} setShowAllPhotos={setShowAllPhotos} images={property?.propertyImages}/>
            <main className="w-full px-5 lg:px-20 py-[20px]">
                <div className="propertiesHeading text-left">
                    <div className="propertiesName text-[30px] font-black">
                        {property?.name || ''}
                    </div>
                    <div className="addressReview flex flex-col md:flex-row gap-4 items-center font-semibold">
                        <div className="flex justify-start w-full md:w-auto gap-[10px]">
                            <div className="flex justify-center items-center gap-[10px] underline underline-offset-4">
                                <AiFillStar /> {property?.average || 0.00}
                            </div>
                            <div className="underline underline-offset-4">
                                {property?.reviews?.length || 0} reviews
                            </div>
                        </div>
                        <div className="address text-[17px] underline underline-offset-4">
                            {property?.address || ''}
                        </div>
                    </div>
                </div>
                <div className="imageList rounded-xl">
                    <GalleryProperties showAllPhotos={showAllPhotos} setShowAllPhotos={setShowAllPhotos} images={property?.propertyImages}/>
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
                                            <div key={index}>
                                                <RoomCard data={value} setSelectedRoom={setSelectedRoom}/>
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
                                <div className="hidden md:flex h-[325px]">
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
                                <div className="flex md:hidden h-[325px]">
                                    <DayPicker
                                    selected={{
                                        from: (start !== '')? new Date(start) : '',
                                        to: (end !== '')?new Date(end) : ''
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
                            <div className="amenities text-left my-[10px]">
                                <PropertyFacilities data={property.propertyFacilities}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <OrderDetail selectedRoom={selectedRoom} setShowPayment={setShowPayment}/>
                    </div>
                </div>
                <div className="review w-full">
                    <CustomerReview currentUser={currentUser} page={page} limit={limit} propertyId={property?.id} hasReviewed={property?.hasReviewed}/>
                </div>
            </main >
        </div >
    );
}
