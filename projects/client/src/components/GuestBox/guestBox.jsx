import { Box, TextField, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setGuest } from "../../redux/features/property/propertySlice";
import './guestBox.css'

export default function GuestBox({ label }) {
    const data = ['1', '2', '3', '4', '5'];
    const guest = useSelector((state) => state.property.guest);
    const call = useDispatch();

    const handleGuestChange = (event) => {
        call(setGuest(event.target.value));
    };

    return (
        <Box
            sx={{width: '100%' }}
        >
            <Typography
                variant="subtitle1"
                color="textSecondary"
                fontWeight="bold"
                sx={{ marginBottom: 1 }}
            >
                {label}
            </Typography>
            <TextField
                select
                variant="outlined"
                fullWidth
                value={guest}
                onChange={handleGuestChange}
                InputProps={{
                    classes: {
                        input: "font-bold text-base text-black",
                    },
                }}
            >
                {
                data.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))
                }
            </TextField>
        </Box>
    );
}
