import logo from "./logo.svg";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login"
import Register from "./Pages/Register"

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
