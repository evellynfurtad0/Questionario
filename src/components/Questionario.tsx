import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { todasAsPerguntas } from "../Data/perguntas";
import { useRanking } from "../contexts/RankingContext";

export default function Questionario() {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [tempo, setTempo] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [respostas, setRespostas] = useState<any[]>([]);
  
  const navigate = useNavigate();
  const { currentUserName, addResult } = useRanking();

  useEffect(() => {
    if (finalizado) return;
    
    const timer = setInterval(() => {
      setTempo(segundos => segundos + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [finalizado]);

  const selecionarOpcao = (id: number) => {
    setOpcaoSelecionada(id);
  };

  const proximaPergunta = () => {
    if (opcaoSelecionada === null) return;

    const pergunta = todasAsPerguntas[perguntaAtual];
    const opcaoCorreta = pergunta.opcoes.find(opcao => opcao.certa);
    
    if (opcaoCorreta && opcaoSelecionada === opcaoCorreta.id) {
      setAcertos(acertos + 1);
    }

    const novaResposta = {
      perguntaId: pergunta.id,
      opcaoId: opcaoSelecionada
    };
    setRespostas([...respostas, novaResposta]);

    if (perguntaAtual < todasAsPerguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setOpcaoSelecionada(null);
    } else {
      const porcentagem = Math.round((acertos / todasAsPerguntas.length) * 100);
     
      addResult({
        name: currentUserName,
        score: acertos,
        total: todasAsPerguntas.length,
        percentage: porcentagem,
        time: tempo
      });
      
      setFinalizado(true);
    }
  };

  const recomecar = () => {
    setPerguntaAtual(0);
    setOpcaoSelecionada(null);
    setTempo(0);
    setFinalizado(false);
    setAcertos(0);
    setRespostas([]);
  };

  const voltarParaHome = () => {
    navigate("/");
  };

  const verRanking = () => {
    navigate("/ranking");
  };

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  };

  if (finalizado) {
    return (
      <div className="questionario-container">
        <h2>Parabéns! Você terminou! 🎉</h2>
        <p>Tempo: {formatarTempo(tempo)}</p>
        <p>Acertos: {acertos} de {todasAsPerguntas.length}</p>
        <p>Porcentagem: {Math.round((acertos / todasAsPerguntas.length) * 100)}%</p>
        
        <div className="button-group">
          <button onClick={recomecar} className="restart-button">
            Fazer novamente
          </button>
          <button onClick={voltarParaHome} className="home-button">
            Voltar para Home
          </button>
          <button onClick={verRanking} className="start-button">
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }

  const pergunta = todasAsPerguntas[perguntaAtual];
  
  return (
    <div className="questionario-container">
      <div className="timer">⏰ Tempo: {formatarTempo(tempo)}</div>
      <div className="progresso">
        Pergunta {perguntaAtual + 1} de {todasAsPerguntas.length}
      </div>
      
      <h2>{pergunta.questao}</h2>
      
      <div className="opcoes-container">
        {pergunta.opcoes.map((opcao) => (
          <button
            key={opcao.id}
            className={`opcao-button ${opcaoSelecionada === opcao.id ? "selected" : ""}`}
            onClick={() => selecionarOpcao(opcao.id)}
          >
            {opcao.opcao}
          </button>
        ))}
      </div>
      
      <button
        onClick={proximaPergunta}
        disabled={opcaoSelecionada === null}
        className="next-button"
      >
        {perguntaAtual === todasAsPerguntas.length - 1 ? "Finalizar" : "Próxima"}
      </button>
    </div>
  );
}