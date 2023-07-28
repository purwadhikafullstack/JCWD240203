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
    const totalDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const totalDaysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const [response, setResponse] = useState([]);
    const [type, setType] = useState('Yearly');
    const [year, setYear] = useState(new Date().getFullYear());
    const [chartLabel, setChartLabel] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [startingMonth, setStartingMonth] = useState(0);
    const [endingMonth, setEndingMonth] = useState(11);
    const navigate = useNavigate();

    const formatChartYearly = (rawData) => {
        let tempLabel = [];
        let temp = [];
        months.forEach((month, index) => {
            if(index >= startingMonth && index <= endingMonth) {
                tempLabel.push(month);
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
        setChartLabel(tempLabel);
        setChartData(temp);
    };

    const formatChartDaily = (rawData) => {
        let tempLabel = [];
        let tempData = [];
        let limit = (new Date().getFullYear() % 4 === 0) ? totalDaysLeap[selectedMonth] : totalDays[selectedMonth];
        for(let i = 1; i <= limit; i++) {
            tempLabel.push(i + ' ' + months[selectedMonth].substring(0,3));
            let tempProfit = 0;
            rawData.forEach((transaction) => {
                if (transaction) {
                    let transactionDay = new Date(transaction.updatedAt).getDate();
                    if (transactionDay === i) {
                        let total = ((new Date(transaction?.checkOut).getTime() - new Date(transaction?.checkIn).getTime())/ 86400000) * (transaction?.room?.price * transaction?.stock);
                        tempProfit += total;
                    }
                }
            })
            tempData.push(tempProfit);
        }
        setChartLabel(tempLabel);
        setChartData(tempData);
    };

    useEffect(() => {
        if(localStorage.getItem('user')) {
            call(getCompleted({
                id: JSON.parse(localStorage.getItem('user')).id,
                year: year,
                type: type,
                month: selectedMonth + 1,
                token: JSON.parse(localStorage.getItem('user')).token
            })).then(
                (response) => {setResponse(response?.data?.data?.rows)},
                (error) => {console.log(error)}
            )
        }
        else {
            navigate('/')
        }
    }, [call, year, navigate, type, selectedMonth]);

    useEffect(() => {
        if(type === 'Yearly') {
            formatChartYearly(response);
        }
        else if (type === 'Daily') {
            formatChartDaily(response);
        }
    }, [response, startingMonth, endingMonth])

    return (
        <div className="flex flex-col w-full h-full overflow-y-auto removeScroll">
            <Toaster/>
            <Header/>
            <div className="flex flex-col h-full px-[20px] py-[10px]">
                <SalesFilterBar months={months} year={year} setYear={setYear} 
                startingMonth={startingMonth} setStartingMonth={setStartingMonth}
                endingMonth={endingMonth} setEndingMonth={setEndingMonth}
                selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
                type={type} setType={setType}/>
                <div className="w-full h-[400px]">
                    <Line
                    options={{
                        maintainAspectRatio: false
                    }}
                    data={{
                        labels: chartLabel,
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