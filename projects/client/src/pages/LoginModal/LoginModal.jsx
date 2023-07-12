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
import { Toaster, toast } from 'react-hot-toast';
import { Button } from "@mui/material";
import { onLogin } from "../../redux/features/user/userSlice";

export default function LoginModal() {
    const [showLogin, setShowLogin] = useState(false);
    const call = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClose = () => {
        setShowLogin(false);
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
        <div className="w-full h-full">
            <div onClick={() => setShowLogin(!showLogin)} className="relative z-10">
                show login
            </div>
            <div className={`${(showLogin)? '' : 'hidden'} flex justify-center items-center absolute top-0 w-full h-full bg-gray-400/80`}>
                <Toaster/>
                <div className="relative flex flex-col items-center bg-gray-200 w-[300px] md:w-[450px] h-[400px] rounded-[10px] ">
                    <div onClick={handleClose} className="absolute flex justify-center items-center left-[20px] top-[10px] p-[5px] bg-transparent transition-all duration-400 rounded-full hover:bg-gray-300 active:animate-ping">
                        <CloseIcon sx={{scale: '1.4'}}/>
                    </div>
                    <div className="w-full py-[10px] text-center text-[20px] border-b-[1px] border-gray-400">
                        Log In
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
        </div>
    )
}