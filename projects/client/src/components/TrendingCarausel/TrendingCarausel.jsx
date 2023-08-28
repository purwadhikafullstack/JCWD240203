// { imageUrl, title, description, bedType, date, price }
import './TrendingCarausel.css';
import PropertyCard from '../PropertyCard/propertyCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProperty } from '../../redux/features/property/propertySlice';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function TrendingCarausel() {
    const limit = 6;
    const properties = useSelector((state) => state.property.property);
    const call = useDispatch();

    useEffect(() => {
      call(getProperty({
        page: 1,
        limit: limit,
        sort: 'Review'
    })).then(
        () => {

        },
        (error) => {
            toast.error('unable to get list !');
            console.log(error);
        }
    )
    }, [call])
  
    return (
      <div className="flex flex-col items-center overflow-hidden mx-[20px]">
        <div className="trending text-left text-[60px] font-bold">
          Trending stays in Indonesia
        </div>
        <div className="these text-left text-[48px] font-thin">
          These homes get lots attention on Rentify
        </div>
        <div className="flex w-full overflow-x-auto mobileScroll removeScroll gap-[25px] px-[20px] py-[15px]">
          {properties.map((property, index) => (
            <div key={index} className='min-w-[250px] h-[325px] md:h-[350px]'>
              <PropertyCard data={property}/>
            </div>
          ))}
        </div>
      </div>
    );
  };