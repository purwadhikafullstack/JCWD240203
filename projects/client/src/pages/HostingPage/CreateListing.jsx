import React, { useEffect, useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import ListingPhotoUpload from "../../components/ListingPhotoUpload/ListingPhotoUpload";
import BasicDetails from "../../components/ListingBasic/ListingBasic";
import Footer from "../../components/footerRentify/footerPage";
import PreviewListingModal from "../../components/PreviewListingModal/PreviewListingModal";
import "./CreateListing.css";
import { useDispatch } from "react-redux";
import { createProperty } from "../../redux/features/property/propertySlice";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [image, setImage] = useState([]);
    const navigate = useNavigate();
    const call = useDispatch();

    const addProperty = (data) => {
        const loading = toast.loading('Adding property ...');
        if(localStorage.getItem('user')) {
            if(data?.propertyRooms?.length > 0) {
                call(createProperty({
                    propertyName: data.property.propertyName,
                    propertyDescription: data.property.description,
                    city: data.property.city,
                    address: data.property.address,
                    categoryId: data.property.category,
                    userId: JSON.parse(localStorage.getItem('user')).id,
                    propertyRooms: data.propertyRooms,
                    facilities: data.property.facilities,
                    images: image,
                    token: JSON.parse(localStorage.getItem('user')).token
                })).then(
                    () => {
                        toast.success('Property added !', {id: loading});
                        navigate('/hostings');
                        return true;
                    },
                    (error) => {
                        toast.error('Network error, try again later !', {id: loading});
                        console.log(error);
                        return false;
                    }
                );
            }
            else {
                toast.error('Property must have atleast 1 room !', {id: loading});
                return false;
            }
        }
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <Toaster/>
            <HeaderProperty />
            <PreviewListingModal showModal={showModal} onClose={toggleModal} image={image}/>
            <main className="w-full px-[10px] md:px-10 lg:px-20">
                <div className="topCreate text-left my-[25px]">
                    <div className="createTitle text-left text-[35px] font-bold">
                        Create new listing
                    </div>
                </div>
                <div className="form card bg-white py-4 md:w-full rounded-lg">
                    <div className="drop-shadow-xl bg-white border-2 rounded-xl border-gray-500 mb-8">
                        <div className="photosTitle text-left text-[20px] font-bold w-full border rounded-[10px] px-4 py-4">
                            <div className="text-left text-[30px] font-bold">Photos</div>
                            <ListingPhotoUpload image={image} setImage={setImage}/>
                        </div>
                    </div>
                    <BasicDetails addProperty={addProperty} image={image} toggleModal={toggleModal}/>
                </div>
            </main>
            <Footer />
        </div>
    );
}
