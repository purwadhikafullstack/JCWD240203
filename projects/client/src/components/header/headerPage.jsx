import React, { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import rentifyLogo from "../assets/icons/rentifyLogo.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { onLogout } from "../../redux/features/user/userSlice";

export default function Header(props) {
    //const [searchInput, setSearchInput] = useState("");
    //const [startDate, setStartDate] = useState(new Date());
    //const [endDate, setEndDate] = useState(new Date());
    //const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [menu, toggleMenu] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const call = useDispatch();
    //const [loading, setLoading] = useState(false);
    // const router = useRouter();
    // const selectionRange = {
    //     startDate: startDate,
    //     endDate: endDate,
    //     key: "selection",
    // };
      
    // const enableScroll = () => {
    //     window.onscroll = function() {};
    // }

    const onClickSignUp = () => {
        if(props.setShowRegister) {
            props.setShowRegister(!props.showRegister);
        }
    }
    const onClickLogin = () => {
        if(props.setShowLogin) {
            props.setShowLogin(!props.showLogin);
        }
        toggleMenu(false)
    }
    const onClickLogout = () => {
        call(onLogout());
        toggleMenu(false);
    }
    //const call = useDispatch();

    // const onLogout = () => {
    //     call(logout())

    // }
        // function handleSelect(ranges) {
        //     setStartDate(ranges.selection.startDate);
        //     setEndDate(ranges.selection.endDate);
        // }
        // function search() {
        //     setSearchInput("");
        //     router.push({
        //         pathname: "/search",
        //         query: {
        //             location: searchInput,
        //             startDate: startDate.toISOString(),
        //             endDate: endDate.toISOString(),
        //             numberOfGuests,
        //         },
        //     });
        // }

        return (
            <div>
                <header className="sticky top-0 w-full flex grid-cols-3 justify-between space-x-1 border-[1px] bg-white p-4 md:px-6 border-gray-500 z-10">
                    {/* Left Header */}
                    <div className="relative h-[50px] w-[100px]">
                        <img alt="" src={rentifyLogo} className="absolute top-[-10px]" />
                    </div>

                    {/* Right Header */}
                    <div className="flex items-center justify-between space-x-1 text-gray-500 ">
                        <p className="hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40 underline underline-offset-4">
                            Become A host
                        </p>
                        {
                            Object.keys(currentUser).length !== 0?
                            null
                            :
                            <p onClick={onClickSignUp} className="hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40 underline underline-offset-4 ">
                                Sign Up
                            </p>
                        }
                        <div className="relative">
                            <div className="flex cursor-pointer items-center space-x-2 rounded-2xl border p-2 transition-all duration-400 ease-in-out hover:scale-105 active:scale-95"
                                onClick={() => { toggleMenu(!menu); }}
                            >
                                <MenuRoundedIcon className="h-6 w-6" />
                                {
                                    (Object.keys(currentUser).length !== 0) ? 
                                    <div className="relative h-8 w-8">
                                        <img
                                            alt=""
                                            src={currentUser.profilePicture}
                                            layout="fill"
                                            className="rounded-full"
                                        />
                                    </div>
                                    :
                                    <UserCircleIcon className="h-8 w-8" />
                                }
                            </div>
                            <div className={`${(!menu)? 'h-[0px] border-transparent' : 'h-auto'} absolute overflow-y-hidden flex flex-col right-[-10px] w-[100px] rounded-[5px] top-[50px] bg-white border-[1px] border-gray-400 z-10`}>
                                <div className={`${(Object.keys(currentUser).length === 0)? 'hidden' : ''} cursor-pointer w-full py-[5px] whitespace-nowrap bg-transparent transition-all duration-400 hover:bg-gray-300 active:bg-gray-400 active:scale-95`}>
                                    Profile
                                </div>
                                <div onClick={onClickLogin} className={`${(Object.keys(currentUser).length === 0)? '' : 'hidden'} cursor-pointer w-full py-[5px] whitespace-nowrap bg-transparent transition-all duration-400 hover:bg-gray-300 active:bg-gray-400 active:scale-95`}>
                                    Log In
                                </div>
                                <div onClick={onClickLogout} className={`${(Object.keys(currentUser).length === 0)? 'hidden' : ''} cursor-pointer w-full py-[5px] whitespace-nowrap bg-transparent transition-all duration-400 hover:bg-gray-300 active:bg-gray-400 active:scale-95`}>
                                    Log Out
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* {active && (
                    // <div className="relative z-[60]">
                    //     <p
                    //         className="fixed right-4 -mt-2 flex cursor-pointer items-center rounded-lg border-2 bg-white px-5 py-2 text-lg font-semibold text-gray-700 shadow-md transition duration-300 ease-in-out hover:scale-105 active:scale-95"
                    //         onClick={() => {
                    //             setLoading(true);
                    //             setTimeout(() => {
                    //                 onLogout();
                    //             }, 1000);
                    //         }}
                    //     >
                    //         <LogoutRoundedIcon className="mr-2 -mt-[2px] h-7 w-7 text-airbnb" />
                    //         {loading ? "Logging Out..." : "Logout"}
                    //     </p>
                    // </div>
                )} */}
            </div>
        )
    }

