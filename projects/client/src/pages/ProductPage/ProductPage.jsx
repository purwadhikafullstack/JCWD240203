import { useState } from "react";
import Header from "../../components/header/headerPage";
import { AiOutlineSearch } from "react-icons/ai"
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function ProductPage() {
    const [date, toggleDate] = useState(false);

    const handleTimeClick = () => {
        toggleDate(!date)
    };
    return (
        <div className="flex flex-col w-full h-[100vh]">
            <Header/>
            <div className="flex flex-col flex-grow w-full bg-blac">
                <div className="relative flex flex-col items-center py-[5px] px-[10px]">
                    <div className={`w-[350px] h-[45px] flex justify-center items-center rounded-full bg-white shadow-gray-500 border-[1px] border-gray-300`}>
                        <div className="flex flex-grow h-full justify-center items-center rounded-full">
                            Anywhere
                        </div>
                        <div className="w-[1px] h-full bg-gray-400">
                            &nbsp;
                        </div>
                        <div className="flex flex-grow h-full rounded-full">
                            <div onClick={handleTimeClick} className={`w-full h-full flex justify-center items-center transition-all duration-400 bg-transaparent hover:bg-gray-300 cursor-pointer`}>
                                Any Week
                            </div>
                        </div>
                        <div className="w-[1px] h-full bg-gray-400">
                            &nbsp;
                        </div>
                        <div className="flex flex-grow h-full justify-center items-center rounded-full">
                            Add Guest
                        </div>
                        <div className="flex justify-center items-center transition-all duration-400 hover:bg-red-900 w-[35px] h-[35px] rounded-full bg-red-600 mr-[10px]">
                            <AiOutlineSearch size={25}/>
                        </div>
                    </div>
                    <div className={`${(date)? 'h-[325px]' : 'h-0'} absolute transition-all duration-400 whitespace-nowrap overflow-hidden flex justify-center w-full bg-gray-200`}>
                        <div className={`top-[50px] left-0 right-0 w-[500px] flex justify-between`}>
                            <div>
                                <div>
                                    Check-in
                                </div>
                                <div>
                                    <DayPicker
                                    mode="single"
                                    style={{scale: '.85', margin: '0'}}
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    Check-out
                                </div>
                                <div>
                                    <DayPicker
                                    mode="single"
                                    style={{scale: '.85', margin: '0'}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-[10px] w-full h-full my-[10px] px-[50px]">
                    
                </div>
            </div>
        </div>
    )
}