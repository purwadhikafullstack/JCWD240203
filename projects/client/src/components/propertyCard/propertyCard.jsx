import './propertyCard.css'
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

export default function PropertyCard(props) {
  return (
    <Link to={`/property/${props?.data?.id}`} className="flex flex-col h-full w-full bg-gray-100  drop-shadow rounded-[10px] transition-all duration-500 hover:scale-105 active:scale-100 cursor-pointer hover:bg-green-800/70">
    <div className="w-full p-[5px]">
    {
        (props?.data?.propertyImages?.length > 0) ?
        (
            <>
                {props.data.propertyImages.map((image, index) => {
                    console.log("Property Image URL:", image.url);
                    return (
                        <img
                            key={index}
                            src={image.url}
                            alt=""
                            className="w-full h-[175px] md:h-[200px] rounded-[10px]"
                        />
                    );
                })}
            </>
        ) :
        (
            <>
                <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/default/DefaultProperty.png`}
                    alt=""
                    className="w-full h-[175px] md:h-[200px] rounded-[10px]"
                />
                {console.log("Using default property image")}
            </>
        )
    }
</div>
      <div className="flex flex-col gap-[10px] h-full px-[10px] py-[5px]">
        <div className="text-left">
          <div className="stayTitle lg:text-[16px] text-[12px]">
            {props?.data?.name || 'name'}
          </div>
          <div className="stayCity lg:text-[14px] text-[14px]">
            {props?.data?.city || 'address'}
          </div>
          <div className="flex text-[16px]">
            {'Rp.' + props?.data?.rooms[0]?.price?.toLocaleString('ID-id') || 'price'}
          </div>
        </div>
        <div className="flex mt-auto justify-between">
          <div className="flex justify-center items-center gap-[10px] underline underline-offset-4">
              <AiFillStar /> {props?.data?.average || 0.00}
          </div>
          <div className='flex gap-[15px]'>
            <div className="stayInfoItem text-[14px]">{props?.data?.category?.type || 'type'}</div>
            <div className="stayInfoItem text-[14px]">{(props?.data?.rooms?.length > 0) ? 'Available' : 'Unavailable'}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
