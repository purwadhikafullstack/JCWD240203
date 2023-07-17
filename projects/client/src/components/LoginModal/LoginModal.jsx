import { useState } from "react";
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
import { Button } from "@mui/material";
import { onLogin } from "../../redux/features/User/userSlice";
import rentifyLogo from "../assets/icons/rentifyLogo.png";
import './LoginModal.css';

export default function LoginModal(props) {
    const call = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClose = () => {
        if(props.setShowLogin) {
            props.setShowLogin(false);
        }
        login.resetForm();
    }

    const validate = (value) => {
        const error = {};

        if(!value.username) {
            error.username = 'Required !'
        }

        if(!value.password) {
            error.password = 'Required !'
        }

        return error;
    }

    const login = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            login.setSubmitting(true);
            const loading = toast.loading('logging in !');

            call(onLogin({
                username: values.username,
                password: values.password
            })).then(
                (response) => {
                    toast.success(response.message, {id: loading});
                    login.resetForm();
                },
                (error) => {
                    if(!error.response.data) {
                        toast.error('network error !', {id: loading});
                    }
                    else if(!Array.isArray(error.response.data.message)) {
                        toast.error(error.response.data.message, {id: loading});
                    }
                    else {
                        toast.dismiss();
                        error.response.data.message.map(value => {
                            return toast.error(value.msg);
                        });
                    }
                }
            )
            login.setSubmitting(false);
        }
    })
    
    return(
        <div className={`${(props.showLogin)? '' : 'hidden'} flex justify-center items-center absolute top-0 w-full h-[100vh] bg-gray-400/80 z-50`}>
            <div className="relative flex flex-col items-center bg-gray-200 w-[300px] md:w-[450px] h-[400px] rounded-[10px] ">
                <div onClick={handleClose} className="absolute flex justify-center items-center left-[20px] top-[10px] p-[5px] bg-transparent transition-all duration-400 rounded-full hover:bg-gray-300 active:animate-ping">
                    <CloseIcon sx={{scale: '1.4'}}/>
                </div>
                <div className="loginTitle w-full py-[10px] text-center text-[20px] font-display font-semibold text-zinc-700/90 border-b-[1px] border-gray-400">
                    Login
                </div>
                <div className="h-[65px] w-[110px]">
                    <img alt="" src={rentifyLogo} />
                </div>
                <div className="welcomeBack mt-2 text-[20px] font-display font-medium ">
                   Hello, Welcome Back! 
                </div>
                <div className="w-[250px] md:w-[300px] flex flex-col gap-[20px] mb-auto mt-[10px]">
                    <div className="w-full">
                        <TextField id="username" onChange={login.handleChange} onBlur={login.handleBlur} value={login.values.username} label='Username' size="small" fullWidth autoComplete="off"/>
                        <div className="h-[5px] w-full text-[12px] text-start text-red-600">
                            {
                                (login.touched.username && login.errors.username)?
                                login.errors.username
                                :
                                <>
                                </>
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <FormControl sx={{width: '100%'}} variant="outlined" size="small">
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            id="password"
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
                                (login.touched.password && login.errors.password)?
                                login.errors.password
                                :
                                <>
                                </>
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <Button disabled={login.isSubmitting} onClick={login.handleSubmit} variant="contained" color="success" fullWidth sx={{height: '40px'}}>
                            Log In
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
