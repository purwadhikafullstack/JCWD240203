import axios from "axios";
import "./App.css";
import logo from "./logo.svg"
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/landingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { keepLogin } from "./redux/features/User/userSlice";
import { useDispatch } from "react-redux";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import SalesReport from "./pages/SalesReport/SalesReport";
import Hostings from "./pages/HostingPage/HostingPage";
import CalendarHosting from "./pages/HostingPage/CalendarHosting";
import ListingList from "./pages/HostingPage/ListingList";
import ReservationHosting from "./pages/HostingPage/ReservationHosting";
import CreateListing from "./pages/HostingPage/CreateListing";

function App() {
  //const [message, setMessage] = useState("");
  const call = useDispatch();

  useEffect(() => {
    // (async () => {
    //   const { data } = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/greetings`
    //   );
    //   setMessage(data?.message || "");
    // })();
    if(localStorage.getItem('user')) {
      call(keepLogin()).then(
        () => {
  
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }, []);
 
  return (
    <div className="App h-[100vh]">
      <Routes>
        <Route path={'/'} element={<LandingPage/>} />
        <Route path={'/browse'} element={<ProductPage/>}/>
        <Route path={'/profile/:id'} element={<ProfilePage/>}/>
        <Route path={'/property/:id'} element={<ProductDetail/>}/>
        <Route path={'/history'} element={<TransactionPage/>}/>
        <Route path={'/orders'} element={<OrderPage/>}/>
        <Route path={'/verify/:code'} element={<VerifyPage/>}/>
        <Route path={'/sales'} element={<SalesReport/>}/>
        <Route path={'/hostings'} element={<Hostings/>}/>
        <Route path={'/hostings/calendar'} element={<CalendarHosting/>}/>
        <Route path={'/hostings/listing'} element={<ListingList/>}/>
        <Route path={'/hostings/reservation'} element={<ReservationHosting/>}/>
        <Route path={'/hostings/addproperty'} element={<CreateListing/>}/>
      </Routes>
    </div>
  );
}

export default App;
