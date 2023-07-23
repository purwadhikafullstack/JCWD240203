import { useEffect, useState, useRef } from "react";
import Header from "../../components/header/headerPage";
import PropertyCard from "../../components/PropertyCard/propertyCard";
import { useDispatch, useSelector } from "react-redux";
import { getProperty } from "../../redux/features/property/propertySlice";
import { Toaster, toast } from "react-hot-toast";
import FilterBar from "../../components/FilterBar/FilterBar";
import Footer from "../../components/footerRentify/footerPage";
import "./ProductPage.css"

export default function ProductPage() {
    const limit = 8;
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [applyFilter, setApplyFilter] = useState(false);
    const properties = useSelector((state) => state.property.property);
    const start = useSelector((state) => state.property.start);
    const end = useSelector((state) => state.property.end);
    const location = useSelector((state) => state.property.location);
    const totalProperties = Math.ceil(useSelector((state) => state.property.totalProperty) / limit);
    const [page, setPage] = useState(1);
    const call = useDispatch()

    const listInnerRef = useRef();
    const checkScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
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
            location: location
        })).then(
            () => {

            },
            (error) => {
                toast.error('unable to get list !');
                console.log(error);
            }
        )

        setTimeout(() => {
            setApplyFilter(false)
        }, 200)
    }, [call, page, applyFilter])

    return (
        <div onScroll={checkScroll} ref={listInnerRef} className="flex flex-col w-full h-[100vh] overflow-y-auto removeScroll">
            <Toaster />
            <Header showLogin={showLogin} setShowLogin={setShowLogin} showRegister={showRegister} setShowRegister={setShowRegister} />
            <div className="flex flex-col flex-grow w-full">
                <div>
                    <FilterBar applyFilter={applyFilter} setApplyFilter={setApplyFilter}/>
                </div>
                <div className="ml-10 mb-8 mt-4">
                </div>
                <div className="propsCard text-base text-gray grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[10px] w-full h-full my-[10px] px-[5px] sm:px-[20px] md:px-[30px] lg:px-[50px]">
                    {
                        properties?.map((value, index) => {
                            return (
                                <div key={index} className="h-[350px]">
                                    <PropertyCard data={value} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}