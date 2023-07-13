import React, { useState } from "react";
import { Box, TextField, MenuItem, Typography } from "@mui/material";
import './guestBox.css'


const guestOptions = [0, 1, 2, 3, 4, 5, 6];


export default function GuestBox({ label }) {
    const [isFocused, setIsFocused] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState(guestOptions[0]);

    const handleBoxFocus = () => {
        setIsFocused(true);
    };

    const handleBoxBlur = () => {
        setIsFocused(false);
    };

    const handleGuestChange = (event) => {
        setSelectedGuest(event.target.value);
    };

    return (
        <Box
            onFocus={handleBoxFocus}
            onBlur={handleBoxBlur}
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
                value={selectedGuest}
                onChange={handleGuestChange}
                InputProps={{
                    classes: {
                        input: "font-bold text-base text-black",
                    },
                }}
            >
                {guestOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
}
