import { useEffect, useState, useRef } from "react";
import Header from "../../components/header/headerPage";
import PropertyCard from "../../components/PropertyCard/propertyCard";
import { useDispatch, useSelector } from "react-redux";
import { getProperty} from "../../redux/features/property/propertySlice";
import { toast } from "react-hot-toast";
import FilterBar from "../../components/FilterBar/FilterBar";
import Footer from "../../components/footerRentify/footerPage";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import "./ProductPage.css"
import SortingBar from "./SortingBar";
import LoginModal from "../../components/LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";

export default function ProductPage() {
    const [loading, setLoading] = useState(true);
    const limit = 8;
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [applyFilter, setApplyFilter] = useState(false);
    const properties = useSelector((state) => state.property.property);
    const location = useSelector((state) => state.property.location);
    const start = useSelector((state) => state.property.start);
    const sort = useSelector((state) => state.property.sort);
    const type = useSelector((state) => state.property.type);
    const end = useSelector((state) => state.property.end);
    const totalProperties = Math.ceil(useSelector((state) => state.property.totalProperty) / limit);
    const [page, setPage] = useState(1);
    const call = useDispatch();

    const listInnerRef = useRef();
    const checkScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                if (page + 1 <= totalProperties) {
                    setPage(page + 1);
                }
            }
        }
    };

    useEffect(() => {
        call(getProperty({
            page: page,
            limit: limit,
            start: start,
            end: end,
            sort: sort,
            type: type,
            location: location
        })).then(
            () => {
                setLoading(false);
                setApplyFilter(false);
            },
            (error) => {
                toast.error('unable to get list !');
                setApplyFilter(false);
                console.log(error);
            }
        )
    }, [call, page, applyFilter, sort, type])

    return (
        <div onScroll={checkScroll} ref={listInnerRef} className="flex flex-col w-full h-[100vh] overflow-y-auto removeScroll">
            <Header showLogin={showLogin} setShowLogin={setShowLogin} showRegister={showRegister} setShowRegister={setShowRegister} />
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin}/>
            <RegisterModal showRegister={showRegister} setShowRegister={setShowRegister}/>
            <div className="flex flex-col w-full">
                <FilterBar applyFilter={applyFilter} setApplyFilter={setApplyFilter} setLoading={setLoading}/>
            </div>
            <div className="flex w-full px-[5px] sm:px-[20px] md:px-[30px] lg:px-[50px] mt-[10px]">
                <SortingBar setLoading={setLoading}/>
            </div>
            <div className="flex flex-col w-full flex-grow mt-[10px]">
                {
                    (loading)?
                    <div className="flex justify-center items-center w-full h-full">
                        <ThreeDots/>
                    </div>
                    :
                    <div className="propsCard text-base text-gray grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] w-full my-[10px] px-[5px] sm:px-[20px] md:px-[30px] lg:px-[50px]">
                        {
                            properties?.map((value, index) => {
                                return (
                                    <div key={index} className="w-full">
                                        <PropertyCard data={value} />
                                    </div>
                                )
                            })
                        }
                        {
                            (page + 1 <= totalProperties)?
                            <div className="flex justify-center items-center w-full col-span-full">
                                <ThreeDots/>
                            </div>
                            :
                            null
                        }
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}