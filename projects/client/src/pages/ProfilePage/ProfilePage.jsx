import { useParams } from "react-router-dom"
import Header from "../../components/header/headerPage";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
import './ProfilePage.css'

export default function ProfilePage() {
    const [newUsername, setNewUsername]= useState('');
    const [newPhoneNumber, setNewPhoneNumber]= useState('');
    const [newEmail, setNewEmail]= useState('');
    const [status, setStatus] = useState('');
    const params = useParams();
    const call = useDispatch();

    const setValue = () => {
        if(localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'), null, 2);
            setNewUsername(user.username);
            setNewPhoneNumber(user.phoneNumber);
            setNewEmail(user.email);
            setStatus(user.status);
        }
    }

    useEffect(() => {
        setValue()
    }, [])

    return(
        <div className="flex flex-col w-full h-[100vh] removeScroll overflow-y-auto">
            <Header/>
            <div className="flex flex-col flex-grow w-full justify-center items-center px-[20px] py-[10px]">
                <div className="flex flex-col w-[400px] sm:w-[600px] md:w-[750px] h-[975px] sm:h-[550px] bg-white border-[1px] border-gray-400 rounded-[10px]">
                    <div className="w-full py-[10px] border-b-[1px] border-black">
                        Your Profile
                    </div>
                    <div className="flex flex-col flex-grow">
                        <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-[25px] sm:gap-[50px] pt-[10px] pb-[20px] sm:py-[10px]">
                            <div className="flex flex-col gap-[10px] justify-start items-center w-[250px] h-[300px]">
                                <div className="text-[14px]">
                                    Your Profile Picture:
                                </div>
                                <div className="w-[200px] h-[175px]">
                                    <img alt="" src="" className="w-full h-full rounded-[10px] border-[1px] border-gray-600"/>
                                </div>
                                <div>
                                    <input id="ProfilePicture" type="file" className="hidden"/>
                                    <label htmlFor="ProfilePicture" className="flex justify-center items-center gap-[10px] bg-white border-[1px] border-black w-[150px] py-[5px] cursor-pointer transition-all duration-400 hover:bg-black/50">
                                        <BiSolidDownload size={20}/> Upload Picture
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px] justify-start items-center w-[250px] h-[300px] bg-red-600/50 border-[1px] border-red-900">
                                <div className="text-[14px]">
                                    Your Id Card:
                                </div>
                                <div className="w-[200px] h-[175px]">
                                    <img alt="" src="" className="w-full h-full rounded-[10px] border-[1px] border-gray-600"/>
                                </div>
                                <div>
                                    <input id="IdCard" type="file" className="hidden"/>
                                    <label htmlFor="IdCard" className="flex justify-center items-center gap-[10px] bg-white border-[1px] border-black w-[150px] py-[5px] cursor-pointer transition-all duration-400 hover:bg-black/50">
                                        <BiSolidDownload size={20}/> Upload ID Card
                                    </label>
                                </div>
                                <div className="text-[12px]">
                                    You need to upload an ID card to list your property !
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-grow flex-col md:flex-row justify-between items-center w-full px-[50px]">
                            <div className="flex flex-col justify-between h-[100px] w-[275px] gap-[10px]">
                                <TextField size="small" fullWidth label='Username' value={newUsername}/>
                                <TextField size="small" fullWidth label='Phone Number' value={newPhoneNumber}/>
                            </div>
                            <div className="flex flex-col justify-between h-[100px] w-[275px] gap-[10px]">
                                <TextField size="small" fullWidth label='Email' value={newEmail}/>
                                <div className={`${(status === 'unverified')? '' : 'hidden'} h-[50px]`}>
                                    <div className="text-start text-[12px] text-red-600">
                                        This email is unverified, please verify your email
                                    </div>
                                    <div className="flex justify-center items-center w-full bg-yellow-500 h-[30px] rounded-[5px] transition-all duration-400 hover:bg-yellow-600 active:bg-yellow-700 active:scale-95 cursor-pointer">
                                        Verify this email
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center w-full py-[10px]">
                            <button className="flex justify-center items-center bg-green-500 rounded-[5px] w-[150px] h-[40px] transition-all duration-400 hover:bg-green-600 active:scale-95 active:bg-green-500 cursor-pointer">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}