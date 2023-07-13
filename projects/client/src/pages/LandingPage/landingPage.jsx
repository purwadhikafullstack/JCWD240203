import Header from "../../components/header/headerPage";
import Banner from "../../components/banner/bannerPage";
import Footer from "../../components/footerRentify/footerPage";
import { HiOutlineShieldCheck } from 'react-icons/hi'
import { BiHomeHeart } from 'react-icons/bi'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import './landingPage.css'
import { useState } from "react";
import QnaCard from "../../components/QnACard/qnaCard";
import TrendingCarausel from '../../components/TrendingCarausel/TrendingCarausel';
import LoginModal from '../../components/LoginModal/LoginModal';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import { Toaster } from "react-hot-toast";



export default function LandingPage() {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className={`${(showLogin || showRegister)? 'overflow-y-hidden' : 'overflow-y-auto'} removeScroll w-full h-[100%] bg-white`}>
            <Toaster/>
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin}/>
            <RegisterModal showRegister={showRegister} setShowRegister={setShowRegister}/>
            <Header showLogin={showLogin} showRegister={showRegister} setShowLogin={setShowLogin} setShowRegister={setShowRegister}/>
            <Banner />
            <main className="bg-white w-full mx-auto mt-28">
                <div className="flex gap-[50px] justify-between px-[25px]">
                    <div className="bg-white w-full md:w-[440px] h-auto">
                        <div className="check text-4xl flex justify-center w-full mb-4 mt-2">
                            <HiOutlineShieldCheck />
                        </div>
                        <div className="experience flex justify-start text-[25px] md:text-[35px] mb-4">
                            Experience a level of versatility
                        </div>
                        <div className="advantage flex justify-start text-base md:text-lg">
                            Take advantage of the convenience provided by flexible cancellation, allowing for easy re-booking in case of plan adjustments.
                        </div>
                    </div>
                    <div className="bg-white w-full md:w-[440px] h-auto">
                        <div className="home text-4xl flex justify-center w-full mb-4 mt-2">
                            <BiHomeHeart />
                        </div>
                        <div className="over flex justify-start text-[25px] md:text-[35px] mt-0 mb-4">
                            Over 7 million listings currently available
                        </div>
                        <div className="connect flex justify-start text-base md:text-lg">
                            Connect with over 1 billion fellow travelers who have successfully explored getaways across 220 countries and destinations.
                        </div>
                    </div>
                    <div className="bg-white w-full md:w-[440px] h-auto">
                        <div className="home text-4xl flex justify-center w-full mb-4 mt-2">
                            <TbAdjustmentsHorizontal />
                        </div>
                        <div className="utilize flex justify-start text-[25px] md:text-[35px] mb-4">
                            Utilize 100+ filters to tailor your stay
                        </div>
                        <div className="customize flex justify-start text-base md:text-lg">
                            Customize your stay by setting price range, specifying room count, and considering essential amenities for a perfect fit.
                        </div>
                    </div>
                </div>
                <TrendingCarausel/>
                <div>
                    <button className="exploreButton px-[50px] py-[8px] mt-8 mb-20 text-2xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
                        Explore more
                    </button>
                </div>
                <div className="qnaCard justify-between flex flex-col lg:flex-row px-[20px]">
                    <div>
                        <div className="text-[49px] md:text-6xl font-semibold mb-10 text-left">
                            Your questions, answered
                        </div>
                    </div>
                    <div className="text-left">
                        <div>
                            <QnaCard
                                question="What is Rentify and how does it work?"
                                answer="We verify personal profiles and listings to make sharing easy, enjoyable, and safe for millions of Hosts and travelers worldwide. Find out more about Rentify."
                            />
                        </div>
                        <div>
                            <QnaCard
                                question="How do I use search filters?"
                                answer="It’s easy to use our search filters to only show the listings that have the features you need. Learn more about using search filters and discover more flexible ways to search."
                            />
                        </div>
                        <div>
                            <QnaCard
                                question="Do I need to meet my Host?"
                                answer="Options like self check-in or booking an entire home allow you to interact with your Host mainly through in-app messaging—you can message them anytime if something comes up."
                            />
                        </div>
                        <div>
                            <QnaCard
                                question="What if I need to cancel due to a problem with the listing or Host?"
                                answer="In most cases, you can resolve any issues directly by messaging your host. If they can't help, simply contact Airbnb within 24 hours of discovering the issue."
                            />
                        </div>
                        <div>
                            <QnaCard
                                question="Need more information?"
                                answer="Visit our Help Center to get additional answers to your questions"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div >
    );
}