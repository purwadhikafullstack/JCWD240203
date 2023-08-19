import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./PreviewListingModal.css";

export default function DeletePropertyModal(props) {

  const handleClose = () => {
    if(props?.setShowModal) {props?.setShowModal(!showModal)}
  };

  // const timer = setTimeout(() => {
  //   modalRef.current.classList.add("modal-entering");
  // }, 100);
  // return () => clearTimeout(timer);

  return (
    <div className={`${(props?.showModal)? 'modal-entering' : 'hidden'} flex justify-center items-center w-full h-full top-0 absolute z-50 bg-gray-300/80`}>
      <div className="relative bg-white w-[450px] h-[400px] px-[10px] py-[5px]">
          <div className="absolute top-0 left-0 cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </div>
          <div className="headerText font-extrabold text-[22px] text-start mx-auto">
            Delete property <span>{props?.name}</span>
          </div>
          <div className="mx-auto text-[16px]">
            This action is irreversible
          </div>
          <div className="flex w-full justify-center">
            <button>Cancel</button>
            <button>Delete</button>
          </div>
      </div>
    </div>
  );
}
