import React, { useState } from 'react';
import './GalleryProperties.css';

const GalleryProperties = () => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const imageLinks = [
    'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/26dffe9b-d506-4229-ae3b-a2b6ddc0fee0.jpeg?im_w=1200',
    'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/b829ad67-112f-4509-b23d-d9eff7ba5c4b.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/3f094daa-867a-45f5-b428-a6be6c86f17f.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/5203a02a-3ab4-48eb-9cf6-5b5da068785e.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/db94a6d9-fe04-4bd1-b7cf-5673ebf2ef1b.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/7f44ddd7-3cf5-4488-8f2c-b07c29439ab5.jpeg?im_w=1440',
    'https://a0.muscache.com/im/pictures/miso/Hosting-861958014525660855/original/d5356b81-18f3-442a-b5c8-d5293aa244c4.jpeg?im_w=1440',
    // Add more image links as needed
  ];

  const toggleShowAllPhotos = () => {
    setShowAllPhotos((prevState) => !prevState);
  };

  return (
    <div className="gallery-properties drop-shadow-sm">
      {showAllPhotos ? (
        // Modal or separate page with all photos
        // Implement the modal or separate page here
        <div>
          <h2>All Photos</h2>
          {imageLinks.map((imageLink, index) => (
            <img key={index} src={imageLink} alt={`Image ${index + 1}`} />
          ))}
        </div>
      ) : (
        // Collage layout with 1 medium image and 4 small images
        <div className="collage">
          <div className="medium-image">
            <img src={imageLinks[0]} alt={`Medium Image`} />
          </div>
          <div className="small-images">
            {imageLinks.slice(1, 5).map((imageLink, index) => (
              <img key={index} src={imageLink} alt={`Image ${index + 2}`} />
            ))}
          </div>
        </div>
      )}

      <button onClick={toggleShowAllPhotos} className="allPhotoButton px-[50px] py-[8px] mt-8 mb-20 text-sm font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
        {showAllPhotos ? 'Close All Photos' : 'Show All Photos'}
      </button>
    </div>
  );
};

export default GalleryProperties;
