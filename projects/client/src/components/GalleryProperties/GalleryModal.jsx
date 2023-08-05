import { AiOutlineClose } from "react-icons/ai";

export default function GalleryModal(props) {
    const onClose = () => {
        if(props?.setShowAllPhotos) {props?.setShowAllPhotos(false)}
    }

    return(
        <div className={`${(props?.showAllPhotos)? 'absolute' : 'hidden'} top-0 w-full h-[100vh] bg-white/70 z-50 overflow-y-auto removeScroll py-[20px]`}>
            <div onClick={onClose} className="absolute top-[10px] right-[10px] cursor-pointer">
                <AiOutlineClose size={40}/>
            </div>
            <div className="text-[30px] font-bold mb-[20px]">
                All Photos
            </div>
            <div className="w-full flex justify-center">
                <div className='columns-1 md:columns-2 break-inside-avoid gap-[30px]'>
                {props?.images?.map((obj, index) => (
                    <div key={index} className='w-[500px] h-[400px] border-[1px] border-black mb-[20px]'>
                    <img src={obj.url} alt='' className='w-full h-full rounded-[10px]'/>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}