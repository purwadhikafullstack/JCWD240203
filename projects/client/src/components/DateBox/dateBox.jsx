import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { DayPicker } from 'react-day-picker';
import { format } from "date-fns";
import { setStart, setEnd } from "../../redux/features/property/propertySlice";
import { useDispatch, useSelector } from "react-redux";

export default function DateBox(props) {
  const start = useSelector((state) => state.property.start);
  const end = useSelector((state) => state.property.end);
  const [isOpen, setIsOpen] = useState(false);
  const call = useDispatch();

  const handleBoxFocus = () => {
    setIsOpen(true);
  };

  const handleBoxBlur = (e) => {
    if(!e.currentTarget.contains(e.relatedTarget)) {
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
    <div className="flex relative flex-col rounded-[10px] w-full bg-white" onBlur={handleBoxBlur}>
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
      <div className={`${(isOpen)? 'border-black' : 'hidden border-transparent'} flex justify-center items-center border-[3px] rounded-[10px] top-[110%] left-[-50%] right-[-50%] mx-auto absolute z-40 bg-white w-[300px]`}>
        <DayPicker
          selected={(props.type === 'checkIn')?  new Date(start) : new Date(end)}
          onDayClick={handleDayClick}
          disabled={
            (props?.type === 'checkOut')?
            {
              before: (!isNaN(new Date(start)))? new Date(start).setDate(new Date().getDate() + 2) : new Date()
            }
            :
            {
              before: new Date()
            }
          }
          fromMonth={(!isNaN(new Date(start)) && props?.type === 'checkOut')? new Date(new Date(start).setDate(new Date(start).getDate() + 2)) : new Date()}
          style={{scale: '0.90'}}
        />
      </div>
    </div>
  );
}
