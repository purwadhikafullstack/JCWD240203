import { useState } from "react";
import ListingCard from "../ListingCard/ListingCard";
import './TopAddProperty.css'
import SpinnerLoader from "../SpinnerLoading/SpinnerLoading";
import DeletePropertyModal from "../DeletePropertyModal/DeletePropertyModal";

export default function TopAddProperty(props) { 
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState({});

  return (
    <div className="bg-white w-full flex flex-col gap-[20px]">
          <DeletePropertyModal showModal={showModal} setShowModal={setShowModal} property={selectedProperty} setLoading={props?.setLoading}/>
          <div className=" welcomeBack text-left text-[45px] font-bold">
            Welcome Back, {props?.currentUser?.username}
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
              {
                (props?.loading)?
                <div className="flex w-full col-span-full justify-center items-center">
                  <div className="w-[80px] h-[80px]">
                    <SpinnerLoader/>
                  </div>
                </div>
                :
                (props?.currentUser?.properties?.length > 0)?
                props?.currentUser?.properties?.map((value, index) => {
                  return(
                    <div key={index} className="flex items-center justify-center w-full md:w-[250px]">
                      <ListingCard data={value} setShowModal={setShowModal} setSelectedProperty={setSelectedProperty}/>
                    </div>
                  )
                })
                :
                <div className="flex font-bold w-full h-[150px] col-span-full justify-center items-center">
                  You have no registered properties
                </div>
              }
          </div>
    </div>
  );
}
