import React, { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./PreviewListingModal.css";

export default function PreviewListingModal(props) {
  const modalRef = useRef();

  const handleClose = () => {
    if(props?.onClose) {props?.onClose()}
  };

  useEffect(() => {
    // Add the modal-entering class to the modal container after a short delay to trigger the animation
    const timer = setTimeout(() => {
      modalRef.current.classList.add("modal-entering");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${(props?.showModal)? '' : 'hidden'} flex justify-center items-center w-full h-full top-0 absolute z-30 bg-gray-300/80`}>
      <div
        ref={modalRef}
        className="w-[900px] h-full bg-white rounded-[10px] p-[10px] drop-shadow-xl overflow-y-auto mobileScroll removeScroll"
      >
        <div className="flex w-full justify-between border-b-[1px] border-black">
          <div className="previewListing font-extrabold text-[24px] text-start">
            🏡 Preview Listing:
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="w-full h-[500px]">
            <img
              src="https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/26dffe9b-d506-4229-ae3b-a2b6ddc0fee0.jpeg?im_w=1200"
              alt="foto property"
              className="w-full h-full"
            />
        </div>
        <div className="detailPreview text-gray-800">
          <div className="flex flex-col items-start">
            <div className="propsTitle text-[23px] text-left font-bold">
              1 Bedroom Villa with Private Pool for 2 Pax
            </div>
            <div className="listingdesc text-[18px] text-left">
              One Bedroom Villas for 2 pax is one type of our villa that can accommodate up to 2 person and free 1 child under 5 years old. It has a private pool right in front of the bedroom. It is suitable for you who want to spend your time with your best friend or your loved one.
            </div>
            <div className="listType text-[18px] text-left ">
              Villa
            </div>
            <div className="totalroom text-[18px] text-left ">
              5 rooms
            </div>
            <div className="roomsdesc text-[18px] text-left ">
              A villa with a king sized bed.
            </div>
            <div className="totalguests text-[18px] text-left ">
              Max. 3 person
            </div>
            <div className="nightlyprice text-[18px] text-left">
              Rp1895000 per night
            </div>
            <div className="locbox text-[18px] text-left ">
              ID/Yogyakarta
            </div>
            <div className="addDetails text-[18px] text-left">
              Jl. Kaya Raya UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta
            </div>
            <div className="amenitiesListing text-[18px] text-left">
              Pool, Wifi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
