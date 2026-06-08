"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Recycle, Wind, TreePine, Package, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
  calcularImpacto,
  formatNum,
} from "@/lib/impact-calculator";
import { TipoEvento } from "@/lib/types";
import { getUser } from "@/lib/mock-data";

const TIPOS_EVENTO: TipoEvento[] = [
  "Festa",
  "Desfile",
  "Show",
  "Corporativo",
  "Casamento",
  "Formatura",
];

const IMPACTO_ITEMS = [
  {
    key: "kgReaproveitado" as const,
    label: "Kg de material reaproveitado",
    icon: Recycle,
    cor: "#2D6A4F",
  },
  {
    key: "co2Evitado" as const,
    label: "Kg de CO₂ evitado",
    icon: Wind,
    cor: "#4A90D9",
  },
  {
    key: "arvores" as const,
    label: "Árvores equivalentes",
    icon: TreePine,
    cor: "#2D6A4F",
  },
  {
    key: "itensResgatados" as const,
    label: "Itens resgatados do descarte",
    icon: Package,
    cor: "#4A90D9",
  },
];

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E5D9BF] last:border-0">
      <span className="text-sm font-medium text-[#1A1A1A]">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/40 focus:ring-offset-1 ${
          value ? "bg-[#2D6A4F]" : "bg-[#E5D9BF]"
        }`}
        aria-checked={value}
        role="switch"
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            value ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function CalculadoraPage() {
  const [tipoEvento, setTipoEvento] = useState<TipoEvento>("Festa");
  const [convidados, setConvidados] = useState(100);
  const [convidadosInput, setConvidadosInput] = useState("100");
  const [fantasias, setFantasias] = useState(false);
  const [cenografia, setCenografia] = useState(false);
  const [decoracao, setDecoracao] = useState(false);
  const [userLogado, setUserLogado] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUserLogado(!!u && u.tipo === "cliente");
  }, []);

  const resultado = useMemo(
    () =>
      calcularImpacto({ tipoEvento, convidados, fantasias, cenografia, decoracao }),
    [tipoEvento, convidados, fantasias, cenografia, decoracao]
  );

  function handleConvidadosInput(val: string) {
    setConvidadosInput(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 10 && n <= 5000) {
      setConvidados(n);
    }
  }

  function handleSlider(val: number) {
    setConvidados(val);
    setConvidadosInput(String(val));
  }

  const ctaHref = userLogado ? "/novo-pedido" : "/cadastro";

  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[#E5D9BF] bg-[#F5EDD8]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" href="/" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/vitrine" className="text-[#6B7280] hover:text-[#2D6A4F] transition-colors">
              Vitrine
            </Link>
            <Link href="/cases" className="text-[#6B7280] hover:text-[#2D6A4F] transition-colors">
              Cases
            </Link>
            <Link href="/calculadora" className="text-[#2D6A4F] font-semibold">
              Calculadora
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/login" />}
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              Entrar
            </Button>
            <Button
              size="sm"
              render={<Link href="/cadastro" />}
              className="bg-[#2D6A4F] text-white hover:bg-[#235540] rounded-lg"
            >
              Sou cliente
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-[#E5D9BF] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#4A90D9]/10 border border-[#4A90D9]/20 text-[#4A90D9] text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
              <Calculator className="h-3.5 w-3.5" />
              Calculadora de Impacto
            </div>
            <h1
              className="text-4xl font-bold text-[#1A1A1A] mb-2"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Descubra o impacto do seu evento
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl">
              Estime o impacto ambiental positivo de realizar um evento
              sustentável com a Loopp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main: duas colunas */}
      <main className="flex-1 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Coluna esquerda: inputs */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-7 shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[#E5D9BF]"
          >
            <h2
              className="text-xl font-bold text-[#1A1A1A] mb-6"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Configure seu evento
            </h2>

            {/* Tipo de evento */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Tipo de evento
              </label>
              <div className="flex flex-wrap gap-2">
                {TIPOS_EVENTO.map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoEvento(tipo)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      tipoEvento === tipo
                        ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                        : "bg-white text-[#6B7280] border-[#E5D9BF] hover:border-[#2D6A4F]/40 hover:text-[#2D6A4F]"
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            {/* Convidados */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-[#1A1A1A]">
                  Número de convidados
                </label>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  value={convidadosInput}
                  onChange={(e) => handleConvidadosInput(e.target.value)}
                  className="w-20 h-8 text-center text-sm font-bold border border-[#E5D9BF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 text-[#1A1A1A]"
                />
              </div>
              <input
                type="range"
                min={10}
                max={5000}
                step={10}
                value={convidados}
                onChange={(e) => handleSlider(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #2D6A4F ${((convidados - 10) / 4990) * 100}%, #E5D9BF ${((convidados - 10) / 4990) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-[#6B7280] mt-1">
                <span>10</span>
                <span>5.000</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="mb-7">
              <p className="text-sm font-semibold text-[#1A1A1A] mb-3">
                Necessidades do evento
              </p>
              <Toggle
                label="Fantasias e figurinos"
                value={fantasias}
                onChange={setFantasias}
              />
              <Toggle
                label="Cenografia"
                value={cenografia}
                onChange={setCenografia}
              />
              <Toggle
                label="Decoração"
                value={decoracao}
                onChange={setDecoracao}
              />
            </div>

            <Button
              render={<Link href={ctaHref} />}
              className="w-full bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl h-11 font-semibold text-sm"
            >
              Ver planejamento completo
            </Button>
          </motion.div>

          {/* Coluna direita: resultado */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-7 shadow-[0_2px_16px_rgba(45,106,79,0.1)] border-2 border-[#2D6A4F]/30 sticky top-24"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
              <h2
                className="text-xl font-bold text-[#2D6A4F]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Seu impacto estimado
              </h2>
            </div>

            <div className="space-y-4">
              {IMPACTO_ITEMS.map((item) => {
                const Icon = item.icon;
                const valor = resultado[item.key];
                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#F5EDD8] border border-[#E5D9BF]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: item.cor + "18" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.cor }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#6B7280] mb-0.5">{item.label}</p>
                    </div>
                    <p
                      className="text-2xl font-bold text-[#1A1A1A] tabular-nums"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {formatNum(valor)}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#6B7280] mt-5 leading-relaxed border-t border-[#E5D9BF] pt-4">
              Estimativas baseadas em dados médios de eventos similares e no
              volume de material disponível nos fornecedores parceiros da Loopp.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5D9BF] py-8 mt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Logo size="sm" />
            <p className="text-sm text-[#6B7280]">Feche o ciclo do seu evento.</p>
          </div>
          <nav className="flex items-center gap-5 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#2D6A4F] transition-colors">Início</Link>
            <Link href="/vitrine" className="hover:text-[#2D6A4F] transition-colors">Vitrine</Link>
            <Link href="/cases" className="hover:text-[#2D6A4F] transition-colors">Cases</Link>
          </nav>
          <p className="text-xs text-[#6B7280]/60">© 2026 Loopp</p>
        </div>
      </footer>
    </div>
  );
}
