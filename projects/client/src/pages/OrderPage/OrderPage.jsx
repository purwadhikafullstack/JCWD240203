import { useState, useRef, useEffect } from "react";
import Header from "../../components/header/headerPage";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/features/transaction/transactionSlice";
import { Toaster, toast } from "react-hot-toast";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useNavigate } from "react-router-dom";
import OrderFilterBar from "./OrderFilterBar";
import ThreeDots from "../../components/ThreeDotsLoading/ThreeDotsLoading";
import './OrderPage.css'

export default function OrderPage() {
    const limit = 8;
    const orders = useSelector((state) => state.transaction.order);
    const totalOrder = Math.ceil(useSelector((state) => state.transaction.totalOrder) / limit);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentUser = useSelector((state) => state.user.currentUser);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('all');
    const [page, setPage] = useState(1);
    const call = useDispatch();
    const navigate = useNavigate();

    const listInnerRef = useRef();
    const checkScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (page + 1 <= totalOrder) {
                    setPage(page + 1);
                }
            }
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        if(user.status === 'verified' && user.idCard) {
            if(loading) {
                call(getOrder({
                    id: user.id,
                    page: page,
                    limit: limit,
                    status: status,
                    month: month,
                    year: year
                })).then(
                    () => {
                        setLoading(false);
                    },
                    (error) => {
                        toast.error('Unable to get orders, please try again later !', {id: 'OrderPageToast'});
                        console.log(error);
                    }
                )
            }
        }
        else {
            navigate('/')
        }
    }, [call, page, loading, currentUser, navigate]);

    return(
        <div onScroll={checkScroll} ref={listInnerRef} className="flex flex-col w-full h-full overflow-y-auto removeScroll">
            <Toaster/>
            <Header/>
            <div className="flex flex-col flex-grow justify-start px-[15px] py-[10px]">
                <div className="yourBookingss text-[24px] font-bold text-start border-b-[1px] border-gray-600">
                    Your bookings
                </div>
                <div className="flex flex-col flex-grow py-[10px]">
                    <OrderFilterBar setYear={setYear} year={year} setLoading={setLoading} months={months} month={month} setMonth={setMonth} status={status} setStatus={setStatus}/>
                    {
                        (loading)?
                        <div className="flex flex-col flex-grow justify-center items-center w-full">
                            <ThreeDots/>
                        </div>
                        :
                        (orders?.length > 0)?
                        orders?.map((value, index) => {
                            return(
                            <div key={index} className="w-full">
                                <OrderCard data={value} year={year} month={month} page={page} limit={limit} status={status} setLoading={setLoading}/>
                                <hr className="my-4 border-gray-300" />
                            </div>
                            )
                        })
                        :
                        <div className="text-[30px] font-bold">
                            You do not have any orders !
                        </div>
                    }
                    {
                        (page + 1 <= totalOrder)?
                        <div className="flex justify-center w-full">
                            <ThreeDots/>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}