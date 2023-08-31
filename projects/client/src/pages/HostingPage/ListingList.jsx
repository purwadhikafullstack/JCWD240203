import { useEffect, useState } from "react";
import ListingListCard from "../../components/ListingListCard/ListingListCard";
import './ListingList.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/features/user/userSlice";

export default function ListingList() {
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
    const call = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('user')) {
            call(getUser({id: JSON.parse(localStorage.getItem('user')).id})).then(
                (response) => {setCurrentUser(response.data.data)},
                () => {}
            )
        }
        else {
            navigate('/');
        }
    }, [call, navigate])

    return (
        <div className="flex flex-col flex-grow w-full">
            <main className="w-full px-6">
                <div className="flex flex-col gap-[20px] sm:flex-row justify-between topListing text-left my-[50px]">
                    <div className="totalList text-[33px]">
                        Your Listings
                    </div>
                    <div className="flex justify-end">
                        <Link to={'/hostings/addproperty'} className="exploreButton py-[6px] px-[6px] text-[20px] md:text-xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
                            ➕ Create listing
                        </Link>
                    </div>
                </div>
                <div className="card py-4 md:w-full rounded-lg">
                    <div className="hidden md:flex md:flex-row flex-grow content-between">
                        <div className="listDetail flex justify-between w-full">
                            <div className="flex justify-center items-center text-left w-[380px] px-[10px] py-[10px]">
                                LISTING
                            </div>
                            <div className="flex justify-center items-center text-left w-[200px] px-[8px] py-[10px]">
                                STATUS
                            </div>
                            <div className="flex justify-center items-center text-left w-[540px] px-[10px] py-[10px]">
                                LOCATION
                            </div>
                        </div>
                    </div>
                    <div className="md:hidden listDetail w-full">
                        YOUR PROPERTIES
                    </div>
                    <hr className="my-4 border-gray-300" />
                    {
                        currentUser?.properties?.map((value, index) => {
                            return(
                                <div key={index} className="filledDetail">
                                    <ListingListCard data={value}/>
                                    <hr className="my-4 border-gray-300" />
                                </div>
                            )
                        })
                    }
                </div>
            </main>
        </div >
    )
}