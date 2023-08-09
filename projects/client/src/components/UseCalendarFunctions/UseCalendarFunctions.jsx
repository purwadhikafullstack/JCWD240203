import { useState } from "react";
import { addDays, isSameDay } from "date-fns";

export default function useCalendarFunctions(events) {
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
      // Add your custom logic here, e.g., onEventCreate(event)
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

  return {
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
  };
}
