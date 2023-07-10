import React, { useState } from "react";
import "./cardBooking.css";
import { Box, TextField, MenuItem } from "@mui/material";
import { Autocomplete } from "@mui/lab";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { DayPicker } from 'react-day-picker';
import "react-day-picker/dist/style.css";
import dayPickerStyles from "./dayPickerStyles.module.css";


const locationOptions = [
    { label: "Jakarta", value: "Jakarta" },
    { label: "Bali", value: "Bali" },
    { label: "Bandung", value: "Bandung" },
    { label: "Yogyakarta", value: "Yogyakarta" },
];

const guestOptions = [0, 1, 2, 3, 4, 5, 6];

function LocationBox({ handleFocus, handleBlur }) {
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
                px: 4
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

function DateBox({ label, handleFocus, handleBlur }) {
    const [isFocused, setIsFocused] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleBoxFocus = () => {
        setIsFocused(true);
        setIsOpen(true);
        handleFocus();
    };

    const handleBoxBlur = () => {
        setIsFocused(false);
        setIsOpen(false);
        handleBlur();
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setIsOpen(false);
    };

    const formatDate = (date) => {
        return format(date, "MM/dd/yyyy");
    };

    const selectedDateString = selectedDate ? formatDate(selectedDate) : "";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                border: isFocused ? "3px solid black" : "1px solid transparent",
                borderRadius: "10px",
                width: "320px",
                backgroundColor: "#ffffff",
                p: 2,
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
                {label}
            </Typography>
            <TextField
                variant="outlined"
                fullWidth
                onFocus={handleBoxFocus}
                onBlur={handleBoxBlur}
                value={selectedDateString}
                InputProps={{
                    classes: {
                        input: "selected-date font-bold text-base text-black",
                    },
                }}
            />
            {isOpen && (
                <DayPicker
                    selected={selectedDate}
                    onDayClick={handleDayClick}
                    classNames={dayPickerStyles}
                />
            )}
        </Box>
    );
}

function GuestBox({ label }) {
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
            sx={{
                display: "flex",
                flexDirection: "column",
                border: isFocused ? "3px solid black" : "1px solid transparent",
                borderRadius: "10px",
                width: "20rem",
                p: 2,

            }}
            onFocus={handleBoxFocus}
            onBlur={handleBoxBlur}
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
export default function CardBooking() {
    const handleFocus = () => { };

    const handleBlur = () => { };

    return (
        <Card className="mt-6 w-100 ml-4 z-40 drop-shadow-2xl bg-white rounded-lg">
            <CardBody>
                <div className="typography">
                    <h5 color="blue-gray" className="mb-2 text-6xl font-bold text-gray-900 ">
                        Find places to stay in Indonesia
                    </h5>
                    <h4>
                        Whether you’re looking for a cabin, a condo, or a castle—find your getaway on Rentify.
                    </h4>
                    <div className="locationBox flex">
                        <LocationBox handleFocus={handleFocus} handleBlur={handleBlur} />
                    </div>
                </div>
                <div className="dateBox relative h-[100px] z-20">
                    <div className="absolute flex left-[20px]">
                        <div>
                            <DateBox label="CHECK IN" handleFocus={handleFocus} handleBlur={handleBlur} />
                        </div>
                        <div>
                            <DateBox label="CHECK OUT" handleFocus={handleFocus} handleBlur={handleBlur} />
                        </div>
                    </div>
                </div>
                <div className="guestBox relative h-[100px] z-10">
                    <div className="absolute flex left-[20px]">
                        <div>
                            <GuestBox label="ADULTS" />
                        </div>
                        <div>
                            <GuestBox label="CHILDREN" />
                        </div>
                    </div>
                </div>
                <div>
                    <button className="searchButton px-[270px] py-[8px] mt-8 text-2xl font-sans rounded-[10px] bg-green-600 text-white font-extrabold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
                        Search
                    </button>
                </div>
            </CardBody>
        </Card>
    );
}

