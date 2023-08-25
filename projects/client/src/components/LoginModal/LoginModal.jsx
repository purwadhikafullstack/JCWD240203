import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-hot-toast';
import { onLogin, onLoginWithGoogle } from "../../redux/features/user/userSlice";
import { AiOutlineGoogle } from "react-icons/ai";
import rentifyLogo from "../assets/icons/rentifyLogo.png";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import './LoginModal.css';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export default function LoginModal(props) {
    const call = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClose = () => {
        if (props.setShowLogin) {
            props.setShowLogin(false);
        }
        login.resetForm();
    }

    const loginWithGoogle = async() => {
        const result = await signInWithPopup(auth, provider);
        const loading = toast.loading('Logging in...', {id: 'LoginLoadingToast'});
        login.setSubmitting(true);
        try
        {
            const response = await call(onLoginWithGoogle({
                username: result.user.displayName,
                email: result.user.email,
                uid: result.user.uid
            }));
            toast.success(response.message, {id: loading});
            handleClose();
        }
        catch(error)
        {
            toast.error('Unable to log in with google, please try again later !', {id: loading});
            console.log(error);
        }
        login.setSubmitting(false);
    }

    const validate = (value) => {
        const error = {};

        if (!value.username) {
            error.username = 'Required !'
        }

        if (!value.password) {
            error.password = 'Required !'
        }

        return error;
    }

    const handleSubmit = async (values) => {
        login.setSubmitting(true);
        const loading = toast.loading('Logging in...', {id: 'LoginLoadingToast'});
        try {
            const response = await call(onLogin({
                username: values.username,
                password: values.password
            }));
            
            toast.success(response.message, {id: loading});
            handleClose();
        } catch (error) {
            if (!error.response.data) {
                toast.error('Network error!', {id: loading});
            } else if (!Array.isArray(error.response.data.message)) {
                toast.error(error.response.data.message, {id: loading});
            } else {
                toast.dismiss();
                error.response.data.message.forEach(value => {
                    toast.error(value.msg);
                });
            }
        }
        login.setSubmitting(false);
    };

const login = useFormik({
    initialValues: {
        username: '',
        password: '',
    },
    validate,
    onSubmit: handleSubmit,
});

return (
    <div className={`${(props?.showLogin) ? '' : 'hideContainer'} absolute z-50 top-0 w-full h-[100vh] overflow-hidden bg-transparent`}>
        <div className={`${(props.showLogin) ? 'modal-entering' : 'modal-exiting'} flex justify-center items-center bg-gray-400/80 w-full h-full`}>
            <div className="relative bg-white w-[300px] md:w-[450px] h-[465px] rounded-[10px] ">
                <div onClick={handleClose} className="absolute flex justify-center items-center left-[20px] top-[10px] p-[5px] bg-transparent transition-all duration-400 rounded-full hover:bg-gray-300 cursor-pointer">
                    <CloseIcon sx={{ scale: '1.4' }} />
                </div>
                <div className="loginTitle w-full py-[10px] text-center text-[20px] font-display font-semibold text-zinc-700/90 border-b-[1px] border-gray-400">
                    Login
                </div>
                <div className="h-[65px] w-[110px] mx-auto">
                    <img alt="" src={rentifyLogo} />
                </div>
                <div className="welcomeBack mt-2 text-[20px] font-display font-medium">
                    Hello, Welcome Back!
                </div>
                <div className="w-[250px] md:w-[300px] flex flex-col gap-[15px] mb-auto mt-[10px] mx-auto">
                    <div className="w-full">
                        <TextField name="username" onChange={login.handleChange} onBlur={login.handleBlur} value={login.values.username} label='Username' size="small" fullWidth autoComplete="off" />
                        <div className="h-[5px] w-full text-[12px] text-start text-red-600">
                            {
                                (login.touched.username && login.errors.username) ?
                                    login.errors.username
                                    :
                                    <>
                                    </>
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                label='Password'
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onChange={login.handleChange}
                                onBlur={login.handleBlur}
                                value={login.values.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className="h-[5px] w-full text-[12px] text-start text-red-600 mb-[10px]">
                            {
                                (login.touched.password && login.errors.password) ?
                                    login.errors.password
                                    :
                                    <>
                                    </>
                            }
                        </div>
                        <div className="text-start w-full">
                            <Link to={'/forgotpassword'} className="hover:underline">
                                Forgot password ?
                            </Link>
                        </div>
                    </div>
                    <button disabled={login.isSubmitting} onClick={loginWithGoogle} className={`flex items-center justify-between gap-[20px] px-[15px] w-full h-[40px] border-black border-[1px] transition-all duration-200 ${(login.isSubmitting)? 'cursor-not-allowed' : 'cursor-pointer hover:border-green-600 hover:text-green-800'}`}>
                        <div className="text-[16px]">
                            Login with google
                        </div>
                        <div>
                            <AiOutlineGoogle size={30}/>
                        </div>
                    </button>
                    <div className="w-full">
                        <button type="submit" disabled={login.isSubmitting} onClick={login.handleSubmit} className={`py-[8px] text-2xl font-sans rounded-[10px] bg-green-700 text-white font-extrabold select-none transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl px-10 ${(login.isSubmitting) ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px]'}`}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
