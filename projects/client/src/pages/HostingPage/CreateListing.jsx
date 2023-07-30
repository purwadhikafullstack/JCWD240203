import React, { useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import ListingPhotoUpload from "../../components/ListingPhotoUpload/ListingPhotoUpload";
import BasicDetails from "../../components/ListingBasic/ListingBasic";
import Footer from "../../components/footerRentify/footerPage";
import PreviewListingModal from "../../components/PreviewListingModal/PreviewListingModal";
import "./CreateListing.css";

export default function CreateListing() {
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [image, setImage] = useState([]);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };

    return (
        <div className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <HeaderProperty />
            <PreviewListingModal showModal={showModal} onClose={toggleModal} />
            <main className="w-full px-[10px] md:px-10 lg:px-20">
                <div className="topCreate text-left py-[50px] my-[40px]">
                    <div className="createTitle text-left text-[35px] font-bold">
                        Create new listing
                    </div>
                </div>
                <div className="form card bg-white py-4 px-6 md:w-full rounded-lg">
                    <div className="drop-shadow-xl bg-white border-2 rounded-xl border-gray-500 mb-8">
                        <div className="photosTitle text-left text-[20px] font-bold w-full border rounded-[10px] px-4 py-4">
                            <div className="text-left text-[30px] font-bold">Photos</div>
                            <ListingPhotoUpload image={image} setImage={setImage}/>
                        </div>
                    </div>
                    <div className="drop-shadow-xl bg-white border-2 rounded-xl border-gray-500 mb-8">
                        <div className="photosTitle text-left text-[20px] font-bold w-full border rounded-[10px] px-4 py-4">
                            <div className="text-left text-[30px] font-bold mb-10">
                                Listing basics
                            </div>
                            <div className="listingName">
                                <div className="listTitle text-left text-[18px]">
                                    <BasicDetails />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div
                            className="submitButton text-[25px] text-white font-bold flex items-center justify-center font-sans h-[45px] w-[200px] rounded-[35px] bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl mb-6"
                            onClick={toggleModal}
                        >
                            Submit
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
