import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/lab";


const locationOptions = [
    { label: "Jakarta", value: "Jakarta" },
    { label: "Bali", value: "Bali" },
    { label: "Bandung", value: "Bandung" },
    { label: "Yogyakarta", value: "Yogyakarta" },
];

export default function LocationBox({ handleFocus, handleBlur }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleBoxFocus = () => {
        setIsFocused(true);
        handleFocus();
    };

    const handleBoxBlur = () => {
        setIsFocused(false);
        handleBlur();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                border: isFocused ? "3px solid black" : "1px solid transparent",
                borderRadius: "10px",
                width: "100%",
                py: 2,
                px: 4,
            }}
            onClick={handleBoxFocus}
            onBlur={handleBoxBlur}
        >
            <Typography
                variant="subtitle1"
                color="textSecondary"
                fontWeight="bold"
                sx={{ marginBottom: 1 }}
            >
                LOCATION
            </Typography>
            <Autocomplete
                className="locationOptions"
                freeSolo
                options={locationOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label=""
                        variant="outlined"
                        fullWidth
                        onFocus={handleBoxFocus}
                        onBlur={handleBoxBlur}
                    />
                )}
            />
        </Box>
    );
}

