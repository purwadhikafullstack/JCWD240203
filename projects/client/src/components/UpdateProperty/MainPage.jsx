import React, { useEffect, useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import ListingPhotoUpload from "../../components/ListingPhotoUpload/ListingPhotoUpload";
import Footer from "../../components/footerRentify/footerPage";
import { useDispatch } from "react-redux";
import { getPropertyDetail } from "../../redux/features/property/propertySlice";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UpdateForm from "./UpdateProperty";

export default function UpdateListing() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState([]);
    const navigate = useNavigate();
    const call = useDispatch();
    const params = useParams();
  
    useEffect(() => {
      if(localStorage.getItem('user')) {
        call(getPropertyDetail({
          userId: JSON.parse(localStorage.getItem('user')).id,
          propertyId: Number(params.id),
          token: JSON.parse(localStorage.getItem('user')).token
        })).then(
          (response) => {
            setProperty(response.data.data);
          },
          (error) => {console.log(error)}
        )
      }
      else {
        navigate('/');
      }
    }, [call])

    return (
        <div className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <Toaster/>
            <HeaderProperty />
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
                            <ListingPhotoUpload property={property} image={image} setImage={setImage}/>
                        </div>
                    </div>
                    <UpdateForm property={property}/>
                </div>
            </main>
            <Footer />
        </div>
    );
}