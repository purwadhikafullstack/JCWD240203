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
        setShowModal(!showModal);
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
                    <BasicDetails toggleModal={toggleModal}/>
                </div>
            </main>
            <Footer />
        </div>
    );
}
