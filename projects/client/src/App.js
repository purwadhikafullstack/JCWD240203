import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/landingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { keepLogin, onLogout } from "./redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import SalesReport from "./pages/SalesReport/SalesReport";
import HostingPage from "./pages/HostingPage/MainPage";
import UpdateProperty from "./pages/UpdateProperty/MainPage";
import { Toaster } from "react-hot-toast";
import CreateProperty from "./pages/CreateProperty/MainPage";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Error404 from "./pages/404Error/404Error";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const call = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      call(keepLogin());
    }
  }, [call]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user) {
      const exp = (user.token)? JSON.parse(atob(user.token.split('.')[1])).exp : Date.now() + 1;
      if(Date.now() >= exp * 1000) {
        call(onLogout())
      }
      
      const checkToken = setInterval(() => {
        const exp = (user.token)? JSON.parse(atob(user.token.split('.')[1])).exp : Date.now() + 1;
        if(Date.now() >= exp * 1000) {
          call(onLogout())
        }
      }, 5000);
  
      return () => {clearInterval(checkToken)};
    }
  }, [call, currentUser]);
 
  return (
    <div className="App h-[100vh]">
      <Toaster/>
      <Routes>
        <Route path={'/'} element={<LandingPage/>} />
        <Route path={'/browse'} element={<ProductPage/>}/>
        <Route path={'/profile/:id'} element={<ProfilePage/>}/>
        <Route path={'/property/:id'} element={<ProductDetail/>}/>
        <Route path={'/history'} element={<TransactionPage/>}/>
        <Route path={'/orders'} element={<OrderPage/>}/>
        <Route path={'/verify/:code'} element={<VerifyPage/>}/>
        <Route path={'/hostings'} element={<HostingPage/>}/>
        <Route path={'/hostings/sales'} element={<SalesReport/>}/>
        <Route path={'/hostings/addproperty'} element={<CreateProperty/>}/>
        <Route path={'/hostings/updateproperty/:id'} element={<UpdateProperty/>}/>
        <Route path={'/hostings/events/:id'} element={<CreateEvent/>}/>
        <Route path={'/changepassword'} element={<ChangePassword/>}/>
        <Route path={'/forgotpassword'} element={<ResetPassword/>}/>
        <Route path={'/notfound'} element={<Error404/>}/>
      </Routes>
    </div>
  );
}

export default App;
