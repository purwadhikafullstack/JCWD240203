import Header from "../../components/header/headerPage";
import { AiOutlineSearch } from "react-icons/ai"

export default function ProductPage() {
    return (
        <div className="w-full h-full">
            <Header/>
            <div className="flex flex-col items-center py-[5px] px-[10px]">
                <div className="w-[350px] h-[45px] flex justify-between items-center rounded-full bg-white shadow-gray-500 border-[1px] border-gray-300">
                    <div className="flex flex-grow h-full justify-center items-center rounded-full">
                        Anywhere
                    </div>
                    <div className="w-[1px] h-full bg-gray-400">
                        &nbsp;
                    </div>
                    <div className="flex flex-grow h-full justify-center items-center rounded-full">
                        Any Week
                    </div>
                    <div className="w-[1px] h-full bg-gray-400">
                        &nbsp;
                    </div>
                    <div className="flex flex-grow h-full justify-center items-center rounded-full">
                        Add Guest
                    </div>
                    <div className="flex justify-center items-center transition-all duration-400 hover:bg-red-900 w-[35px] h-[35px] rounded-full bg-red-600 mr-[10px]">
                        <AiOutlineSearch size={25}/>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-[10px] w-full h-full my-[10px] px-[50px]">
                    
                </div>
            </div>
        </div>
    )
}