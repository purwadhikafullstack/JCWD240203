import { useParams } from "react-router-dom"
import Header from "../../components/header/headerPage";
export default function ProfilePage() {
    const params = useParams();

    return(
        <div className="flex flex-col w-full h-[100vh] overflow-y-auto">
            <Header/>
            <div className="flex flex-col flex-grow w-full">
                TEST
            </div>
        </div>
    )
}