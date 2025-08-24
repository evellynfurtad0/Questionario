export type Escolha = {
  id: number;
  opcao: string;
  certa: boolean;
};

export type Pergunta = {
  id: number;
  questao: string;
  opcoes: Escolha[];
};

export type RespostaUsuario = {
  idPergunta: number;
  idOpcao: number;
};

export interface QuizResult {
  id: string;
  name: string;
  score: number;
  total: number;
  percentage: number;
  time: number;
  date: Date;
}

export interface RankingContextType {
  currentUserName: string;
  setCurrentUserName: (name: string) => void;
  results: QuizResult[];
  addResult: (result: Omit<QuizResult, 'id' | 'date'>) => void;
  clearResults: () => void;
}