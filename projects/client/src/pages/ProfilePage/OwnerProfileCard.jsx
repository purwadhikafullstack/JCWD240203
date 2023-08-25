import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { TextField } from "@mui/material";
import './OwnerProfileCard.css'

export default function OwnerProfileCard(props) {
    const handleUploadPFP = (event) => {
        if (props.setNewPFP) {
            props.setNewPFP(event.target.files[0]);
        }
    }

    const handleChange = (event) => {
        if (props.setNewUsername) {
            props.setNewUsername(event.target.value);
        }
    }

    return (
        <div className="flex flex-col gap-[20px] w-full md:w-auto justify-center items-center">
            <div className="flex flex-col gap-[15px] justify-center items-center w-[300px] h-[265px] bg-white border-[1px] border-gray-500 rounded-[10px] drop-shadow-lg">
                <div className="w-[125px] h-[125px] rounded-full overflow-hidden">
                    {
                        (props?.newPFP === '' || props?.newPFP === null) ?
                        <img src={`${process.env.REACT_APP_API_BASE_URL}/default/DefaultProfile.png`} alt="" className="w-full h-[175px] md:h-[200px] rounded-[10px]" />
                        :
                        (typeof props?.newPFP === 'string') ?
                        <img src={props?.newPFP} alt="" className="w-full h-full"/>
                        :
                        <img src={URL.createObjectURL(props?.newPFP)} alt="" className="w-full h-full" />
                    }
                </div>
                <div className="">
                    <input id="ProfilePicture" type="file" className="hidden" onChange={handleUploadPFP} />
                    <label htmlFor="ProfilePicture" className="flex justify-center items-center gap-[10px] border-black rounded-[20px] font-bold bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl border-[1px] text-white w-[165px] py-[5px]  hover:bg-green-900/70 mb-4">
                        <BiSolidDownload size={20} /> Change Picture
                    </label>
                </div>
                <div className="w-[175px]">
                    <TextField size="small" label="Username" value={props.newUsername} onChange={handleChange} />
                </div>
            </div>
            <div className="yourConfirm flex flex-col gap-[20px] justify-center items-start w-[300px] h-[250px] p-[10px] bg-white border-[1px] border-gray-500 rounded-[10px] drop-shadow-lg">
                <div className="text-[22px] font-bold">
                    your confirmed info
                </div>
                <div className="flex h-[35px] gap-[10px] items-center">
                    {(props?.id) ? <AiOutlineCheck size={30} /> : <AiOutlineClose size={30} />} Identity
                </div>
                <div className="flex h-[35px] gap-[10px] items-center">
                    {(props?.status === 'verified') ? <AiOutlineCheck size={30} /> : <AiOutlineClose size={30} />} Email
                </div>
                <div className="flex h-[35px] gap-[10px] items-center">
                    {(props?.phoneNumber) ? <AiOutlineCheck size={30} /> : <AiOutlineClose size={30} />} Phone Number
                </div>
            </div>
        </div>
    )
}
