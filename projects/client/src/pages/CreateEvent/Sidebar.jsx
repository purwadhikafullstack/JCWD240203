import React, { useEffect, useState } from "react";
import { Slider, TextField } from "@mui/material";
import { Select } from "@mantine/core";

export default function Sidebar({eventStart, eventEnd, percentage, setPercentage, type, setType, property, setLoading, selectedRoom, setSelectedRoom, onCreateEvent, isSubmitting}) {
    const [dataRoom, setDataRoom] = useState([]);

    const handleSelectRoom = (room) => {
        if(setSelectedRoom) {setSelectedRoom(JSON.parse(room))};
    };

    const handleSelectType = (selectedType) => {
        if(setType) {setType(selectedType)};
    };

    const handleChangePercentage = (e, value) => {
        if(setPercentage) {setPercentage(value)};
    };

    useEffect(() => {
        if(Object.keys(property)?.length > 0) {
            let tempData = [];
            property?.rooms?.forEach((value) => {
                tempData.push({value: JSON.stringify(value), label: value.name});
            })
            setDataRoom(tempData);
        }
    }, [property]);

    return (
        <div className="flex flex-col items-center justify-center h-auto w-full gap-[10px]">
            <div className="w-full rounded-[13px] pt-[10px] pb-[25px] px-6 border-2 border-gray-200">
                <div className="flex flex-col gap-[10px] items-start justify-center">
                    <div className="text-[18px] font-bold">
                        Room:
                    </div>
                    <Select
                    data={dataRoom}
                    onChange={(e) => handleSelectRoom(e)}
                    dropdownPosition="bottom"
                    transitionProps={{ transition: 'scale-y', duration: 200, timingFunction: 'ease' }}
                    className="w-full"
                    />
                </div>
                <div className="flex flex-col gap-[10px] items-start justify-center">
                    <div className="text-[18px] font-bold">
                        Type:
                    </div>
                    <Select
                    value={type}
                    data={[{value: 'Discount', label: 'Discount'}, {value: 'Mark up', label: 'Mark up'}]}
                    onChange={(e) => handleSelectType(e)}
                    dropdownPosition="bottom"
                    transitionProps={{ transition: 'scale-y', duration: 200, timingFunction: 'ease' }}
                    className="w-full"
                    />
                </div>
            </div>
            <div className="w-full rounded-[13px] pb-[25px] px-2 border-2 border-gray-200">
                <div className="flex flex-col gap-[10px] w-full px-2 my-2">
                    <h1 className="text-[18px] font-bold text-left">
                        Discounts/Mark Ups
                    </h1>
                </div>
                <div className="flex flex-col gap-[15px] text-left px-2">
                    <div className="text-black text-[28px] font-bold">
                        {percentage}% <span className="text-[23px] font-bold">{type}</span>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="px-[10px]">
                            <Slider
                            value={typeof percentage === 'number' ? percentage : 1}
                            onChange={handleChangePercentage}
                            aria-labelledby="input-slider"
                            min={1}
                            max={100}
                            />
                        </div>
                        <TextField
                            type="text"
                            fullWidth
                            value={eventStart || ''}
                            size="small"
                            label="Start"
                            disabled
                        />
                        <TextField
                            type="text"
                            fullWidth
                            value={eventEnd || ''}
                            size="small"
                            label="End"
                            disabled
                        />
                    </div>
                    <button
                    onClick={onCreateEvent}
                    disabled={isSubmitting}
                    className="exploreButton w-full mt-2 py-[4px] text-2xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

