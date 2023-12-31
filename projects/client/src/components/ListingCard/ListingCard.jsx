import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineEllipsis } from "react-icons/ai";
import './ListingCard.css';

export default function ListingCard(props) {
    const [showMenu, setShowMenu] = useState(false);
    const onMenuClick = () => {setShowMenu(!showMenu)};

    const showDeleteModal = (value) => {
        setShowMenu(false);
        if(props?.setShowModal) {props?.setShowModal(true)};
        if(props?.setSelectedProperty) {props?.setSelectedProperty(value)}
    };

    return (
      <div className="flex flex-col h-full w-full bg-gray-200 rounded-[10px] cursor-pointer">
          <div className="relative flex w-full h-[20px] justify-end items-center cursor-pointer">
            <Link to={`/property/${props?.data?.id}`} className="w-full h-full">
                &nbsp;
            </Link>
            <div onClick={onMenuClick} className={`${(props?.setShowModal)? 'h-full px-[5px]' : 'hidden'}`}>
              <AiOutlineEllipsis size={20}/>
            </div>
            <div className={`${(showMenu)? 'w-[75px] h-[75px] z-[10] border-gray-600' : 'w-[75px] h-0 z-[-1] border-transparent'} flex flex-col transition-all duration-400 whitespace-nowrap absolute bg-white top-[20px] md:right-[-20px] border-[1px] rounded-[5px] overflow-hidden`}>
                <Link to={`/hostings/updateproperty/${props?.data?.id}`} className="flex items-center justify-center flex-1 bg-white transition-all duration-300 hover:bg-gray-400">
                    Edit
                </Link>
                <div className="w-full h-[1px] bg-black">&npsb;</div>
                <div onClick={() => showDeleteModal(props?.data)} className="flex items-center justify-center flex-1 bg-white transition-all duration-300 hover:bg-gray-300">
                    Delete
                </div>
            </div>
          </div>
          <Link to={`/property/${props?.data?.id}`} className="w-full px-[10px]">
              {
                  (props?.data?.propertyimages?.length > 0)?
                  <img src={props?.data?.propertyimages[0]?.url} alt="" className="w-full h-[150px] md:h-[175px] rounded-[10px]" />
                  :
                  <img src={`${process.env.REACT_APP_API_IMG_URL}/Default/DefaultProperty.png`} alt="" className="w-full h-[150px] md:h-[175px] rounded-[10px]" />
              }
          </Link>
          <Link to={`/property/${props?.data?.id}`} className="flex flex-col w-full items-start gap-[5px] h-full px-[10px] py-[5px]">
              <div className="font-bold text-start text-[12px] sm:text-[14px]">
                  {props?.data?.name || 'name'}
              </div>
              <div className="w-full flex mt-auto justify-between py-[5px]">
                  <div className="listingDesc text-start text-[14px]">
                      {props?.data?.category?.type || 'type'}
                  </div>
                  <div className="text-start text-[14px]">
                      <div className="flex gap-[5px] items-center justify-center">
                          <AiFillStar size={20}/> {props?.data?.average}
                      </div>
                  </div>
              </div>
          </Link>
      </div>
    );
};