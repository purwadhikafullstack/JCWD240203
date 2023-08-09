import React from "react";

const CreateEventModal = ({
  selectedDate,
  eventName,
  setEventName,
  Create_Event_Fun,
  events,
  Delete_Event_Fun,
  OpenUpdateModal,
}) => {
  return (
    <div className="event-form">
      <h2> Create Event </h2>
      <p> Selected Date: {selectedDate.toDateString()} </p>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <button className="create-btn" onClick={Create_Event_Fun}>
        Click Here to Add Event
      </button>
      {events.length > 0 && (
        <div className="event-list">
          <h2> My Created Event List </h2>
          <div className="event-cards">
            {/* Rest of the event cards logic... */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEventModal;
