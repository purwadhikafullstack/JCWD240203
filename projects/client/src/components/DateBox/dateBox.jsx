import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DayPicker } from 'react-day-picker';
import { format } from "date-fns";
import { setStart, setEnd } from "../../redux/features/property/propertySlice";
import 'react-day-picker/dist/style.css';
import { useDispatch, useSelector } from "react-redux";

export default function DateBox(props) {
  const [isFocused, setIsFocused] = useState(false);
  const start = useSelector((state) => state.property.start);
  const end = useSelector((state) => state.property.end);
  const [isOpen, setIsOpen] = useState(false);
  const call = useDispatch();

  const handleBoxFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const handleBoxBlur = (e) => {
    if(!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
      setIsOpen(false);
    }
  };

  const handleDayClick = (date) => {
    if(date) {
      if(props.type === 'checkIn') {
        call(setStart(formatDate(date)));
        if(new Date(date).getTime() >= new Date(end).getTime()) {
          call(setEnd(''));
        }
      }
      else if (props.type === 'checkOut') {
        if(new Date(date).getTime() < new Date(start).getTime()) {
          call(setStart(formatDate(date)));
          call(setEnd(''));
        }
        else {
          call(setEnd(formatDate(date)));
        }
      }
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
        height: "auto",
        backgroundColor: "#ffffff",
      }}
      onBlur={handleBoxBlur}
    >
      <Typography
        variant="subtitle1"
        color="textSecondary"
        fontWeight="bold"
        sx={{ marginBottom: 1 }}
      >
        {props.label}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={(props.type === 'checkIn')?  start : end}
        onFocus={handleBoxFocus}
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
      <div className={`${(isOpen)? '' : 'hidden'} w-[1px]`}>
        <DayPicker
          selected={(props.type === 'checkIn')?  new Date(start) : new Date(end)}
          onDayClick={handleDayClick}
          disabled={{
            before: new Date()
          }}
          fromMonth={new Date()}
          style={{scale: '0.83', margin: '0', padding: '0'}}
        />
      </div>
    </Box>
  );
}
