import Header from "../../components/header/headerPage";
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import rentifyLogo from '../../components/assets/icons/rentifyLogo.png'
import { useFormik } from "formik";
import { useState } from "react";

export default function ResetPassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const validate = (value) => {
        const errors = {};

        if(!value.username) {
            errors.username = 'Required !';
        }

        if(!value.newPassword) {
            errors.newPassword = 'Required !';
        }
        else if (!/^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,}).*$/g.test(value.password)) {
            errors.newPassword = 'Password must have 1 lowercase, uppercase, numeric and 8 characters long';
        }

        if(value.confirmPassword !== value.newPassword && value.newPassword) {
            errors.confirmPassword = 'Password do not match !';
        }

        return errors;
    }
    const resetForm = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
            username: '',
            code: ''
        },
        validate,
        onSubmit: (values) => {

        }
    })

    return(
        <div className="flex flex-col items-center justify-center w-full h-full overflow-y-auto removeScroll">
            <div className="flex flex-col items-center w-[400px] h-[500px] bg-white border-[1px] border-black rounded-[10px] px-[10px] py-[15px]">
                <div className="w-full text-center text-[20px] font-bold pb-[10px] border-b-[1px] border-gray-400">
                    Reset Password
                </div>
                <div className="h-[65px] w-[110px]">
                    <img alt="" src={rentifyLogo} />
                </div>
                <div className="flex flex-col items-center w-full mt-[15px] gap-[5px]">
                    <div className="w-[250px]">
                        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                            <InputLabel>Username</InputLabel>
                            <OutlinedInput
                                label='Username'
                                type='text'
                                id="username"
                                onChange={resetForm.handleChange}
                                onBlur={resetForm.handleBlur}
                                value={resetForm.values.username}
                            />
                        </FormControl>
                        {
                            (resetForm.touched.username && resetForm.errors.username) ?
                            <div className="w-full text-start text-red-600 text-[12px] h-[20px]">{resetForm.errors.username}</div>
                            :
                            <div className="w-full h-[20px]">&nbsp;</div>
                        }
                    </div>
                    <div className="w-[250px]">
                        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                            <InputLabel>New Password</InputLabel>
                            <OutlinedInput
                                label='New Password'
                                type={showNewPassword ? 'text' : 'password'}
                                id="newPassword"
                                onChange={resetForm.handleChange}
                                onBlur={resetForm.handleBlur}
                                value={resetForm.values.newPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowNewPassword}
                                            edge="end"
                                        >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {
                            (resetForm.touched.newPassword && resetForm.errors.newPassword) ?
                            <div className="w-full text-start text-red-600 text-[12px] h-[20px]">{resetForm.errors.newPassword}</div>
                            :
                            <div className="w-full h-[20px]">&nbsp;</div>
                        }
                    </div>
                    <div className="w-[250px]">
                        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                            <InputLabel>Confirm Password</InputLabel>
                            <OutlinedInput
                                label='Confirm Password'
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                onChange={resetForm.handleChange}
                                onBlur={resetForm.handleBlur}
                                value={resetForm.values.confirmPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {
                            (resetForm.touched.confirmPassword && resetForm.errors.confirmPassword) ?
                            <div className="w-full text-start text-red-600 text-[12px] h-[20px]">{resetForm.errors.confirmPassword}</div>
                            :
                            <div className="w-full h-[20px]">&nbsp;</div>
                        }
                    </div>
                    <div className="w-[250px]">
                        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                            <InputLabel>Verification Code</InputLabel>
                            <OutlinedInput
                                label='Verification Code'
                                type='text'
                                id="code"
                                onChange={resetForm.handleChange}
                                onBlur={resetForm.handleBlur}
                                value={resetForm.values.code}
                            />
                        </FormControl>
                        {
                            (resetForm.touched.code && resetForm.errors.code) ?
                            <div className="w-full text-start text-red-600 text-[12px] h-[20px]">{resetForm.errors.code}</div>
                            :
                            <div className="w-full h-[20px]">&nbsp;</div>
                        }
                    </div>
                    <div className="w-[250px] flex justify-left">
                        <div className="text-[13px] underline cursor-pointer">
                            Send Code
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}