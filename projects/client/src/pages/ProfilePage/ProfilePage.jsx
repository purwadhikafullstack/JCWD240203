import { useParams } from "react-router-dom"
import Header from "../../components/header/headerPage";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
import './ProfilePage.css'
import { getUser } from "../../redux/features/user/userSlice";
import { Toaster, toast } from "react-hot-toast";

export default function ProfilePage() {
    const [username, setUsername] = useState('')
    const [newUsername, setNewUsername]= useState('');
    const [newPhoneNumber, setNewPhoneNumber]= useState('');
    const [newEmail, setNewEmail]= useState('');
    const [newPFP, setNewPFP] = useState('');
    const [newId, setNewId] = useState('')
    const [status, setStatus] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const params = useParams();
    const call = useDispatch();

    const setValue = () => {
        const loading = toast.loading('fetching your data !')
        if(localStorage.getItem('user')) {
            const token = JSON.parse(localStorage.getItem('user'), null, 2)?.token;
            call(getUser({
                id: params.id,
                token: token
            })).then(
                (response) => {
                    toast.dismiss();
                    setUsername(response.data.data.username);
                    setNewUsername(response.data.data.username);
                    setNewPhoneNumber(response.data.data.phoneNumber);
                    setNewEmail(response.data.data.email);
                    setStatus(response.data.data.status);
                    setNewPFP(response.data.data.profilePicture);
                    setNewId(response.data.data.idCard);
                    //setIsOwner(Number(params?.id) === response.data.data.id);
                },
                (error) => {
                    toast.error('network error', {id: loading});
                }
            )
        }
    }

    useEffect(() => {
        setValue()
    }, [])

    return(
        <div className="flex flex-col w-full h-[100vh] removeScroll overflow-y-auto">
            <Toaster/>
            <Header/>
            <div className="flex flex-col flex-grow w-full justify-center items-center px-[20px] py-[10px]">
                <div className="flex flex-col w-[400px] sm:w-[600px] md:w-[750px] h-[975px] sm:h-auto bg-white border-[1px] border-gray-400 rounded-[10px]">
                    <div className="w-full py-[10px] border-b-[1px] border-black">
                        {username}'s profile
                    </div>
                    <div className="flex flex-col flex-grow">
                        <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-[25px] sm:gap-[100px] pt-[10px] pb-[20px]">
                            <div className="flex flex-col gap-[10px] justify-center items-center w-[250px] h-[300px]">
                                <div className="w-[200px] h-[175px]">
                                    <img alt="" src={newPFP} className="w-full h-full rounded-[10px] border-[1px] border-gray-600"/>
                                </div>
                                <div>
                                    <input id="ProfilePicture" type="file" className="hidden"/>
                                    <label htmlFor="ProfilePicture" className="flex justify-center items-center gap-[10px] bg-white border-[1px] border-black w-[150px] py-[5px] cursor-pointer transition-all duration-400 hover:bg-black/50">
                                        <BiSolidDownload size={20}/> Upload Picture
                                    </label>
                                </div>
                            </div>
                            <div className={`${(!isOwner && !newId)? 'hidden' : ''} flex flex-col gap-[10px] ${(newId)? 'justify-center' : 'justify-between'} items-center w-[250px] h-[300px] ${(newId)? '' : 'bg-red-600/50 border-[1px] border-red-900'}`}>
                                <div className="text-[14px]">
                                    {username}'s Id Card:
                                </div>
                                <div className="w-[200px] h-[175px]">
                                    <img alt="" src={newId} className="w-full h-full rounded-[10px] border-[1px] border-gray-600"/>
                                </div>
                                <div>
                                    <input id="IdCard" type="file" className="hidden"/>
                                    <label htmlFor="IdCard" className="flex justify-center items-center gap-[10px] bg-white border-[1px] border-black w-[150px] py-[5px] cursor-pointer transition-all duration-400 hover:bg-black/50">
                                        <BiSolidDownload size={20}/> Upload ID Card
                                    </label>
                                </div>
                                <div className={`${(newId)? 'hidden' : ''} text-[12px]`}>
                                    You need to upload an ID card to list your property !
                                </div>
                            </div>
                        </div>
                        <div className={`${(isOwner)? '' : 'hidden'} flex flex-grow flex-col md:flex-row justify-between items-center w-full px-[50px]`}>
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
                        <div className={`${(isOwner)? 'hidden' : ''} flex flex-grow flex-col justify-start items-center w-full pb-[20px]`}>
                            <div className="flex flex-col gap-[25px]">
                                <div className="flex gap-[100px]">
                                    <div className="text-[22px]">
                                        {username}
                                    </div>
                                    <div className="text-[22px]">
                                        {newPhoneNumber}
                                    </div>
                                </div>
                                <div className="text-center text-[22px] font-bold">
                                    {newEmail}
                                </div>
                            </div>
                        </div>
                        <div className={`${(isOwner)? '' : 'hidden'} flex justify-center w-full py-[10px]`}>
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