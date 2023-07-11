import Header from "../../components/header/headerPage";
import Banner from "../../components/banner/bannerPage";
import Footer from "../../components/footerRentify/footerPage";
import { HiOutlineShieldCheck } from 'react-icons/hi'
import { BiHomeHeart } from 'react-icons/bi'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import './landingPage.css'



export default function LandingPage() {
    return (
        <div className="w-full h-[100%] bg-white">
            <Header />

            <Banner />
            <main className="bg-white w-full mx-auto mt-28">
                <div className="firstCard flex justify-between px-48 mb-40">
                    <div className="mt-6 ml-4 z-40 bg-white w-[440px] h-[250px]">
                        <div className="check text-4xl ml-48 mb-4 mt-2">
                            <HiOutlineShieldCheck />
                        </div>
                        <div className="experience flex justify-start text-5xl mb-4">
                            Experience a level of versatility
                        </div>
                        <div className="advantage flex justify-items-start text-lg">
                            Take advantage of the convenience provided by flexible cancellation, allowing for easy re-booking in case of plan adjustments.
                        </div>
                    </div>
                    <div className="mt-6 ml-4 z-40 bg-white w-[440px] h-[250px]">
                        <div className="home text-4xl ml-52 mb-4 mt-2">
                            <BiHomeHeart />
                        </div>
                        <div className="over flex justify-start text-5xl mt-0 mb-4">
                            Over 7 million listings currently available
                        </div>
                        <div className="connect flex justify-items-start text-lg">
                            Connect with over 1 billion fellow travelers who have successfully explored getaways across 220 countries and destinations.
                        </div>
                    </div>
                    <div className="mt-6 ml-4 z-40  bg-white w-[394px] h-[250px]">
                        <div className="home text-4xl ml-44 mb-4 mt-2">
                            <TbAdjustmentsHorizontal />
                        </div>
                        <div className="utilize flex justify-start text-5xl mb-4">
                            Utilize 100+ filters to refine and tailor your stay
                        </div>
                        <div className="customize flex justify-items-start text-lg">
                            Customize your stay by setting price range, specifying room count, and considering essential amenities for a perfect fit.
                        </div>
                    </div>
                </div>
                <div className="secondCard px-48">
                    <div className="trending font-bold mr-[840px] mb-0 mt-4">
                        Trending stays in Indonesia
                    </div>
                    <div className="these mr-[830px] mb-4">
                        These homes get lots attention on Rentify
                    </div>
                    <div className="flex justify-between px-42 ">
                        <div className="firstStay mt-6 ml-4 z-40 w-[330px] h-[560px] bg-white">
                            <div className="w-[330px] h-[240px] mb-10 rounded-md">
                                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-735147908258997419/original/13568434-8d18-4df7-be11-bff6fa96cffd.jpeg?im_w=1200" className="w-[330px] h-[400px] rounded-lg" />
                            </div>
                            <div className="mt-44">
                                <div className=" mt-40 pr-50 mr-8">
                                    <div className="executive text-lg mb-1 font-black">
                                        Executive Suite Ocean View
                                    </div>
                                    <div className="desc1 mr-2 text-slate-800 text-base">
                                        You won’t want to leave this charming...
                                    </div>
                                    <div className="king1 mr-[214px] text-slate-600">
                                        1 king Bed
                                    </div>
                                    <div className="date1 mr-[214px] text-slate-600">
                                        Nov 18-23
                                    </div>
                                    <div className="price1 mr-[155px]">
                                        Rp2,890,000 night
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="secondStay mt-6 ml-4 z-40 w-[330px] h-[560px] bg-white">
                            <div className="w-[330px] h-[240px] mb-10 rounded-md">
                                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-864375016616936486/original/13e714f8-d3f7-4ca2-9811-a929972fb5e3.jpeg?im_w=1200" className="w-[330px] h-[400px] rounded-lg" />
                            </div>
                            <div className="mt-44">
                                <div className=" mt-40 pr-50 mr-8">
                                    <div className="executive text-lg mb-1 font-black">
                                        Cozy Unique Cabin in Cikole
                                    </div>
                                    <div className="desc1 mr-2 text-slate-800 text-base">
                                        This cozy unique cabin offers a true c...
                                    </div>
                                    <div className="king1 mr-[214px] text-slate-600">
                                        1 king Bed
                                    </div>
                                    <div className="date1 mr-[214px] text-slate-600">
                                        Okt 18-23
                                    </div>
                                    <div className="price1 mr-[157px]">
                                        Rp1,341,000 night
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="thirdStay mt-6 ml-4 z-40 w-[330px] h-[560px] bg-white">
                            <div className="w-[330px] h-[240px] mb-10 rounded-md">
                                <img src="https://a0.muscache.com/im/pictures/08c599eb-f428-4cfd-a48a-2e1eda6166cd.jpg?im_w=1200" className="w-[330px] h-[400px] rounded-lg" />
                            </div>
                            <div className="mt-44">
                                <div className=" mt-40 pr-50 mr-8">
                                    <div className="executive text-lg mb-1 font-black mr-2">
                                        Cozy Studio Madison Park
                                    </div>
                                    <div className="desc1 mr-6 text-slate-800 text-base">
                                        Oemah 1, an inviting and luxurious...
                                    </div>
                                    <div className="king1 mr-[214px] text-slate-600">
                                        1 king Bed
                                    </div>
                                    <div className="date1 mr-[214px] text-slate-600">
                                        Aug 18-23
                                    </div>
                                    <div className="price1 mr-[170px]">
                                        Rp273,150  night
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fourthStay mt-6 ml-4 z-40 w-[330px] h-[560px] bg-white">
                            <div className="w-[330px] h-[240px] mb-10 rounded-md">
                                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-49887950/original/bb12ab53-2432-4f4c-8e7d-5c7b61f89047.jpeg?im_w=1200" className="w-[330px] h-[400px] rounded-lg" />
                            </div>
                            <div className="mt-44">
                                <div className=" mt-40 pr-50 mr-8">
                                    <div className="executive text-lg mb-1 font-black">
                                        Bamboo Riverfront Villa View
                                    </div>
                                    <div className="desc1 mr-2 text-slate-800 text-base">
                                        Amarta Pesagi Retreat means itself a...
                                    </div>
                                    <div className="king1 mr-[214px] text-slate-600">
                                        1 king Bed
                                    </div>
                                    <div className="date1 mr-[214px] text-slate-600">
                                        Dec 18-23
                                    </div>
                                    <div className="price1 mr-[155px]">
                                        Rp2,291,218  night
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}