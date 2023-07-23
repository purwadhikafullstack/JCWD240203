export default function TransactionCard(props) {
    return(
        <div className="flex justify-between">
            <div className="w-[150px] h-[125px]">
                <img src="" alt="" className="w-full h-full bg-black"/>
            </div>
            <div className="flex flex-col text-start flex-1 gap-[15px] p-[10px]">
                <div>
                    name
                </div>
                <div>
                    room
                </div>
                <div>
                    address
                </div>
            </div>
            <div className="flex flex-col text-start flex-1 gap-[15px] p-[10px]">
                <div>
                    price/night
                </div>
                <div>
                    night spent
                </div>
                <div className="mt-auto">
                    grand total
                </div>
            </div>
            <div className="flex justify-center items-center flex-1 p-[10px]">
                <div>
                    Action
                </div>
            </div>
        </div>
    )
}