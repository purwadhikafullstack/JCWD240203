import { Link } from "react-router-dom";
import ListingCard from "../../components/ListingCard/ListingCard";
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
            <div className="flex flex-col w-full md:h-full justify-center items-center md:justify-start md:items-start md:px-[50px] py-[10px] overflow-y-auto removeScroll gap-[10px]">
                <div className="flex flex-col justify-start items-start w-[300px] md:w-full h-auto">
                    <div className="text-[24px] font-bold">
                        About {props?.username || 'name'}
                    </div>
                    <div className="w-full h-[250px]">
                        <textarea value={props?.desc} disabled className="w-full h-full overlofw-y-auto mobileScroll removeScroll resize-none border-[1px] border-gray-600 rounded-[10px] px-[10px] py-[5px]"/>
                    </div>
                </div>
                <div className="w-[300px] md:w-full">
                    <div className="flex flex-col justify-start items-start">
                        <div>
                            {props?.username}'s listings
                        </div>
                        <div className="w-full flex flex-nowrap gap-[25px] overflow-x-auto removeScroll mobileScroll gap-[25px] px-[20px] py-[15px]">
                            {
                                (props?.listings?.length > 0)?
                                props?.listings?.map((value, index) => {
                                    return(
                                        <Link to={`/property/${value?.id}`} key={index} className="min-w-[250px] h-[300px]">
                                            <ListingCard data={value}/>
                                        </Link>
                                    )
                                })
                                :
                                <div className="w-full text-center font-bold">
                                    No property listing
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}