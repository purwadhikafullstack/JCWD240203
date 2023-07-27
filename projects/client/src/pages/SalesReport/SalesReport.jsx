import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from 'chart.js/auto';
import Header from "../../components/header/headerPage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompleted } from "../../redux/features/transaction/transactionSlice";
import { Toaster } from "react-hot-toast";
import SalesFilterBar from "./SalesFilterBar";
import { useNavigate } from "react-router-dom";

export default function SalesReport() {
    Chart.register(
        CategoryScale
    );
    const call = useDispatch();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [response, setResponse] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState([]);
    const [startingMonth, setStartingMonth] = useState(0);
    const [endingMonth, setEndingMonth] = useState(11);
    const navigate = useNavigate();

    const formatChartData = (rawData) => {
        let temp = [];
        months.forEach((month, index) => {
            if(index >= startingMonth && index <= endingMonth) {
                let totalSales = 0;
                rawData.forEach((transaction) => {
                    let transactionMonth = new Date(transaction.updatedAt).getMonth();
                    if(months[transactionMonth] === month) {
                        let total = ((new Date(transaction?.checkOut).getTime() - new Date(transaction?.checkIn).getTime())/ 86400000) * (transaction?.room?.price * transaction?.stock);
                        totalSales += total;
                    }
                })
                temp.push(totalSales);
            }
        })
        setChartData(temp);
    }

    useEffect(() => {
        if(localStorage.getItem('user')) {
            call(getCompleted({
                id: JSON.parse(localStorage.getItem('user')).id,
                year: year
            })).then(
                (response) => {setResponse(response?.data?.data?.rows)},
                (error) => {console.log(error)}
            )
        }
        else {
            navigate('/')
        }
    }, [call, year]);

    useEffect(() => {
        formatChartData(response);
    }, [response, startingMonth, endingMonth])

    return (
        <div className="flex flex-col w-full h-full overflow-y-auto removeScroll">
            <Toaster/>
            <Header/>
            <div className="flex flex-col h-full px-[20px] py-[10px]">
                <SalesFilterBar months={months} year={year} setYear={setYear} 
                startingMonth={startingMonth} setStartingMonth={setStartingMonth}
                endingMonth={endingMonth} setEndingMonth={setEndingMonth}/>
                <div className="w-full h-[400px]">
                    <Line
                    options={{
                        maintainAspectRatio: false
                    }}
                    data={{
                        labels: months.filter((month, index) => {if(index >= startingMonth && index <= endingMonth) {return true} else {return false}}),
                        datasets: [
                            {
                                id: 1,
                                label: `${year} sales`,
                                data: chartData,
                                borderColor: 'rgb(250 204 21)',
                                backgroundColor: "rgb(59 130 246)"
                            }
                        ]
                    }}
                    />
                </div>
            </div>
        </div>
    )
}