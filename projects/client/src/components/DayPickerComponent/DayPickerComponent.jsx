import React from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

export default function DayPickerComponent({
  selectedDate,
  onDayClick,
  blockedDates,
  setSelectedDate,
}) {
  const handleSetBlockedDate = () => {
    if (selectedDate) {
      setSelectedDate(null); // Clear selected blocked date for FullCalendar
      onDayClick(selectedDate);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center md:items-start w-[400px] h-full">
      <DayPicker
        selected={selectedDate ? new Date(selectedDate) : ""}
        defaultMonth={selectedDate ? new Date(selectedDate) : ""}
        captionLayout="dropdown"
        fromYear={2000}
        toYear={new Date().getFullYear()}
        onDayClick={(date) => setSelectedDate(date)}
        footer={`Blocked Date: ${
          selectedDate
            ? format(new Date(selectedDate), "dd MMM yyyy")
            : "not selected"
        }`}
        style={{ scale: "0.75", padding: 0, margin: 0 }}
        disabledDays={blockedDates}
      />
      <button className="create-btn" onClick={handleSetBlockedDate}>
        Set as Blocked Date
      </button>
    </div>
  );
}
