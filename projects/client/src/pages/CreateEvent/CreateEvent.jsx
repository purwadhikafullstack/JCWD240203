import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import Sidebar from "./Sidebar";
import { format } from "date-fns"; // Import the isSameDay function
import { useNavigate, useParams } from "react-router-dom";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import Footer from "../../components/footerRentify/footerPage";
import { useDispatch, useSelector } from "react-redux";
import { createPrice, getPropertyDetail } from "../../redux/features/property/propertySlice";
import { toast } from "react-hot-toast";

export default function CreateEvent() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [property, setProperty] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventStart, setEventStart] = useState(null);
  const [eventEnd, setEventEnd] = useState(null);
  const [percentage, setPercentage] = useState(1);
  const [type, setType] = useState('Discount');
  const navigate = useNavigate();
  const call = useDispatch();
  const params = useParams();

  // Trigger Variable for useEffect //
  const [trigger, setTrigger] = useState(false);
  
  const formatDate = (date) => {
    return format(date, "MM-dd-yyyy");
  };
  
  const onSelectedDates = (e) => {
    setEventStart(formatDate(e.start));
    setEventEnd(formatDate(e.end));
  };

  const onUnselectDates = () => {
    setEventStart(null);
    setEventEnd(null);
  };

  const onDateSelect = () => {
    if(Object.keys(selectedRoom)?.length <= 0) {
      toast.error('Room must be selected !', {id: 'disableFullCalendar'});
      return false;
    }
    else {
      return true;
    }
  };

  const onCreateEvent = async() => {
    setIsSubmitting(true);
    const toastLoading = toast.loading('Creating event ...', {id: 'creatingEventToast'});
    const user = JSON.parse(localStorage.getItem('user'));
    if(selectedRoom.id && type && percentage && eventStart && eventEnd) {
      await call(createPrice({
        userId: user.id,
        idCard: user.idCard,
        token: user.token,
        roomId: selectedRoom.id,
        type: type,
        percentage: percentage,
        start: eventStart,
        end: eventEnd
      })).then(
        () => {
          toast.success('Event created !', {id: toastLoading});
          setTrigger(!trigger);
        }, 
        (error) => {
          toast.error('Network error !', {id: toastLoading});
          console.log(error);
        }
      );
    }
    else {
      toast.error('Incomplete data !', {id: toastLoading})
    }
    setIsSubmitting(false)
  };
  
  useEffect(() => {
    if(localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      call(getPropertyDetail({userId: user.id, propertyId: params.id, token: user.token})).then(
        (response) => {
          setProperty(response.data.data);
          if(Object.keys(selectedRoom).length > 0) {
            setSelectedRoom(response.data.data.rooms.find((value) => {if(value.id === selectedRoom.id) return value}));
          }
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      )
    }
    else {
      navigate('/');
    }
  }, [call, currentUser, trigger]);

  useEffect(() => {
    if(Object.keys(selectedRoom)?.length > 0) {
      let tempEvent = [];
      selectedRoom?.prices?.forEach((value) => {
        tempEvent.push({id: value.id, title: `${value.percentage}% ${value.type}`, start: value.start, end: value.end});
      });
      setEvents(tempEvent);
    }
  }, [selectedRoom]);

  return (
    <div className="flex flex-col w-full h-[100vh] overflow-y-auto removeScroll">
      <HeaderProperty/>
      <div className="flex flex-col md:flex-row w-full flex-grow gap-[10px] p-[10px]">
        {loading ?
          <div className="flex flex-grow items-center justify-center min-h-[500px] md:min-h-full h-full">
            <ThreeDots /> 
          </div>
         :
          <div className="flex flex-grow min-h-[500px] md:min-h-full h-full">
            <div className="w-full h-full">
              <FullCalendar
                headerToolbar={{
                  left: "prev",
                  center: "title",
                  right: "next"
                }}
                height="100%"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                events={events}
                selectable={true}
                selectAllow={onDateSelect}
                longPressDelay={100}
                selectLongPressDelay={100}
                select={onSelectedDates}
                unselect={onUnselectDates}
                unselectAuto={false}
                validRange={
                  {
                    start: new Date(),
                    end: new Date(new Date().getFullYear(), 12, 0)
                  }
                }
              />
            </div>
          </div>
        }
        <div className="inline-block w-full md:w-[275px] h-full flex items-center justify-center">
            <Sidebar
              eventStart={eventStart}
              eventEnd={eventEnd}
              percentage={percentage}
              setPercentage={setPercentage}
              type={type}
              setType={setType}
              property={property}
              setLoading={setLoading}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              onCreateEvent={onCreateEvent}
              isSubmitting={isSubmitting}
            />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
