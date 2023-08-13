import { useState, useRef, useEffect } from "react";
import Header from "../../components/header/headerPage";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/features/transaction/transactionSlice";
import { Toaster, toast } from "react-hot-toast";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useNavigate } from "react-router-dom";
import OrderFilterBar from "./OrderFilterBar";
import './OrderPage.css'

export default function OrderPage() {
    const limit = 8;
    const orders = useSelector((state) => state.transaction.order);
    const totalOrder = Math.ceil(useSelector((state) => state.transaction.totalOrder) / limit);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentUser = useSelector((state) => state.user.currentUser);
    const [month, setMonth] = useState(new Date().getMonth());
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
            // if(user.status === 'unverified' || user.idCard === null) {navigate('/')};
            call(getOrder({
                id: user.id,
                page: page,
                limit: limit,
                status: status,
                month: month + 1
            })).then(
                () => {

                },
                (error) => {
                    toast.error('err');
                    console.log(error);
                }
            )
        }
        else {
            navigate('/')
        }
    }, [call, page, status, month, currentUser, navigate]);

    return(
        <div onScroll={checkScroll} ref={listInnerRef} className="w-full h-full overflow-y-auto removeScroll">
            <Toaster/>
            <Header/>
            <div className="flex flex-col justify-start px-[15px] py-[10px]">
                <div className="yourBookingss text-[24px] font-bold text-start border-b-[1px] border-gray-600">
                    Your bookings
                </div>
                <div className="flex flex-col py-[10px]">
                    <OrderFilterBar months={months} month={month} setMonth={setMonth} status={status} setStatus={setStatus}/>
                    {
                        (orders?.length > 0)?
                        orders?.map((value, index) => {
                            return(
                            <div key={index} className="w-full">
                                <OrderCard data={value} page={page} limit={limit}/>
                                <hr className="my-4 border-gray-300" />
                            </div>
                            )
                        })
                        :
                        <div className="text-[30px] font-bold">
                            You do not have any orders !
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}