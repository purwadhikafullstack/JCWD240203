import React from "react";
import './PropertyCard.css';

export default function PropertyCard(props) {
  return (
    <div className="stayCard">
      <div className="stayImage">
        <img src={props?.imageUrl} alt="" className="stayImageInner" />
      </div>
      <div className="stayDetails">
        <div className="stayTitle">{props?.title || 'title'}</div>
        <div className="stayDescription">{props?.description || 'description'}</div>
        <div className="stayInfo">
          <div className="stayInfoItem">{props?.bedType || 'type'}</div>
          <div className="stayInfoItem">{props?.date || 'date'}</div>
          <div className="stayInfoItem">{props?.price || 'price'}</div>
        </div>
      </div>
    </div>
  );
};
