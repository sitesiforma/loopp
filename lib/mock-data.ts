import { Fornecedor, Pedido, EventoCase } from "./types";

export const FORNECEDORES_INICIAIS: Fornecedor[] = [
  {
    id: "f1",
    nome: "Sustenta Carnaval",
    categoria: "Resíduos Têxteis",
    descricao:
      "Coleta e redistribuição de fantasias e insumos de carnaval da Marquês de Sapucaí. Venda por atacado e quilo.",
    contato: "contato@sustentacarnaval.com.br",
    tags: ["carnaval", "fantasias", "atacado", "reaproveitamento"],
    materiais: [
      {
        id: "m1",
        nome: "Fantasias de carnaval avulsas",
        fornecedorId: "f1",
        fornecedorNome: "Sustenta Carnaval",
        categoria: "Figurino",
        tiposEvento: ["Festa", "Desfile"],
        descricao:
          "Fantasias completas de desfiles anteriores da Sapucaí. Disponíveis por peça ou em lote. Tamanhos variados.",
        cor: "#F9E784",
      },
      {
        id: "m2",
        nome: "Tecidos e fibras por quilo",
        fornecedorId: "f1",
        fornecedorNome: "Sustenta Carnaval",
        categoria: "Resíduos Têxteis",
        tiposEvento: ["Festa", "Desfile", "Show", "Corporativo"],
        descricao:
          "Tecidos sintéticos, tules, plumas e pedrarias vendidos por peso. Ideal para confecção e cenografia.",
        cor: "#4A90D9",
      },
      {
        id: "m4",
        nome: "Adereços e acessórios de carnaval",
        fornecedorId: "f1",
        fornecedorNome: "Sustenta Carnaval",
        categoria: "Adereços",
        tiposEvento: ["Festa", "Desfile"],
        descricao:
          "Coroas, leques, chapéus e adereços variados de desfiles anteriores. Venda por lote.",
        cor: "#F9E784",
      },
    ],
  },
  {
    id: "f2",
    nome: "Mulheres do Sul Global",
    categoria: "Confecção Sustentável",
    descricao:
      "Coletivo de confecção parceiro, especializado em reaproveitamento de tecidos para produção de novos produtos.",
    contato: "contato@mulheresdosulglobal.org",
    tags: ["coletivo", "tecidos", "moda circular", "confecção"],
    materiais: [
      {
        id: "m7",
        nome: "Roupas e peças confeccionadas com retalhos",
        fornecedorId: "f2",
        fornecedorNome: "Mulheres do Sul Global",
        categoria: "Figurino",
        tiposEvento: ["Desfile", "Show", "Festa"],
        descricao:
          "Peças únicas confeccionadas a partir de tecidos reaproveitados. Sob encomenda para eventos.",
        cor: "#F9E784",
      },
    ],
  },
  {
    id: "f3",
    nome: "EcoFest Energia",
    categoria: "Energia Renovável",
    descricao:
      "Fornecimento de geradores solares e soluções de energia limpa para eventos de médio e grande porte.",
    contato: "ecofest@energia.com.br",
    tags: ["solar", "energia limpa", "geradores", "sustentável"],
    materiais: [
      {
        id: "m6",
        nome: "Geradores solares para eventos",
        fornecedorId: "f3",
        fornecedorNome: "EcoFest Energia",
        categoria: "Energia",
        tiposEvento: ["Show", "Corporativo", "Festa"],
        descricao:
          "Geração de energia limpa para palcos, iluminação e estruturas. Disponível para locação por dia.",
        cor: "#2D6A4F",
      },
    ],
  },
  {
    id: "f4",
    nome: "Verde Cena",
    categoria: "Cenografia Sustentável",
    descricao:
      "Produção de cenografia para eventos com materiais reciclados e reutilizáveis. Atende shows, desfiles e eventos corporativos.",
    contato: "contato@verdecena.com",
    tags: ["cenografia", "reciclado", "shows", "desfiles"],
    materiais: [
      {
        id: "m3",
        nome: "Painéis cenográficos reutilizáveis",
        fornecedorId: "f4",
        fornecedorNome: "Verde Cena",
        categoria: "Cenografia",
        tiposEvento: ["Show", "Corporativo", "Desfile"],
        descricao:
          "Painéis modulares feitos com materiais reciclados. Podem ser combinados em diferentes configurações.",
        cor: "#2D6A4F",
      },
      {
        id: "m5",
        nome: "Estruturas de isopor esculpido",
        fornecedorId: "f4",
        fornecedorNome: "Verde Cena",
        categoria: "Cenografia",
        tiposEvento: ["Show", "Festa", "Desfile"],
        descricao:
          "Esculturas e formas em isopor reaproveitadas de alegorias. Podem ser repintadas e reconfiguradas.",
        cor: "#4A90D9",
      },
    ],
  },
  {
    id: "f5",
    nome: "Ciclo Logística",
    categoria: "Logística Verde",
    descricao:
      "Transporte de materiais com frota de baixa emissão. Parceiros de coleta e redistribuição de resíduos pós-evento.",
    contato: "ciclo@logistica.com.br",
    tags: ["transporte", "baixa emissão", "coleta", "resíduos"],
    materiais: [
      {
        id: "m8",
        nome: "Transporte de materiais de grande volume",
        fornecedorId: "f5",
        fornecedorNome: "Ciclo Logística",
        categoria: "Logística",
        tiposEvento: ["Desfile", "Show", "Corporativo"],
        descricao:
          "Coleta e entrega de materiais de grande volume com frota de baixa emissão. Atende RJ e região.",
        cor: "#4A90D9",
      },
    ],
  },
];

