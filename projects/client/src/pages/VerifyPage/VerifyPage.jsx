import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/headerPage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { verifyAccount } from "../../redux/features/user/userSlice";
import { Toaster, toast } from "react-hot-toast";

export default function VerifyPage() {
    const params = useParams();
    const navigate = useNavigate();
    const call = useDispatch();
    const [response, setResponse] = useState(undefined);

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
                        setResponse(true);
                        setTimeout(() => {
                            toast.dismiss();
                            navigate('/');
                        }, 1000)
                    },
                    (error) => {
                        toast.error('Link has been expired or invalid !');
                        console.log(error);
                        setResponse(false);
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
    }, [call, navigate, params.code]);

    return(
        <div className="flex flex-col w-full h-full overflow-y-auto removeScroll">
            <Toaster/>
            <Header/>
            <div className="flex justify-center items-center w-full h-full">
                <div className={`animate-pulse ${(response === undefined)? '' : 'hidden'} flex justify-center items-center w-[500px] h-[500px] bg-yellow-400 rounded-full`}>
                    <div className="text-[20px] font-bold">
                        Awaiting response ...
                    </div>
                </div>
                <div className={`${(response === true)? '' : 'hidden'} flex justify-center items-center w-[500px] h-[500px] bg-green-400 rounded-full`}>
                    <div className="text-[20px] font-bold">
                        Account verified !
                    </div>
                </div>
                <div className={`${(response === false)? '' : 'hidden'} flex justify-center items-center w-[500px] h-[500px] bg-red-400 rounded-full`}>
                    <div className="text-[20px] font-bold">
                        Link is expired or malformed !
                    </div>
                </div>
            </div>
        </div>
    )
}