import React, { useState } from 'react';
import './GalleryProperties.css';

const GalleryProperties = (props) => {
  const toggleShowAllPhotos = () => {
    if(props?.setShowAllPhotos) {props?.setShowAllPhotos(!props?.showAllPhotos)}
  };
  // <div className='absolute w-full h-full bg-black z-50'>
  //   <h2>All Photos</h2>
  //   <div className='flex flex-col justify-center items-center w-full gap-[10px]'>
  //     {props?.images?.map((obj, index) => (
  //       <div key={index} className='w-[600px] h-[400px]'>
  //         <img src={obj.url} alt='' className='w-full h-full rounded-[10px]' />
  //       </div>
  //     ))}
  //   </div>
  // </div>

  return (
    <div className="my-[20px] drop-shadow-sm">
      <div className="collage flex-col md:flex-row gap-[10px]">
        <div className="medium-image">
          {
            (props?.images)?
            <img src={props?.images[0]?.url} alt='' />
            :
            null
          }
        </div>
        <div className="small-images">
          {props?.images?.slice(1, 5).map((obj, index) => (
            <div key={index} className='w-full h-[195px]'>
              <img src={obj.url} alt='' className='w-full h-full'/>
            </div>
          ))}
        </div>
      </div>
      <button onClick={toggleShowAllPhotos} className="allPhotoButton px-[50px] py-[8px] mt-8 mb-20 text-sm font-sans rounded-[10px] border-solid border-2 border-black bg-white text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
        Show All Photos
      </button>
    </div>
  );
};

export default GalleryProperties;
