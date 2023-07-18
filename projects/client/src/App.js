import axios from "axios";
import "./App.css";
import logo from "./logo.svg"
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/landingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { keepLogin } from "./redux/features/User/userSlice";
import { useDispatch } from "react-redux";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

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
      </Routes>
    </div>
  );
}

export default App;
