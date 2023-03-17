import logo from "./logo.svg";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import JigsawPuzzle from "./ShapeSort/Jigsaw"
import FlipCard from "./CardGame/FlipCard"

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/BreakFast" element={<JigsawPuzzle />} />
          <Route path="/CardGame" element={<FlipCard />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
