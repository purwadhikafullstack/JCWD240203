import axios from "axios";
import "./App.css";
import logo from "./logo.svg"
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/landingPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginModal from "./pages/LoginModal/LoginModal";
import { keepLogin } from "./redux/features/user/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const [message, setMessage] = useState("");
  const call = useDispatch();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
    
    call(keepLogin()).then(
      () => {

      },
      (error) => {
        console.log(error)
      }
    )
  }, []);
 
  return (
    <div className="App">

      <Routes>
        <Route path={'/'} element={<LandingPage/>} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {message}
      </header> */}
      </Routes>
    </div>
  );
}

export default App;
