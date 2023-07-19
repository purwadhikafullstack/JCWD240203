import { MenuItem, Select, FormControl, InputLabel } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { setGuest } from "../../redux/features/property/propertySlice";
import "./GuestSelection.css"


export default function GuestSelection(props) {
    const guest = useSelector((state) => state.property.guest);
    const data = ['1' ,'2', '3', '4', '5 +'];
    const call = useDispatch();

    const handleChange = (event) => {
        call(setGuest(event.target.value));
    };

    const handleClose = () => {
        if(props.toggleGuest) {
            props.toggleGuest(false);
        }
    };

    return (
        <div className={`${(props?.guest)? 'h-[199px]' : 'h-0 border-transparent'} z-[2] absolute top-0 w-full bg-white transition-all duration-400 border-b-[1px] border-gray-400 overflow-hidden whitespace-nowrap`}>
            <div className="howMany font-bold text-[20px]">
                How many will be coming with you ?
            </div>
            <div className="flex justify-center py-[20px]">
                <div className="w-[175px]">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Guest</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={guest}
                        label="Guest"
                        onChange={handleChange}
                      >
                        {
                            data?.map((value,index) => {
                                return(
                                    <MenuItem key={index} value={value} className="w-[175px] bg-black h-[40px]">
                                        <div className="flex justify-center w-full">
                                            {value}
                                        </div>
                                    </MenuItem>
                                )
                            })
                        }
                      </Select>
                    </FormControl>
                </div>
            </div>
            <div className="flex justify-center w-full h-full">
                <div onClick={handleClose} className="closeButton text-[25px] text-white flex items-center justify-center font-sans h-[45px] w-[200px] rounded-[35px] bg-green-800/70 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl mb-6">
                    Close
                </div>
            </div>
        </div>
    )
}