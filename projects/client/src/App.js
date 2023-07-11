import axios from "axios";
import "./App.css";
import logo from "./logo.svg"
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
        <Route path={'/'} element={<LandingPage/>} />
      </Routes>
    </div>
  );
}

export default App;
