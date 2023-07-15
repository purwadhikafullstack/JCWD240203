import { Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setGuest } from "../../redux/features/property/propertySlice";


export default function GuestSelection(props) {
    const guest = useSelector((state) => state.property.guest);
    const data = ['2', '3', '4', '5 +'];
    const call = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const openGuest = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleCloseMenu = (data) => {
        if(typeof data === 'string') {
            setAnchorEl(null)
            call(setGuest(data));
        }
        setAnchorEl(null);
    };

    const handleClose = () => {
        if(props.toggleGuest) {
            props.toggleGuest(false);
        }
    };

    return (
        <div className={`${(props?.guest)? 'h-[150px]' : 'h-0 border-transparent'} z-[2] absolute top-0 w-full bg-gray-300 transition-all duration-400 border-b-[1px] border-black overflow-hidden whitespace-nowrap`}>
            <div>
                How many will be coming with you ?
            </div>
            <div className="flex justify-center py-[20px]">
                <div className="w-[175px]">
                    <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleClick}
                    >
                        Guests: {guest}
                    </Button>
                    <Menu
                    anchorEl={anchorEl}
                    open={openGuest}
                    fullWidth
                    onClose={handleCloseMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    >
                        {
                            data?.map((value,index) => {
                                return(
                                    <MenuItem key={index} onClick={() => handleCloseMenu(value)} className="w-[175px] bg-black h-[25px]">
                                        <div className="flex justify-center w-full">
                                            {value}
                                        </div>
                                    </MenuItem>
                                )
                            })
                        }
                    </Menu>
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