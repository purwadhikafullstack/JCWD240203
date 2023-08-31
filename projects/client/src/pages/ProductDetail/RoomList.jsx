import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getPropertyRoom } from "../../redux/features/room/roomSlice";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import './ProductDetail.css'

export default function RoomList({roomLoading, setRoomLoading, setSelectedRoom, propertyId, start, end}) {
    const rooms = useSelector((state) => state.room.rooms);
    const call = useDispatch();

    useEffect(() => {
        if(roomLoading) {
            call(getPropertyRoom({
                propertyId: propertyId,
                start: start,
                end: end
            })).then(
                () => {setRoomLoading(false)},
                (error) => {console.log(error)}
            )
        }
    }, [call, roomLoading, propertyId]);

    return (
        <div className="features flex flex-col z-[50] w-full min-h-full gap-[20px] justify-center">
            {
                (roomLoading)?
                <div className="flex justify-center items-center w-full h-full">
                    <div className="w-[50px] h-[50px]">
                        <SpinnerLoading/>
                    </div>
                </div>
                :
                rooms?.map((value, index) => {
                    return(
                        <div key={index} className="w-full">
                            <RoomCard data={value} setSelectedRoom={setSelectedRoom}/>
                        </div>
                    )
                })
            }
        </div>
    )
}