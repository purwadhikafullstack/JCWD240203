import React, { useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import rentifyLogo from "../assets/icons/rentifyLogo.png"
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Header({ placeholder }) {
    //const [searchInput, setSearchInput] = useState("");
    //const [startDate, setStartDate] = useState(new Date());
    //const [endDate, setEndDate] = useState(new Date());
    //const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [active, setActive] = useState(false);
    //const [loading, setLoading] = useState(false);
    // const router = useRouter();
    // const selectionRange = {
    //     startDate: startDate,
    //     endDate: endDate,
    //     key: "selection",
    // };
    // const currentUser = useSelector((state) => state.Login.name);
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
                <header className="sticky top-0 w-full flex grid-cols-3 justify-between space-x-1 border-b bg-white p-4  shadow-md md:px-6  border-gray-500">
                    {/* Left Header */}
                    <div>
                        <img alt="" src={rentifyLogo} className="hidden h-32 w-36 md:inline-flex" />
                    </div>

                    {/* Right Header */}
                    <div className="flex items-center justify-between space-x-1 text-gray-500 ">
                        <p className="hidden cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold hover:bg-gray-200 hover:bg-opacity-40 lg:inline-flex underline underline-offset-4">
                            Become A host
                        </p>
                        <p className="hidden cursor-pointer rounded-full py-2 px-4 text-center text-base font-semibold hover:bg-gray-200 hover:bg-opacity-40 lg:inline-flex underline underline-offset-4 ">
                            Sign Up
                        </p>
                        <div className="flex cursor-pointer items-center space-x-2 rounded-2xl border p-2 shadow-sm transition ease-in-out hover:scale-105 hover:shadow-md active:scale-95"
                            onClick={() => { setActive(!active); }}
                        >
                            <MenuRoundedIcon className="h-6 w-6" />
                            {/* {currentUser ? (
                                <div className="relative h-10 w-10">
                                    <img
                                        alt="userImage"
                                        src={currentUser.profilePicture}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-full"
                                    />
                                </div>
                            ) : (
                                <UserCircleIcon className="h-8 w-8" />
                            )} */}
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

