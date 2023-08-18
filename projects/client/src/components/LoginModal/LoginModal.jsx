import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import ReCAPTCHA from "react-google-recaptcha";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-hot-toast';
import { onLogin } from "../../redux/features/user/userSlice";
import rentifyLogo from "../assets/icons/rentifyLogo.png";
import './LoginModal.css';

export default function LoginModal(props) {
    const call = useDispatch();

    const recaptchaRef = useRef();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClose = () => {
        if (props.setShowLogin) {
            props.setShowLogin(false);
        }
        login.resetForm();
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
        const recaptchaValue = recaptchaRef.current.getValue();
        
        if (recaptchaValue) {
            try {
                const response = await call(onLogin({
                    username: values.username,
                    password: values.password
                }));

                recaptchaRef.current.reset();
                toast.success(response.message);
                handleClose();
            } catch (error) {
                console.log(error);
                if (!error.response.data) {
                    toast.error('Network error!');
                } else if (!Array.isArray(error.response.data.message)) {
                    toast.error(error.response.data.message);
                } else {
                    toast.dismiss();
                    error.response.data.message.forEach(value => {
                        toast.error(value.msg);
                    });
                }
            }
        } else {
            toast.error('Please complete the CAPTCHA.');
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
    <div className={`${(props.showLogin) ? '' : 'hidden'} flex justify-center items-center absolute top-0 w-full h-[100vh] bg-gray-400/80 z-50`}>
        <div className="relative bg-white w-[300px] md:w-[450px] h-[460px] rounded-[10px] ">
            <div onClick={handleClose} className="absolute flex justify-center items-center left-[20px] top-[10px] p-[5px] bg-transparent transition-all duration-400 rounded-full hover:bg-gray-300">
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
            <div className="w-[250px] md:w-[300px] flex flex-col gap-[20px] mb-auto mt-[10px] mx-auto">
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
                    <div className="h-[5px] w-full text-[12px] text-start text-red-600">
                        {
                            (login.touched.password && login.errors.password) ?
                                login.errors.password
                                :
                                <>
                                </>
                        }
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <ReCAPTCHA className="scale-[0.8] md:scale-100" ref={recaptchaRef} sitekey={process.env.REACT_APP_RECAPTCHA_KEY}/>
                </div>
                <div className="w-full">
                    <button type="submit" disabled={login.isSubmitting} onClick={login.handleSubmit} className={`py-[8px] text-2xl font-sans rounded-[10px] bg-green-700 text-white font-extrabold select-none transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl px-10 ${(login.isSubmitting) ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px]'}`}>
                        Log In
                    </button>
                </div>
            </div>
        </div>
    </div>
)
}
