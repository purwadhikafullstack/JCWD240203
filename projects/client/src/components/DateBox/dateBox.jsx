import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DayPicker } from 'react-day-picker';
import { format } from "date-fns";
import 'react-day-picker/dist/style.css';

export default function DateBox({ label, handleFocus, handleBlur }) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateString, setDateString] = useState('');
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
    if(date) {
      setSelectedDate(date);
      setDateString(formatDate(date));
      setIsOpen(false);
    }
  };

  const formatDate = (date) => {
    return format(date, "MM/dd/yyyy");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: isFocused ? "3px solid black" : "3px solid transparent",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "320px",
        backgroundColor: "#ffffff",
        p: 2,
      }}
      
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
            inputAdornedEnd: "center-text",
            adornedEnd: "center-text",
          },
          inputProps: {
            style: { textAlign: "center" },
          },
        }}
      />
      {
        (isOpen)?
        <div className="w-[1px]">
          <DayPicker
            selected={selectedDate}
            onDayClick={handleDayClick}
            style={{scale: '0.85'}}
          />
        </div>
        :
        <>
        </>
      }
    </Box>
  );
}
