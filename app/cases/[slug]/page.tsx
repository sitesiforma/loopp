"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Recycle, Wind, TreePine, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { CASES_MOCK } from "@/lib/mock-data";
import { formatNum } from "@/lib/impact-calculator";

const IMPACTO_ITEMS = [
  {
    key: "kgReaproveitado" as const,
    label: "Kg de material reaproveitado",
    icon: Recycle,
    cor: "#3A7D5A",
    sufixo: "kg",
  },
  {
    key: "co2Evitado" as const,
    label: "Kg de CO₂ evitado",
    icon: Wind,
    cor: "#3A7D5A",
    sufixo: "kg CO₂",
  },
  {
    key: "arvores" as const,
    label: "Árvores equivalentes",
    icon: TreePine,
    cor: "#4EAF7A",
    sufixo: "árvores",
  },
  {
    key: "itensResgatados" as const,
    label: "Itens resgatados do descarte",
    icon: Package,
    cor: "#4EAF7A",
    sufixo: "itens",
  },
];

export default function CaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const caso = CASES_MOCK.find((c) => c.slug === slug);

  if (!caso) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#888888] mb-4">Case não encontrado.</p>
          <Button render={<Link href="/cases" />} className="bg-[#3A7D5A] text-white rounded-full">
            Ver todos os cases
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav pill */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[800px] bg-[#111111]/95 border border-[#2A2A2A] rounded-[100px] backdrop-blur-[12px]">
        <div className="px-5 h-12 flex items-center justify-between gap-4">
          <Logo size="sm" href="/" />
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#888888]">
            <Link href="/empresas" className="hover:text-white transition-colors">Empresas</Link>
            <Link href="/vitrine" className="hover:text-white transition-colors">Vitrine</Link>
            <Link href="/cases" className="text-white font-semibold">Cases</Link>
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
      <div className="h-20" aria-hidden="true" />

      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative py-20 flex items-end overflow-hidden min-h-[320px] bg-[#111111]"
        >
          {caso.imagem && (
            <img
              src={caso.imagem}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/cases"
                className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Todos os cases
              </Link>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white bg-[#3A7D5A]">
                  {caso.tipo}
                </span>
                <span className="text-sm text-white/60">{caso.cliente} · {caso.ano}</span>
              </div>
              <h1
                className="text-4xl sm:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {caso.evento}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Conteúdo editorial */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          {/* Desafio */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#888888] mb-3">
              O desafio
            </h2>
            <p
              className="text-xl text-[#0A0A0A] leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {caso.desafio}
            </p>
          </motion.section>

          {/* Solução */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#888888] mb-3">
              A solução
            </h2>
            <p className="text-lg text-[#444444] leading-relaxed mb-5">
              {caso.solucao}
            </p>
            <div className="flex flex-wrap gap-2">
              {caso.fornecedores.map((f) => (
                <span
                  key={f}
                  className="text-sm bg-[#3A7D5A]/10 text-[#3A7D5A] border border-[#3A7D5A]/20 px-3 py-1 rounded-full font-medium cursor-default hover:bg-[#3A7D5A]/15 transition-colors"
                >
                  {f}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Impacto */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#888888] mb-5">
              Impacto
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {IMPACTO_ITEMS.map((item) => {
                const Icon = item.icon;
                const valor = caso.impacto[item.key];
                return (
                  <div
                    key={item.key}
                    className="bg-[#F5F5F5] rounded-2xl p-5 border border-[#E5E5E5] text-center"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: item.cor + "18" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.cor }} />
                    </div>
                    <p
                      className="text-2xl font-bold text-[#0A0A0A] mb-0.5"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {formatNum(valor)}
                    </p>
                    <p className="text-xs text-[#888888] leading-tight">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Depoimento */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#F5F5F5] rounded-3xl p-10 border border-[#E5E5E5]"
          >
            <div
              className="text-6xl leading-none text-[#3A7D5A]/20 mb-2 select-none"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              "
            </div>
            <p
              className="text-xl text-[#0A0A0A] leading-relaxed mb-5 italic"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {caso.depoimento}
            </p>
            <p className="text-sm font-semibold text-[#3A7D5A]">
              — {caso.autorDepoimento}
            </p>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center py-6"
          >
            <h2
              className="text-3xl font-bold text-[#0A0A0A] mb-3"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Quer um evento assim?
            </h2>
            <p className="text-[#888888] mb-7">
              Conte sobre o seu evento e receba um plano sustentável personalizado.
            </p>
            <Button
              render={<Link href="/cadastro" />}
              className="bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full px-8 h-11 font-semibold text-base"
            >
              Criar conta grátis
            </Button>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] rounded-t-[24px] py-8 mt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Logo size="sm" />
            <p className="text-sm text-[#888888]">Feche o ciclo do seu evento.</p>
          </div>
          <nav className="flex items-center gap-5 text-sm text-[#888888]">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <Link href="/vitrine" className="hover:text-white transition-colors">Vitrine</Link>
            <Link href="/calculadora" className="hover:text-white transition-colors">Calculadora</Link>
          </nav>
          <p className="text-xs text-[#888888]/40">© 2026 Loopp</p>
        </div>
      </footer>
    </div>
  );
}
