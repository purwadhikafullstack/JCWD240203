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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import GalleryModal from "../../components/GalleryProperties/GalleryModal";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import RoomList from "./RoomList";

export default function ProductDetail() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const start = useSelector((state) => state.property.start);
    const end = useSelector((state) => state.property.end);
    const guest = useSelector((state) => state.property.guest);
    const [showRegister, setShowRegister] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [property, setProperty] = useState({});
    const [selectedRoom, setSelectedRoom] = useState({});
    const [page, setPage] = useState(1);
    const limit = 8;
    const totalReview = Math.ceil(useSelector((state) => state.review.totalReview)/limit);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [loading, setLoading] = useState(true);
    const [roomLoading, setRoomLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const call = useDispatch();

    const formatDate = (date) => {return format(date, "MM/dd/yyyy")};

    const handleSelect = (date) => {
        setRoomLoading(true);
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
        call(getDetailed({
            id: params.id
        })).then(
            (response) => {
                setProperty(response.data.data);
                if(Object.keys(selectedRoom).length > 0) {
                    setSelectedRoom(response.data.data.rooms.find((value) => value.id === selectedRoom.id) || {});
                }
                setLoading(false);
            },
            (error) => {
                if(error.response.status === 404) {navigate('/notfound')}
                else {toast.error('Network error !', {id: 'FecthingPropertyDetail'})};
            }
        )
    }, [call, params.id, start, end, navigate]);

    return (
        <div onScroll={checkScroll} ref={listInnerRef} className="flex flex-col w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <Header showLogin={showLogin} setShowLogin={setShowLogin} showRegister={showRegister} setShowRegister={setShowRegister}/>
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin}/>
            <RegisterModal showRegister={showRegister} setShowRegister={setShowRegister}/>
            <PaymentModal showPayment={showPayment} selectedProperty={property} selectedRoom={selectedRoom} start={start} end={end} guest={guest} setShowPayment={setShowPayment} setShowLogin={setShowLogin}/>
            <GalleryModal showAllPhotos={showAllPhotos} setShowAllPhotos={setShowAllPhotos} images={property?.propertyImages}/>
            {
                (loading)?
                <div className="flex w-full h-full items-center justify-center">
                    <ThreeDots/>
                </div>
                :
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
                    <div className="flex w-full flex-col gap-2">
                        <div className="propsDesc text-left">
                            <div className="text-[30px] font-bold">
                                About this place
                            </div>
                            <div className="py-[13px] text-[19px]">
                                {property?.description || ''}
                            </div>
                        </div>
                        <div className="amenities text-left my-[10px]">
                            <PropertyFacilities data={property.propertyFacilities}/>
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
                        
                        <div className="flex flex-col gap-[50px] md:flex-row justify-between">
                            <div className="my-auto w-full">
                                <div className="w-full h-[275px] overflow-y-auto removeScroll">
                                    <RoomList propertyId={property?.id} start={start} end={end} roomLoading={roomLoading} setRoomLoading={setRoomLoading} setSelectedRoom={setSelectedRoom}/>
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
                            </div>
                            <div className="my-auto">
                                <OrderDetail selectedRoom={selectedRoom} setShowPayment={setShowPayment}/>
                            </div>
                        </div>
                        <hr className="my-4 border-gray-300" />

                        <div className="hostDetail text-left">
                            <div className="text-[30px] font-bold px-[14px] py-[10px]">
                                Meet your host
                            </div>
                            <HostProfile user={property.user} />
                        </div>
                        <hr className="my-4 border-gray-300" />
                    </div>
                    <div className="review w-full">
                        <CustomerReview currentUser={currentUser} page={page} limit={limit} total={totalReview} propertyId={property?.id}/>
                    </div>
                </main >
            }
        </div >
    );
}
