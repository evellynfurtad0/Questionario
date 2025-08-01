import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Questionario from "./components/Questionario";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionario" element={<Questionario />} />
      </Routes>
    </BrowserRouter>
  );
}
