import { useEffect, useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import TodayHosting from "./TodayHosting";
import Footer from "../../components/footerRentify/footerPage";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/features/user/userSlice";
import CalendarHosting from "./CalendarHosting";

export default function HostingPage() {
    // State to keep track of the active filter
    const location = useLocation();
    
    const [currentUser, setCurrentUser] = useState({});
    const [activePage, setActivePage] = useState('');
    const navigate = useNavigate();
    const call = useDispatch();
    let contentToShow;

    switch (activePage) {
        case "Today":
            contentToShow = <TodayHosting/>;
            break;
        case "Calendar":
            contentToShow = <CalendarHosting/>;
            break;
        case "insights":
            break;
        default:
            contentToShow = <TodayHosting/>;
    }

    useEffect(() => {
        if(localStorage.getItem('user')) {
            call(getUser({id: JSON.parse(localStorage.getItem('user')).id})).then(
                (response) => {setCurrentUser(response.data.data)},
                () => {}
            )
            if(location?.state?.content) {
                setActivePage(location?.state?.content);
                window.history.replaceState({
                    pathname: '/hostings',
                    state: {}
                }, document.title)
            }
            else {
                setActivePage('Today')
            }
        }
        else {
            navigate('/');
        }
    }, [navigate])

    return (
        <div className="w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <HeaderProperty activePage={activePage} setActivePage={setActivePage}/>
            {contentToShow}
            <Footer />
        </div>
    );
}