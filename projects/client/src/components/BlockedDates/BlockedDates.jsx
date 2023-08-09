import React from "react";
import Calendar from "react-calendar";

const BlockedDates = ({
  selectedDate,
  setIsDatePickerOpen,
  Set_Availability,
  availability,
  Delete_Availability,
}) => {
  return (
    <div className="availability-form">
      <button
        className="create-btn"
        onClick={() => setIsDatePickerOpen(true)}
      >
        Set Blocked Date
      </button>
      {isDatePickerOpen && (
        <div className="datepicker-container">
          <Calendar
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
            tileClassName={({ date }) =>
              Is_Date_Blocked({ date }) ? "blocked-date" : ""
            }
          />
          <button className="create-btn" onClick={Set_Availability}>
            Set as Blocked Date
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockedDates;
