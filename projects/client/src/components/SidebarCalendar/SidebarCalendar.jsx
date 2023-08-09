import React from "react";
import { FcPlus } from "react-icons/fc";
import { addDays, isSameDay } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import DayPickerComponent from "../../components/DayPickerComponent/DayPickerComponent"
import EventCalendarModal from "../../components/EventModalCalendar/EventModalCalendar";
import useCalendarFunctions from "../../components/UseCalendarFunctions/UseCalendarFunctions";
// import "react-day-picker/lib/style.css";

export default function SidebarCalendar({ onEventCreate, events }) {
    const {
        showModal,
        setShowModal,
        newEvent,
        setNewEvent,
        blockedDates,
        setBlockedDates,
        selectedBlockedDate,
        setSelectedBlockedDate,
        discountPercentage,
        setDiscountPercentage,
        selectedDate,
        setSelectedDate,
        eventCalendar,
        handleCreateEvent,
        handleDateSelect,
        handleDateUnselect,
        handleInputChange,
        handleSaveEvent,
        handleBlockDate,
        handleUnblockDate,
        isDateBlocked,
        getSpecialPrice,
        renderEventContent,
        handleSetBlockedDate,
        Is_Date_Blocked,
        Set_Availability,
    } = useCalendarFunctions(events);

    return (
        <aside className="border p-5 w-64 relative">
            <div>
                {/* Pricing */}
                <div className="rounded-[13px] py-10 px-2 mb-6 border-2 border-gray-200">
                    <div className="px-2 my-2">
                        <h2 className="text-lg font-semibold text-left">Price per night</h2>
                    </div>
                    <DatePicker
                        selected={newEvent.start}
                        onChange={(date) => setNewEvent({ ...newEvent, start: date })}
                        selectsStart
                        startDate={newEvent.start}
                        endDate={newEvent.end}
                        placeholderText="Start Date"
                        className="w-full border p-2 rounded mb-2"
                    />
                    <DatePicker
                        selected={newEvent.end}
                        onChange={(date) => setNewEvent({ ...newEvent, end: date })}
                        selectsEnd
                        startDate={newEvent.start}
                        endDate={newEvent.end}
                        minDate={newEvent.start}
                        placeholderText="End Date"
                        className="w-full border p-2 rounded mb-4"
                    />
                    <input
                        type="number"
                        name="specialPrice"
                        placeholder="Enter Price"
                        className="w-full border p-2 rounded mb-4"
                        value={newEvent.specialPrice || ""}
                        onChange={handleInputChange}
                    />
                    <button
                        className="exploreButton w-full mt-2 py-[4px] text-2xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl"
                        onClick={handleSaveEvent}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div>
                {/* Create Event */}
                <div className="rounded-[13px] py-10 px-2 mb-6 border-2 border-gray-200">
                    <div>
                        <div className="text-lg font-semibold text-left">
                            Add your special event
                        </div>
                        <button
                            className="createButton w-full mt-2 py-[4px] items-center text-2xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl"
                            onClick={handleCreateEvent}
                        >
                            <FcPlus className="mr-2" />
                            Create Event
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {/* Discounts */}
                <div className="rounded-[13px] py-10 px-2 mb-6 border-2 border-gray-200">
                    <div className="px-2 my-2">
                        <h1 className="text-xl font-semibold text-left">Discounts</h1>
                        <h2 className="text-base text-left">
                            Adjust your pricing to attract more guests.
                        </h2>
                    </div>
                    <div className="text-left px-2">
                        <div>
                            <span className="text-black text-xl underline underline-offset-4">
                                Weekend
                            </span>
                        </div>
                        <div>
                            <span className="text-black text-4xl font-bold">
                                {discountPercentage}% off
                            </span>
                        </div>
                        {/* Calculate total price after discount */}
                        <input
                            type="number"
                            placeholder="Enter Discount (%)"
                            className="w-full border p-2 rounded my-2"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                        />
                        <input
                            type="text"
                            value={`Rp${(newEvent.specialPrice * (1 - discountPercentage / 100))
                                .toLocaleString()}`}
                            readOnly
                            className="w-full border p-2 rounded mb-4"
                        />
                    </div>
                </div>
            </div>
            {/* Block Dates */}
            <div className="rounded-[13px] py-8 px-2 border-2 border-gray-200">
                <div>
                    <h2 className="text-lg font-semibold">Block Dates</h2>
                </div>
                <DayPickerComponent
                    selectedDate={selectedDate}
                    onDayClick={handleDateSelect}
                    blockedDates={blockedDates}
                    setSelectedDate={setSelectedDate}
                />
            </div>

            {/* Modal content and form */}
            <EventCalendarModal
                showModal={showModal}
                setShowModal={setShowModal}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                handleInputChange={handleInputChange}
                handleSaveEvent={handleSaveEvent}
            />
        </aside>
    );
}