export const PEDIDOS_MOCK: Pedido[] = [
  {
    id: "p1",
    clienteId: "c1",
    clienteNome: "Marina Costa",
    nomeEvento: "Casamento Sustentável — Marina & Pedro",
    tipoEvento: "Casamento",
    dataEvento: "2026-09-14",
    localizacao: "São Paulo, SP",
    tamanho: "200–500 pessoas",
    orcamento: "R$ 45.000",
    descricao:
      "Queremos um casamento completamente sustentável, com decoração reciclada, buffet de produtores locais e zero desperdício. A cerimônia será ao ar livre em uma fazenda orgânica.",
    status: "em_planejamento",
    fornecedoresSelecionados: ["f4", "f5"],
    planejamento:
      "Rascunho em andamento: Verde Cena para cenografia com bambu e flores secas reutilizáveis. Ciclo Logística para transporte de materiais e coleta pós-evento.",
    historico: [
      { status: "aguardando", data: "2026-05-20T10:00:00" },
      { status: "em_planejamento", data: "2026-05-22T14:30:00" },
    ],
    criadoEm: "2026-05-20T10:00:00",
  },
  {
    id: "p2",
    clienteId: "c2",
    clienteNome: "Agência Pulse Creative",
    nomeEvento: "Lançamento de Produto — Pulse Summit 2026",
    tipoEvento: "Corporativo",
    dataEvento: "2026-08-05",
    localizacao: "Rio de Janeiro, RJ",
    tamanho: "500–1000 pessoas",
    orcamento: "R$ 120.000",
    descricao:
      "Evento corporativo de lançamento de produto para mil convidados. Precisamos de soluções para energia, cenografia reutilizável e logística reversa de todos os materiais.",
    status: "planejamento_enviado",
    fornecedoresSelecionados: ["f3", "f4", "f5"],
    planejamento: `**Planejamento Sustentável — Pulse Summit 2026**

**Fornecedores acionados:**
- EcoFest Energia: 4 geradores solares de 10kW cada, cobrindo 100% da demanda elétrica do evento.
- Verde Cena: Cenografia modular reutilizável com estruturas de alumínio e lona reciclada. Retirada e armazenamento incluídos.
- Ciclo Logística: Transporte de entrada e logística reversa completa pós-evento.

**Cronograma:**
- D-7: Montagem da cenografia
- D-1: Instalação geradores solares
- D+1: Desmontagem e coleta por Ciclo Logística

**Estimativa de impacto sustentável:**
- 0 emissões de CO₂ na geração elétrica
- 95% dos materiais reutilizados ou reciclados
- Redução de 70% em resíduos vs. evento convencional`,
    historico: [
      { status: "aguardando", data: "2026-05-10T09:00:00" },
      { status: "em_planejamento", data: "2026-05-12T11:00:00" },
      { status: "planejamento_enviado", data: "2026-05-25T16:00:00" },
    ],
    criadoEm: "2026-05-10T09:00:00",
  },
  {
    id: "p3",
    clienteId: "c3",
    clienteNome: "João Alves",
    nomeEvento: "Festa de 15 Anos — Isabela",
    tipoEvento: "Festa",
    dataEvento: "2026-10-18",
    localizacao: "Belo Horizonte, MG",
    tamanho: "50–200 pessoas",
    orcamento: "R$ 18.000",
    descricao:
      "Festa de debutante com tema natureza e sustentabilidade. A aniversariante é apaixonada por meio ambiente e quer um evento que reflita isso.",
    status: "aguardando",
    historico: [{ status: "aguardando", data: "2026-06-01T08:00:00" }],
    criadoEm: "2026-06-01T08:00:00",
  },
];

