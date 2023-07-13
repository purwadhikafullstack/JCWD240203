import React from "react";
import './propertyCard.css';

const StayCard = ({ imageUrl, title, description, bedType, date, price }) => {
  return (
    <div className="stayCard">
      <div className="stayImage">
        <img src={imageUrl} alt="" className="stayImageInner" />
      </div>
      <div className="stayDetails">
        <div className="stayTitle">{title}</div>
        <div className="stayDescription">{description}</div>
        <div className="stayInfo">
          <div className="stayInfoItem">{bedType}</div>
          <div className="stayInfoItem">{date}</div>
          <div className="stayInfoItem">{price}</div>
        </div>
      </div>
    </div>
  );
};

const PropertyCard = () => {
  const properties = [
    {
      imageUrl: "https://a0.muscache.com/im/pictures/miso/Hosting-735147908258997419/original/13568434-8d18-4df7-be11-bff6fa96cffd.jpeg?im_w=1200",
      title: "Executive Suite Ocean View",
      description: "You won’t want to leave this charming...",
      bedType: "1 king Bed",
      date: "Nov 18-23",
      price: "Rp2,890,000 night",
    },
    {
      imageUrl: "https://a0.muscache.com/im/pictures/miso/Hosting-864375016616936486/original/13e714f8-d3f7-4ca2-9811-a929972fb5e3.jpeg?im_w=1200",
      title: "Cozy Unique Cabin in Cikole",
      description: "This cozy unique cabin offers a true c...",
      bedType: "1 king Bed",
      date: "Okt 18-23",
      price: "Rp1,341,000 night",
    },
    {
      imageUrl: "https://a0.muscache.com/im/pictures/08c599eb-f428-4cfd-a48a-2e1eda6166cd.jpg?im_w=1200",
      title: "Cozy Studio Madison Park",
      description: "Oemah 1, an inviting and luxurious...",
      bedType: "1 king Bed",
      date: "Aug 18-23",
      price: "Rp273,150 night",
    },
    {
      imageUrl: "https://a0.muscache.com/im/pictures/miso/Hosting-49887950/original/bb12ab53-2432-4f4c-8e7d-5c7b61f89047.jpeg?im_w=1200",
      title: "Bamboo Riverfront Villa View",
      description: "Amarta Pesagi Retreat means itself a...",
      bedType: "1 king Bed",
      date: "Dec 18-23",
      price: "Rp2,291,218 night",
    },
  ];

  return (
    <div className="propertyCard">
      <div className="trending text-left">Trending stays in Indonesia</div>
      <div className="these text-left">These homes get lots attention on Rentify</div>
      <div className="scroll-container">
        {properties.map((property, index) => (
          <StayCard
            key={index}
            imageUrl={property.imageUrl}
            title={property.title}
            description={property.description}
            bedType={property.bedType}
            date={property.date}
            price={property.price}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCard;
