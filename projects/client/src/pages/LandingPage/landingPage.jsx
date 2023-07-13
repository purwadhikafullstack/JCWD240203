import Header from "../../components/header/headerPage";
import Banner from "../../components/banner/bannerPage";
import Footer from "../../components/footerRentify/footerPage";
import { HiOutlineShieldCheck } from 'react-icons/hi'
import { BiHomeHeart } from 'react-icons/bi'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { IoIosArrowDown } from 'react-icons/io'
import './landingPage.css'
import QnaCard from "../../components/qnaCard/qnaCard";
import PropertyCard from "../../components/propertyCard/propertyCard";



export default function LandingPage() {
    return (
        <div className="w-full h-[100%] bg-white">
            <Header />
            <Banner />
            <main className="bg-white w-full mx-auto mt-28">
                <div className="firstCard flex flex-wrap justify-between px-4 md:px-48 mb-40">
                    <div className="mt-6 ml-4 z-40 bg-white w-full md:w-[440px] h-[250px] md:h-auto overflow-y-auto">
                        <div className="check text-4xl ml-4 md:ml-48 mb-4 mt-2">
                            <HiOutlineShieldCheck />
                        </div>
                        <div className="experience flex justify-start text-2xl md:text-5xl mb-4">
                            Experience a level of versatility
                        </div>
                        <div className="advantage flex justify-start text-base md:text-lg">
                            Take advantage of the convenience provided by flexible cancellation, allowing for easy re-booking in case of plan adjustments.
                        </div>
                    </div>
                    <div className="mt-6 ml-4 z-40 bg-white w-full md:w-[440px] h-[250px] md:h-auto overflow-y-auto">
                        <div className="home text-4xl ml-4 md:ml-52 mb-4 mt-2">
                            <BiHomeHeart />
                        </div>
                        <div className="over flex justify-start text-2xl md:text-5xl mt-0 mb-4">
                            Over 7 million listings currently available
                        </div>
                        <div className="connect flex justify-start text-base md:text-lg">
                            Connect with over 1 billion fellow travelers who have successfully explored getaways across 220 countries and destinations.
                        </div>
                    </div>
                    <div className="mt-6 ml-4 z-40 bg-white w-full md:w-[394px] h-[250px] md:h-auto overflow-y-auto">
                        <div className="home text-4xl ml-4 md:ml-44 mb-4 mt-2">
                            <TbAdjustmentsHorizontal />
                        </div>
                        <div className="utilize flex justify-start text-2xl md:text-5xl mb-4">
                            Utilize 100+ filters to refine and tailor your stay
                        </div>
                        <div className="customize flex justify-start text-base md:text-lg">
                            Customize your stay by setting price range, specifying room count, and considering essential amenities for a perfect fit.
                        </div>
                    </div>
                </div>
                <PropertyCard />
                <div>
                    <button className="exploreButton px-[50px] py-[8px] mt-8 mb-20 text-2xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
                        Explore more
                    </button>
                </div>
                <div className="qnaCard px-48 py-4 justify-between flex">
                    <div>
                        <div className="text-6xl font-semibold mb-10 ml-4 text-left">
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
        </div>
    );
}