import logo from "./logo.svg";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Game1 from "./game1/game1";
import Game2 from "./game2/game2";
import MainStory1 from './Pages/MainStory1';
import MainStory2 from './Pages/MainStory2';
import CreateGame from './Pages/CreateGame';
import JigsawPuzzle from "./ShapeSort/Jigsaw"
import FlipCard from "./CardGame/FlipCard"
import { MAINSTORY1_ROUTE, REGISTER_ROUTE, MAINSTORY2_ROUTE, CREATEGAME_ROUTE, SHAPESORT_ROUTE, CARDGAME_ROUTE, GAME1_ROUTE, GAME2_ROUTE } from "./Constants/routes";

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path={SHAPESORT_ROUTE}element={<JigsawPuzzle />} />
          <Route path={CARDGAME_ROUTE} element={<FlipCard />} />
          <Route path={GAME1_ROUTE} element={<Game1 />} />
          <Route path={GAME2_ROUTE} element={<Game2 />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route path={MAINSTORY1_ROUTE} element={<MainStory1 />} />
          <Route path={MAINSTORY2_ROUTE} element={<MainStory2 />} />
          <Route path={CREATEGAME_ROUTE} element={<CreateGame />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
