import ListingCard from "../../components/ListingCard/ListingCard";
import PropertyCard from "../../components/PropertyCard/propertyCard";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function UserCard(props) {
    return(
        <div className="md:flex flex-row h-[100vh] md:h-full w-full justify-center items-center px-[20px] py-[10px] overflow-y-auto removeScroll">
            <div className="flex flex-col gap-[20px] w-full md:w-auto justify-center items-center">
                <div className="flex flex-col gap-[20px] justify-center items-center w-[300px] h-[250px] bg-white border-[1px] border-gray-500 rounded-[10px]">
                    <div className="w-[125px] h-[125px] rounded-full overflow-hidden">
                        <img src={props?.PFP} alt="" className="w-full h-full"/>
                    </div>
                    <div>
                        {props?.username || 'name'}
                    </div>
                </div>
                <div className="flex flex-col gap-[20px] justify-center items-start w-[300px] h-[250px] p-[10px] bg-white border-[1px] border-gray-500 rounded-[10px]">
                    <div className="text-[22px] font-bold">
                        {props?.username || 'name'}'s confirmed info
                    </div>
                    <div className="flex h-[35px] gap-[10px] items-center">
                        {(props?.id)? <AiOutlineCheck size={30}/> : <AiOutlineClose size={30}/>} Identity
                    </div>
                    <div className="flex h-[35px] gap-[10px] items-center">
                        {(props?.status === 'verified')? <AiOutlineCheck size={30}/> : <AiOutlineClose size={30}/>} Email
                    </div>
                    <div className="flex h-[35px] gap-[10px] items-center">
                        {(props?.phoneNumber)? <AiOutlineCheck size={30}/> : <AiOutlineClose size={30}/>} Phone Number
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full md:h-full justify-center items-center md:justify-start md:items-start md:px-[50px] py-[10px] overflow-y-auto removeScroll">
                <div className="flex flex-col justify-start items-start w-[300px] md:w-full h-auto border-b-[1px] border-gray-600">
                    <div className="text-[24px] font-bold">
                        About {props?.username || 'name'}
                    </div>
                    <div className="text-start w-full">
                        desc
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start w-[300px] md:w-full">
                    <div>
                        {props?.username}'s listings
                    </div>
                    <div className="w-full flex gap-[25px] overflow-x-auto p-[10px]">
                        {
                            props?.listings?.map((value, index) => {
                                return(
                                    <div key={index} className="min-w-[250px] h-[300px]">
                                        <ListingCard data={value}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}