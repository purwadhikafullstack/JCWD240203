const EventCalendar = [
    { title: "Blocked", start: getFormattedDate("YEAR-MONTH-02"), className: "blocked-date" },
    { title: "Blocked", start: getFormattedDate("YEAR-MONTH-05"), className: "blocked-date" },
    { title: "Blocked", start: getFormattedDate("YEAR-MONTH-11"), className: "blocked-date" },
    { title: "All Day Event", start: getFormattedDate("YEAR-MONTH-01") },
    {
        title: "Long Event",
        start: getFormattedDate("YEAR-MONTH-07"),
        end: getFormattedDate("YEAR-MONTH-10")
    },
    {
        groupId: "999",
        title: "Repeating Event",
        start: getFormattedDate("YEAR-MONTH-09T16:00:00+00:00")
    },
    {
        groupId: "999",
        title: "Repeating Event",
        start: getFormattedDate("YEAR-MONTH-16T16:00:00+00:00")
    },
    {
        title: "Conference",
        start: getFormattedDate("YEAR-MONTH-17"),
        end: getFormattedDate("YEAR-MONTH-19")
    },
    {
        title: "Meeting",
        start: getFormattedDate("YEAR-MONTH-18T10:30:00+00:00"),
        end: getFormattedDate("YEAR-MONTH-18T12:30:00+00:00")
    },
    { title: "Lunch", start: getFormattedDate("YEAR-MONTH-18T12:00:00+00:00") },
    { title: "Birthday Party", start: getFormattedDate("YEAR-MONTH-19T07:00:00+00:00") },
    { title: "Meeting", start: getFormattedDate("YEAR-MONTH-18T14:30:00+00:00") },
    { title: "Happy Hour", start: getFormattedDate("YEAR-MONTH-18T17:30:00+00:00") },
    { title: "Dinner", start: getFormattedDate("YEAR-MONTH-18T20:00:00+00:00") }

];

function getFormattedDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
        month = "0" + month;
    }

    return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default EventCalendar;
