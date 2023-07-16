import { MenuItem, Select, FormControl, InputLabel } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { setGuest } from "../../redux/features/property/propertySlice";


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
        <div className={`${(props?.guest)? 'h-[175px]' : 'h-0 border-transparent'} z-[2] absolute top-0 w-full bg-gray-300 transition-all duration-400 border-b-[1px] border-black overflow-hidden whitespace-nowrap`}>
            <div className="font-bold text-[20px]">
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
                <div onClick={handleClose} className="flex items-center justify-center h-[40px] w-[200px] rounded-[10px] bg-green-600 transition-all duration-400 hover:bg-green-700 active:scale-95 active:bg-green-800 cursor-pointer">
                    Close
                </div>
            </div>
        </div>
    )
}