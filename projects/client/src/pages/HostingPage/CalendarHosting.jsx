import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import SidebarCalendar from "../../components/SidebarCalendar/SidebarCalendar";
import { isSameDay } from "date-fns"; // Import the isSameDay function

export default function CalendarHosting() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);

  // Simulate some loading time (replace this with actual data fetching if needed)
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false once the component has loaded
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  const handleEventCreate = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const getSpecialPrice = (date) => {
    const event = events.find(
      (event) => isSameDay(event.start, date) || isSameDay(event.end, date)
    );
    return event ? event.specialPrice : null;
  };

  const selectedDates = (e) => {
    console.log(e);
  }

  // {
  //   id: 'a',
  //   title: 'my event',
  //   start: '2023-08-08'
  // }
  // dayRender={(info) => {
  //   if (isSameDay(info.date, new Date())) {
  //     info.el.style.backgroundColor = "red"; // Example: change color of today's date to red
  //   }
  //   if (blockedDates.some((date) => isSameDay(date, info.date))) {
  //     info.el.style.backgroundColor = "black"; // Change color of blocked dates to black
  //     info.el.style.color = "white";
  //   }
  // }}
  // header={{
  //   left: "prev,next",
  //   center: "title",
  //   right: "dayGridMonth,timeGridWeek,timeGridDay",
  // }}

  return (
    <div className="flex flex-col md:flex-row md:h-full w-full px-[5px] py-[10px] gap-[10px]">
        {isLoading ?
          <div className="w-full h-[500px] md:h-full flex items-center justify-center">
            <ThreeDots />
          </div>
         :
          <div className="w-full h-[500px] md:h-full ">
            <FullCalendar
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth",
              }}
              height="100%"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              events={events}
              selectable={true}
              longPressDelay={100}
              selectLongPressDelay={100}
              select={selectedDates}
            />
          </div>
        }
        <div className="flex w-full md:w-auto md:h-full items-center justify-center">
          <SidebarCalendar
            onEventCreate={handleEventCreate}
            events={events}
          />
        </div>
    </div>
  );
}
