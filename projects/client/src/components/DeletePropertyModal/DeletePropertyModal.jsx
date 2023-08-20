import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./DeletePropertyModal.css";
import { Button } from "@mui/material";

export default function DeletePropertyModal(props) {
  const handleClose = () => {
    if(props?.setShowModal) {props?.setShowModal(false)};
  };

  const formatName = (value) => {
    if(value.length > 20) {
      let formatted = value.substring(0, 16);
      formatted += '...';
      return formatted;
    }
    return value;
  };

  const deleteProperty = () => {
    if(props?.setReload) {props?.setReload(props?.reload + 1)};
    handleClose();
  };

  return (
    <div className={`${(props?.showModal)? '' : 'hideContainer'} w-full h-full top-0 left-0 right-0 absolute z-50 overflow-y-hidden`}>
      <div className={`${(props?.showModal)? 'modal-entering' : 'modal-exiting'} flex justify-center items-center w-full h-full bg-gray-300/80`}>
        <div className="relative bg-white w-[300px] h-[200px] px-[10px] py-[5px] rounded-[10px]">
            <div className="absolute top-[5px] right-[5px] cursor-pointer" onClick={handleClose}>
              <CloseIcon />
            </div>
            <div className="flex flex-col w-full h-full gap-[15px] justify-center">
              <div className="headerText font-extrabold text-[18px] mx-auto">
                Delete property: <span>{formatName(props?.property?.name || '')}</span>
              </div>
              <div className="mx-auto text-[14px] text-gray-600">
                This action is irreversible
              </div>
              <div className="flex w-full justify-center gap-[20px]">
                  <Button size="small" variant="contained"  color="success">
                      Cancel
                </Button>
                  <Button onClick={deleteProperty} size="small" variant="contained"  color="error">
                      Delete
                  </Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
