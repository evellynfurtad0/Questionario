import { useNavigate } from "react-router-dom";
import { useRanking } from "../contexts/RankingContext.tsx";

export default function Ranking() {
  const navigate = useNavigate();
  const { results, clearResults } = useRanking();

  const resultadosOrdenados = [...results].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.time - b.time;
  });

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  };

  return (
    <div className="questionario-container">
      <h1>🏆 Ranking</h1>

      {resultadosOrdenados.length === 0 ? (
        <p>Ninguém fez o quiz ainda. Seja o primeiro!</p>
      ) : (
        <div className="table-container">
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Nome</th>
                <th className="center">Pontuação</th>
                <th className="center">Tempo</th>
              </tr>
            </thead>
            <tbody>
              {resultadosOrdenados.map((resultado, index) => (
                <tr key={resultado.id} className={index < 3 ? `place-${index + 1}` : ''}>
                  <td className={index < 3 ? "highlight" : ""}>
                    {index + 1}º
                    {index === 0 && ' 🥇'}
                    {index === 1 && ' 🥈'}
                    {index === 2 && ' 🥉'}
                  </td>
                  <td>{resultado.name}</td>
                  <td className="center bold">
                    {resultado.score}/{resultado.total} ({resultado.percentage}%)
                  </td>
                  <td className="center">
                    {formatarTempo(resultado.time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="button-group">
        <button onClick={() => navigate("/")} className="home-button">
          Voltar para Home
        </button>
        {resultadosOrdenados.length > 0 && (
          <button
            onClick={clearResults}
            style={{
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              flex: 1
            }}
          >
            Limpar Ranking
          </button>
        )}
      </div>
    </div>
  );
}