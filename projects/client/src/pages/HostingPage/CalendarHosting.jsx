
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

export default function CalendarHosting(props) {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const roomDetails = location.pathname === `/room-details/${id}`;
  const editPrice = location.pathname === "/dashboard-edit-price";

  const [now, setNow] = useState({
    date: 0,
    month: 0,
    year: 0,
  });
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [listMonth, setListMonth] = useState([
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    onCreateCalendar();
  }, []);

  let onCreateCalendar = async (
    btn,
    year1 = new Date().getUTCFullYear(),
    month1 = new Date().getMonth() + 1
  ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}transaction/rates?room_id=${id}`
      );
      const rates = response.data.data;

      if (btn === "+") {
        // Increment month and handle dates
        // Modify this part based on your specific requirements
        // ...
      } else if (btn === "-") {
        // Decrement month and handle dates
        // Modify this part based on your specific requirements
        // ...
      } else {
        // Set initial calendar data for the current month
        const dates = rates.map((rate) => ({
          date: parseInt(rate.date.split("-")[2]),
          month: parseInt(rate.date.split("-")[1]),
          year: parseInt(rate.date.split("-")[0]),
          discount: rate.discount,
        }));
        setYear(year1);
        setMonth(month1);
        setDays(dates);
        setNow({
          date: new Date().getDate(),
          month: month1,
          year: year1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <HeaderProperty/>
      {/* Room Details */}
      {roomDetails && (
        <div className="bg-red-300 w-[300px] h-[402px] absolute top-[240px] bg-white w-max h-96 left-[-10px] md:left-[-35px] border border-gray-300 rounded-lg shadow-md p-[24px] z-[1045]">
          <h1 className="text-3xl font-bold mb-3">Calendar</h1>
          <h5 className="text-lg font-medium mb-3">
            {year} - {listMonth[month]}
          </h5>
          <div>
            <div className="grid grid-cols-7 gap-3 px-10 h-[230px]">
              {days
                ? days.map((value) => {
                    return (
                      <div key={value.date} className="cursor-pointer w-fit">
                        <div
                          className={
                            new Date(
                              `${year}-${month}-${value.date}`
                            ).getTime() /
                              86400000 >=
                            new Date(
                              `${props?.startDate?.year}-${props?.startDate?.month}-${props?.startDate?.date}`
                            ).getTime() /
                              86400000 &&
                            new Date(
                              `${year}-${month}-${value.date}`
                            ).getTime() /
                              86400000 <=
                            new Date(
                              `${props?.endDate?.year}-${props?.endDate?.month}-${props?.endDate?.date}`
                            ).getTime() /
                              86400000
                              ? "border-b-2 border-red-700 cursor-pointer"
                              : value.date < props?.startDate?.date &&
                                month <= props?.startDate?.month &&
                                year <= props?.startDate?.year
                              ? "text-gray-500 cursor-pointer"
                              : null
                          }
                          onClick={
                            value.date < now.date &&
                            month <= now.month &&
                            year <= now.year
                              ? null
                              : () =>
                                  props.funct(value.date, month, year, days)
                          }
                        >
                          <div
                            className={
                              value.date < now.date &&
                              month <= now.month &&
                              year <= now.year
                                ? "text-sm text-center text-gray-200"
                                : "text-sm text-center"
                            }
                          >
                            {value?.date}
                          </div>
                          <div
                            className={
                              value.date < now.date &&
                              month <= now.month &&
                              year <= now.year
                                ? "text-xs text-gray-200"
                                : value?.discount
                                ? "text-xs text-green-500"
                                : value?.markup
                                ? "text-xs text-red-500"
                                : "text-xs opacity-50"
                            }
                          >
                            {value?.discount
                              ? (
                                  props?.details?.[0]?.price -
                                  (props?.details?.[0]?.price *
                                    (value?.discount / 100))
                                )
                                  .toString()
                                  .slice(0, 3)
                              : value?.markup
                              ? (
                                  props?.details?.[0]?.price +
                                  (props?.details?.[0].price *
                                    (value?.markup / 100))
                                )
                                  .toString()
                                  .slice(0, 3)
                              : props?.details?.[0]?.price
                                  .toString()
                                  .slice(0, 3)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="py-3">
              <button
                disabled={month === now.month && year === now.year}
                onClick={() => onCreateCalendar("-")}
                type="button"
                className={
                  month === now.month && year === now.year
                    ? "py-1 px-2 mr-2 mb-2 text-xs font-xs text-gray-500 focus:outline-none rounded-full border bg-gray-300"
                    : "py-1 px-2 mr-2 mb-2 text-xs font-xs text-black-900 focus:outline-none bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-white-700 dark:focus:ring-white-700"
                }
              >
                Prev
              </button>
              <button
                onClick={() => onCreateCalendar("+")}
                type="button"
                className="py-1 px-2 mr-2 mb-2 text-xs font-xs text-black-900 focus:outline-none bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-white-700 dark:focus:ring-white-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Price */}
      {editPrice && (
        <div className="side-box-card bg-red-300 w-[300px] ">
          <h1 className="text-3xl font-bold mb-3">Calendar</h1>
          <h5 className="text-lg font-medium mb-3">
            {year} - {listMonth[month]}
          </h5>
          <div>
            <div className="grid grid-cols-7 gap-3 px-10 h-[230px]">
              {days
                ? days.map((value) => {
                    return (
                      <div key={value.date} className="cursor-pointer w-fit">
                        <div
                          className={
                            new Date(
                              `${year}-${month}-${value.date}`
                            ).getTime() /
                              86400000 >=
                            new Date(
                              `${props?.startDate?.year}-${props?.startDate?.month}-${props?.startDate?.date}`
                            ).getTime() /
                              86400000 &&
                            new Date(
                              `${year}-${month}-${value.date}`
                            ).getTime() /
                              86400000 <=
                            new Date(
                              `${props?.endDate?.year}-${props?.endDate?.month}-${props?.endDate?.date}`
                            ).getTime() /
                              86400000
                              ? "border-b-2 border-red-700 cursor-pointer"
                              : value.date < props?.startDate?.date &&
                                month <= props?.startDate?.month &&
                                year <= props?.startDate?.year
                              ? "text-gray-500 cursor-pointer"
                              : null
                          }
                          onClick={
                            value.date < now.date &&
                            month <= now.month &&
                            year <= now.year
                              ? null
                              : () =>
                                  props.funct(value.date, month, year, days)
                          }
                        >
                          <div
                            className={
                              value.date < now.date &&
                              month <= now.month &&
                              year <= now.year
                                ? "text-sm text-center text-gray-200"
                                : "text-sm text-center"
                            }
                          >
                            {value?.date}
                          </div>
                          <div
                            className={
                              value.date < now.date &&
                              month <= now.month &&
                              year <= now.year
                                ? "text-xs text-gray-200"
                                : value?.discount
                                ? "text-xs text-green-500"
                                : value?.markup
                                ? "text-xs text-red-500"
                                : "text-xs"
                            }
                          >
                            {value?.discount
                              ? (
                                  props?.details?.[0]?.price -
                                  (props?.details?.[0]?.price *
                                    (value?.discount / 100))
                                )
                                  .toString()
                                  .slice(0, 3)
                              : value?.markup
                              ? (
                                  props?.details?.[0]?.price +
                                  (props?.details?.[0].price *
                                    (value?.markup / 100))
                                )
                                  .toString()
                                  .slice(0, 3)
                              : props?.details?.[0]?.price
                                  .toString()
                                  .slice(0, 3)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="py-3">
              <button
                disabled={month === now.month && year === now.year}
                onClick={() => onCreateCalendar("-")}
                type="button"
                className={
                  month === now.month && year === now.year
                    ? "py-1 px-2 mr-2 mb-2 text-xs font-xs text-gray-500 focus:outline-none  rounded-full border bg-gray-300"
                    : "py-1 px-2 mr-2 mb-2 text-xs font-xs text-black-900 focus:outline-none bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-white-700 dark:focus:ring-white-700"
                }
              >
                Prev
              </button>
              <button
                onClick={() => onCreateCalendar("+")}
                type="button"
                className="py-1 px-2 mr-2 mb-2 text-xs font-xs text-black-900 focus:outline-none bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-white-700 dark:focus:ring-white-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}




