import './RegisterModal.css'
import React, { useState } from "react";
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
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { onRegister } from '../../redux/features/user/userSlice'
import rentifyLogo from "../assets/icons/rentifyLogo.png";

export default function RegisterModal(props) {
    const call = useDispatch();
    const recaptchaRef = React.createRef();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRepeat = () => setShowRepeat((show) => !show);

    const handleClose = () => {
        if (props.setShowRegister) {
            props.setShowRegister(false);
        }
        register.resetForm();
    }

    const validate = (values) => {
        const error = {};

        if (!values.username) {
            error.username = 'Required !'
        }

        if (!values.email) {
            error.email = 'Required !'
        }
        else if (!/^(?=.*[@]).*\.com$/g.test(values.email)) {
            error.email = 'Must be a valid email !'
        }

        if (!values.password) {
            error.password = 'Required !'
        }
        else if (!/^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,}).*$/g.test(values.password)) {
            error.password = 'Password must have 1 lowercase, uppercase, numeric and 8 characters long';
        }

        if (values.repeatPassword !== values.password && values.password) {
            error.repeatPassword = 'Password do not match !'
        }

        return error
    }

    const handleSubmit = async (values) => {
        const recaptchaValue = recaptchaRef.current.getValue();

        if (recaptchaValue) {
            try {
                const response = await call(onRegister({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }));

                toast.success(response.message);
                handleClose();
            } catch (error) {
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
    };

    const register = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: ''
        },
        validate,
        onSubmit: handleSubmit,
    })

    return (
        <div className={`${props.showRegister ? '' : 'hidden'} top-0 absolute flex justify-center items-center bg-gray-400/80 w-full h-[100vh] z-50`}>
            <div className="flex flex-col relative justify-between items-center rounded-[10px] gap-[10px] w-full h-[500px] md:w-[450px] md:h-[625px] bg-white py-[10px] removeScroll overflow-y-auto">
                <div onClick={handleClose} className="absolute flex justify-center items-center p-[5px] top-[20px] left-[20px] cursor-pointer bg-transparent transition-all duration-400 hover:bg-gray-300 rounded-full">
                    <CloseIcon sx={{ scale: '1.4' }} />
                </div>
                <div className=" w-full py-[10px] border-b-[1px] border-gray-400 text-[20px]">
                    <div className='signUpLoginTitle text-bold'>
                        Log In or Sign Up
                    </div>
                </div>
                <div className="h-[65px] w-[110px]">
                    <img alt="" src={rentifyLogo} />
                </div>
                <div className="flex flex-col gap-[10px] w-[250px] mb-auto mt-[5px]">
                    <div className="welcomeSignUp text-start">
                        Welcome to Rentify !
                    </div>
                    <div>
                        <TextField id="username" onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.username} label="Username" size="small" className="w-full" autoComplete="off" />
                        <div className='text-[12px] text-start'>
                            {(register.touched.username && register.errors.username) ? <div className="text-red-600 h-[15px]">{register.errors.username}</div> : <div className="h-[15px]">&nbsp;</div>}
                        </div>
                    </div>
                    <div>
                        <TextField id="email" onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.email} label="Email" size="small" className="w-full" autoComplete="off" />
                        <div className='text-[12px] text-start'>
                            {(register.touched.email && register.errors.email) ? <div className="text-red-600 h-[15px]">{register.errors.email}</div> : <div className="h-[15px]">&nbsp;</div>}
                        </div>
                    </div>
                    <div>
                        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                onBlur={register.handleBlur}
                                onChange={register.handleChange}
                                value={register.values.password}
                                type={showPassword ? 'text' : 'password'}
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
                                label="Password"
                            />
                        </FormControl>
                        <div className='text-[12px] text-start'>
                            {(register.touched.password && register.errors.password) ? <div className="text-red-600 h-[30px]">{register.errors.password}</div> : <div className="h-[30px]">&nbsp;</div>}
                        </div>
                    </div>
                    <div>
                        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                            <InputLabel>Repeat Password</InputLabel>
                            <OutlinedInput
                                id="repeatPassword"
                                onBlur={register.handleBlur}
                                onChange={register.handleChange}
                                value={register.values.repeatPassword}
                                type={showRepeat ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowRepeat}
                                            edge="end"
                                        >
                                            {showRepeat ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Repeat Password"
                            />
                        </FormControl>
                        <div className='text-[12px] text-start'>
                            {(register.touched.repeatPassword && register.errors.repeatPassword) ? <div className="text-red-600 h-[15px]">{register.errors.repeatPassword}</div> : <div className="h-[15px]">&nbsp;</div>}
                        </div>
                    </div>
                    <ReCAPTCHA ref={recaptchaRef} sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' className=" bg-gray-200" />
                    <div>
                        {/* <Button disabled={register.isSubmitting} onClick={register.handleSubmit} variant="contained" color="success" sx={{height: '40px'}} className=''>
                            Sign Up
                        </Button> */}
                        <button disabled={register.isSubmitting} onClick={register.handleSubmit} className={`py-[8px] text-2xl font-sans rounded-[10px] bg-green-700 text-white font-extrabold cursor-pointer select-none transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl px-10 ${(register.isSubmitting) ? 'cursor-not-allowed' : 'active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px]'}`}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
