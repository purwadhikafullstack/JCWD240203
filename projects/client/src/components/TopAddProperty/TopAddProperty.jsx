import OwnerProperty from "../OwnerProperty/OwnerProperty";
import OwnerPropertyHeaderImage from "../../components/TopAddProperty/OwnerPropertyHeader.png";
import ListingCard from "../ListingCard/ListingCard";
import './TopAddProperty.css'
import { Link } from "react-router-dom";

export default function TopAddProperty(props) { 

  return (
    <div className="relative bg-white w-full">
      <div className="bg-white">
        <div className="bg-white flex flex-col gap-[20px]">
          <div className=" welcomeBack text-left text-[45px] font-bold">
            Welcome Back, {props?.currentUser?.username}
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
              {
                (props?.currentUser?.properties?.length > 0)?
                props?.currentUser?.properties?.map((value, index) => {
                  return(
                    <Link to={`/property/${value.id}`} key={index} className="w-[200px] md:w-[250px] h-[275px] lg:h-[300px]">
                      <ListingCard data={value}/>
                    </Link>
                  )
                })
                :
                <div>
                  <img src={OwnerPropertyHeaderImage} className="rounded-[10px] drop-shadow-lg w-full"/>
                </div>
              }            
          </div>
        </div>
      </div>
    </div>
  );
}
