import React, { useState } from "react";
import { FcPlus } from "react-icons/fc";

export default function SidebarCalendar({ onEventCreate }) {
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: null,
        end: null,
    });

    const [blockedDates, setBlockedDates] = useState([]);
    const [selectedBlockedDate, setSelectedBlockedDate] = useState(null);

    const handleCreateEvent = () => {
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: value,
        });
    };

    const handleSaveEvent = () => {
        onEventCreate(newEvent);
        setShowModal(false);
        setNewEvent({
            title: "",
            start: null,
            end: null,
        });
    };

    const handleBlockDate = (date) => {
        setBlockedDates((prevDates) => [...prevDates, date]);
    };

    const isDateBlocked = (date) => {
        return blockedDates.some((blockedDate) => blockedDate === date);
    };

    return (
        <aside className="border p-5 w-64 relative"> {/* Add relative positioning */}
            <div>
                <div className="rounded-[10px] py-2 px-4 text-left border-gray-200 hover:border-black text-[18px] border-2 mb-4">
                    Pricing
                </div>
            </div>
            <div>
                {/* Price per night */}
                <div className="rounded-[13px] py-10 px-2 mb-6 border-2 border-gray-200">
                    <div className="px-2 my-2">
                        <h2 className="text-lg font-semibold text-left">Price per night</h2>
                    </div>
                    <div className="text-left px-2">
                        <span className="text-black text-2xl font-bold">Rp1,895,000</span>
                    </div>

                    <div>
                        <button className="exploreButton w-full mt-2 py-[4px] text-2xl font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
                            edit
                        </button>
                    </div>
                </div>

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

                {/* Discounts */}
                <div className="rounded-[13px] py-10 px-2 mb-6 border-2 border-gray-200">
                    <div className="px-2 my-2 ">
                        <h1 className="text-xl font-semibold text-left">Discounts</h1>
                        <h2 className="text-base text-left"> Adjust your pricing to attract more guests.</h2>
                    </div>
                    <div className="text-left px-2">
                        <div>
                            <span className="text-black text-xl underline underline-offset-4 ">Weekend</span>
                        </div>
                        <div>
                            <span className="text-black text-4xl font-bold ">10%</span>
                        </div>
                    </div>
                </div>
            </div>
      {/* Block Dates */}
      <div className="rounded-[13px] py-10 px-2 mb-6 border-2 border-gray-200">
        <div>
          <h2 className="text-lg font-semibold">Block Dates</h2>
        </div>
        <div>
          {blockedDates.map((date) => (
            <button
              key={date}
              className={`${
                isDateBlocked(date) ? "bg-black text-white" : "bg-white text-black"
              } w-full mt-2 py-[4px] text-2xl font-sans rounded-[10px] border-solid border-2 border-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl`}
              onClick={() => setSelectedBlockedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
        {/* Show selected blocked date */}
        {selectedBlockedDate && (
          <div className="mt-4 p-2 bg-gray-100 rounded-lg">
            <div className="text-center font-semibold">Selected Blocked Date</div>
            <div className="text-center mt-2">{selectedBlockedDate}</div>
            <div className="text-center mt-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setSelectedBlockedDate(null)}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
            {/* Modal content and form */}
            {showModal && (
                <div className="fixed inset-0 bg-opacity-50 bg-black flex items-center justify-center">
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
                        {/* Add other input fields for event start and end dates */}
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
