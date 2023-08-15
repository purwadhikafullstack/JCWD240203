export default function HoverProfileCard(props) {
    return (
        <div className="flex flex-col w-full h-full border-[1px] border-gray-600 px-[10px] py-[5px] rounded-[10px] bg-white">
            <div className="flex w-full justify-center">
                {
                    (props?.data?.profilePicture) ? 
                    <div className="relative h-[35px] w-[35px] overflow-hidden">
                        <img
                            alt=""
                            src={props?.data?.profilePicture}
                            className="rounded-full w-[35px] h-[35px]"
                        />
                    </div>
                    :
                    <div className="relative h-[35px] w-[35px] overflow-hidden">
                        <img
                            alt=""
                            src={`${process.env.REACT_APP_API_BASE_URL}/Default/DefaultProfile.png`}
                            className="rounded-full w-[35px] h-[35px]"
                        />
                    </div>
                }
            </div>
            <div className="flex w-full justify-center">
                {props?.data?.username}
            </div>
            <div className="flex w-full h-full items-center justify-center text-[12px]">
                {props?.data?.desc || 'N/A'}
            </div>
        </div>
    )
}