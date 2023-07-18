import { useParams } from "react-router-dom"
import Header from "../../components/header/headerPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../../redux/features/user/userSlice";
import { Toaster, toast } from "react-hot-toast";
import UserCard from "./UserCard";
import OwnerCard from "./OwnerCard";
import { updateUser } from "../../redux/features/user/userSlice";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";

export default function ProfilePage() {
    const user = useSelector((state) => state.user.currentUser);

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const [desc, setDesc] = useState('');
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
        const loading = toast.loading('fetching your data !');
        call(getUser({
            id: params.id
        })).then(
            (response) => {
                toast.dismiss();
                setNewUsername(response.data.data.username);
                setNewPhoneNumber(response.data.data.phoneNumber);
                setNewEmail(response.data.data.email);
                setDesc(response.data.data.desc);
                setStatus(response.data.data.status);
                setNewPFP(response.data.data.profilePicture);
                setNewId(response.data.data.idCard);
                setIsOwner(Number(params?.id) === JSON.parse(localStorage.getItem('user'))?.id);
            },
            (error) => {
                toast.error('network error', {id: loading});
            }
        )
    }

    const onSaveChange = () => {
        const token = JSON.parse(localStorage.getItem('user'), null, 2)?.token;
        const loading = toast.loading('Saving Data');
        call(updateUser({
            id: params.id,
            newUsername: newUsername,
            newEmail: newEmail,
            newDesc: desc,
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

    useEffect(() => {
        setValue()
    }, [user])

    return(
        <div className="flex flex-col w-full h-full overflow-hidden">
            <Toaster/>
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin}/>
            <RegisterModal showRegister={showRegister} setShowRegister={setShowRegister}/>
            <Header showLogin={showLogin} setShowLogin={setShowLogin} showRegister={showRegister} setShowRegister={setShowRegister}/>
            {
                isOwner ?
                <OwnerCard newUsername={newUsername} newPFP={newPFP} newEmail={newEmail} status={status} newId={newId} newPhoneNumber={newPhoneNumber} desc={desc} 
                setNewUsername={setNewUsername} setNewPFP={setNewPFP} setNewEmail={setNewEmail} setNewPhoneNumber={setNewPhoneNumber} setNewId={setNewId} setDesc={setDesc}
                onSaveChange={onSaveChange}/>
                :
                <UserCard username={newUsername} PFP={newPFP} status={status} id={newId} phoneNumber={newPhoneNumber} desc={desc}/>
            }
        </div>
    )
}