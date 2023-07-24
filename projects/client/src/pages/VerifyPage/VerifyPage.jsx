import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/headerPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyAccount } from "../../redux/features/user/userSlice";
import { Toaster, toast } from "react-hot-toast";

export default function VerifyPage() {
    const params = useParams();
    const navigate = useNavigate();
    const call = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('user')) {
            if(JSON.parse(localStorage.getItem('user')).status === 'unverified') {
                call(verifyAccount({
                    id: JSON.parse(localStorage.getItem('user')).id,
                    code: params.code,
                    token: JSON.parse(localStorage.getItem('user')).token
                })).then(
                    () => {
                        toast.success('Email has been verified !');
                        setTimeout(() => {
                            toast.dismiss();
                            navigate('/');
                        }, 1000)
                    },
                    (error) => {
                        toast.error('Link has been expired or invalid !');
                        console.log(error);
                    }
                )
            }
            else {
                navigate('/')
            }
        }
        else {
            navigate('/')
        }
    }, []);

    return(
        <div className="w-full h-full overflow-y-auto removeScroll">
            <Toaster/>
            <Header/>
            <div>
                Awaiting response
            </div>
        </div>
    )
}