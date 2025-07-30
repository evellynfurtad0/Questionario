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