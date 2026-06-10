"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Check, Recycle, Wind, TreePine, Package, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { getUser, getPedidos, savePedidos, getFornecedores } from "@/lib/mock-data";
import {
  calcularImpacto,
  formatNum,
} from "@/lib/impact-calculator";
import { User, Plano, NovoPedidoState, TipoEvento, TamanhoEvento, Fornecedor } from "@/lib/types";

// ─── Constantes ───────────────────────────────────────────────────────────────

const TAMANHOS: { value: TamanhoEvento; label: string; num: number }[] = [
  { value: "Até 50 pessoas", label: "Até 50 pessoas", num: 30 },
  { value: "50–200 pessoas", label: "50–200 pessoas", num: 120 },
  { value: "200–500 pessoas", label: "200–500 pessoas", num: 350 },
  { value: "500–1000 pessoas", label: "500–1000 pessoas", num: 750 },
  { value: "+1000 pessoas", label: "+1000 pessoas", num: 1500 },
];

const TIPOS_EVENTO = [
  { value: "Festa", label: "Festa", emoji: "🎉" },
  { value: "Desfile", label: "Desfile de Moda", emoji: "👗" },
  { value: "Show", label: "Show / Festival", emoji: "🎵" },
  { value: "Corporativo", label: "Corporativo", emoji: "🏢" },
  { value: "Casamento", label: "Casamento", emoji: "💍" },
  { value: "Formatura", label: "Formatura", emoji: "🎓" },
  { value: "Halloween", label: "Halloween", emoji: "🎃" },
  { value: "Festa Junina", label: "Festa Junina", emoji: "🌽" },
  { value: "Outro", label: "Outro", emoji: "✨" },
];

const PLANOS: {
  id: Plano;
  nome: string;
  tag: string;
  tagColor: string;
  descricao: string;
  itens: string[];
  impactoBase: number;
  fornecedoresIds: string[];
  dark?: boolean;
}[] = [
  {
    id: "essencial",
    nome: "Plano Essencial",
    tag: "Mais simples",
    tagColor: "bg-[#F0F0F0] text-[#888888]",
    descricao: "Ideal para eventos menores ou quem quer começar de forma acessível.",
    itens: [
      "Adereços e acessórios reaproveitados",
      "Decoração com materiais de carnaval",
      "Tecidos e fibras por quilo",
    ],
    impactoBase: 80,
    fornecedoresIds: ["f1"],
  },
  {
    id: "completo",
    nome: "Plano Completo",
    tag: "Mais popular",
    tagColor: "bg-[#F9E784]/20 text-[#7A6A00]",
    descricao: "Para eventos de médio porte que querem solução completa de cenografia e figurino.",
    itens: [
      "Tudo do Essencial",
      "Cenografia com materiais reciclados",
      "Figurinos e fantasias completas",
      "Painéis e estruturas reutilizáveis",
      "Brindes de fim de festa com material reaproveitado",
    ],
    impactoBase: 320,
    fornecedoresIds: ["f1", "f4", "f2"],
  },
  {
    id: "premium",
    nome: "Plano Premium",
    tag: "Ciclo fechado",
    tagColor: "bg-[#3A7D5A]/20 text-[#3A7D5A]",
    descricao: "Solução 360° para grandes eventos com compromisso real de circularidade.",
    itens: [
      "Tudo do Completo",
      "Energia renovável (geradores solares)",
      "Logística de baixa emissão",
      "Coleta de resíduos pós-evento",
      "Relatório de impacto após o evento",
    ],
    impactoBase: 800,
    fornecedoresIds: ["f1", "f4", "f2", "f3", "f5"],
    dark: true,
  },
];

const ETAPAS = [
  { num: 1, label: "Tipo de evento" },
  { num: 2, label: "Plano base" },
  { num: 3, label: "Detalhes" },
  { num: 4, label: "Resumo" },
];

const IMPACTO_ITEMS = [
  { key: "kgReaproveitado" as const, label: "Kg reaproveitado", icon: Recycle, cor: "#3A7D5A" },
  { key: "co2Evitado" as const, label: "Kg CO₂ evitado", icon: Wind, cor: "#4EAF7A" },
  { key: "arvores" as const, label: "Árvores equiv.", icon: TreePine, cor: "#3A7D5A" },
  { key: "itensResgatados" as const, label: "Itens resgatados", icon: Package, cor: "#4EAF7A" },
];

const EMPTY_STATE: NovoPedidoState = {
  tipoEvento: "",
  plano: null,
  nomeEvento: "",
  data: "",
  localizacao: "",
  convidados: "",
  orcamento: "",
  descricao: "",
};

