import React from "react";

const SpecialPriceDate = ({
  selectedDate,
  setSpecialPrice,
  Set_Special_Price,
  specialPrice,
  specialPrices,
  Delete_Special_Price,
  setIsModalOpen,
  Update_Special_Price,
}) => {
  return (
    <div className="availability-form">
      <input
        type="number"
        placeholder="Special Price"
        value={specialPrice}
        onChange={(e) => setSpecialPrice(e.target.value)}
      />
      <button className="create-btn" onClick={Set_Special_Price}>
        Set Special Price
      </button>
    </div>
  );
};

export default SpecialPriceDate;
