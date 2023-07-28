import React, { useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import UpcomingBooked from "../../components/UpcomingBooked/UpcomingBooked";
import CompletedReservationCard from "../../components/CompletedReservationCard/CompletedReservationCard.jsx";
import CancelReservationCard from "../../components/CancelReservationCard/CancelReservationCard";
import Footer from "../../components/footerRentify/footerPage";
import './ReservationHosting.css'

export default function ReservationHosting() {
    const [activeFilter, setActiveFilter] = useState("UpcomingBooked");

    let contentToShow;

    switch (activeFilter) {
        case "Upcoming":
            contentToShow = <UpcomingBooked />;
            break;
        case "Completed":
            contentToShow = <CompletedReservationCard />;
            break;
        case "Canceled":
            contentToShow = <CancelReservationCard />;
            break;
        default:
            contentToShow = <UpcomingBooked />;
    }


    return (
        <div className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <HeaderProperty />
            <main className="w-full px-20">
                <div className="topReservation text-left py-[50px] my-[50px]">
                    <div className="reservationTitle text-left text-[33px] font-bold">
                        Reservations
                    </div>
                </div>
                <div className="reservationFilter flex items-center my-[40px] gap-14 cursor-pointer">
                    <div
                        className={`rounded-[10px] py-2 px-8 text-center text-[18px] border-2 ${activeFilter === "Upcoming"
                            ? "border-black"
                            : "border-gray-400 hover:border-black"
                            }`}
                        onClick={() => setActiveFilter("Upcoming")}
                    >
                        <div>
                            Upcoming
                        </div>
                    </div>
                    <div
                        className={`rounded-[10px] py-2 px-8 text-center text-[18px] border-2 ${activeFilter === "Completed"
                            ? "border-black"
                            : "border-gray-400 hover:border-black"
                            }`}
                        onClick={() => setActiveFilter("Completed")}
                    >
                        <div>
                            Completed
                        </div>
                    </div>
                    <div
                        className={`rounded-[10px] py-2 px-8 text-center text-[18px] border-2 ${activeFilter === "Canceled"
                            ? "border-black"
                            : "border-gray-400 hover:border-black"
                            }`}
                        onClick={() => setActiveFilter("Canceled")}
                    >
                        <div>
                            Canceled
                        </div>
                    </div>
                </div>
                <div className="w-full">{contentToShow}
                </div>
            </main>
            <div className="sticky bottom-0">
                <Footer />
            </div>
        </div>
    )
}