import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/headerPage";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import { useEffect, useState } from "react";
import { getHistory } from "../../redux/features/transaction/transactionSlice";
import { Toaster, toast } from "react-hot-toast";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import TransactionFilterBar from "./TransactionFilterBar";
import './TransactionPage.css'

export default function TransactionPage() {
    const limit = 8;
    const totalTransaction = Math.ceil(useSelector((state) => state.transaction.totalTransaction) / limit);
    const history = useSelector((state) => state.transaction.transaction);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
                if (page + 1 <= totalTransaction) {
                    setPage(page + 1);
                }
            }
        }
    };

    useEffect(() => {
        if(localStorage.getItem('user')) {
            call(getHistory({
                id: JSON.parse(localStorage.getItem('user')).id,
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
            navigate('/');
        }
    }, [call, page, status, month, navigate])
    return(
        <div onScroll={checkScroll} ref={listInnerRef} className="w-full h-full overflow-y-auto removeScroll">
            <Toaster/>
            <Header/>
            <div className="flex flex-col justify-start px-[15px] py-[10px]">
                <div className="yourHistory text-[26px] font-bold text-start border-b-[1px] border-gray-600">
                    Your history
                </div>
                <div className="flex flex-col py-[10px]">
                    <TransactionFilterBar status={status} setStatus={setStatus} months={months} month={month} setMonth={setMonth}/>
                    {
                        (history?.length > 0)?
                        history?.map((value, index) => {
                            return(
                            <div key={index}>
                                <TransactionCard data={value} page={page} limit={limit} index={index}/>
                                <hr className="my-4 border-gray-300" />
                            </div>
                            )
                        })
                        :
                        <div className="text-[30px] font-bold">
                            You have not made any bookings !
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}