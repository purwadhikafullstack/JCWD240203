import OwnerProperty from "../OwnerProperty/OwnerProperty";
import OwnerPropertyHeaderImage from "../../components/TopAddProperty/OwnerPropertyHeader.png";
import ListingCard from "../ListingCard/ListingCard";
import './TopAddProperty.css'
import { Link } from "react-router-dom";
import ThreeDots from "../ThreeDotsLoading/ThreeDotsLoading";

export default function TopAddProperty(props) { 

  return (
    <div className="relative bg-white w-full flex flex-col gap-[20px]">
          <div className=" welcomeBack text-left text-[45px] font-bold">
            Welcome Back, {props?.currentUser?.username}
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
              {
                (props?.loading)?
                <div className="flex w-full col-span-full justify-center items-center">
                  <ThreeDots/>
                </div>
                :
                (props?.currentUser?.properties?.length > 0)?
                props?.currentUser?.properties?.map((value, index) => {
                  return(
                    <Link to={`/property/${value.id}`} key={index} className="flex items-center justify-center w-full md:w-[250px]">
                      <ListingCard data={value}/>
                    </Link>
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
