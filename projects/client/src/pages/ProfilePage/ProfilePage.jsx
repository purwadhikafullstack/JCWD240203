import { useParams } from "react-router-dom"
import Header from "../../components/header/headerPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../../redux/features/user/userSlice";
import { toast } from "react-hot-toast";
import UserCard from "./UserCard";
import OwnerCard from "./OwnerCard";
import { updateUser } from "../../redux/features/user/userSlice";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import './ProfilePage.css'


export default function ProfilePage() {
    const user = useSelector((state) => state.user.currentUser);

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [desc, setDesc] = useState('');
    const [newUsername, setNewUsername]= useState('');
    const [newPhoneNumber, setNewPhoneNumber]= useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [newEmail, setNewEmail]= useState('');
    const [newPFP, setNewPFP] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [newId, setNewId] = useState('');
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [accountType, setAccountType] = useState('');
    const [listings, setListings] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const params = useParams();
    const call = useDispatch();

    const setValue = () => {
        call(getUser({
            id: params.id
        })).then(
            (response) => {
                setDesc(response.data.data?.desc);
                setNewId(response.data.data?.idCard);
                setStatus(response.data.data?.status);
                setGender(response.data.data?.gender);
                setNewEmail(response.data.data?.email);
                setCurrentId(response.data.data?.idCard);
                setBirthDate(response.data.data?.birthDate);
                setListings(response.data.data?.properties);
                setNewUsername(response.data.data?.username);
                setNewPFP(response.data.data?.profilePicture);
                setAccountType(response.data.data?.accountType);
                setPhoneNumber(response.data.data?.phoneNumber);
                setNewPhoneNumber(response.data.data?.phoneNumber);
                setIsOwner(Number(params?.id) === JSON.parse(localStorage.getItem('user'))?.id);
                setIsLoading(false);
            },
            (error) => {
                toast.error('Network error !', {id: 'ProfilePageErrorToast'});
            }
        )
    }

    const onSaveChange = async() => {
        setIsSaving(true);
        const token = JSON.parse(localStorage.getItem('user'), null, 2)?.token;
        const loading = toast.loading('Saving Data', {id: 'SavingNewProfileToast'});
        const validate = /^(?=.*[@]).*\.com$/g.test(newEmail);
        if(validate) {
            await call(updateUser({
                id: params.id,
                newUsername: newUsername,
                newEmail: newEmail,
                newDesc: desc,
                gender: gender,
                birthDate: birthDate,
                newPhoneNumber: newPhoneNumber,
                newPFP: newPFP,
                newId: newId,
                token: token
            })).then(
                () => {
                    toast.success('Changes saved !', {id: loading});
                },
                (error) => {
                    toast.error('Unable to save changes !', {id: loading});
                    console.log(error);
                }
            )
        }
        else {
            toast.error('Email must be valid !', {id: loading});
        }
        setIsSaving(false);
    }

    useEffect(() => {
        setValue()
    }, [user, params.id])

    return(
        <div className="flex flex-col w-full h-full overflow-hidden">
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin}/>
            <RegisterModal showRegister={showRegister} setShowRegister={setShowRegister}/>
            <Header showLogin={showLogin} setShowLogin={setShowLogin} showRegister={showRegister} setShowRegister={setShowRegister}/>
            {
                isLoading ?
                <div className="flex w-full h-full items-center justify-center">
                    <ThreeDots/>
                </div>
                :
                
                isOwner ?

                <OwnerCard newUsername={newUsername} newPFP={newPFP} newEmail={newEmail} status={status} newId={newId} newPhoneNumber={newPhoneNumber} desc={desc} gender={gender} birthDate={birthDate} listings={listings} phoneNumber={phoneNumber} currentId={currentId}
                setNewUsername={setNewUsername} setNewPFP={setNewPFP} setNewEmail={setNewEmail} setNewPhoneNumber={setNewPhoneNumber} setNewId={setNewId} setDesc={setDesc} setGender={setGender} setBirthDate={setBirthDate}
                onSaveChange={onSaveChange} accountType={accountType} isSaving={isSaving}/>
                :
                <UserCard username={newUsername} PFP={newPFP} status={status} id={newId} phoneNumber={newPhoneNumber} desc={desc} listings={listings}/>
            }
        </div>
    )
}