import { FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import rentifyLogo from '../../components/assets/icons/rentifyLogo.png'
import Header from "../../components/header/headerPage";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../redux/features/user/userSlice";

export default function ChangePassword() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const call = useDispatch();

    const validate = (value) => {
        const errors = {};

        if(!value.password) {errors.username = 'Required !'};

        if(!value.newPassword) {
            errors.newPassword = 'Required !';
        }
        else if (!/^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,}).*$/g.test(value.newPassword)) {
            errors.newPassword = 'Password must have 1 lowercase, uppercase, numeric and 8 characters long';
        }

        if(value.confirmPassword !== value.newPassword && value.newPassword) {errors.confirmPassword = 'Password do not match !'};

        return errors;
    }

    const selectName = (name) => {
        switch (name) {
            case 'password': {return 'Old Password';}
            case 'newPassword': {return 'New Password';}
            case 'confirmPassword': {return 'Confirm Password';}
            default: {break;}
        };
    }
    const checkVisibility = (name) => {
        switch (name) {
            case 'password': {return showPassword;}
            case 'newPassword': {return showNewPassword;}
            case 'confirmPassword': {return showConfirmPassword;}
            default: {break;}
        };
    }
    const changeVisibility = (name) => {
        switch (name) {
            case 'password': {setShowPassword(!showPassword); break;}
            case 'newPassword': {setShowNewPassword(!showNewPassword); break;}
            case 'confirmPassword': {setShowConfirmPassword(!showConfirmPassword); break}
            default: {break;}
        };
    }
    const changePasswordForm = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: async(values) => {
            changePasswordForm.setSubmitting(true);
            const loading = toast.loading('Changing Password !', {id: 'ChangePasswordToast'});
            const user = JSON.parse(localStorage.getItem('user'));
            if(user) {
                await call(changePassword({
                    userId: user.id,
                    password: values.password,
                    newPassword: values.newPassword,
                    token: user.token
                })).then(
                    (response) => {toast.success('Password has been changed', {id: loading}); navigate('/')},
                    (error) => {console.log(error); toast.error('Network error !, please try again later', {id: loading});}
                )
            }
            else {
                navigate('/')
            }
            toast.success('Password Changed !', {id: loading});
            changePasswordForm.setSubmitting(false);
        }
    });

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            navigate('/');
        };
    }, [navigate, currentUser])

    return(
        <div className="flex flex-col w-full h-full overflow-y-auto removeScroll">
            <Header/>
            <div className="flex flex-col flex-grow items-center justify-center">
                <div className="flex flex-col items-center w-[400px] h-[400px] bg-white border-[1px] border-black rounded-[10px] px-[10px] py-[15px]">
                    <div className="w-full text-center text-[20px] font-bold pb-[10px] border-b-[1px] border-gray-400">
                        Change Password
                    </div>
                    <div className="h-[65px] w-[110px]">
                        <img alt="" src={rentifyLogo} />
                    </div>
                    <div className="flex flex-col items-center w-full mt-[15px] gap-[10px]">
                        {
                            Object.keys(changePasswordForm.values).map((value, index) => {
                                return(
                                    <div key={index} className="w-[250px]">
                                        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                                            <InputLabel>{selectName(value)}</InputLabel>
                                            <OutlinedInput
                                                label={selectName(value)}
                                                type={checkVisibility(value) ? 'text' : 'password'}
                                                id={value}
                                                onChange={changePasswordForm.handleChange}
                                                onBlur={changePasswordForm.handleBlur}
                                                value={changePasswordForm.values[value]}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => changeVisibility(value)}
                                                            edge="end"
                                                        >
                                                            {checkVisibility(value) ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        {
                                            (changePasswordForm.touched[value] && changePasswordForm.errors[value]) ?
                                            <div className="w-full text-start text-red-600 text-[12px]">{changePasswordForm.errors[value]}</div>
                                            :
                                            null
                                        }
                                    </div>
                                )
                            })
                        }
                        <div className="w-[250px] flex justify-center mt-[15px]">
                            <Button onClick={changePasswordForm.handleSubmit} disabled={changePasswordForm.isSubmitting} size="medium" variant="contained" sx={{width: '175px'}}>
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}