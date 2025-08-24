import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Questionario from "./components/Questionario";
import Ranking from "./components/Ranking.tsx";
import { RankingProvider } from "./contexts/RankingContext.tsx";
import "./App.css";

export default function App() {
  return (
    <RankingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionario" element={<Questionario />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </BrowserRouter>
    </RankingProvider>
  );
}
