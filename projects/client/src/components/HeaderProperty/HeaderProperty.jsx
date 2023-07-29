import React, { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import rentifyLogo from "../assets/icons/rentifyLogo.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../redux/features/User/userSlice";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io';

export default function HeaderProperty(props) {
    const [menu, toggleMenu] = useState(false);
    const [menuItemClicked, setMenuItemClicked] = useState(false);
    const [menuTodayClicked, setMenuTodayClicked] = useState(false);
    const [menuCalendarClicked, setMenuCalendarClicked] = useState(false);
    const [menuInsightsClicked, setMenuInsightsClicked] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const call = useDispatch();
    const navigate = useNavigate();

    const onClickSignUp = () => {
        if (props.setShowRegister) {
            props.setShowRegister(!props.showRegister);
        }
    }
    const onClickLogin = () => {
        if (props.setShowLogin) {
            props.setShowLogin(!props.showLogin);
        }
        toggleMenu(false)
    }
    const onClickProfile = () => {
        console.log(currentUser)
        navigate(`/profile/${currentUser?.id}`)
    }

    const onClickLogout = () => {
        call(onLogout());
        toggleMenu(false);
    }

    const handleMenuTodayClick = () => {
        setMenuTodayClicked(true);
        setMenuCalendarClicked(false);
        setMenuInsightsClicked(false);
        toggleMenu(!menu);
        navigate('/hostings');
    };

    const handleMenuCalendarClick = () => {
        setMenuTodayClicked(false);
        setMenuCalendarClicked(true);
        setMenuInsightsClicked(false);
        toggleMenu(!menu);
        navigate('/hostings/calendar')
    };

    const handleMenuInsightsClick = () => {
        setMenuTodayClicked(false);
        setMenuCalendarClicked(false);
        setMenuInsightsClicked(true);
        toggleMenu(!menu);
    };

    const handleMenuDropdownClick = () => {
        setMenuItemClicked(!menuItemClicked);
        toggleMenu(!menu);
    };

    const handleMenuListingsClick = () => {
        navigate('/hostings/listing');
        toggleMenu(false);
    };

    const handleMenuReservationClick = () => {
        navigate('/hostings/reservation');
        toggleMenu(false);
    };

    const handleMenuCreateClick = () => {
        navigate('/hostings/addproperty');
        toggleMenu(false);
    };

    return (
        <div>
            <header className="sticky top-0 w-full flex grid-cols-3 justify-between space-x-1 border-[1px] bg-white p-4 md:px-6 border-gray-500 z-10 items-center">
                {/* Left Header */}
                <div className="relative h-[50px] w-[100px]">
                    <img alt="" src={rentifyLogo} className="absolute top-[-10px]" />
                </div>

                {/* Middle Header */}
                <div className="flex items-center justify-between space-x-1">
                    <div className="relative">
                        {/* Menu Item: Today */}
                        <div
                            className={`text-${menuTodayClicked ?"black" : "gray-500"} hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40 ${menuTodayClicked ? "underline underline-offset-4" : ""}`}
                            onClick={handleMenuTodayClick}
                        >
                            <p className="">Today</p>
                        </div>

                        {/* Menu Item: Calendar */}
                        <div
                            className={`text-${menuCalendarClicked ? "black" : "gray-500"} hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40 ${menuCalendarClicked ? "underline underline-offset-4" : ""}`}
                            onClick={handleMenuCalendarClick}
                        >
                            <p>Calendar</p>
                        </div>

                        {/* Menu Item: Insights */}
                        <div
                            className={`text-${menuInsightsClicked ? "black" : "gray-500"} hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40 ${menuInsightsClicked ? "underline underline-offset-4" : ""}`}
                            onClick={handleMenuInsightsClick}
                        >
                            <p>Insights</p>
                        </div>

                        <div className="MenuDropdown relative inline-flex">
                            {/* Menu Dropdown Button */}
                            <button
                                onClick={handleMenuDropdownClick}
                                className={`text-${menuItemClicked ? "black" : "gray-500"} hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40 ${menuItemClicked ? "underline underline-offset-4" : ""}`}
                            >
                                <div className="flex items-center gap-2">
                                    <p>Menu </p>
                                    <IoIosArrowDown />
                                </div>
                            </button>

                            {/* Menu Dropdown Content */}
                            {menu && menuItemClicked && (
                                <div className="dropdownMenu absolute top-full left-0 mt-2 w-[200px] bg-white border border-black rounded text-left">
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-black hover:bg-slate-300/50"
                                        onClick={handleMenuListingsClick}
                                    >
                                        Listings
                                    </a>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-black hover:bg-slate-300/50"
                                        onClick={handleMenuReservationClick}
                                    >
                                        Reservation
                                    </a>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-black hover:bg-slate-300/50"
                                        onClick={handleMenuCreateClick}
                                    >
                                        Create a new listing
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Header */}
                <div className="flex items-center justify-between space-x-1 text-gray-500 ">
                    <div className="relative">
                        <div className="flex cursor-pointer items-center space-x-2 rounded-2xl border p-2 transition-all duration-400 ease-in-out hover:scale-105 active:scale-95"
                            onClick={() => { toggleMenu(!menu); }}
                        >
                            <MenuRoundedIcon className="h-6 w-6" />
                            {
                                (Object.keys(currentUser).length !== 0) ?
                                    <div className="relative h-[35px] w-[35px] overflow-hidden">
                                        <img
                                            alt=""
                                            src={currentUser.profilePicture}
                                            className="rounded-full w-[35px] h-[35px]"
                                        />
                                    </div>
                                    :
                                    <UserCircleIcon className="h-8 w-8" />
                            }
                        </div>
                        <div className={`${(!menu) ? 'h-[0px] border-transparent' : 'h-auto'} absolute overflow-y-hidden flex flex-col right-[-10px] w-[100px] rounded-[5px] top-[50px] bg-white border-[1px] border-gray-400 z-10`}>
                            <div onClick={onClickProfile} className={`${(Object.keys(currentUser).length === 0) ? 'hidden' : ''} cursor-pointer w-full py-[5px] whitespace-nowrap bg-transparent transition-all duration-400 hover:bg-gray-300 active:bg-gray-400 active:scale-95`}>
                                Profile
                            </div>
                            <div className={`${(Object.keys(currentUser).length === 0) ? 'hidden' : ''} cursor-pointer w-full py-[5px] whitespace-nowrap bg-transparent transition-all duration-400 hover:bg-gray-300 active:bg-gray-400 active:scale-95`}>
                                History
                            </div>
                            <div onClick={onClickLogout} className={`${(Object.keys(currentUser).length === 0) ? 'hidden' : ''} cursor-pointer w-full py-[5px] whitespace-nowrap bg-transparent transition-all duration-400 hover:bg-gray-300 active:bg-gray-400 active:scale-95`}>
                                Log Out
                            </div>
                            <div onClick={onClickLogin} className={`${(Object.keys(currentUser).length === 0) ? '' : 'hidden'} cursor-pointer w-full py-[5px] whitespace-nowrap bg-transparent transition-all duration-400 hover:bg-gray-300 active:bg-gray-400 active:scale-95`}>
                                Log In
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
