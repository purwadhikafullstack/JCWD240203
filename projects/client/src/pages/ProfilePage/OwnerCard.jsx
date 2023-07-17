import { TextField } from "@mui/material";
import PropertyCard from "../../components/PropertyCard/propertyCard";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";

export default function OwnerCard(props) {
    const handleChange = (event, type) => {
        if(type === 'username') {
            if(props.setNewUsername) {
                props.setNewUsername(event.target.value);
            }
        }
        else if(type === 'email') {
            if(props.setNewEmail) {
                props.setNewEmail(event.target.value);
            }
        }
    }

    return(
        <div className="md:flex flex-row h-[100vh] md:h-full w-full justify-center items-center px-[20px] py-[10px] overflow-y-auto removeScroll">
            <div className="flex flex-col gap-[20px] w-full md:w-auto justify-center items-center">
                <div className="flex flex-col gap-[15px] justify-center items-center w-[300px] h-[250px] bg-white border-[1px] border-gray-500 rounded-[10px]">
                    <div className="w-[125px] h-[125px] rounded-full bg-black overflow-hidden">
                        <img src={props?.PFP} alt="" className="w-full h-full"/>
                    </div>
                    <div className="">
                        <input id="ProfilePicture" type="file" className="hidden"/>
                        <label htmlFor="ProfilePicture" className="flex justify-center items-center gap-[10px] bg-white border-[1px] border-black w-[150px] py-[5px] cursor-pointer transition-all duration-400 hover:bg-black/50">
                            <BiSolidDownload size={20}/> Change Picture
                        </label>
                    </div>
                    <div className="w-[175px]">
                        <TextField size="small" label="Username" value={props.newUsername} onChange={(e) => handleChange(e, 'username')}/>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px] justify-center items-start w-[300px] h-[250px] p-[10px] bg-white border-[1px] border-gray-500 rounded-[10px]">
                    <div className="text-[22px] font-bold">
                        your confirmed info
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
            <div className="flex flex-col md:w-full md:h-full justify-start items-start px-[20px] md:px-[50px] py-[10px] overflow-y-auto removeScroll">
                <div className="flex flex-col justify-start items-start w-full h-auto border-b-[1px] border-gray-600">
                    <div className="text-[24px] font-bold">
                        About name
                    </div>
                    <div className="w-full">
                        <textarea maxLength={255} className="w-full h-[225px] border-[2px] border-gray-600 rounded-[5px] px-[10px] py-[5px] resize-none"/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full justify-center items-center border-b-[1px] border-gray-500 px-[10px] py-[5px] gap-[50px]">
                    <div className={`flex flex-col gap-[10px] justify-center items-center w-[270px] px-[10px] py-[5px] ${(props.newId)? '' : 'bg-red-500/50 border-[1px] border-red-900'}`}>
                        <div className="text-[14px]">
                            Id Card:
                        </div>
                        <div className="min-w-[250px] min-h-[175px]">
                            <img alt="" src={props.newId} className="w-full h-full rounded-[10px] border-[1px] border-gray-600"/>
                        </div>
                        <div>
                            <input id="IdCard" type="file" className="hidden"/>
                            <label htmlFor="IdCard" className="flex justify-center items-center gap-[10px] bg-white border-[1px] border-black w-[150px] py-[5px] cursor-pointer transition-all duration-400 hover:bg-black/50">
                                <BiSolidDownload size={20}/> Upload ID Card
                            </label>
                        </div>
                        <div className={`${(props.newId)? 'hidden' : ''} text-[12px]`}>
                            You need to upload an ID card to list your property !
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px] justify-center items-center w-full md:w-[200px] h-[100px]">
                        <TextField size="small" label='Email' value={props?.newEmail || ''} fullWidth/>
                        <TextField size="small" label='Phone number' value={props?.newPhoneNumber || ''}  fullWidth/>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start w-[100%] px-[10px] py-[5px]">
                    <div>
                        name's listings
                    </div>
                    <div className="w-full flex gap-[25px] overflow-x-auto p-[10px]">
                        <div className="min-w-[250px] h-[300px]">
                            <PropertyCard/>
                        </div>
                        <div className="min-w-[250px] h-[300px]">
                            <PropertyCard/>
                        </div>
                        <div className="min-w-[250px] h-[300px]">
                            <PropertyCard/>
                        </div>
                        <div className="min-w-[250px] h-[300px]">
                            <PropertyCard/>
                        </div>
                    </div>
                </div>
                <div className={`flex justify-center md:justify-end w-full py-[10px]`}>
                    <button className="flex justify-center items-center bg-green-500 rounded-[5px] w-[150px] h-[40px] transition-all duration-400 hover:bg-green-600 active:scale-95 active:bg-green-500 cursor-pointer">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}