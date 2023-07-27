import React from "react";
import OwnerProperty from "../OwnerProperty/OwnerProperty";
import OwnerPropertyHeaderImage from "../../components/TopAddProperty/OwnerPropertyHeader.png";

export default function TopAddProperty() {
  const showOwnerProperty = true; 

  return (
    <div className="relative bg-white my-[80px] w-full">
      <div className="bg-white py-[40px]">
        <div className="bg-white flex flex-col px-[100px]">
          <div className="text-left text-[40px] font-bold">
            Welcome Back, Ruth
          </div>
          <div className="mt-10">
            {showOwnerProperty ? <OwnerProperty /> : <img src={OwnerPropertyHeaderImage} alt="Owner Property Header" />}
          </div>
        </div>
      </div>
    </div>
  );
}
