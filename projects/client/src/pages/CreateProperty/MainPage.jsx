import { useEffect, useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import ListingPhotoUpload from "../../components/ListingPhotoUpload/ListingPhotoUpload";
import PropertyForm from "./PropertyForm";
import Footer from "../../components/footerRentify/footerPage";
import "./MainPage.css";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "../../redux/features/property/propertySlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";

export default function CreateProperty() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState([]);
    const navigate = useNavigate();
    const call = useDispatch();

    const addProperty = async(data) => {
        setIsSubmitting(true);
        const loading = toast.loading('Adding property ...');
        if(localStorage.getItem('user')) {
            if(data?.propertyRooms?.length > 0) {
                await call(createProperty({
                    propertyName: data.property.propertyName,
                    propertyDescription: data.property.description,
                    city: data.property.city,
                    address: data.property.address,
                    categoryId: data.property.category,
                    propertyRooms: data.propertyRooms,
                    facilities: data.property.facilities,
                    images: image,
                    userId: JSON.parse(localStorage.getItem('user')).id,
                    token: JSON.parse(localStorage.getItem('user')).token,
                    idCard: JSON.parse(localStorage.getItem('user')).idCard
                })).then(
                    () => {
                        toast.success('Property added !', {id: loading});
                        navigate('/hostings');
                    },
                    (error) => {
                        toast.error('Network error, try again later !', {id: loading});
                        console.log(error);
                    }
                );
            }
            else {
                toast.error('Property must have atleast 1 room !', {id: loading});
            }
        }
        setIsSubmitting(false);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || null;
        if(!user || user?.idCard === null || user?.status === 'unverified') {
            navigate('/');
        }
    }, [navigate, currentUser]);

    return (
        <div className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <HeaderProperty />
            <AddCategoryModal showModal={showModal} setShowModal={setShowModal}/>
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
                    <PropertyForm addProperty={addProperty} image={image} showModal={showModal} setShowModal={setShowModal} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting}/>
                </div>
            </main>
            <Footer />
        </div>
    );
}
