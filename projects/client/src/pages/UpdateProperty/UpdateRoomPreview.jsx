import { AiOutlineClose } from "react-icons/ai";

export default function UpdateRoomPreview(props) {
    const onDelete = () => {
        if(props?.setRooms) {
            let temp = [...props?.rooms];
            temp.splice(props?.index, 1);
            props?.setRooms(temp);
        }
    }
//${(props?.data?.id)? 'hidden' : ''}
    return(
        <div className="relative w-full h-full border-[1px] border-black rounded-[5px] transition-all duration-200 hover:bg-gray-300 cursor-pointer">
            <div onClick={onDelete} className={`absolute z-[2] right-[1px] top-[1px] cursor-pointer`}>
                <AiOutlineClose/>
            </div>
            <div onClick={() => {if(props?.handleRoomClick) props?.handleRoomClick(props?.data, props?.index)}} className="flex flex-col w-full h-full px-[10px] py-[5px]">
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
        </div>
    )
}