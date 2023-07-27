import React, { useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import TopAddProperty from "../../components/TopAddProperty/TopAddProperty";
import CheckingOutCard from "../../components/CheckingOutCard/CheckingOutCard";
import CurrentlyCheckin from "../../components/CurrentlyCheckin/CurrentlyCheckin";
import UpcomingBooked from "../../components/UpcomingBooked/UpcomingBooked";
import QnaCard from "../../components/QnACard/qnaCard";
import Footer from "../../components/footerRentify/footerPage";

export default function Hostings() {
    // State to keep track of the active filter
    const [activeFilter, setActiveFilter] = useState("CheckingOut");

    let contentToShow;

    switch (activeFilter) {
        case "CheckingOut":
            contentToShow = <CheckingOutCard />;
            break;
        case "CurrentlyStaying":
            contentToShow = <CurrentlyCheckin />;
            break;
        case "Upcoming":
            contentToShow = <UpcomingBooked />;
            break;
        default:
            contentToShow = <CheckingOutCard />;
    }

    return (
        <div className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <HeaderProperty />
            <TopAddProperty />
            <main className="w-full px-20">
                <div className="middle text-left">
                    <div className="yourListings text-[40px] font-bold">
                        Your reservation
                    </div>
                    <div className="reservationFilter flex items-center my-[40px] gap-14 cursor-pointer">
                        <div
                            className={`rounded-full py-2 px-8 text-center text-[18px] border-2 ${activeFilter === "CheckingOut"
                                ? "border-black"
                                : "border-gray-400 hover:border-black"
                                }`}
                            onClick={() => setActiveFilter("CheckingOut")}
                        >
                            Checking out
                        </div>
                        <div
                            className={`rounded-full py-2 px-8 text-center text-[18px] border-2 ${activeFilter === "CurrentlyStaying"
                                ? "border-black"
                                : "border-gray-400 hover:border-black"
                                }`}
                            onClick={() => setActiveFilter("CurrentlyStaying")}
                        >
                            Currently staying
                        </div>
                        <div
                            className={`rounded-full py-2 px-8 text-center text-[18px] border-2 ${activeFilter === "Upcoming"
                                ? "border-black"
                                : "border-gray-400 hover:border-black"
                                }`}
                            onClick={() => setActiveFilter("Upcoming")}
                        >
                            Upcoming
                        </div>
                    </div>
                    <div className="w-full">{contentToShow}
                    </div>
                    <div className="resourceTips justify-between flex flex-col lg:flex-row px-[20px] py-[120px]">
                        <div>
                            <div className="text-[49px] md:text-6xl font-semibold mb-10 text-left">
                                Resources and tips
                            </div>
                        </div>
                        <div className="text-left">
                            <div>
                                <QnaCard
                                    question="How to make your listing stand out?"
                                    answer="Optimize your listing with a mix of wide and detail shots to showcase your space's uniqueness, using feedback and inspiration from guests. Consider pricing similar to listings in your area, utilize Smart Pricing, and control booking preferences."
                                />
                            </div>
                            <div>
                                <QnaCard
                                    question="How to take great photos with your phone?"
                                    answer="Prepare your space with good lighting and staging, use grids to frame images, avoid flash and opt for natural light, check image resolution for sharpness, capture favorite details and guest-appreciated features, and review all photos before finishing."
                                />
                            </div>
                            <div>
                                <QnaCard
                                    question="Making your home ready for your guests"
                                    answer="Thoughtful touches, such as fresh flowers, fluffed pillows, neatly folded towels, well-stocked kitchen amenities, and ample seating, create a welcoming and inviting space for guests without the need for extravagant expenses."
                                />
                            </div>
                            <div>
                                <QnaCard
                                    question="How to write a listing description that works?"
                                    answer="
                                    Create an irresistible Airbnb listing by crafting a catchy title, highlighting special features, engaging with storytelling, keeping it concise, being authentic and honest, and maximizing photo captions to attract and captivate potential guests."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

