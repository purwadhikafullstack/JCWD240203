import "./RegisterPage.css";
import { useState } from "react";
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
import { useDispatch } from 'react-redux';
import { onRegister } from '../../redux/features/user/userSlice'

export default function RegisterPage() {
    const [showLogin, setShowLogin] = useState(false);
    const call = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowRepeat = () => setShowRepeat((show) => !show);

    const validate = (values) => {
        const error = {};
        
        if(!values.name) {
            error.name = 'Required !'
        }

        if(!values.email) {
            error.email = 'Required !'
        }
        else if(!/^(?=.*[@]).*\.com$/g.test(values.email)) {
            error.email = 'Must be a valid email !'
        }

        if(!values.password) {
            error.password = 'Required !'
        }
        else if(!/^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,}).*$/g.test(values.password)) {
            error.password = 'Password must have 1 lowercase, uppercase, numeric and 8 characters long';
        }

        if(values.repeatPassword !== values.password && values.password) {
            error.repeatPassword = 'Password do not match !'
        }

        return error
    }

    const register = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        },
        validate,
        onSubmit: (values) => {
            register.setSubmitting(true)
            const loading = toast.loading('Registering User !')
            call(onRegister({
                name: values.name,
                email: values.email,
                password: values.password,
            })).then(
                (response) => {
                    toast.success(response.message, {id: loading});
                    register.setSubmitting(false);
                },
                (error) => {
                    toast.error('unable to register', {id: loading});
                    console.log(error);
                    register.setSubmitting(false);
                }
            )
        }
    })
    
    return(
        <div className="h-full ">
            <div onClick={() => setShowLogin(!showLogin)} className="relative z-10">
                show login
            </div>
            <div className={`${showLogin? '' : 'hidden'} top-0 absolute flex justify-center items-center bg-gray-400/80 w-full h-full`}>
                <Toaster/>
                <div className="flex flex-col relative justify-between items-center rounded-[10px] gap-[10px] w-full h-[500px] md:w-[450px] md:h-[450px] bg-gray-200 py-[10px] removeScroll overflow-y-auto">
                    <div onClick={() => setShowLogin(false)} className="absolute top-[20px] left-[20px] cursor-pointer bg-transparent transition-all duration-400 hover:bg-gray-300 active:animate-ping rounded-full">
                        <CloseIcon sx={{scale: '1.4'}}/>
                    </div>
                    <div className="w-full py-[10px] border-b-[1px] border-gray-400 text-[20px]">
                        Log In or Sign Up
                    </div>
                    <div className="flex flex-col gap-[10px] w-[250px] mb-auto mt-[5px]">
                        <div className="text-start">
                            Welcome to Rentify !
                        </div>
                        <div>
                            <TextField id="name" onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.name} label="Name" size="small" className="w-full" autoComplete="off"/>
                            <div className='text-[12px] text-start'>
                                {(register.touched.name && register.errors.name)? <div className="text-red-600 h-[15px]">{register.errors.name}</div> : <div className="h-[15px]">&nbsp;</div>}
                            </div>
                        </div>
                        <div>
                            <TextField id="email" onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.email} label="Email" size="small" className="w-full" autoComplete="off"/>
                            <div className='text-[12px] text-start'>
                                {(register.touched.email && register.errors.email)? <div className="text-red-600 h-[15px]">{register.errors.email}</div> : <div className="h-[15px]">&nbsp;</div>}
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
                                        aria-label="toggle password visibility"
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
                                {(register.touched.password && register.errors.password)? <div className="text-red-600 h-[30px]">{register.errors.password}</div> : <div className="h-[30px]">&nbsp;</div>}
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
                                        aria-label="toggle password visibility"
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
                                {(register.touched.repeatPassword && register.errors.repeatPassword)? <div className="text-red-600 h-[15px]">{register.errors.repeatPassword}</div> : <div className="h-[15px]">&nbsp;</div>}
                            </div>
                        </div>
                        <div>
                            <button disabled={register.isSubmitting} onClick={register.handleSubmit} className="bg-green-600 text-center w-[250px] h-[40px] rounded-[5px] transition-all duration-200 hover:bg-green-700 active:bg-green-800 active:scale-95">
                                Sign Up !
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}