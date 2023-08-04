import React, { useState } from "react";
import { FcPlus } from "react-icons/fc";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, isSameDay } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { DayPicker } from "react-day-picker";
// import "react-day-picker/lib/style.css";

export default function SidebarCalendar({ onEventCreate, events }) {
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: null,
    end: null,
    specialPrice: null,
  });

  const [blockedDates, setBlockedDates] = useState([]);
  const [selectedBlockedDate, setSelectedBlockedDate] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const eventCalendar = [
    // Add the events you want to display in the FullCalendar here
    // For example:
    {
      title: "Special Price",
      start: "2023-08-10",
      end: "2023-08-12",
      specialPrice: 1500000,
    },
    ...events,
  ];

  const handleCreateEvent = () => {
    setShowModal(true);
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedBlockedDate(selectInfo.startStr);
    setShowModal(true);
  };

  const handleDateUnselect = () => {
    setSelectedBlockedDate(null);
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleSaveEvent = () => {
    if (newEvent.title) {
      const { title, start, end, specialPrice } = newEvent;
      const event = {
        title,
        start,
        end: addDays(end, 1),
        specialPrice: parseInt(specialPrice),
      };
      onEventCreate(event);
      setBlockedDates((prevDates) => [...prevDates, start]);
      setShowModal(false);
      setNewEvent({
        title: "",
        start: null,
        end: null,
        specialPrice: null,
      });
    }
  };

  const handleBlockDate = (date) => {
    setBlockedDates((prevDates) => [...prevDates, date]);
  };

  const handleUnblockDate = (date) => {
    setBlockedDates((prevDates) =>
      prevDates.filter((blockedDate) => !isSameDay(blockedDate, date))
    );
  };

  const isDateBlocked = (date) => {
    return blockedDates.some((blockedDate) => isSameDay(blockedDate, date));
  };

  const getSpecialPrice = (date) => {
    const event = eventCalendar.find(
      (event) => isSameDay(event.start, date) || isSameDay(event.end, date)
    );
    return event ? event.specialPrice : null;
  };

  const renderEventContent = (eventInfo) => {
    const specialPrice = getSpecialPrice(eventInfo.event.start);
    return (
      <div>
        <div>{eventInfo.timeText}</div>
        <div>{eventInfo.event.title}</div>
        {specialPrice && <div>Rp{specialPrice.toLocaleString()}</div>}
      </div>
    );
  };

  const handleSetBlockedDate = () => {
    if (selectedDate) {
      setBlockedDates((prevDates) => [...prevDates, selectedDate]);
      setIsDatePickerOpen(false);
      setSelectedDate(null);
      setSelectedBlockedDate(null); // Clear selected blocked date for FullCalendar
    }
  };

  const Is_Date_Blocked = ({ date }) => {
    return blockedDates.some((blockedDate) => isSameDay(blockedDate, date));
  };

  const Set_Availability = () => {
    setIsDatePickerOpen((prevState) => !prevState);
  };


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
      <div>
        {/* Block Dates */}
        <div className="rounded-[13px] py-8 px-2 border-2 border-gray-200">
          <div>
            <h2 className="text-lg font-semibold">Block Dates</h2>
          </div>
          <div className="flex flex-col justify-start items-center md:items-start w-[400px] h-full">
            <DayPicker
              selected={
                isNaN(new Date(selectedDate)) ? "" : new Date(selectedDate)
              }
              defaultMonth={
                isNaN(new Date(selectedDate))
                  ? ""
                  : new Date(selectedDate)
              }
              captionLayout="dropdown"
              fromYear={2000}
              toYear={new Date().getFullYear()}
              onDayClick={(date) => setSelectedDate(date)}
              footer={`Blocked Date: ${
                isNaN(new Date(selectedDate))
                  ? "not selected"
                  : format(new Date(selectedDate), "dd MMM yyyy")
              }`}
              style={{ scale: "0.75", padding: 0, margin: 0 }}
              disabledDays={blockedDates}
            />
            <button className="create-btn" onClick={handleSetBlockedDate}>
              Set as Blocked Date
            </button>
          </div>
        </div>
      </div>
      {/* Modal content and form */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 bg-black flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Create New Event</h2>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              className="w-full border p-2 rounded mb-4"
              value={newEvent.title}
              onChange={handleInputChange}
            />
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
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleSaveEvent}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
