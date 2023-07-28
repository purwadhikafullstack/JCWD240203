import React from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import ListingListCard from "../../components/ListingListCard/ListingListCard";
import Footer from "../../components/footerRentify/footerPage";
import './ListingList.css'

export default function ListingList() {
    return (
        <div className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <HeaderProperty />
            <main className="w-full px-20">
                <div className="topListing text-left py-[50px] my-[50px]">
                    <div className="flex justify-between">
                        <div className="totalList text-[33px]">
                            1 Listings
                        </div>
                        <div>
                            <button className="exploreButton w-full py-[6px] px-[6px] text-xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
                                ➕ Create listing
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card bg-white py-4 px-6 md:w-full rounded-lg">
                    <div className="hidden md:flex md:flex-row flex-grow content-between">
                        <div className="listDetail flex justify-between w-full">
                            <div className="listing flex items-center text-left w-[380px] px-[10px] py-[10px]">
                                LISTING
                            </div>
                            <div className="flex items-center text-left w-[200px] px-[10px] py-[10px]">
                                STATUS
                            </div>
                            <div className="flex items-center text-left w-[200px] px-[10px] py-[10px]">
                                ROOM
                            </div>
                            <div className="flex items-center text-left w-[400px] px-[10px] py-[10px]">
                                LOCATION
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <div className="filledDetail">
                        <ListingListCard />
                    </div>
                </div>

            </main>
            <div className=" sticky bottom-0">
                <Footer />
            </div>
        </div >
    )
}