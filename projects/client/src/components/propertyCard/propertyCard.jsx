import React from "react";
import './propertyCard.css'

const StayCard = ({ imageUrl, title, description, bedType, date, price }) => {
  return (
    <div className="stayCard mt-6 ml-4 z-40 w-[330px] h-[560px] bg-white">
      <div className="w-[330px] h-[240px] mb-10 rounded-md">
        <img alt="" src={imageUrl} className="w-[330px] h-[400px] rounded-lg" />
      </div>
      <div className="mt-44">
        <div className="mt-40 pr-50 mr-8">
          <div className="title text-lg mb-1 font-black">{title}</div>
          <div className="description mr-2 text-slate-800 text-base">{description}</div>
          <div className="bedType mr-[214px] text-slate-600">{bedType}</div>
          <div className="date mr-[214px] text-slate-600">{date}</div>
          <div className="price mr-[155px]">{price}</div>
        </div>
      </div>
    </div>
  );
};

const PropertyCard = () => {
  const properties = [
    {
      imageUrl: "",
      title: "",
      description: "",
      bedType: "",
      date: "",
      price: "",
    },
    // Add more properties here
  ];

  return (
    <div className="propertyCard">
      <div className="trending font-bold">Trending stays in Indonesia</div>
      <div className="these mb-4">These homes get lots attention on Rentify</div>
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
