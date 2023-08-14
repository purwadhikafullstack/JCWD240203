import { FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import rentifyLogo from '../../components/assets/icons/rentifyLogo.png'
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword, sendPasswordResetEmail } from "../../redux/features/user/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [userExist, setUserExist] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const call = useDispatch();

    const sendingEmail = async(username) => {
        resetForm.setSubmitting(true);
        const loading = toast.loading('Sending code ...', {id: 'SendEmailPasswordToast'});
        await call(sendPasswordResetEmail({username: username})).then(
            (response) => {
                setUserExist(response.data.data.userExist);
                if(response.data.data.userExist) {
                    toast.success('Email sent !, check your inbox', {id: loading});
                }
                else {
                    toast.error('User does not exist !', {id: loading});
                }
            },
            (error) => {
                if(!error.response.data) {
                    toast.error('Network error !, please try again later', {id: loading});
                }
                else if(!Array.isArray(error.response.data.message)) {
                    toast.error(error.response.data.message, {id: loading});
                }
                else {
                    toast.dismiss();
                    error.response.data.message.map(value => {return toast.error(value.msg)});
                }
            }
        )
        resetForm.setSubmitting(false);
    }

    const handleSubmit = (values) => {
        if(!userExist) {
            sendingEmail(values.username);
        }
        else {
            resetForm.handleSubmit()
        }
    }

    const validate = (value) => {
        const errors = {};

        if(!value.username) {
            errors.username = 'Required !';
        }

        if(!value.code) {
            errors.code = 'Required !';
        }

        if(!value.newPassword) {
            errors.newPassword = 'Required !';
        }
        else if (!/^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,}).*$/g.test(value.newPassword)) {
            errors.newPassword = 'Password must have 1 lowercase, uppercase, numeric and 8 characters long';
        }

        if(value.confirmPassword !== value.newPassword && value.newPassword) {
            errors.confirmPassword = 'Password do not match !';
        }

        return errors;
    }

    const selectName = (name) => {
        switch (name) {
            case 'username': {return 'Username or Email';}
            case 'newPassword': {return 'New Password';}
            case 'confirmPassword': {return 'Confirm Password';}
            case 'code': {return 'Code';}
            default: {break;}
        };
    }
    const checkVisibility = (name) => {
        switch (name) {
            case 'newPassword': {return showNewPassword;}
            case 'confirmPassword': {return showConfirmPassword;}
            default: {break;}
        };
    }
    const changeVisibility = (name) => {
        switch (name) {
            case 'newPassword': {setShowNewPassword(!showNewPassword); break;}
            case 'confirmPassword': {setShowConfirmPassword(!showConfirmPassword); break}
            default: {break;}
        };
    }
    const resetForm = useFormik({
        initialValues: {
            username: '',
            newPassword: '',
            confirmPassword: '',
            code: ''
        },
        validate,
        onSubmit: async(values) => {
            resetForm.setSubmitting(true);
            const loading = toast.loading('Sending code ...', {id: 'ResetPasswordToast'});
            await call(resetPassword({...values})).then(
                (response) => {toast.success('Password has been reset', {id: loading}); navigate('/')},
                (error) => {console.log(error); toast.error('Network error !, please try again later', {id: loading});}
            )
            resetForm.setSubmitting(false);
        }
    })

    return(
        <div className="flex flex-col items-center justify-center w-full h-full overflow-y-auto removeScroll">
            <div className="flex flex-col items-center w-[400px] h-[450px] bg-white border-[1px] border-black rounded-[10px] px-[10px] py-[15px]">
                <div className="w-full text-center text-[20px] font-bold pb-[10px] border-b-[1px] border-gray-400">
                    Reset Password
                </div>
                <div className="h-[65px] w-[110px]">
                    <img alt="" src={rentifyLogo} />
                </div>
                <div className="flex flex-col items-center w-full mt-[15px] gap-[10px]">
                    {
                        Object.keys(resetForm.values).map((value, index) => {
                            return(
                                (value === 'newPassword' || value === 'confirmPassword')?
                                <div key={index} className="w-[250px]">
                                    <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                                        <InputLabel>{selectName(value)}</InputLabel>
                                        <OutlinedInput
                                            label={selectName(value)}
                                            type={checkVisibility(value) ? 'text' : 'password'}
                                            id={value}
                                            onChange={resetForm.handleChange}
                                            onBlur={resetForm.handleBlur}
                                            value={resetForm.values[value]}
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
                                        (resetForm.touched[value] && resetForm.errors[value]) ?
                                        <div className="w-full text-start text-red-600 text-[12px]">{resetForm.errors[value]}</div>
                                        :
                                        null
                                    }
                                </div>
                                :
                                <div key={index} className="w-[250px]">
                                    <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
                                        <InputLabel>{selectName(value)}</InputLabel>
                                        <OutlinedInput
                                            label={selectName(value)}
                                            type='text'
                                            id={value}
                                            onChange={resetForm.handleChange}
                                            onBlur={resetForm.handleBlur}
                                            value={resetForm.values[value]}
                                        />
                                    </FormControl>
                                    {
                                        (resetForm.touched[value] && resetForm.errors[value]) ?
                                        <div className="w-full text-start text-red-600 text-[12px]">{resetForm.errors[value]}</div>
                                        :
                                        null
                                    }
                                </div>
                            )
                        })
                    }
                    <div className="w-[250px] flex justify-center mt-[15px]">
                        <Button onClick={() => handleSubmit(resetForm.values)} disabled={resetForm.isSubmitting} size="medium" variant="contained" sx={{width: '175px'}}>
                            {(userExist)? 'Reset Password' : 'Send Code'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}