import React, { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import rentifyLogo from "../assets/icons/rentifyLogo.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../redux/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io';

export default function HeaderProperty(props) {
    const [menu, toggleMenu] = useState(false);
    const [menuItemClicked, setMenuItemClicked] = useState(false);
    // const [menuTodayClicked, setMenuTodayClicked] = useState(false);
    // const [menuCalendarClicked, setMenuCalendarClicked] = useState(false);
    // const [menuInsightsClicked, setMenuInsightsClicked] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const call = useDispatch();
    const navigate = useNavigate();

    const onClickProfile = () => {
        navigate(`/profile/${currentUser?.id}`)
    }

    const onClickLogout = () => {
        call(onLogout());
        toggleMenu(false);
    }

    const handleChangePage = (value) => {
        if(props?.setActivePage) {props?.setActivePage(value)}
        else {navigate('/hostings', {state: {content: value}})}
    };

    const handleMenuDropdownClick = () => {
        setMenuItemClicked(!menuItemClicked);
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
                            className={`${props?.activePage === 'Today' ? "underline underline-offset-4 text-black" : "text-gray-500"} hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40`}
                            onClick={() => handleChangePage('Today')}
                        >
                            <p className="">Today</p>
                        </div>

                        {/* Menu Item: Calendar */}
                        <div
                            className={`${props?.activePage === 'Calendar' ? "underline underline-offset-4 text-black" : "text-gray-500"} hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40`}
                            onClick={() => handleChangePage('Calendar')}
                        >
                            <p>Calendar</p>
                        </div>

                        {/* Menu Item: Insights */}
                        <div
                            className={`${props?.activePage === 'Insights' ? "underline underline-offset-4 text-black" : "text-gray-500"} hidden lg:inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40`}
                            onClick={() => handleChangePage('Insights')}
                        >
                            <p>Insights</p>
                        </div>

                        <div className="MenuDropdown relative inline-flex">
                            {/* Menu Dropdown Button */}
                            <button
                                onClick={handleMenuDropdownClick}
                                className={`text-${menuItemClicked ? "black" : "gray-500"} inline-flex cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold transition-all duration-400 bg-transparent hover:bg-gray-300 hover:bg-opacity-40 ${menuItemClicked ? "underline underline-offset-4" : ""}`}
                            >
                                <div className="relative flex items-center gap-2">
                                    <p>Menu </p>
                                    <IoIosArrowDown />
                                    
                                    {menuItemClicked && (
                                        <div className="dropdownMenu absolute top-full left-[-75px] mt-2 w-[200px] bg-white border border-black rounded text-left">
                                            <div onClick={() => handleChangePage('Today')}
                                                className="lg:hidden block py-2 px-4 text-black hover:bg-slate-300/50 transition-all duration-200 cursor-pointer"
                                            >
                                                Today
                                            </div>
                                            <div onClick={() => handleChangePage('Calendar')}
                                                className="lg:hidden block py-2 px-4 text-black hover:bg-slate-300/50 transition-all duration-200 cursor-pointer"
                                            >
                                                Calendar
                                            </div>
                                            <div onClick={() => handleChangePage('Insights')}
                                                className="lg:hidden block py-2 px-4 text-black hover:bg-slate-300/50 transition-all duration-200 cursor-pointer"
                                            >
                                                Insights
                                            </div>
                                            <Link to={'/hostings/listing'}
                                                className="block py-2 px-4 text-black hover:bg-slate-300/50 transition-all duration-200 cursor-pointer"
                                            >
                                                Listings
                                            </Link>
                                            <Link to={'/hostings/addproperty'}
                                                className="block py-2 px-4 text-black hover:bg-slate-300/50 transition-all duration-200 cursor-pointer"
                                            >
                                                Create a new listing
                                            </Link>
                                            <Link to={'/hostings/sales'}
                                                className="block py-2 px-4 text-black hover:bg-slate-300/50 transition-all duration-200 cursor-pointer"
                                            >
                                                Sales report
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </button>

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
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
