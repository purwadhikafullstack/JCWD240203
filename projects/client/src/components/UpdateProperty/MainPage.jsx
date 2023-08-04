import React, { useEffect, useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import ListingPhotoUpload from "../../components/ListingPhotoUpload/ListingPhotoUpload";
import Footer from "../../components/footerRentify/footerPage";
import { useDispatch } from "react-redux";
import { getPropertyDetail, updateProperty } from "../../redux/features/property/propertySlice";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UpdateForm from "./UpdateProperty";
import ThreeDots from "../ThreeDotsLoading/ThreeDotsLoading"

export default function UpdateListing() {
    const [property, setProperty] = useState({});
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState([]);
    const navigate = useNavigate();
    const call = useDispatch();
    const params = useParams();

    const onSaveChanges = (data) => {
      if(localStorage.getItem('user')) {
        call(updateProperty({
          id: params.id,
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
          () => {return false},
          (error) => {
            console.log(error);
            return false;
          }
        )
      }
    }
  
    useEffect(() => {
      if(localStorage.getItem('user')) {
        call(getPropertyDetail({
          userId: JSON.parse(localStorage.getItem('user')).id,
          propertyId: Number(params.id),
          token: JSON.parse(localStorage.getItem('user')).token
        })).then(
          (response) => {
            setProperty(response.data.data);
            setLoading(false);
          },
          (error) => {
            toast.error('Network error !, please try again later')
            console.log(error)
          }
        )
      }
      else {
        navigate('/');
      }
    }, [call])

    return (
        <div className="flex flex-col w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <Toaster/>
            <HeaderProperty />
            {
              (loading) ?
              <div className="flex w-full h-full justify-center items-center">
                <ThreeDots/>
              </div>
              :
              <main className="w-full px-[10px] md:px-10 lg:px-20">
                  <div className="topCreate text-left my-[25px]">
                      <div className="createTitle text-left text-[35px] font-bold">
                          Create new listing
                      </div>
                  </div>
                  <div className="form card py-4 md:w-full rounded-lg">
                      <div className="photosTitle drop-shadow-xl bg-white border-2 rounded-xl border-gray-500 mb-8 text-left text-[20px] font-bold w-full border rounded-[10px] px-4 py-4">
                          <div className="text-left text-[30px] font-bold">Current pictures</div>
                          {
                            (property?.propertyImages?.length > 0)?
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-[275px] gap-[20px] overflow-y-auto mobileScroll removeScroll">
                              {
                                property?.propertyImages?.map((value, index) => {
                                  return(
                                    <div key={index} className="flex items-center justify-center w-full h-full">
                                      <img src={value?.url} alt="" className="w-full h-[200px]"/>
                                    </div>
                                  )
                                })
                              }
                            </div>
                              :
                              <div className="flex w-full justify-center items-center font-bold">
                                This property has no pictures
                              </div>
                          }
                      </div>
                      <div className="photosTitle drop-shadow-xl bg-white border-2 rounded-xl border-gray-500 mb-8 text-left text-[20px] font-bold w-full border rounded-[10px] px-4 py-4">
                          <div className="text-left text-[30px] font-bold">Add New Photos</div>
                          <ListingPhotoUpload image={image} setImage={setImage}/>
                      </div>
                      <UpdateForm onSaveChanges={onSaveChanges} property={property}/>
                  </div>
              </main>
            }
            <Footer />
        </div>
    );
}