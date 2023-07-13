import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DayPicker } from 'react-day-picker';
import { format } from "date-fns";
import './dayPickerStyles.module.css'

export default function DateBox({ label, handleFocus, handleBlur }) {
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
        width: "100%",
        maxWidth: "320px",
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
            inputAdornedEnd: "center-text",
            adornedEnd: "center-text",
          },
          inputProps: {
            style: { textAlign: "center" },
          },
        }}
      />
      {isOpen && (
        <DayPicker
          selected={selectedDate}
          onDayClick={handleDayClick}
          
        />
      )}
    </Box>
  );
}
