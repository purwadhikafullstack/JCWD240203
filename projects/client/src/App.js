import axios from "axios";
import "./App.css";
import logo from "./logo.svg"
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";

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
    <div className="App h-[100vh]">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {message}
      </header>
    </div>
  );
}

export default App;