// ─── Barra de progresso ────────────────────────────────────────────────────────

function ProgressBar({ etapa }: { etapa: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {ETAPAS.map((e, i) => {
        const done = etapa > e.num;
        const active = etapa === e.num;
        return (
          <div key={e.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  done
                    ? "bg-[#3A7D5A] text-white"
                    : active
                    ? "bg-[#3A7D5A] text-white ring-4 ring-[#3A7D5A]/20"
                    : "bg-[#E5E5E5] text-[#888888]"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : e.num}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap hidden sm:block ${
                  active ? "text-[#0A0A0A]" : done ? "text-[#3A7D5A]" : "text-[#888888]"
                }`}
              >
                {e.label}
              </span>
            </div>
            {i < ETAPAS.length - 1 && (
              <div
                className={`h-0.5 w-12 sm:w-20 mx-1 sm:mx-2 mb-5 transition-colors ${
                  etapa > e.num ? "bg-[#3A7D5A]" : "bg-[#E5E5E5]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Etapa 1 ──────────────────────────────────────────────────────────────────

function Etapa1({
  valor,
  onChange,
  erro,
}: {
  valor: string;
  onChange: (v: string) => void;
  erro: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0A0A0A] mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Qual é o seu evento?
      </h2>
      <p className="text-[#888888] mb-8">Escolha o tipo que melhor descreve o que você está planejando.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {TIPOS_EVENTO.map((t) => {
          const selected = valor === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange(t.value)}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all text-center ${
                selected
                  ? "border-[#3A7D5A] bg-[#F0FAF5]"
                  : "border-[#E5E5E5] bg-[#F5F5F5] hover:border-[#3A7D5A]/50"
              }`}
            >
              <span className="text-3xl leading-none">{t.emoji}</span>
              <span className={`text-sm font-semibold leading-tight ${selected ? "text-[#3A7D5A]" : "text-[#0A0A0A]"}`}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}
    </div>
  );
}

// ─── Etapa 2 ──────────────────────────────────────────────────────────────────

function Etapa2({
  valor,
  onChange,
  fornecedores,
}: {
  valor: Plano | null;
  onChange: (v: Plano) => void;
  fornecedores: Fornecedor[];
}) {
  function getFornecedorNomes(ids: string[]) {
    return ids.map((id) => fornecedores.find((f) => f.id === id)?.nome ?? id);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0A0A0A] mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Escolha um ponto de partida.
      </h2>
      <p className="text-[#888888] mb-8">Você pode personalizar depois. O plano define quais fornecedores a Loopp vai acionar.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANOS.map((plano) => {
          const selected = valor === plano.id;
          const nomesFornecedores = getFornecedorNomes(plano.fornecedoresIds);
          return (
            <div
              key={plano.id}
              className={`rounded-2xl border-2 flex flex-col overflow-hidden transition-all cursor-pointer ${
                plano.dark
                  ? `${selected ? "border-[#3A7D5A]" : "border-[#3A7D5A]/30"} bg-[#0A0A0A]`
                  : `${selected ? "border-[#3A7D5A]" : "border-[#E5E5E5]"} bg-[#F5F5F5]`
              }`}
              onClick={() => onChange(plano.id)}
            >
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className={`font-bold text-base ${plano.dark ? "text-white" : "text-[#0A0A0A]"}`}>
                    {plano.nome}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${plano.tagColor}`}>
                    {plano.tag}
                  </span>
                </div>
                <p className={`text-sm mb-4 leading-relaxed ${plano.dark ? "text-[#AAAAAA]" : "text-[#444444]"}`}>
                  {plano.descricao}
                </p>
                <ul className="space-y-1.5 mb-4">
                  {plano.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${plano.dark ? "text-[#4EAF7A]" : "text-[#3A7D5A]"}`} />
                      <span className={`text-xs leading-snug ${plano.dark ? "text-[#AAAAAA]" : "text-[#444444]"}`}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={`text-xs mb-3 pb-3 border-b ${plano.dark ? "text-[#888888] border-[#2A2A2A]" : "text-[#888888] border-[#E5E5E5]"}`}>
                  <span className={`font-semibold ${plano.dark ? "text-[#4EAF7A]" : "text-[#3A7D5A]"}`}>
                    ~{formatNum(plano.impactoBase)} kg
                  </span>{" "}
                  reaproveitados (base)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {nomesFornecedores.map((nome) => (
                    <span
                      key={nome}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        plano.dark
                          ? "bg-[#3A7D5A]/15 text-[#4EAF7A] border border-[#3A7D5A]/30"
                          : "bg-[#3A7D5A]/10 text-[#3A7D5A] border border-[#3A7D5A]/20"
                      }`}
                    >
                      {nome}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`px-5 pb-5`}>
                <Button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onChange(plano.id); }}
                  className={`w-full rounded-full h-10 font-semibold text-sm ${
                    selected
                      ? "bg-[#3A7D5A] text-white hover:bg-[#4EAF7A]"
                      : plano.dark
                      ? "bg-[#2A2A2A] text-[#888888] hover:bg-[#3A7D5A] hover:text-white"
                      : "bg-white text-[#888888] border border-[#E5E5E5] hover:bg-[#3A7D5A] hover:text-white hover:border-[#3A7D5A]"
                  }`}
                >
                  {selected ? "Selecionado" : "Selecionar"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Etapa 3 ──────────────────────────────────────────────────────────────────

function Etapa3({
  state,
  onChange,
  erros,
  planoNome,
}: {
  state: NovoPedidoState;
  onChange: (field: keyof NovoPedidoState, value: string) => void;
  erros: Partial<Record<keyof NovoPedidoState, string>>;
  planoNome: string;
}) {
  const convidadosNum = TAMANHOS.find((t) => t.value === state.convidados)?.num ?? 0;
  const tipoParaCalc = (state.tipoEvento || "Outro") as TipoEvento;

  const impactoPreview = useMemo(() => {
    if (!convidadosNum) return null;
    return calcularImpacto({
      tipoEvento: tipoParaCalc,
      convidados: convidadosNum,
      fantasias: true,
      cenografia: true,
      decoracao: true,
    });
  }, [convidadosNum, tipoParaCalc]);

  const hoje = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0A0A0A] mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Conte mais sobre o evento.
      </h2>
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs bg-[#3A7D5A]/10 text-[#3A7D5A] border border-[#3A7D5A]/20 px-3 py-1 rounded-full font-semibold">
          Plano: {planoNome}
        </span>
      </div>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label className="font-medium text-[#0A0A0A]">Nome do evento *</Label>
          <Input
            placeholder="Ex: Casamento da Marina e Pedro"
            value={state.nomeEvento}
            onChange={(e) => onChange("nomeEvento", e.target.value)}
            className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-11"
          />
          {erros.nomeEvento && <p className="text-red-500 text-xs">{erros.nomeEvento}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-medium text-[#0A0A0A]">Data do evento *</Label>
            <Input
              type="date"
              value={state.data}
              onChange={(e) => onChange("data", e.target.value)}
              min={hoje}
              className="border-[#E5E5E5] bg-white text-[#0A0A0A] rounded-full h-11"
            />
            {erros.data && <p className="text-red-500 text-xs">{erros.data}</p>}
          </div>
          <div className="space-y-1.5">
            <Label className="font-medium text-[#0A0A0A]">Localização *</Label>
            <Input
              placeholder="Cidade, Estado"
              value={state.localizacao}
              onChange={(e) => onChange("localizacao", e.target.value)}
              className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-11"
            />
            {erros.localizacao && <p className="text-red-500 text-xs">{erros.localizacao}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-medium text-[#0A0A0A]">Número de convidados *</Label>
            <select
              value={state.convidados}
              onChange={(e) => onChange("convidados", e.target.value)}
              className="w-full border border-[#E5E5E5] bg-white text-[#0A0A0A] rounded-full h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A7D5A]/30"
            >
              <option value="">Selecione</option>
              {TAMANHOS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            {erros.convidados && <p className="text-red-500 text-xs">{erros.convidados}</p>}
          </div>
          <div className="space-y-1.5">
            <Label className="font-medium text-[#0A0A0A]">Orçamento disponível *</Label>
            <Input
              placeholder="R$ 0,00"
              value={state.orcamento}
              onChange={(e) => onChange("orcamento", e.target.value)}
              className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-11"
            />
            {erros.orcamento && <p className="text-red-500 text-xs">{erros.orcamento}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="font-medium text-[#0A0A0A]">
            Detalhes adicionais{" "}
            <span className="text-[#888888] font-normal text-xs">(opcional)</span>
          </Label>
          <Textarea
            placeholder="Algum detalhe especial? Tema, cores, necessidades específicas..."
            value={state.descricao}
            onChange={(e) => onChange("descricao", e.target.value)}
            className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-2xl min-h-[100px] resize-y"
          />
        </div>

        {impactoPreview && (
          <div className="flex items-center gap-3 bg-[#F0FAF5] border border-[#3A7D5A]/20 rounded-xl px-4 py-3">
            <Recycle className="h-4 w-4 text-[#3A7D5A] shrink-0" />
            <p className="text-sm text-[#444444]">
              Com base no{" "}
              <span className="font-semibold text-[#0A0A0A]">Plano {planoNome}</span>{" "}
              para {state.convidados}:{" "}
              <span className="font-semibold text-[#3A7D5A]">~{formatNum(impactoPreview.kgReaproveitado)} kg</span>{" "}
              de material reaproveitado estimados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Etapa 4 ──────────────────────────────────────────────────────────────────

function Etapa4({
  state,
  onEditar,
  fornecedores,
}: {
  state: NovoPedidoState;
  onEditar: (etapa: number) => void;
  fornecedores: Fornecedor[];
}) {
  const plano = PLANOS.find((p) => p.id === state.plano)!;
  const tipoInfo = TIPOS_EVENTO.find((t) => t.value === state.tipoEvento);
  const convidadosNum = TAMANHOS.find((t) => t.value === state.convidados)?.num ?? 100;
  const tipoParaCalc = (state.tipoEvento || "Outro") as TipoEvento;

  const impacto = useMemo(
    () =>
      calcularImpacto({
        tipoEvento: tipoParaCalc,
        convidados: convidadosNum,
        fantasias: true,
        cenografia: true,
        decoracao: true,
      }),
    [tipoParaCalc, convidadosNum]
  );

  const fornecedoresDoPlano = plano.fornecedoresIds
    .map((id) => fornecedores.find((f) => f.id === id))
    .filter(Boolean) as typeof fornecedores;

  function formatDate(iso: string) {
    if (!iso) return "-";
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0A0A0A] mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Tudo certo. Revise antes de enviar.
      </h2>
      <p className="text-[#888888] mb-8">Confirme os dados do seu pedido.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna esquerda — Resumo */}
        <div className="space-y-4">
          <Card className="p-5 bg-[#F5F5F5] border-[#E5E5E5] rounded-2xl relative">
            <button
              type="button"
              onClick={() => onEditar(1)}
              className="absolute top-4 right-4 text-xs text-[#888888] hover:text-[#3A7D5A] underline underline-offset-2 transition-colors"
            >
              Editar
            </button>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{tipoInfo?.emoji}</span>
                <div>
                  <p className="text-xs text-[#888888]">Tipo de evento</p>
                  <p className="text-sm font-semibold text-[#0A0A0A]">{tipoInfo?.label ?? state.tipoEvento}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#E5E5E5]">
                <p className="text-xs text-[#888888] mb-1">Plano</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${plano.tagColor}`}>
                  {plano.nome}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E5E5E5] space-y-2">
                <button
                  type="button"
                  onClick={() => onEditar(3)}
                  className="absolute top-4 right-4 text-xs text-[#888888]"
                />
                <InfoRow label="Evento" value={state.nomeEvento} />
                <InfoRow label="Data" value={formatDate(state.data)} />
                <InfoRow label="Local" value={state.localizacao} />
                <InfoRow label="Convidados" value={state.convidados} />
                <InfoRow label="Orçamento" value={state.orcamento} />
                {state.descricao && (
                  <div>
                    <p className="text-xs text-[#888888]">Descrição</p>
                    <p className="text-sm text-[#444444] leading-relaxed mt-0.5">{state.descricao}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Fornecedores */}
          <div>
            <p className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-2">
              Fornecedores acionados
            </p>
            <div className="space-y-2">
              {fornecedoresDoPlano.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl px-3 py-2.5"
                >
                  <div className="w-2 h-2 rounded-full bg-[#3A7D5A] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#0A0A0A]">{f.nome}</p>
                    <p className="text-xs text-[#888888]">{f.categoria}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna direita — Impacto */}
        <div>
          <Card className="p-5 bg-[#F5F5F5] border-2 border-[#3A7D5A]/30 rounded-2xl sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#3A7D5A] animate-pulse" />
              <h3 className="text-base font-bold text-[#3A7D5A]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Seu impacto estimado
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {IMPACTO_ITEMS.map((item) => {
                const Icon = item.icon;
                const valor = impacto[item.key];
                return (
                  <div
                    key={item.key}
                    className="bg-white rounded-xl p-4 text-center border border-[#E5E5E5]"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                      style={{ backgroundColor: item.cor + "18" }}
                    >
                      <Icon className="h-4 w-4" style={{ color: item.cor }} />
                    </div>
                    <p
                      className="text-xl font-bold text-[#0A0A0A] mb-0.5"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {formatNum(valor)}
                    </p>
                    <p className="text-xs text-[#888888] leading-tight">{item.label}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-[#888888] mt-4 leading-relaxed">
              Estimativas com base no plano e número de convidados. Valores reais variam conforme os fornecedores acionados.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[#888888]">{label}</p>
      <p className="text-sm font-medium text-[#0A0A0A]">{value || "—"}</p>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function NovoPedidoPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [etapa, setEtapa] = useState(1);
  const [state, setState] = useState<NovoPedidoState>(EMPTY_STATE);
  const [erros, setErros] = useState<Partial<Record<keyof NovoPedidoState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    if (u.tipo === "admin") { router.push("/admin"); return; }
    setUser(u);
    setFornecedores(getFornecedores());
  }, [router]);

  function update(field: keyof NovoPedidoState, value: string) {
    setState((s) => ({ ...s, [field]: value }));
    setErros((e) => ({ ...e, [field]: "" }));
  }

  function validarEtapa1() {
    if (!state.tipoEvento) {
      setErros({ tipoEvento: "Selecione o tipo de evento para continuar." });
      return false;
    }
    return true;
  }

  function validarEtapa3() {
    const novosErros: Partial<Record<keyof NovoPedidoState, string>> = {};
    if (!state.nomeEvento) novosErros.nomeEvento = "Campo obrigatório.";
    if (!state.data) novosErros.data = "Campo obrigatório.";
    if (!state.localizacao) novosErros.localizacao = "Campo obrigatório.";
    if (!state.convidados) novosErros.convidados = "Campo obrigatório.";
    if (!state.orcamento) novosErros.orcamento = "Campo obrigatório.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function avancar() {
    if (etapa === 1 && !validarEtapa1()) return;
    if (etapa === 2 && !state.plano) {
      toast.error("Selecione um plano para continuar.");
      return;
    }
    if (etapa === 3 && !validarEtapa3()) return;
    setEtapa((e) => e + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function voltar() {
    setEtapa((e) => e - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editarEtapa(n: number) {
    setEtapa(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleEnviar() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const pedidos = getPedidos();
    const plano = PLANOS.find((p) => p.id === state.plano);
    const novo = {
      id: `p_${Date.now()}`,
      clienteId: user!.id,
      clienteNome: user!.nome,
      nomeEvento: state.nomeEvento,
      tipoEvento: state.tipoEvento as TipoEvento,
      dataEvento: state.data,
      localizacao: state.localizacao,
      tamanho: state.convidados as TamanhoEvento,
      orcamento: state.orcamento,
      descricao: state.descricao,
      status: "aguardando" as const,
      historico: [{ status: "aguardando" as const, data: new Date().toISOString() }],
      criadoEm: new Date().toISOString(),
      plano: state.plano,
      fornecedoresSelecionados: plano?.fornecedoresIds ?? [],
    };
    savePedidos([...pedidos, novo]);
    toast.success("Pedido enviado! Nossa equipe entrará em contato em breve.");
    router.push("/dashboard");
  }

  if (!user) return null;

  const planoSelecionado = PLANOS.find((p) => p.id === state.plano);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userName={user.nome} />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 py-10">
        <ProgressBar etapa={etapa} />

        <AnimatePresence mode="wait">
          <motion.div
            key={etapa}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="p-6 sm:p-8 bg-[#F5F5F5] border-[#E5E5E5] rounded-2xl">
              {etapa === 1 && (
                <Etapa1
                  valor={state.tipoEvento}
                  onChange={(v) => update("tipoEvento", v)}
                  erro={erros.tipoEvento ?? ""}
                />
              )}
              {etapa === 2 && (
                <Etapa2
                  valor={state.plano}
                  onChange={(v) => setState((s) => ({ ...s, plano: v }))}
                  fornecedores={fornecedores}
                />
              )}
              {etapa === 3 && (
                <Etapa3
                  state={state}
                  onChange={update}
                  erros={erros}
                  planoNome={planoSelecionado?.nome ?? ""}
                />
              )}
              {etapa === 4 && (
                <Etapa4
                  state={state}
                  onEditar={editarEtapa}
                  fornecedores={fornecedores}
                />
              )}

              {/* Navegação */}
              <div className={`flex gap-3 mt-8 ${etapa === 1 ? "justify-end" : "justify-between"}`}>
                {etapa > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={voltar}
                    className="border-[#E5E5E5] text-[#888888] hover:text-[#0A0A0A] rounded-full h-11 px-6 gap-1.5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                )}

                {etapa < 4 ? (
                  <Button
                    type="button"
                    onClick={avancar}
                    className="bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full h-11 px-8 font-semibold"
                  >
                    Continuar
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleEnviar}
                    disabled={loading}
                    className="bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full h-11 px-10 font-semibold text-base"
                  >
                    {loading ? "Enviando..." : "Enviar pedido"}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
