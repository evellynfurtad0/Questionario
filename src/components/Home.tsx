import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRanking } from "../contexts/RankingContext.tsx";

export default function Home() {
  const navigate = useNavigate();
  const { currentUserName, setCurrentUserName } = useRanking();
  const [name, setName] = useState(currentUserName);
  const [error, setError] = useState("");

  const handleStartQuiz = () => {
    if (!name.trim()) {
      setError("Por favor, digite seu nome para começar");
      return;
    }

    setCurrentUserName(name.trim());
    navigate("/questionario");
  };

  const handleGoToRanking = () => {
    navigate("/ranking");
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo ao Questionário</h1>
      <p>Teste seus conhecimentos com esse quiz!</p>
      
      <div style={{ margin: "1.5rem 0" }}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          style={{
            padding: "12px",
            border: `2px solid ${error ? "#ff4444" : "#ddd"}`,
            borderRadius: "5px",
            fontSize: "1rem",
            width: "100%",
            boxSizing: "border-box"
          }}
          onKeyPress={(e) => e.key === "Enter" && handleStartQuiz()}
        />
        {error && <p style={{ color: "#ff4444", margin: "0.5rem 0 0", fontSize: "0.9rem" }}>{error}</p>}
      </div>

      <button onClick={handleStartQuiz} className="start-button" disabled={!name.trim()}>
        Iniciar questionário
      </button>

      <button 
        onClick={handleGoToRanking} 
        style={{
          background: "transparent",
          border: "2px solid #4CAF50",
          color: "#4CAF50",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "1rem",
          fontSize: "0.9rem"
        }}
      >
        Ver Ranking
      </button>
    </div>
  );
}