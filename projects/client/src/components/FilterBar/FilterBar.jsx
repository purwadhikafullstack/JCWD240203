import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import DateSelection from "./DateSelection";
import LocationSelection from "./LocationSelection";
import GuestSelection from "./GuestSelection";

export default function FilterBar() {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des']
    const [location, toggleLocation] = useState(false);
    const [date, toggleDate] = useState(false);
    const [guest, toggleGuest] = useState(false);

    const selectedLocation = useSelector((state) => state.property.location);
    const selectedStart = useSelector((state) => state.property.start);
    const selectedEnd = useSelector((state) => state.property.end);
    const selectedGuest = useSelector((state) => state.property.guest);
    const call = useDispatch();

    const handleTimeClick = () => {
        toggleDate(!date);
    };

    const handleLocationClick = () => {
        toggleLocation(!location);
    };

    const handleGuestClick = () => {
        toggleGuest(!guest);
    };
    return (
        <div className="relative flex flex-col items-center py-[5px] px-[10px]">
            <div className={`w-[300px] md:w-[400px] h-[50px] flex justify-center items-center rounded-full bg-white shadow-gray-500 border-[1px] border-gray-300 overflow-hidden`}>
                <div onClick={handleLocationClick} className="flex flex-grow h-full justify-center items-center transition-all duration-400 hover:bg-gray-300 active:bg-gray-400 cursor-pointer">
                    {selectedLocation?.split('/')[1] || 'Anywhere'}
                </div>
                <div className="w-[1px] h-full bg-gray-400">
                    &nbsp;
                </div>
                <div className="flex flex-grow h-full rounded-full">
                    <div onClick={handleTimeClick} className={`w-full h-full flex justify-center items-center transition-all duration-400 bg-transaparent hover:bg-gray-300 active:bg-gray-400 cursor-pointer`}>
                        {
                            (selectedStart && selectedEnd && (selectedStart < selectedEnd)) ?
                            new Date(selectedStart).getDate() + ' ' + month[new Date(selectedStart).getMonth()] + '-' + new Date(selectedEnd).getDate() + ' ' + month[new Date(selectedEnd).getMonth()]
                            :
                            (selectedStart && selectedEnd && (selectedStart >= selectedEnd)) ?
                            new Date(selectedStart).getDate() + ' ' + month[new Date(selectedStart).getMonth()]
                            :
                            'Any week'
                        }
                    </div>
                </div>
                <div className="w-[1px] h-full bg-gray-400">
                    &nbsp;
                </div>
                <div onClick={handleGuestClick} className="flex flex-grow h-full justify-center items-center transition-all duration-400 bg-transaparent hover:bg-gray-300 active:bg-gray-400 cursor-pointer">
                    Guests: {selectedGuest}
                </div>
                <div className="w-[1px] h-full bg-gray-400">
                    &nbsp;
                </div>
                <div className="px-[3px]">
                    <div className="flex justify-center items-center transition-all duration-400 hover:bg-red-900 w-[40px] h-[40px] rounded-full bg-red-600 mx-[5px] cursor-pointer">
                        <AiOutlineSearch size={25}/>
                    </div>
                </div>
            </div>
            <DateSelection date={date} toggleDate={toggleDate}/>
            <LocationSelection location={location} toggleLocation={toggleLocation}/>
            <GuestSelection guest={guest} toggleGuest={toggleGuest}/>
        </div>
    )
}