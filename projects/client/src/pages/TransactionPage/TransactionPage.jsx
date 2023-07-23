import { useSelector } from "react-redux";
import Header from "../../components/header/headerPage";
import TransactionCard from "../../components/TransactionCard/TransactionCard";

export default function TransactionPage() {
    const history = useSelector((state) => state.transaction.transaction);

    return(
        <div className="w-full h-full overflow-y-auto removeScroll">
            <Header/>
            <div className="flex flex-col justify-start px-[15px] py-[10px]">
                <div className="text-[24px] font-bold text-start border-b-[1px] border-gray-600">
                    Your history
                </div>
                <div className="flex flex-col">
                    <div>
                        <TransactionCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}