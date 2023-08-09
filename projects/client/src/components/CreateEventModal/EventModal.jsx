import React from "react";
import Modal from "react-modal";

const EventModals = ({
  isModalOpen,
  isUpdateModalOpen,
  eventName,
  specialPrice,
  Event_Data_Update,
  Update_Event_Fun,
  CloseUpdateModal,
  Update_Special_Price,
  setIsModalOpen,
}) => {
  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "300px",
      maxHeight: "80vh",
      overflow: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <>
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={CloseUpdateModal}
        contentLabel="Update Event Title"
        style={customModalStyles}
      >
        <h2>Update Event Title</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={Event_Data_Update}
        />
        <button className="create-btn" onClick={Update_Event_Fun}>
          Save
        </button>
        <button className="create-btn" onClick={CloseUpdateModal}>
          Cancel
        </button>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Update Special Price"
        style={customModalStyles}
      >
        <h2>Update Special Price</h2>
        <input
          type="number"
          placeholder="Special Price"
          value={specialPrice}
          onChange={(e) => setSpecialPrice(e.target.value)}
        />
        <button className="create-btn" onClick={Update_Special_Price}>
          Save
        </button>
        <button className="create-btn" onClick={() => setIsModalOpen(false)}>
          Cancel
        </button>
      </Modal>
    </>
  );
};

export default EventModals;
