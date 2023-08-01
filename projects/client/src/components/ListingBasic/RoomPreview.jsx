import { AiOutlineClose } from "react-icons/ai";

export default function RoomPreview(props) {
    const onDelete = () => {
        if(props?.setRooms) {
            let temp = [...props?.rooms];
            temp.splice(props?.index, 1);
            props?.setRooms(temp);
        }
    }

    return(
        <div className="relative flex flex-col w-full h-full border-[1px] border-black rounded-[5px] px-[10px] py-[5px]">
            <div onClick={onDelete} className="absolute right-0 top-0 cursor-pointer">
                <AiOutlineClose/>
            </div>
            <div className="text-[18px] text-center w-full font-bold">
                {props?.data?.name}
            </div>
            <div className="text-[14px]">
                Total room: {props?.data?.stock}
            </div>
            <div className="text-[14px]">
                Room capacity: {props?.data?.capacity}
            </div>
            <div className="flex w-full h-full overflow-y-auto mobileScroll text-[16px]">
                {props?.data?.description}
            </div>
            <div>
                Price: Rp. {props?.data?.price?.toLocaleString('ID-id')}/night
            </div>
        </div>
    )
}