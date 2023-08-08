import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { TextField, FormControl } from "@mui/material";

export default function OwnerProfileCard(props) {
    const handleUploadPFP = (event) => {
        if(props.setNewPFP) {props.setNewPFP(event.target.files[0])};
    }

    const handleChange = (event) => {
        if(props.setNewUsername) {props.setNewUsername(event.target.value)};
    }

    return(
        <div className="flex flex-col gap-[20px] w-full md:w-auto justify-center items-center">
            <div className="flex flex-col gap-[15px] justify-center items-center w-[300px] h-[250px] bg-white border-[1px] border-gray-500 rounded-[10px]">
                <div className="w-[125px] h-[125px] rounded-full overflow-hidden">
                    {
                        (typeof props?.newPFP === 'string' || props?.newPFP === null) ?
                        <img src={props?.newPFP} alt="" className="w-full h-full"/>
                        :
                        <img src={URL.createObjectURL(props?.newPFP)} alt="" className="w-full h-full"/>
                    }
                </div>
                <div className="">
                    <input id="ProfilePicture" type="file" className="hidden" onChange={handleUploadPFP}/>
                    <label htmlFor="ProfilePicture" className="flex justify-center items-center gap-[10px] bg-white border-[1px] border-black w-[150px] py-[5px] cursor-pointer transition-all duration-400 hover:bg-black/50">
                        <BiSolidDownload size={20}/> Change Picture
                    </label>
                </div>
                <div className="w-[175px]">
                    <TextField size="small" label="Username" value={props.newUsername} onChange={(e) => handleChange(e)}/>
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
    )
}