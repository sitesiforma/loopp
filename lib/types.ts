export type UserType = "cliente" | "admin";

export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: UserType;
  empresa?: string;
  tipoConta?: "pf" | "pj";
}

export type StatusPedido =
  | "aguardando"
  | "em_planejamento"
  | "planejamento_enviado"
  | "aprovado"
  | "ajuste_solicitado";

export type TipoEvento =
  | "Festa"
  | "Desfile"
  | "Show"
  | "Corporativo"
  | "Casamento"
  | "Formatura"
  | "Outro";

export type TamanhoEvento =
  | "Até 50 pessoas"
  | "50–200 pessoas"
  | "200–500 pessoas"
  | "500–1000 pessoas"
  | "+1000 pessoas";

export interface HistoricoStatus {
  status: StatusPedido;
  data: string;
}

export interface Pedido {
  id: string;
  clienteId: string;
  clienteNome: string;
  nomeEvento: string;
  tipoEvento: TipoEvento;
  dataEvento: string;
  localizacao: string;
  tamanho: TamanhoEvento;
  orcamento: string;
  descricao: string;
  status: StatusPedido;
  planejamento?: string;
  fornecedoresSelecionados?: string[];
  historico: HistoricoStatus[];
  criadoEm: string;
}

export type CategoriaFornecedor =
  | "Resíduos Têxteis"
  | "Confecção Sustentável"
  | "Energia Renovável"
  | "Cenografia Sustentável"
  | "Logística Verde"
  | "Alimentação"
  | "Outro";

export type CategoriaVitrine =
  | "Figurino"
  | "Resíduos Têxteis"
  | "Cenografia"
  | "Adereços"
  | "Energia"
  | "Logística"
  | "Decoração";

export interface Material {
  id: string;
  nome: string;
  fornecedorId: string;
  fornecedorNome: string;
  categoria: CategoriaVitrine;
  tiposEvento: TipoEvento[];
  descricao: string;
  cor: string;
}

export interface Fornecedor {
  id: string;
  nome: string;
  categoria: CategoriaFornecedor;
  descricao: string;
  contato: string;
  tags: string[];
  materiais?: Material[];
}

export interface CaseImpacto {
  kgReaproveitado: number;
  co2Evitado: number;
  arvores: number;
  itensResgatados: number;
}

export type Plano = "essencial" | "completo" | "premium";

export interface NovoPedidoState {
  tipoEvento: string;
  plano: Plano | null;
  nomeEvento: string;
  data: string;
  localizacao: string;
  convidados: string;
  orcamento: string;
  descricao: string;
}

export interface EventoCase {
  slug: string;
  evento: string;
  tipo: string;
  cliente: string;
  ano: number;
  desafio: string;
  solucao: string;
  fornecedores: string[];
  impacto: CaseImpacto;
  depoimento: string;
  autorDepoimento: string;
  corCard: string;
  fraseImpacto: string;
  imagem?: string;
}
