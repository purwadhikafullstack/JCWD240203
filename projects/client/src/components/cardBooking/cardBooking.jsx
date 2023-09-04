import { useNavigate } from 'react-router-dom'
import { Card, CardBody } from "@material-tailwind/react";
import LocationBox from "../LocationBox/locationBox";
import DateBox from "../DateBox/dateBox";
import GuestBox from "../GuestBox/GuestBox";
import './cardBooking.css'


export default function CardBooking() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/browse');
  }

  return (
    <Card className="w-full bg-white drop-shadow-2xl rounded-lg">
      <CardBody>
        <div className="typography">
          <h5 color="blue-gray" className="mb-2 text-6xl font-bold text-gray-900 ">
            Find places to stay in Indonesia
          </h5>
          <h4>
            Whether you're looking for a cabin, a condo, or a castle—find your getaway on Rentify.
          </h4>
        </div>
        <div className="locationBox flex px-[10px] md:px-[30px]">
          <LocationBox/>
        </div>
        <div className="dateBox w-full h-[100px] px-[10px] md:px-[30px] flex gap-[10px]">
            <div className="w-full">
              <DateBox label="CHECK IN" type={'checkIn'} />
            </div>
            <div className="w-full">
              <DateBox label="CHECK OUT" type={'checkOut'} />
            </div>
        </div>
        <div className="guestBox w-full h-[100px]">
          <div className="flex justify-center gap-[10px] px-[10px] md:px-[30px]">
            <div className="w-full">
              <GuestBox label="GUESTS" />
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div onClick={handleClick} className="searchButton py-[8px] my-[15px] text-2xl font-sans rounded-[10px] bg-green-600 text-white font-extrabold cursor-pointer select-none active:scale-95 active:shadow-[0_0px_0_0_#166534,0_0px_0_0_#166534] active:border-b-[0px] transition-all duration-150 shadow-[0_10px_0_0_#166534,0_15px_0_0_] border-b-[1px] drop-shadow-xl">
            Search
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
