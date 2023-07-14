import { useEffect, useState, useRef } from "react";
import Header from "../../components/header/headerPage";
import { AiOutlineSearch } from "react-icons/ai"
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import PropertyCard from "../../components/PropertyCard/propertyCard";
import { useDispatch, useSelector } from "react-redux";
import { getProperty } from "../../redux/features/property/propertySlice";
import { Toaster, toast } from "react-hot-toast";

export default function ProductPage() {
    const limit = 8;
    const properties = useSelector((state) => state.property.property);
    const totalProperties = Math.ceil(useSelector((state) => state.property.totalProperty) / limit);
    const [date, toggleDate] = useState(false);
    const [page, setPage] = useState(1);
    const call = useDispatch()

    const listInnerRef = useRef();
    const checkScroll = () => {
        if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
            if(page + 1 <= totalProperties) {
                setPage(page+1);
            }
          }
        }
    };
    
    const handleTimeClick = () => {
        toggleDate(!date)
    };

    useEffect(() => {
        call(getProperty({
            page: page,
            limit: limit
        })).then(
            () => {

            },
            (error) => {
                toast.error('unable to get list !');
                console.log(error);
            }
        )
    }, [page])
    return (
        <div onScroll={checkScroll} ref={listInnerRef} className="flex flex-col w-full h-[100vh] overflow-y-auto">
            <Toaster/>
            <Header/>
            <div className="flex flex-col flex-grow w-full">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[10px] w-full h-full my-[10px] px-[50px]">
                    {
                        properties?.map((value, index) => {
                            return(
                                <div key={index} className="h-[275px] md:h-[350px]">
                                    <PropertyCard data={value}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}