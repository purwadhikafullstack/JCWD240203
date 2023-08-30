import './GalleryProperties.css';

const GalleryProperties = (props) => {
  const toggleShowAllPhotos = () => {
    if(props?.setShowAllPhotos) {props?.setShowAllPhotos(!props?.showAllPhotos)}
  };

  return (
    <div className="my-[20px] drop-shadow-sm">
      <div className="collage flex-col md:flex-row gap-[10px]">
        <div className="flex-[1.75] h-[400px]">
          {
            (props?.images?.length > 0)?
            <img src={props?.images[0]?.url} alt='' className='w-full h-full'/>
            :
            <img src={`${process.env.REACT_APP_API_BASE_URL}/default/DefaultProperty.png`} alt='' className='w-full h-full'/>
          }
        </div>
        <div className={`${(props?.images?.length <= 1) ? 'hidden' : (props?.images?.length <= 3) ? 'flex-[0.75] grid grid-cols-1 gap-[10px]' : 'flex-1 grid grid-cols-2 gap-[10px]'}`}>
          {
            (props?.images?.length > 0)?
            props?.images?.slice(1, 5).map((obj, index) => (
              <div key={index} className='w-full h-[195px]'>
                <img src={obj.url} alt='' className='w-full h-full'/>
              </div>
            ))
            :
            null
          }
        </div>
      </div>
      <button onClick={toggleShowAllPhotos} className="px-[50px] py-[8px] mt-6 mb-6 text-sm font-sans rounded-[10px] border-solid border-2 border-black text-black font-bold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#3F3F3F,0_0px_0_0_#3F3F3F] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#3F3F3F,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
        Show All Photos
      </button>
    </div>
  );
};

export default GalleryProperties;
