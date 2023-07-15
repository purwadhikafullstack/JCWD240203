export default function LocationSelection(props) {
    return(
        <div className={`${(props.location)? 'h-[350px]' : 'h-[0px] border-transparent'} z-[2] top-0 border-b-[1px] border-black absolute transition-all duration-400 w-full bg-gray-300 whitespace-nowrap overflow-hidden`}>
            <div>
                Locations
            </div>
            <div className="grid grid-cols-4 px-[10px] py-[10px] gap-[10px] overflow-y-auto h-[325px] removeScroll">
                <div className="flex flex-col transition-all duration-400 hover:bg-gray-500 active:bg-gray-600 px-[10px] items-start justify-center w-full h-[50px] border-[1px] border-gray-700 rounded-[10px]">
                    <div className="font-bold">
                        Bandung
                    </div>
                    <div className="text-[12px]">
                        West Java, Indonesia
                    </div>
                </div>
            </div>
        </div>
    )
}