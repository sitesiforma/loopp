"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, ClipboardList, CheckCircle, Recycle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { CASES_MOCK } from "@/lib/mock-data";
import { formatNum } from "@/lib/impact-calculator";

const TIPOS_EVENTO = [
  "Festa", "Desfile", "Show", "Corporativo", "Casamento",
  "Formatura", "Halloween", "Festa Junina", "Afropunk", "Conferência",
  "Lançamento", "Festival",
];

const PASSOS = [
  {
    icon: ClipboardList,
    numero: "01",
    titulo: "Descreva seu evento",
    desc: "Conte para a gente sobre o seu evento — tipo, tamanho, data e orçamento disponível.",
    bg: "#2D6A4F",
  },
  {
    icon: Leaf,
    numero: "02",
    titulo: "Receba seu plano sustentável",
    desc: "Nossa equipe monta um planejamento personalizado com fornecedores sustentáveis parceiros.",
    bg: "#4A90D9",
  },
  {
    icon: CheckCircle,
    numero: "03",
    titulo: "Aprove e realize",
    desc: "Revise, aprove o plano e deixe a Loopp fechar o ciclo do seu evento.",
    bg: "#1A1A1A",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[#E5D9BF] bg-[#F5EDD8]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B7280]">
            <Link href="/vitrine" className="hover:text-[#2D6A4F] transition-colors">Vitrine</Link>
            <Link href="/cases" className="hover:text-[#2D6A4F] transition-colors">Cases</Link>
            <Link href="/calculadora" className="hover:text-[#2D6A4F] transition-colors">Calculadora</Link>
          </nav>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" render={<Link href="/login" />} className="text-[#6B7280] hover:text-[#1A1A1A]">
              Entrar
            </Button>
            <Button
              size="sm"
              render={<Link href="/cadastro" />}
              className="bg-[#2D6A4F] text-white hover:bg-[#235540] rounded-lg"
            >
              Sou cliente
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex-1 flex items-center overflow-hidden min-h-[80vh]">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border-2 border-[#2D6A4F]/10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full border border-[#4A90D9]/10 pointer-events-none" />
        <div className="absolute top-1/2 right-[10%] w-48 h-48 rounded-full bg-[#F9E784]/40 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-[#2D6A4F]/10 border border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-semibold px-3 py-1.5 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
              Eventos que fecham o ciclo
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#1A1A1A] mb-6"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Planejamento{" "}
              <span className="text-[#2D6A4F]">sustentável</span>
              <br />
              para o seu evento.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg sm:text-xl text-[#6B7280] max-w-xl mb-10 leading-relaxed"
            >
              A Loopp conecta você a fornecedores sustentáveis e monta um plano
              personalizado para o seu evento — com circularidade real, do primeiro
              detalhe ao pós-festa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                size="lg"
                render={<Link href="/cadastro" />}
                className="bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl h-13 px-8 text-base font-semibold shadow-lg shadow-[#2D6A4F]/20 transition-all hover:shadow-xl hover:shadow-[#2D6A4F]/30 hover:-translate-y-0.5 gap-2"
              >
                Sou cliente <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/login" />}
                className="rounded-xl h-13 px-8 text-base font-semibold border-[#2D6A4F]/30 text-[#2D6A4F] hover:bg-[#2D6A4F]/5 hover:-translate-y-0.5 transition-all"
              >
                Entrar na plataforma
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2
              className="text-4xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Como funciona
            </h2>
            <p className="text-[#6B7280] text-lg">Simples, personalizado e sustentável.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PASSOS.map((passo, i) => {
              const Icon = passo.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="relative rounded-2xl p-7 bg-[#F5EDD8] border border-[#E5D9BF] hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: passo.bg + "20" }}
                  >
                    <Icon className="h-6 w-6" style={{ color: passo.bg }} />
                  </div>
                  <span
                    className="absolute top-6 right-6 text-5xl font-black opacity-5 select-none"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {passo.numero}
                  </span>
                  <h3
                    className="text-xl font-bold text-[#1A1A1A] mb-2"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {passo.titulo}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">{passo.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cases preview */}
      <section className="py-20 bg-[#F5EDD8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <h2
                className="text-4xl font-bold text-[#1A1A1A] mb-2"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Eventos que já fecharam o ciclo
              </h2>
              <p className="text-[#6B7280] text-lg">Resultados reais de quem já usou a Loopp.</p>
            </div>
            <Button
              variant="outline"
              render={<Link href="/cases" />}
              className="shrink-0 border-[#2D6A4F]/30 text-[#2D6A4F] hover:bg-[#2D6A4F]/5 rounded-xl gap-1.5"
            >
              Ver todos os cases <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES_MOCK.map((caso, i) => (
              <motion.div
                key={caso.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="bg-white rounded-2xl border border-[#E5D9BF] overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div
                  className="h-28 relative overflow-hidden flex items-end p-4"
                  style={{ backgroundColor: caso.corCard + "22" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 20% 60%, ${caso.corCard}55, transparent 70%)`,
                    }}
                  />
                  <span
                    className="relative z-10 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: caso.corCard }}
                  >
                    {caso.tipo}
                  </span>
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold text-[#1A1A1A] mb-1 leading-snug text-sm"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {caso.evento}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <Recycle className="h-3.5 w-3.5 text-[#2D6A4F]" />
                    <span className="text-xs font-semibold text-[#2D6A4F]">
                      {formatNum(caso.impacto.kgReaproveitado)} kg reaproveitados
                    </span>
                  </div>
                  <Link
                    href={`/cases/${caso.slug}`}
                    className="text-xs font-semibold text-[#4A90D9] hover:text-[#2D6A4F] transition-colors inline-flex items-center gap-1"
                  >
                    Ver case <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vitrine CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex flex-col md:flex-row items-center justify-between gap-8 bg-[#F5EDD8] rounded-3xl p-10 border border-[#E5D9BF]"
          >
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#4A90D9]/10 text-[#4A90D9] text-sm font-semibold px-3 py-1 rounded-full mb-3">
                <Leaf className="h-3.5 w-3.5" />
                Disponível agora
              </div>
              <h2
                className="text-3xl font-bold text-[#1A1A1A] mb-2"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Explore os materiais disponíveis
              </h2>
              <p className="text-[#6B7280] max-w-lg">
                Fantasias, tecidos, cenografia, energia renovável e muito mais — tudo
                reaproveitado dos fornecedores parceiros da Loopp.
              </p>
            </div>
            <Button
              render={<Link href="/vitrine" />}
              className="bg-[#4A90D9] hover:bg-[#3a7bc8] text-white rounded-xl px-8 h-11 font-semibold shrink-0 gap-2"
            >
              Ver vitrine <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quem atendemos */}
      <section className="py-20 bg-[#F5EDD8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-[#1A1A1A] mb-3"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Quem atendemos
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-[#6B7280] text-lg mb-10"
          >
            Do casamento íntimo ao festival de milhares.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="flex flex-wrap justify-center gap-3"
          >
            {TIPOS_EVENTO.map((tipo) => (
              <span
                key={tipo}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-[#E5D9BF] text-[#1A1A1A] hover:bg-[#2D6A4F] hover:text-white hover:border-[#2D6A4F] transition-colors cursor-default"
              >
                {tipo}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-20 bg-[#2D6A4F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full border-2 border-white" />
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-white" />
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Nossa missão
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-white/80 text-lg leading-relaxed"
          >
            A Loopp nasceu da crença de que eventos podem ser bonitos{" "}
            <em>e</em> responsáveis. Conectamos organizadores a uma rede de
            fornecedores que praticam a economia circular — de confecções
            comunitárias que reaproveitam tecidos à logística de baixa emissão.
            Cada evento com a Loopp é uma afirmação de que celebrar não precisa
            custar ao planeta.
          </motion.p>
        </div>
      </section>

      {/* Calculadora CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="inline-flex items-center gap-2 bg-[#4A90D9]/10 border border-[#4A90D9]/20 text-[#4A90D9] text-sm font-semibold px-3 py-1.5 rounded-full mb-5">
              <Calculator className="h-3.5 w-3.5" />
              Calculadora de Impacto
            </div>
            <h2
              className="text-4xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Descubra o impacto do seu evento
            </h2>
            <p className="text-[#6B7280] text-lg mb-8 max-w-xl mx-auto">
              Estime quantos kg de material serão reaproveitados, o CO₂ evitado
              e as árvores equivalentes ao realizar seu evento com a Loopp.
            </p>
            <Button
              render={<Link href="/calculadora" />}
              className="bg-[#4A90D9] hover:bg-[#3a7bc8] text-white rounded-xl px-10 h-12 font-semibold text-base gap-2 shadow-lg shadow-[#4A90D9]/20"
            >
              Calcular meu impacto <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5D9BF] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Logo size="sm" />
            <p className="text-sm text-[#6B7280]">Feche o ciclo do seu evento.</p>
          </div>
          <nav className="flex items-center gap-5 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#2D6A4F] transition-colors">Início</Link>
            <Link href="/vitrine" className="hover:text-[#2D6A4F] transition-colors">Vitrine</Link>
            <Link href="/cases" className="hover:text-[#2D6A4F] transition-colors">Cases</Link>
            <Link href="/calculadora" className="hover:text-[#2D6A4F] transition-colors">Calculadora</Link>
            <Link href="/login" className="hover:text-[#2D6A4F] transition-colors">Entrar</Link>
            <Link href="/cadastro" className="hover:text-[#2D6A4F] transition-colors">Cadastrar</Link>
          </nav>
          <p className="text-xs text-[#6B7280]/60">© 2026 Loopp</p>
        </div>
      </footer>
    </div>
  );
}
