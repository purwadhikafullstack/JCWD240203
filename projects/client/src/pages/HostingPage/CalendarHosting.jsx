import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventCalendar from "./EventCalendar";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import SidebarCalendar from "../../components/SidebarCalendar/SidebarCalendar";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import Footer from "../../components/footerRentify/footerPage";

export default function CalendarHosting() {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate some loading time (replace this with actual data fetching if needed)
    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(false); // Set isLoading to false once the component has loaded
        }, 2000);

        return () => clearTimeout(delay);
    }, []);

    return (
        <main className="flex justify-between my-[30px]">
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
                        events={EventCalendar}
                    />
                )}
            </div>
            <div>
                <SidebarCalendar />
            </div>
        </main>
    );
}

