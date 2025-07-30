import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { todasAsPerguntas } from "../Data/perguntas";
import { Pergunta, RespostaUsuario } from "../types";

export default function Questionario() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [respostasUsuario, setRespostasUsuario] = useState<RespostaUsuario[]>([]);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const navigate = useNavigate();

  const currentQuestion: Pergunta = todasAsPerguntas[currentQuestionIndex];
  const questionarioConcluido = currentQuestionIndex >= todasAsPerguntas.length;


  useEffect(() => {
    if (questionarioConcluido) return;

    const timerId = setInterval(() => {
      setTempoDecorrido((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [currentQuestionIndex, questionarioConcluido]);

  const handleOptionSelect = (id: number) => {
    setSelectedOptionId(id);
  };

  const handleNextQuestion = () => {
    if (selectedOptionId === null) return;

      const novaResposta: RespostaUsuario = {
      idPergunta: currentQuestion.id,
      idOpcao: selectedOptionId,
    };

    setRespostasUsuario([...respostasUsuario, novaResposta]);

    if (currentQuestionIndex < todasAsPerguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionId(null);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setRespostasUsuario([]);
    setTempoDecorrido(0);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (questionarioConcluido) {
    const acertos = respostasUsuario.filter((resposta) => {
      const pergunta = todasAsPerguntas.find((p) => p.id === resposta.idPergunta);
      const opcao = pergunta?.opcoes.find((o) => o.id === resposta.idOpcao);
      return opcao?.certa;
    }).length;

    return (
      <div className="questionario-container">
        <h2>Questionário Concluído!</h2>
        <p>Tempo total: {formatTime(tempoDecorrido)}</p>
        <p>
          Você acertou {acertos} de {todasAsPerguntas.length} perguntas (
          {Math.round((acertos / todasAsPerguntas.length) * 100)}%)
        </p>
        <div className="button-group">
          <button onClick={handleRestart} className="restart-button">
            Refazer questionário
          </button>
          <button onClick={handleGoHome} className="home-button">
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="questionario-container">
      <div className="timer">Tempo: {formatTime(tempoDecorrido)}</div>
      <div className="progresso">
        Pergunta {currentQuestionIndex + 1} de {todasAsPerguntas.length}
      </div>
      <h2>{currentQuestion.questao}</h2>
      <div className="opcoes-container">
        {currentQuestion.opcoes.map((opcao) => (
          <button
            key={opcao.id}
            className={`opcao-button ${
              selectedOptionId === opcao.id ? "selected" : ""
            }`}
            onClick={() => handleOptionSelect(opcao.id)}
          >
            {opcao.opcao}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextQuestion}
        disabled={selectedOptionId === null}
        className="next-button"
      >
        {currentQuestionIndex === todasAsPerguntas.length - 1
          ? "Finalizar"
          : "Próxima Pergunta"}
      </button>
    </div>
  );
}