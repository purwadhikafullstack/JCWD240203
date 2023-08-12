import { useEffect, useState } from "react";
import HeaderProperty from "../../components/HeaderProperty/HeaderProperty";
import TodayHosting from "./TodayHosting";
import Footer from "../../components/footerRentify/footerPage";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CalendarHostingTrial from "./CalendarHostingTrial";
import ListingList from "./ListingList";

export default function HostingPage() {
    // State to keep track of the active filter
    const currentUser = useSelector((state) => state.user.currentUser);
    const location = useLocation();
    const [activePage, setActivePage] = useState('');
    const navigate = useNavigate();
    let contentToShow;

    switch (activePage) {
        case "Today":
            contentToShow = <TodayHosting/>;
            break;
        case "Listings":
            contentToShow = <ListingList/>;
            break;
        default:
            contentToShow = <TodayHosting/>;
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        
        if(user.status === 'verified' && user.idCard) {
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
    }, [navigate, currentUser])

    return (
        <div className="flex flex-col w-full h-[100vh] bg-white overflow-y-auto removeScroll">
            <HeaderProperty activePage={activePage} setActivePage={setActivePage}/>
            {contentToShow}
            <Footer/>
        </div>
    );
}