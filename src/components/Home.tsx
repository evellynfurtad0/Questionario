import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bem-vindo ao Questionário</h1>
      <p>Teste seus conhecimentos com esse quiz!</p>
      <button onClick={() => navigate("/questionario")} className="start-button">
        Iniciar questionário
      </button>
    </div>
  );
}