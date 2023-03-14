import logo from "./logo.svg";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Game1 from "./game1/game1";
import { GAME1_ROUTE } from "./Constants/routes";
import Game2 from "./game2/game2";
import { GAME2_ROUTE } from "./Constants/routes";

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path={GAME1_ROUTE} element={<Game1 />} />
          <Route path={GAME2_ROUTE} element={<Game2 />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