export const CASES_MOCK: EventoCase[] = [
  {
    slug: "misci-rio-fashion-week",
    evento: "Desfile Misci — Rio Fashion Week 2024",
    tipo: "Desfile de Moda",
    cliente: "Misci (marca de moda)",
    ano: 2024,
    desafio:
      "A marca precisava de insumos para compor um painel cenográfico no desfile com apelo sustentável e identidade visual forte.",
    solucao:
      "A Loopp conectou a Misci ao Sustenta Carnaval, que forneceu fantasias e tecidos reaproveitados dos desfiles da Sapucaí para compor o painel.",
    fornecedores: ["Sustenta Carnaval", "Verde Cena"],
    impacto: {
      kgReaproveitado: 340,
      co2Evitado: 1020,
      arvores: 48,
      itensResgatados: 120,
    },
    depoimento:
      "A Loopp nos conectou com fornecedores que a gente nunca teria encontrado sozinha. O resultado foi visualmente incrível e com significado real.",
    autorDepoimento: "Equipe Misci",
    corCard: "#4A90D9",
    fraseImpacto: "340 kg de material reaproveitado",
  },
  {
    slug: "afropunk-rio-2024",
    evento: "Afropunk Rio 2024",
    tipo: "Festival Cultural",
    cliente: "Produtora Afropunk Brasil",
    ano: 2024,
    desafio:
      "Festival com mais de 8.000 pessoas precisava de cenografia, decoração e suporte logístico com compromisso de zero resíduo.",
    solucao:
      "A Loopp montou um planejamento completo com fornecedores de cenografia sustentável, energia renovável e logística de coleta pós-evento.",
    fornecedores: ["Verde Cena", "EcoFest Energia", "Ciclo Logística", "Sustenta Carnaval"],
    impacto: {
      kgReaproveitado: 2800,
      co2Evitado: 8400,
      arvores: 400,
      itensResgatados: 560,
    },
    depoimento:
      "Pela primeira vez conseguimos fechar um festival grande com um compromisso real de circularidade. A Loopp foi essencial para isso.",
    autorDepoimento: "Direção de Produção Afropunk Brasil",
    corCard: "#2D6A4F",
    fraseImpacto: "2.800 kg de material reaproveitado",
  },
  {
    slug: "casamento-santa-teresa",
    evento: "Casamento Fernanda & Rodrigo",
    tipo: "Casamento",
    cliente: "Casal particular",
    ano: 2025,
    desafio:
      "Casal queria um casamento com 150 convidados em Santa Teresa com decoração autêntica, sem comprar itens novos descartáveis.",
    solucao:
      "A Loopp planejou decoração inteiramente com tecidos e adereços do Sustenta Carnaval, peças confeccionadas pelo coletivo Mulheres do Sul Global e flores secas reaproveitadas.",
    fornecedores: ["Sustenta Carnaval", "Mulheres do Sul Global"],
    impacto: {
      kgReaproveitado: 180,
      co2Evitado: 540,
      arvores: 26,
      itensResgatados: 95,
    },
    depoimento:
      "A decoração foi o que mais recebeu elogios. Todo mundo queria saber de onde veio cada peça. E nós tínhamos uma história real para contar.",
    autorDepoimento: "Fernanda",
    corCard: "#F9E784",
    fraseImpacto: "180 kg de material reaproveitado",
  },
];

const STORAGE_KEY_PEDIDOS = "loopp_pedidos";
const STORAGE_KEY_FORNECEDORES = "loopp_fornecedores";
const STORAGE_KEY_USER = "loopp_user";

export function getPedidos(): Pedido[] {
  if (typeof window === "undefined") return PEDIDOS_MOCK;
  const raw = localStorage.getItem(STORAGE_KEY_PEDIDOS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_PEDIDOS, JSON.stringify(PEDIDOS_MOCK));
    return PEDIDOS_MOCK;
  }
  return JSON.parse(raw);
}

export function savePedidos(pedidos: Pedido[]): void {
  localStorage.setItem(STORAGE_KEY_PEDIDOS, JSON.stringify(pedidos));
}

export function getFornecedores(): Fornecedor[] {
  if (typeof window === "undefined") return FORNECEDORES_INICIAIS;
  const raw = localStorage.getItem(STORAGE_KEY_FORNECEDORES);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_FORNECEDORES, JSON.stringify(FORNECEDORES_INICIAIS));
    return FORNECEDORES_INICIAIS;
  }
  return JSON.parse(raw);
}

export function saveFornecedores(fornecedores: Fornecedor[]): void {
  localStorage.setItem(STORAGE_KEY_FORNECEDORES, JSON.stringify(fornecedores));
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY_USER);
  if (!raw) return null;
  return JSON.parse(raw);
}

export function setUser(user: object | null): void {
  if (user === null) {
    localStorage.removeItem(STORAGE_KEY_USER);
  } else {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }
}
