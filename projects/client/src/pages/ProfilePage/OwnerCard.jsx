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
import './OwnerCard.css'
import { Link, useNavigate } from "react-router-dom";

export default function OwnerCard({isSaving, ...props}) {
    const [showPopup, setShowPopup] = useState((props?.status === 'verified') ? false : true);
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();
    const call = useDispatch();

    const formatDate = (date) => { return format(date, "MM/dd/yyyy") };

    const handleClose = () => { setShowPopup(false) };

    const handleChange = (event, type) => {
        if (type === 'email') {
            if (props.setNewEmail) { props.setNewEmail(event.target.value) };
        }
        else if (type === 'phoneNumber') {
            if (props.setNewPhoneNumber) { props.setNewPhoneNumber(event.target.value) };
        }
    }

    const handleChangeDesc = (e) => {
        if (props.setDesc) { props.setDesc(e.target.value) };
    }

    const changeGender = (e) => {
        if (props?.setGender) { props.setGender(e.target.value) };
    }

    const handleUploadId = (event) => {
        if (props.setNewId) { props.setNewId(event.target.files[0]) };
    }

    const handleChangeBirth = (date) => { if (props?.setBirthDate) { props.setBirthDate(formatDate(date)) } };

    const handleClick = () => {if (props.onSaveChange) { props.onSaveChange()}};

    const toChangePassword = () => {navigate('/changepassword')}

    const onVerifyEmail = () => {
        setIsSending(true)
        if (localStorage.getItem('user')) {
            call(sendEmail({
                id: JSON.parse(localStorage.getItem('user'))?.id,
                token: JSON.parse(localStorage.getItem('user'))?.token
            })).then(
                () => {
                    toast.success(`Verification link has been sent !`)
                },
                (error) => {
                    if(error.response.data.message) {
                        toast.error(error.response.data.message);
                    }
                    else {
                        toast.error('Network error, try again later !')
                    }
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

    return (
        <div className="relative md:flex flex-row h-full w-full justify-center items-center md:px-[20px] py-[20px] overflow-y-auto removeScroll">
            <div className={`${(showPopup) ? '' : 'hidden'} z-[2] absolute flex justify-start md:justify-center items-center text-[16px] top-0 w-full h-[40px] bg-yellow-400 px-[25px]`}>
                <div className="emailReminder text-[12px] md:text-[18px] font-bold items-center underline">
                    📧 This Email is not verified, please verify your email to list your property !
                </div>
                <div onClick={handleClose} className="absolute right-[0] md:right-[20px] cursor-pointer">
                    <AiOutlineClose />
                </div>
            </div>
            <OwnerProfileCard newPFP={props?.newPFP} newUsername={props?.newUsername} setNewUsername={props?.setNewUsername} setNewPFP={props?.setNewPFP} status={props?.status} phoneNumber={props?.phoneNumber} currentId={props?.currentId} />
            <div className="flex flex-col w-full md:h-full justify-center items-center md:justify-start md:items-start md:px-[50px] py-[10px] overflow-y-auto removeScroll">
                <div className="flex flex-col justify-start items-start w-[300px] md:w-full border-b-[1px] border-gray-500 pb-[5px] drop-shadow-lg">
                    <div className="aboutYouField text-[25px] font-bold">
                        👤 About you
                    </div>
                    <div className="w-full h-[225px]">
                        <textarea onChange={(e) => handleChangeDesc(e)} value={props?.desc || ''} maxLength={255} className="w-full h-full border-[1px] border-gray-500 rounded-[5px] px-[10px] py-[5px] resize-none" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row w-[300px] md:w-full justify-center items-center border-b-[1px] border-gray-500 px-[10px] py-[5px] gap-[30px]">
                    <div className={`flex flex-col w-full lg:w-auto gap-[10px] justify-center items-center px-[15px] py-[10px] rounded-xl drop-shadow-xl ${(props.newId) ? '' : ' bg-white border-[1px] border-green-950 drop-shadow-xl'}`}>
                        <div className="idCard text-[20px] font-bold text-center">
                            🪪  Id Card:
                        </div>
                        <div className="w-full lg:w-[225px] h-[225px] lg:h-[175px]">
                            {
                                (props?.newId === null) ?
                                <img src={`${process.env.REACT_APP_API_IMG_URL}/Default/DefaultTransaction.png`} alt="" className="w-full h-full rounded-[10px] border-[1px] border-gray-600" />
                                :
                                (typeof props?.newId === 'string') ?
                                <img src={props?.newId} alt="" className="w-full h-full rounded-[10px] border-[1px] border-gray-600" />
                                :
                                <img src={URL.createObjectURL(props?.newId)} alt="" className="w-full h-full rounded-[10px] border-[1px] border-gray-600" />
                            }
                        </div>
                        <div>
                            <input id="IdCard" type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleUploadId} />
                            <label htmlFor="IdCard" className="flex justify-center items-center gap-[10px] rounded-[20px] font-bold bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl border-[1px] text-white w-[165px] py-[5px]  hover:bg-green-900/70">
                                <BiSolidDownload size={20} /> Upload ID Card
                            </label>
                        </div>
                        <div className="textId">
                            <div className={`${(props.currentId) ? 'hidden' : ''} text-[12px]`}>
                                You need to upload an ID card to list your property !
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[25px] justify-center items-center md:items-start w-full lg:w-[auto]">
                        <div className="flex flex-col gap-[10px] justify-center md:justify-start w-[250px] sm:w-full lg:w-[200px] text-start">
                            <div className="h-[55px]">
                                <TextField onChange={(e) => handleChange(e, 'email')} size="small" label='Email' value={props?.newEmail || ''} fullWidth/>
                                <div className={`${(!/^(?=.*[@]).*\.com$/g.test(props.newEmail)) ? '' : 'hidden'} text-[12px] text-red-600`}>
                                    Must be valid email !
                                </div>
                            </div>
                            <button disabled={isSending} onClick={onVerifyEmail} className={`${(props?.status === 'verified') ? 'hidden' : ''} flex justify-center items-center h-[40px] rounded-[20px] font-bold bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl border-[1px] text-white w-full sm:w-[200px] lg:w-full py-[5px]  hover:bg-green-900/70`}>
                                Verify Email !
                            </button>
                        </div>
                        <div className="flex flex-col gap-[10px] w-[250px] sm:w-full lg:w-[200px]">
                            <TextField onChange={(e) => handleChange(e, 'phoneNumber')} size="small" label='Phone number' value={props?.newPhoneNumber || ''} />
                            <FormControl fullWidth>
                                <InputLabel size="small">Gender</InputLabel>
                                <Select size="small" label='Gender' value={props?.gender || ''} onChange={changeGender}>
                                    <MenuItem value='Male'>Male</MenuItem>
                                    <MenuItem value='Female'>Female</MenuItem>
                                </Select>
                            </FormControl>
                            <button onClick={toChangePassword} className={`${(props?.accountType === 'Local') ? 'flex md:hidden' : 'hidden'} justify-center items-center text-white font-bold font-sans h-[35px] w-full text-[20px] rounded-[35px] bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl`}>
                                Change Password
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center md:items-start h-full">
                        <DayPicker
                            selected={(isNaN(new Date(props?.birthDate))) ? '' : new Date(props?.birthDate)}
                            defaultMonth={(isNaN(new Date(props?.birthDate))) ? '' : new Date(props?.birthDate)}
                            captionLayout="dropdown" fromYear={2000} toYear={new Date().getFullYear()}
                            onDayClick={handleChangeBirth}
                            footer={`Birthdate: ${(!props?.birthDate || isNaN(new Date(props?.birthDate))) ? 'not selected' : formatDate(new Date(props?.birthDate))}`}
                            style={{ scale: '0.95', padding: 0, margin: 0 }}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start w-[300px] md:w-full px-[10px] py-[5px]">
                    <div className="w-full flex justify-between items-center my-[5px]">
                        <div className="font-bold text-[18px]">
                            Your listings
                        </div>
                        <Link to={'/hostings'} className={`${(props?.status === 'unverified' || !props?.currentId)? 'hidden' : ''} flex justify-center items-center w-[125px] h-[35px] rounded-[20px] font-bold bg-green-600 cursor-pointer select-none active:scale-95 active:border-b-[0px] transition-all duration-150 border-b-[1px] drop-shadow-xl border-[1px] text-white  py-[5px]  hover:bg-green-700`}>
                            Add property
                        </Link>
                    </div>
                    <div className="w-full flex gap-[25px] overflow-x-auto mobileScroll removeScroll">
                        {
                            (props?.listings?.length > 0) ?
                            props?.listings?.map((value, index) => {
                                return (
                                    <div key={index} className="w-[250px] h-[300px] flex-none">
                                        <ListingCard data={value} />
                                    </div>
                                )
                            })
                            :
                            <div className="font-bold w-full flex justify-center">
                                You have no listings
                            </div>
                        }
                    </div>
                </div>
                <div className={`flex justify-center ${(props?.accountType === 'Local') ? 'md:justify-between' : 'md:justify-end'} w-full py-[10px]`}>
                    <button onClick={toChangePassword} className={`${(props?.accountType === 'Local') ? 'hidden md:flex' : 'hidden'} justify-center items-center text-white font-bold font-sans h-[45px] w-[200px] text-[20px] rounded-[35px] bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl`}>
                        Change Password
                    </button>
                    <button onClick={handleClick} disabled={isSaving} className={`${(isSaving)? 'cursor-not-allowed' : 'active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] cursor-pointer'} flex justify-center items-center text-white font-bold font-sans h-[45px] w-[200px] text-[20px] rounded-[35px] bg-green-800/70 select-none active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl`}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}