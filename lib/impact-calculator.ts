import { TipoEvento, TamanhoEvento } from "./types";

const KG_POR_PESSOA = 0.5;
const CO2_POR_KG_TECIDO = 3.0;
const CO2_POR_ARVORE_ANO = 21;
const ITENS_POR_PESSOA = 0.3;

const MULTIPLICADORES: Record<string, number> = {
  Desfile: 2.5,
  Show: 1.8,
  Festa: 1.2,
  Corporativo: 1.0,
  Casamento: 1.3,
  Formatura: 1.1,
  Outro: 1.0,
};

const TAMANHO_CONVIDADOS: Record<TamanhoEvento, number> = {
  "Até 50 pessoas": 30,
  "50–200 pessoas": 120,
  "200–500 pessoas": 350,
  "500–1000 pessoas": 750,
  "+1000 pessoas": 1500,
};

const EVENTOS_COM_FANTASIAS: TipoEvento[] = ["Festa", "Desfile", "Show", "Casamento", "Formatura"];

export interface ImpactInput {
  tipoEvento: TipoEvento | string;
  convidados: number;
  fantasias: boolean;
  cenografia: boolean;
  decoracao: boolean;
}

export interface ImpactResult {
  kgReaproveitado: number;
  co2Evitado: number;
  arvores: number;
  itensResgatados: number;
}

export function calcularImpacto(input: ImpactInput): ImpactResult {
  const mult = MULTIPLICADORES[input.tipoEvento] ?? 1.0;
  const adicional =
    (input.fantasias ? 0.8 : 0) +
    (input.cenografia ? 0.6 : 0) +
    (input.decoracao ? 0.3 : 0);

  const kgReaproveitado = Math.round(
    (KG_POR_PESSOA + adicional) * input.convidados * mult
  );
  const co2Evitado = Math.round(kgReaproveitado * CO2_POR_KG_TECIDO);
  const arvores = Math.round(co2Evitado / CO2_POR_ARVORE_ANO);
  const itensResgatados = Math.round(ITENS_POR_PESSOA * input.convidados * mult);

  return { kgReaproveitado, co2Evitado, arvores, itensResgatados };
}

export function tamanhoParaConvidados(tamanho: TamanhoEvento): number {
  return TAMANHO_CONVIDADOS[tamanho] ?? 100;
}

export function pedidoTemFantasias(tipoEvento: TipoEvento): boolean {
  return EVENTOS_COM_FANTASIAS.includes(tipoEvento);
}

export function formatNum(n: number): string {
  return n.toLocaleString("pt-BR");
}
