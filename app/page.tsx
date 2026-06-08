"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { CASES_MOCK } from "@/lib/mock-data";
import { formatNum } from "@/lib/impact-calculator";

const totalKg = CASES_MOCK.reduce((s, c) => s + c.impacto.kgReaproveitado, 0);
const totalCo2 = CASES_MOCK.reduce((s, c) => s + c.impacto.co2Evitado, 0);

const STATS = [
  { valor: formatNum(totalKg), label: "kg reaproveitados nos cases publicados" },
  { valor: "5", label: "fornecedores de economia circular" },
  { valor: formatNum(totalCo2), label: "kg de CO₂ evitados no total" },
];

const PASSOS = [
  {
    numero: "01",
    titulo: "Descreva seu evento",
    desc: "Tipo, tamanho, data e orçamento. Quanto mais detalhe, mais preciso o plano.",
  },
  {
    numero: "02",
    titulo: "Receba seu plano sustentável",
    desc: "Nossa equipe monta um planejamento personalizado com fornecedores da rede Loopp.",
  },
  {
    numero: "03",
    titulo: "Aprove e realize",
    desc: "Revise, ajuste se precisar, e dê o aval. A Loopp garante o ciclo fechado.",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Nav */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F5EDD8]/95 backdrop-blur-sm border-b border-[#E5D9BF]"
            : "border-b border-white/10"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" variant={scrolled ? "default" : "white"} />

          <nav
            className={`hidden md:flex items-center gap-6 text-sm font-medium ${
              scrolled ? "text-[#6B7280]" : "text-white/65"
            }`}
          >
            <Link
              href="/vitrine"
              className={`transition-colors ${scrolled ? "hover:text-[#2D6A4F]" : "hover:text-white"}`}
            >
              Vitrine
            </Link>
            <Link
              href="/cases"
              className={`transition-colors ${scrolled ? "hover:text-[#2D6A4F]" : "hover:text-white"}`}
            >
              Cases
            </Link>
            <Link
              href="/calculadora"
              className={`transition-colors ${scrolled ? "hover:text-[#2D6A4F]" : "hover:text-white"}`}
            >
              Calculadora
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {scrolled ? (
              <>
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
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  render={<Link href="/login" />}
                  className="text-white/65 hover:text-white hover:bg-white/10"
                >
                  Entrar
                </Button>
                <Button
                  size="sm"
                  render={<Link href="/cadastro" />}
                  className="bg-white text-[#152E1E] hover:bg-white/90 rounded-lg font-semibold"
                >
                  Sou cliente
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-[#152E1E] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-28 w-full">

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[0.93] text-white mb-8 max-w-4xl"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Planejamento{" "}
            <em className="not-italic" style={{ color: "#F9E784" }}>sustentável</em>
            {" "}para o seu evento.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl max-w-xl mb-12 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            A Loopp conecta você a fornecedores sustentáveis e monta um plano
            personalizado — com circularidade real, do primeiro detalhe ao pós-festa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-8 text-base font-bold transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: "#F9E784", color: "#152E1E" }}
            >
              Começar agora <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-8 text-base font-semibold border transition-all hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
            >
              Ver cases reais
            </Link>
          </motion.div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div
            className="relative w-px h-14 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="absolute w-full"
              style={{ height: 20, top: 0, background: "rgba(255,255,255,0.45)" }}
              animate={{ y: [-20, 56] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-[#E5D9BF]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5D9BF]">
            {STATS.map((s) => (
              <div key={s.label} className="px-8 sm:px-12 py-9">
                <p
                  className="text-4xl font-black text-[#2D6A4F] leading-none mb-1.5"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {s.valor}
                </p>
                <p className="text-sm text-[#555B68]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-start">

            <div>
              <h2
                className="text-5xl font-black text-[#1A1A1A] leading-tight mb-5"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Como funciona
              </h2>
              <p className="text-[#555B68] leading-relaxed mb-8 max-w-xs">
                Você descreve o evento, a gente monta o plano. Três passos.
              </p>
              <Button
                render={<Link href="/cadastro" />}
                className="bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl gap-2"
              >
                Começar agora <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div>
              {PASSOS.map((passo, i) => (
                <div
                  key={i}
                  className="border-t border-[#E5D9BF] py-7 grid grid-cols-[2.5rem_1fr] gap-5"
                >
                  <span
                    className="text-4xl font-black leading-none mt-0.5"
                    style={{ fontFamily: "var(--font-fraunces)", color: "#8A8178" }}
                  >
                    {passo.numero}
                  </span>
                  <div>
                    <h3
                      className="text-lg font-bold text-[#1A1A1A] mb-1.5"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {passo.titulo}
                    </h3>
                    <p className="text-sm text-[#555B68] leading-relaxed">{passo.desc}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#E5D9BF]" />
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="bg-[#F5EDD8] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <h2
              className="text-4xl font-black text-[#1A1A1A]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Eventos que já fecharam o ciclo
            </h2>
            <Button
              variant="outline"
              render={<Link href="/cases" />}
              className="shrink-0 border-[#2D6A4F]/30 text-[#2D6A4F] hover:bg-[#2D6A4F]/5 rounded-xl gap-1.5"
            >
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
            {CASES_MOCK[0] && (
              <Link
                href={`/cases/${CASES_MOCK[0].slug}`}
                className="group bg-white rounded-2xl border border-[#E5D9BF] overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="h-52 flex items-end p-6"
                  style={{ backgroundColor: "rgba(21,46,30,0.07)" }}
                >
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2D6A4F] text-white"
                  >
                    {CASES_MOCK[0].tipo}
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-2xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#2D6A4F] transition-colors"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {CASES_MOCK[0].evento}
                  </h3>
                  <p className="text-sm text-[#555B68] mb-5 leading-relaxed">
                    {CASES_MOCK[0].fraseImpacto}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Recycle className="h-4 w-4 text-[#2D6A4F]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#2D6A4F]">
                      {formatNum(CASES_MOCK[0].impacto.kgReaproveitado)} kg reaproveitados
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <div className="grid grid-rows-2 gap-4">
              {CASES_MOCK.slice(1, 3).map((caso) => (
                <Link
                  key={caso.slug}
                  href={`/cases/${caso.slug}`}
                  className="group bg-white rounded-2xl border border-[#E5D9BF] overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <div
                    className="h-24 flex items-end p-4"
                    style={{ backgroundColor: "rgba(21,46,30,0.07)" }}
                  >
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#2D6A4F] text-white"
                    >
                      {caso.tipo}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3
                      className="font-bold text-sm text-[#1A1A1A] leading-snug group-hover:text-[#2D6A4F] transition-colors"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {caso.evento}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Recycle className="h-3.5 w-3.5 text-[#2D6A4F]" aria-hidden="true" />
                      <span className="text-xs font-semibold text-[#2D6A4F]">
                        {formatNum(caso.impacto.kgReaproveitado)} kg
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="bg-[#152E1E] py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="font-black text-white leading-tight mb-8"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Celebrar não precisa custar ao planeta.
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            A Loopp conecta organizadores a uma rede de fornecedores que praticam
            a economia circular — de confecções comunitárias que reaproveitam
            tecidos à logística de baixa emissão.
          </p>
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 rounded-xl h-12 px-8 text-base font-bold transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ backgroundColor: "#F9E784", color: "#152E1E" }}
          >
            Começar meu evento <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Explorar */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/vitrine"
              className="group rounded-2xl p-8 border border-[#E5D9BF] bg-[#F5EDD8] hover:border-[#2D6A4F]/30 hover:shadow-md transition-all"
            >
              <h3
                className="text-2xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#2D6A4F] transition-colors"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Vitrine de materiais
              </h3>
              <p className="text-sm text-[#555B68] mb-5 leading-relaxed">
                Fantasias, tecidos, cenografia, energia renovável — tudo
                reaproveitado dos fornecedores parceiros.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D6A4F]">
                Explorar materiais <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/calculadora"
              className="group rounded-2xl p-8 border hover:border-[#2D6A4F]/30 hover:shadow-md transition-all"
              style={{
                backgroundColor: "rgba(45,106,79,0.05)",
                borderColor: "rgba(45,106,79,0.15)",
              }}
            >
              <h3
                className="text-2xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#2D6A4F] transition-colors"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Calculadora de impacto
              </h3>
              <p className="text-sm text-[#555B68] mb-5 leading-relaxed">
                Estime os kg reaproveitados, CO₂ evitado e árvores equivalentes
                antes de começar.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D6A4F]">
                Calcular meu impacto <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-[#152E1E] py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Logo size="sm" variant="white" />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Feche o ciclo do seu evento.
            </p>
          </div>
          <nav
            className="flex items-center flex-wrap justify-center gap-5 text-sm"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <Link href="/vitrine" className="hover:text-white transition-colors">Vitrine</Link>
            <Link href="/cases" className="hover:text-white transition-colors">Cases</Link>
            <Link href="/calculadora" className="hover:text-white transition-colors">Calculadora</Link>
            <Link href="/login" className="hover:text-white transition-colors">Entrar</Link>
          </nav>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>© 2026 Loopp</p>
        </div>
      </footer>
    </div>
  );
}
