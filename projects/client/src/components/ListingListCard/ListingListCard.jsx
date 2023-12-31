import { Link } from "react-router-dom";

export default function ListingListCard(props) {
    return (
        <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="w-full md:w-[380px] px-[10px] py-[10px]">
                <div className="flex h-full items-center justify-center gap-2">
                    <div className="w-full h-[250px] md:w-[100px] md:h-[72px]">
                        {
                            (props?.data?.propertyimages?.length > 0)?
                            <img src={props?.data?.propertyimages[0]?.url} alt="" className="w-full h-full" />
                            :
                            <img src={`${process.env.REACT_APP_API_IMG_URL}/Default/DefaultProperty.png`} alt="" className="w-full h-full" />
                        }
                    </div>
                    <div className="flex flex-col md:w-[280px] md:h-[72px] gap-[20px] justify-center">
                        <div className="text-left text-[16px] w-full font-bold ">
                            {props?.data?.name || ''}
                        </div>
                        <div className="md:hidden text-start w-full font-bold">
                            Status: {props?.data?.status || ''}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex text-left items-center w-full md:w-[200px] px-[10px] py-[10px] font-bold ">
                {props?.data?.status || ''}
            </div>
            <div className="flex w-full md:w-[275px] items-center px-[8px] py-[10px] font-bold text-left text-[14px]">
                {props?.data?.address || ''}
            </div>
            <div className="flex md:flex-col gap-[30px] w-full md:w-auto justify-center">
                <Link to={`/hostings/events/${props?.data?.id}`} className="text-[18px] flex text-white justify-center items-center font-sans h-[45px] w-[125px] rounded-[20px] font-bold bg-green-800/50 cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl hover:bg-green-800/70 py-">
                    ✏️ pricing
                </Link>
            </div>
        </div>
    )
}