import { useParams } from "react-router-dom"
import Header from "../../components/header/headerPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../../redux/features/user/userSlice";
import { Toaster, toast } from "react-hot-toast";
import UserCard from "./UserCard";
import OwnerCard from "./OwnerCard";

export default function ProfilePage() {
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
        const loading = toast.loading('fetching your data !')
        if(localStorage.getItem('user')) {
            const token = JSON.parse(localStorage.getItem('user'), null, 2)?.token;
            call(getUser({
                id: params.id,
                token: token
            })).then(
                (response) => {
                    toast.dismiss();
                    setNewUsername(response.data.data.username);
                    setNewPhoneNumber(response.data.data.phoneNumber);
                    setNewEmail(response.data.data.email);
                    setStatus(response.data.data.status);
                    setNewPFP(response.data.data.profilePicture);
                    setNewId(response.data.data.idCard);
                    setIsOwner(Number(params?.id) === response.data.data.id);
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
        <div className="flex flex-col w-full h-full overflow-hidden">
            <Toaster/>
            <Header/>
            {
                isOwner ?
                <OwnerCard newUsername={newUsername} newPFP={newPFP} newEmail={newEmail} status={status} newId={newId} newPhoneNumber={newPhoneNumber} desc={desc} 
                setNewUsername={setNewUsername} setNewPFP={setNewPFP} setNewEmail={setNewEmail} setNewPhoneNumber={setNewPhoneNumber} setNewId={setNewId} setDesc={setDesc}/>
                :
                <UserCard username={newUsername} PFP={newPFP} status={status} id={newId} phoneNumber={newPhoneNumber} desc={desc}/>
            }
        </div>
    )
}