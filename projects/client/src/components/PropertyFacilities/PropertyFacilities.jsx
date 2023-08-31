import React from "react";
import * as ReactIcons from "react-icons/fi";

export default function PropertyFacilities(props) {

    const DynamicFiIcon = ({ name }) => {
      const IconComponent = ReactIcons[name];
    
      if (!IconComponent) { // Return a default one
        return <ReactIcons.FiCircle/>;
      }
    
      return <IconComponent className="text-green-800"/>;
    };

    return (
        <div className={`${(props?.data?.length > 0)? '' : 'hidden'} propsFacilities flex flex-col justify-between`}>
            <div className="text-[30px] mb-4 font-bold">
                What this place offers
            </div>
            <div className="columns-2 h-auto break-inside-avoid">
                {
                    props?.data?.map((value, index) => {
                        return(
                            <div key={index} className="flex items-center gap-4 mb-[10px]">
                                <div className="text-[23px]">
                                    <DynamicFiIcon name={value?.facility?.icon}/>
                                </div>
                                <div>
                                    {value?.facility?.name || ''}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
