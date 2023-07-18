import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountry } from "../../redux/features/country/countrySlice";
import { setLocation } from "../../redux/features/property/propertySlice";
import "./LocationSelection.css"

export default function LocationSelection(props) {
    const country = useSelector((state) => state.country.country);
    const call = useDispatch();

    const handleClose = () => {
        if (props.toggleLocation) {
            props.toggleLocation(false);
        }
    }

    const handleClick = (data) => {
        call(setLocation(data));
        if (props.toggleLocation) {
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

    return (
        <div className={`${(props.location) ? 'h-[420lepx]' : 'h-[0px] border-transparent'} z-[2] top-0 border-b-[1px] border-gray-400 absolute transition-all duration-400 w-full bg-white whitespace-nowrap overflow-hidden`}>
            <div className="location text-[46px] text-black font-semibold">
                Locations 
            </div>
            <div className="h-[280px] px-[10px] py-[7px] overflow-y-auto removeScroll">
                {
                    country?.map((value, index) => {
                        return (
                            <div key={index}>
                                <div className="country text-start  text-[30px] text-gray-700 font-thin">
                                    {value.name} 
                                </div>
                                <div className="cities text-[26px]  uppercase grid grid-cols-3 md:grid-cols-4 gap-[10px] ">
                                    {
                                        value?.cities?.map((value, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => handleClick(`${value.countryCode}/${value.name}`)}
                                                    className="cities flex transition-all duration-400 hover:bg-green-800/50 active:bg-green-300 px-4 py-2 items-center justify-center w-full h-[50px]  border-gray-700 rounded-[10px]font-sans rounded-[10px] border-solid border-2 text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#2E8B57,0_0px_0_0_#2E8B57] active:border-b-[0px] duration-150 shadow-[0_10px_0_0_#2E8B57,0_15px_0_0_] border-b-[1px] drop-shadow-xl"
                                                >
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
                <div onClick={handleClose} className="closeButton text-[25px] text-white flex items-center justify-center font-sans h-[45px] w-[200px] rounded-[35px] bg-green-600 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl mb-6">
                    CLOSE
                </div>
            </div>
        </div>
    )
}