import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import SidebarCalendar from "../../components/SidebarCalendar/SidebarCalendar";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import Footer from "../../components/footerRentify/footerPage";
import { isSameDay } from "date-fns"; // Import the isSameDay function

export default function CalendarHosting() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

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

  return (
    <div className="h-full w-full">
      <HeaderProperty />
      <div className="flex justify-between my-[30px]">
        <div className="w-full">
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <ThreeDots />
            </div>
          ) : (
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              themeSystem="simplex"
              plugins={[dayGridPlugin]}
              events={events}
              eventContent={renderEventContent}
            />
          )}
        </div>
        <div>
          <SidebarCalendar onEventCreate={handleEventCreate} events={events} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

