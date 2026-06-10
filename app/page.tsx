"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

const springBtn = { type: "spring", stiffness: 380, damping: 26 } as const;

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Nav pill */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[800px] bg-[#111111]/95 border border-[#2A2A2A] rounded-[100px] backdrop-blur-[12px]">
        <div className="px-5 h-12 flex items-center justify-between gap-4">
          <Logo size="sm" />
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#888888]">
            <Link href="/empresas" className="hover:text-white transition-colors">Empresas</Link>
            <Link href="/vitrine" className="hover:text-white transition-colors">Vitrine</Link>
            <Link href="/cases" className="hover:text-white transition-colors">Cases</Link>
            <Link href="/calculadora" className="hover:text-white transition-colors">Calculadora</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/login" />}
              className="text-[#888888] hover:text-white hover:bg-white/10 rounded-full"
            >
              Entrar
            </Button>
            <Button
              size="sm"
              render={<Link href="/cadastro" />}
              className="bg-[#3A7D5A] text-white hover:bg-[#4EAF7A] rounded-full font-semibold"
            >
              Sou cliente
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        ref={heroRef}
        className="w-full bg-[#111111] rounded-b-[24px] overflow-hidden min-h-screen flex items-center relative"
      >
        {/* Foto com parallax */}
        <motion.img
          src="/hero-carnaval.jpg"
          alt=""
          aria-hidden="true"
          style={{ y: heroImgY }}
          className="absolute left-0 top-[-10%] w-full h-[120%] object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-28 w-full relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-black leading-[0.93] text-white mb-8 max-w-4xl"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Planejamento{" "}
            <em className="not-italic" style={{ color: "#F9E784" }}>sustentável</em>
            {" "}para o seu evento.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="text-lg sm:text-xl max-w-xl mb-12 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            A Loopp conecta você a fornecedores sustentáveis e monta um plano
            personalizado — com circularidade real, do primeiro detalhe ao pós-festa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34, ease }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} transition={springBtn}>
              <Link
                href="/cadastro"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-base font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ backgroundColor: "#F9E784", color: "#0A0A0A" }}
              >
                Começar agora <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} transition={springBtn}>
              <Link
                href="/cases"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-base font-semibold border hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
              >
                Ver cases reais
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className="relative w-px h-14 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="absolute w-full"
              style={{ height: 20, top: 0, background: "rgba(255,255,255,0.4)" }}
              animate={{ y: [-20, 56] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5]"
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={fadeUpItem} className="px-8 sm:px-12 py-9">
                <p className="text-4xl font-black text-[#3A7D5A] leading-none mb-1.5" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {s.valor}
                </p>
                <p className="text-sm text-[#888888]">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-start">

            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease }}
            >
              <h2 className="text-5xl font-black text-[#0A0A0A] leading-tight mb-5" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Como funciona
              </h2>
              <p className="text-[#888888] leading-relaxed mb-8 max-w-xs">
                Você descreve o evento, a gente monta o plano. Três passos.
              </p>
              <Button
                render={<Link href="/cadastro" />}
                className="bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full gap-2"
              >
                Começar agora <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {PASSOS.map((passo, i) => (
                <motion.div
                  key={i}
                  variants={slideLeft}
                  className="border-t border-[#E5E5E5] py-7 grid grid-cols-[2.5rem_1fr] gap-5"
                >
                  <span className="text-4xl font-black leading-none mt-0.5" style={{ fontFamily: "var(--font-dm-sans)", color: "#CCCCCC" }}>
                    {passo.numero}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-1.5" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {passo.titulo}
                    </h3>
                    <p className="text-sm text-[#444444] leading-relaxed">{passo.desc}</p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-[#E5E5E5]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-24 border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
          >
            <h2 className="text-4xl font-black text-[#0A0A0A]" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Eventos que já fecharam o ciclo
            </h2>
            <Button
              variant="outline"
              render={<Link href="/cases" />}
              className="shrink-0 border-[#3A7D5A]/30 text-[#3A7D5A] hover:bg-[#3A7D5A]/10 rounded-full gap-1.5"
            >
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
            {CASES_MOCK[0] && (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease }}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              >
                <Link
                  href={`/cases/${CASES_MOCK[0].slug}`}
                  className="group bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] overflow-hidden hover:border-[#3A7D5A]/30 transition-colors block"
                >
                  <div className="h-52 relative overflow-hidden flex items-end p-6">
                    <div className="absolute inset-0 bg-[#3A7D5A]/07" />
                    {CASES_MOCK[0].imagem && (
                      <img
                        src={CASES_MOCK[0].imagem}
                        alt={CASES_MOCK[0].evento}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="relative z-10 text-xs font-bold px-2.5 py-1 rounded-full bg-[#3A7D5A] text-white">
                      {CASES_MOCK[0].tipo}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2 group-hover:text-[#3A7D5A] transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {CASES_MOCK[0].evento}
                    </h3>
                    <p className="text-sm text-[#444444] mb-5 leading-relaxed">{CASES_MOCK[0].fraseImpacto}</p>
                    <div className="flex items-center gap-1.5">
                      <Recycle className="h-4 w-4 text-[#3A7D5A]" aria-hidden="true" />
                      <span className="text-sm font-semibold text-[#3A7D5A]">
                        {formatNum(CASES_MOCK[0].impacto.kgReaproveitado)} kg reaproveitados
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            <div className="grid grid-rows-2 gap-4">
              {CASES_MOCK.slice(1, 3).map((caso, i) => (
                <motion.div
                  key={caso.slug}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="h-full"
                >
                  <Link
                    href={`/cases/${caso.slug}`}
                    className="group bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] overflow-hidden hover:border-[#3A7D5A]/30 transition-colors flex flex-col h-full"
                  >
                    <div className="h-24 relative overflow-hidden flex items-end p-4">
                      <div className="absolute inset-0 bg-[#3A7D5A]/07" />
                      {caso.imagem && (
                        <img
                          src={caso.imagem}
                          alt={caso.evento}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      <span className="relative z-10 text-xs font-bold px-2 py-0.5 rounded-full bg-[#3A7D5A] text-white">
                        {caso.tipo}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="font-bold text-sm text-[#0A0A0A] leading-snug group-hover:text-[#3A7D5A] transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {caso.evento}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Recycle className="h-3.5 w-3.5 text-[#3A7D5A]" aria-hidden="true" />
                        <span className="text-xs font-semibold text-[#3A7D5A]">
                          {formatNum(caso.impacto.kgReaproveitado)} kg
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bloco editorial */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease }}
        className="w-full bg-[#0A0A0A] rounded-[24px] overflow-hidden py-28 my-2"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="font-black text-white leading-tight mb-8"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
          >
            Celebrar não precisa custar ao planeta.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25, ease }}
            className="text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            A Loopp conecta organizadores a uma rede de fornecedores que praticam
            a economia circular — de confecções comunitárias que reaproveitam
            tecidos à logística de baixa emissão.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35, ease }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: "inline-block" }}
          >
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 rounded-full h-12 px-8 text-base font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: "#F9E784", color: "#0A0A0A" }}
            >
              Começar meu evento <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Explorar */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={fadeUpItem}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
            >
              <Link
                href="/vitrine"
                className="group rounded-2xl p-8 border border-[#E5E5E5] bg-[#F5F5F5] hover:border-[#3A7D5A]/30 transition-colors block"
              >
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2 group-hover:text-[#3A7D5A] transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Vitrine de materiais
                </h3>
                <p className="text-sm text-[#444444] mb-5 leading-relaxed">
                  Fantasias, tecidos, cenografia, energia renovável — tudo reaproveitado dos fornecedores parceiros.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3A7D5A]">
                  Explorar materiais <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
            <motion.div
              variants={fadeUpItem}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
            >
              <Link
                href="/calculadora"
                className="group rounded-2xl p-8 border hover:border-[#3A7D5A]/30 transition-colors block"
                style={{ backgroundColor: "rgba(58,125,90,0.05)", borderColor: "rgba(58,125,90,0.15)" }}
              >
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2 group-hover:text-[#3A7D5A] transition-colors" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Calculadora de impacto
                </h3>
                <p className="text-sm text-[#444444] mb-5 leading-relaxed">
                  Estime os kg reaproveitados, CO₂ evitado e árvores equivalentes antes de começar.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3A7D5A]">
                  Calcular meu impacto <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0A0A0A] rounded-t-[24px] overflow-hidden py-10 mt-2"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Logo size="sm" />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Feche o ciclo do seu evento.</p>
          </div>
          <nav className="flex items-center flex-wrap justify-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <Link href="/empresas" className="hover:text-white transition-colors">Empresas</Link>
            <Link href="/vitrine" className="hover:text-white transition-colors">Vitrine</Link>
            <Link href="/cases" className="hover:text-white transition-colors">Cases</Link>
            <Link href="/calculadora" className="hover:text-white transition-colors">Calculadora</Link>
            <Link href="/login" className="hover:text-white transition-colors">Entrar</Link>
          </nav>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>© 2026 Loopp</p>
        </div>
      </motion.footer>
    </div>
  );
}
