import { Line } from "react-chartjs-2";
import Chart, { CategoryScale } from 'chart.js/auto';
import Header from "../../components/header/headerPage";

export default function SalesReport() {
    Chart.register(
        CategoryScale
    );
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <div className="flex flex-col w-full h-full overflow-y-auto removeScroll">
            <Header/>
            <div className="flex h-full">
                <div className="w-full h-[300px]">
                    <Line
                    options={{
                        maintainAspectRatio: false
                    }}
                    data={{
                        labels: months,
                        datasets: [
                            {
                                id: 1,
                                label: 'test'
                            }
                        ]
                    }}
                    />
                </div>
            </div>
        </div>
    )
}