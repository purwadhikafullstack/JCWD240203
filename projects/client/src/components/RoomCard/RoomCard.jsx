export default function RoomCard(props) {
    const handleClick = (value) => {if(props?.setSelectedRoom) {props?.setSelectedRoom(value)}};

    return(
        <div className="flex w-full bg-gray-200 p-[10px] rounded-[10px] justify-between h-auto md:h-[125px]">
            <div className="flex flex-col items-start text-start gap-[5px] justify-center">
                <div className="text-[22px] md:text-[24px] font-bold">
                    {props?.data?.name} 
                </div>
                <div>
                    Room capacity: {props?.data?.capacity}
                </div>
                <div>
                    {props?.data.description}
                </div>
            </div>
            <div className="flex flex-col gap-[20px] justify-center items-end">
                <div className="text-[24px] font-bold">
                    Rp.{props?.data?.price?.toLocaleString('ID-id')}
                </div>
                <div>
                    <button onClick={() => handleClick(props?.data)} className="w-[100px] h-[40px] bg-green-500 rounded-[5px] transition-all duration-400 hover:bg-green-600 active:bg-green-700 active:scale-95 cursor-pointer">
                        Select room
                    </button>
                </div>
            </div>
        </div>
    )
}