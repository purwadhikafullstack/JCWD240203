import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventModalCalendar({
  showModal,
  setShowModal,
  newEvent,
  setNewEvent,
  handleInputChange,
  handleSaveEvent,
}) {
  return (
    showModal && (
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
    )
  );
}
