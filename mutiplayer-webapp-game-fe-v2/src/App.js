import logo from "./logo.svg";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import MainStory1 from './Pages/MainStory1';
import MainStory2 from './Pages/MainStory2';
import CreateGame from './Pages/CreateGame';
import CardGame from './Pages/CardGame'
import { MAINSTORY1_ROUTE, REGISTER_ROUTE, MAINSTORY2_ROUTE, CREATEGAME_ROUTE, CARDGAME_ROUTE  } from "./Constants/routes";

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route path={MAINSTORY1_ROUTE} element={<MainStory1 />} />
          <Route path={MAINSTORY2_ROUTE} element={<MainStory2 />} />
          <Route path={CREATEGAME_ROUTE} element={<CreateGame />} />
          <Route path={CARDGAME_ROUTE} element={<CardGame />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
