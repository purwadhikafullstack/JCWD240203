import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {Routes, Route} from 'react-router-dom'
import LandingPage from "./pages/LandingPage/landingPage";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  
  return (
    <div className="App">

      <Routes>
      <Route path={'/test'} element={<LandingPage/>} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {message}
      </header> */}
      </Routes>
    </div>
  );
}

export default App;
