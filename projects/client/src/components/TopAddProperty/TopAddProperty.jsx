import React, { useEffect } from "react";
import OwnerProperty from "../OwnerProperty/OwnerProperty";
import OwnerPropertyHeaderImage from "../../components/TopAddProperty/OwnerPropertyHeader.png";
import ListingCard from "../ListingCard/ListingCard";
import './TopAddProperty.css'

export default function TopAddProperty(props) {
  const showOwnerProperty = true; 

  return (
    <div className="relative bg-white w-full">
      <div className="bg-white">
        <div className="bg-white flex flex-col gap-[20px]">
          <div className=" welcomeBack text-left text-[45px] font-bold">
            Welcome Back, {props?.currentUser?.username}
          </div>
          <div className="w-full grid grid-cols-4 gap-[10px]">
              {
                (props?.currentUser?.properties?.length > 0)?
                props?.currentUser?.properties?.map((value, index) => {
                  return(
                    <div key={index} className="w-[250px] h-[300px]">
                      <ListingCard data={value}/>
                    </div>
                  )
                })
                :
                <div>
                  you have no properties listed
                </div>
              }            
          </div>
        </div>
      </div>
    </div>
  );
}
