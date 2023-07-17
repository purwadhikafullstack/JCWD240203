import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountry } from "../../redux/features/country/countrySlice";
import { setLocation } from "../../redux/features/property/propertySlice";

export default function LocationSelection(props) {
    const country = useSelector((state) => state.country.country);
    const call = useDispatch();

    const handleClose = () => {
        if(props.toggleLocation) {
            props.toggleLocation(false);
        }
    }

    const handleClick = (data) => {
        call(setLocation(data));
        if(props.toggleLocation) {
            props.toggleLocation(false);
        }
    }

    useEffect(() => {
        call(getCountry()).then(
            () => {

            },
            (error) => {
                console.log(error)
            }
        )
    }, [call])

    return(
        <div className={`${(props.location)? 'h-[375px]' : 'h-[0px] border-transparent'} z-[2] top-0 border-b-[1px] border-black absolute transition-all duration-400 w-full bg-gray-300 whitespace-nowrap overflow-hidden`}>
            <div className="text-[24px] font-bold">
                Locations
            </div>
            <div className="h-[280px] px-[10px] py-[10px] overflow-y-auto removeScroll">
                {
                    country?.map((value, index) => {
                        return(
                            <div key={index}>
                                <div className="text-start font-bold text-[20px]">
                                    {value.name}
                                </div>
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-[10px]">
                                    {
                                        value?.cities?.map((value, index) => {
                                            return(
                                                <div key={index} onClick={() => handleClick(`${value.countryCode}/${value.name}`)} className="flex transition-all duration-400 hover:bg-gray-500 active:bg-gray-600 px-[10px] items-center justify-center w-full h-[50px] border-[1px] border-gray-700 rounded-[10px]">
                                                    {value?.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-center w-full h-full">
                <div onClick={handleClose} className="flex items-center justify-center h-[45px] w-[200px] rounded-[10px] bg-green-600 transition-all duration-400 hover:bg-green-700 active:scale-95 active:bg-green-800 cursor-pointer">
                    Close
                </div>
            </div>
        </div>
    )
}