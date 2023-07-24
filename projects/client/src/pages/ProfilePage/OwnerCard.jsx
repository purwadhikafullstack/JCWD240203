import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ListingCard from "../../components/ListingCard/ListingCard";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import 'react-day-picker/dist/style.css';
import OwnerProfileCard from "./OwnerProfileCard";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../redux/features/user/userSlice";
import { toast } from "react-hot-toast";

export default function OwnerCard(props) {
    const [showPopup, setShowPopup] = useState((props?.status === 'verified')?  false : true);
    const [currentId, setCurrentId] = useState(props?.newId);
    const [isSending, setIsSending] = useState(false);
    const call = useDispatch();

    const formatDate = (date) => {return format(date, "MM/dd/yyyy")};

    const handleClose = () => {setShowPopup(false)};

    const handleChange = (event, type) => {
        if(type === 'email') {
            if(props.setNewEmail) {props.setNewEmail(event.target.value)};
        }
        else if(type === 'phoneNumber') {
            if(props.setNewPhoneNumber) {props.setNewPhoneNumber(event.target.value)};
        }
    }

    const handleChangeDesc = (e) => {
        if(props.setDesc) {props.setDesc(e.target.value)};
    }

    const changeGender = (e) => {
        if(props?.setGender) {props.setGender(e.target.value)};
    }

    const handleUploadId = (event) => {
        if(props.setNewId) {props.setNewId(event.target.files[0])};
    }

    const handleChangeBirth = (date) => {if(props?.setBirthDate) {props.setBirthDate(formatDate(date))}};

    const handleClick = () => {
        if(props.onSaveChange) {props.onSaveChange()};
    }

    const onVerifyEmail = () => {
        setIsSending(true)
        if(localStorage.getItem('user')) {
            call(sendEmail({
                id: JSON.parse(localStorage.getItem('user'))?.id,
                token: JSON.parse(localStorage.getItem('user'))?.token
            })).then(
                    () => {
                        toast.success(`Verification link has been sent !`)
                    },
                    (error) => {
                        toast.error('Network error, try again later !')
                        console.log(error);
                    }
                )
        }
        else {
            toast.error('Unauthorized access !')
        }
        setTimeout(() => {
            setIsSending(false);
        }, 1000)
    }

    return(
        <div className="relative md:flex flex-row h-[100vh] md:h-full w-full justify-center items-center md:px-[20px] py-[10px] overflow-y-auto removeScroll">
            <div className={`${(showPopup)? '' : 'hidden'} z-[2] absolute flex justify-start md:justify-center items-center text-[16px] top-0 w-full h-[25px] bg-yellow-400 px-[5px]`}>
                <div className="text-[12px] md:text-[16px]">
                    This Email is not verified, please verify your email to list your property !
                </div>
                <div onClick={handleClose} className="absolute right-[0] md:right-[20px] cursor-pointer">
                    <AiOutlineClose/>
                </div>
            </div>
            <OwnerProfileCard newPFP={props?.newPFP} newUsername={props?.newUsername} setNewUsername={props?.setNewUsername} setNewPFP={props?.setNewPFP} status={props?.status} phoneNumber={props?.phoneNumber} id={props?.id}/>
            <div className="flex flex-col w-full md:h-full justify-center items-center md:justify-start md:items-start md:px-[50px] py-[10px] overflow-y-auto removeScroll">
                <div className="flex flex-col justify-start items-start w-[300px] md:w-full h-auto border-b-[1px] border-gray-600">
                    <div className="text-[24px] font-bold">
                        About you
                    </div>
                    <div className="w-full">
                        <textarea onChange={(e) => handleChangeDesc(e)} value={props?.desc || ''} maxLength={255} className="w-full h-[225px] border-[2px] border-gray-600 rounded-[5px] px-[10px] py-[5px] resize-none"/>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-[300px] md:w-full justify-center items-center border-b-[1px] border-gray-500 px-[10px] py-[5px] gap-[50px]">
                    <div className={`flex flex-col gap-[10px] justify-center items-center px-[10px] py-[5px] ${(props.newId)? '' : 'bg-red-500/50 border-[1px] border-red-900'}`}>
                        <div className="text-[14px]">
                            Id Card:
                        </div>
                        <div className="w-[225px] h-[175px]">
                            {
                                (typeof props?.newId === 'string' || props?.newId === null) ?
                                <img src={props?.newId} alt="" className="w-full h-full rounded-[10px] border-[1px] border-gray-600"/>
                                :
                                <img src={URL.createObjectURL(props?.newId)} alt="" className="w-full h-full rounded-[10px] border-[1px] border-gray-600"/>
                            }
                        </div>
                        <div>
                            <input id="IdCard" type="file" className="hidden" onChange={handleUploadId}/>
                            <label htmlFor="IdCard" className="flex justify-center items-center gap-[10px] bg-white border-[1px] border-black w-[150px] py-[5px] cursor-pointer transition-all duration-400 hover:bg-black/50">
                                <BiSolidDownload size={20}/> Upload ID Card
                            </label>
                        </div>
                        <div className={`${(props.newId)? 'hidden' : ''} text-[12px]`}>
                            You need to upload an ID card to list your property !
                        </div>
                    </div>
                    <div className="flex flex-col gap-[40px] justify-center items-center md:items-start w-full md:w-[auto]">
                        <div className="flex flex-col gap-[10px] justify-center md:justify-start md:w-[200px] text-start">
                            <div className="h-[55px]">
                                <TextField onChange={(e) => handleChange(e, 'email')} size="small" label='Email' value={props?.newEmail || ''} sx={{width: '200px'}}/>
                                <div className={`${(!/^(?=.*[@]).*\.com$/g.test(props.newEmail))? '' : 'hidden'} text-[12px] text-red-600`}>
                                    Must be valid email !
                                </div>
                            </div>
                            <button disabled={isSending} onClick={onVerifyEmail} className={`${(props?.status === 'verified')? 'hidden' : ''} flex justify-center items-center h-[40px] w-[200px] bg-yellow-400 rounded-[5px] transition-all duration-400 hover:bg-yellow-500 active:scale-95 active:bg-yellow-600 cursor-pointer`}>
                                Verify Email !
                            </button>
                        </div>
                        <div className="flex flex-col gap-[10px] w-[200px]">
                            <TextField onChange={(e) => handleChange(e, 'phoneNumber')} size="small" label='Phone number' value={props?.newPhoneNumber || ''}/>
                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select size="small" label='Gender' value={props?.gender} onChange={changeGender}>
                                    <MenuItem value='Male'>Male</MenuItem>
                                    <MenuItem value='Female'>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-center md:items-start w-[400px] h-full">
                        <DayPicker 
                        selected={(isNaN(new Date(props?.birthDate)))? '' : new Date (props?.birthDate)}
                        defaultMonth={(isNaN(new Date(props?.birthDate)))? '' : new Date (props?.birthDate)}
                        captionLayout="dropdown" fromYear={2000} toYear={new Date().getFullYear()}
                        onDayClick={handleChangeBirth}
                        footer={`Birthdate: ${(isNaN(new Date(props?.birthDate)))? 'not selected' : formatDate(new Date (props?.birthDate))}`}
                        style={{scale: '0.95' ,padding: 0, margin: 0}}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start w-[300px] md:w-full px-[10px] py-[5px]">
                    <div className="w-full flex justify-between items-center">
                        <div className="font-bold text-[18px]">
                            Your listings
                        </div>
                        <button className={`${(props?.status === 'unverified' || !currentId)? 'hidden' : ''} flex justify-center items-center bg-green-500 rounded-[5px] w-[125px] h-[35px] transition-all duration-400 hover:bg-green-600 active:scale-95 active:bg-green-500 cursor-pointer`}>
                            Add property
                        </button>
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
                <div className={`flex justify-center md:justify-end w-full py-[10px]`}>
                    <button onClick={handleClick} className="flex justify-center items-center bg-green-500 rounded-[5px] w-[150px] h-[40px] transition-all duration-400 hover:bg-green-600 active:scale-95 active:bg-green-500 cursor-pointer">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}