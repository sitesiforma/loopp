"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { CASES_MOCK } from "@/lib/mock-data";
import { formatNum } from "@/lib/impact-calculator";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function CasesPage() {
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

      {/* Hero */}
      <section className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#3A7D5A]/10 border border-[#3A7D5A]/20 text-[#3A7D5A] text-sm font-semibold px-3 py-1.5 rounded-full mb-5">
              <Recycle className="h-3.5 w-3.5" />
              Prova real
            </div>
            <h1
              className="text-5xl font-bold text-[#0A0A0A] mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Eventos que fecharam o ciclo
            </h1>
            <p className="text-[#888888] text-lg max-w-xl mx-auto">
              Veja como marcas e produtoras realizaram eventos com impacto real,
              conectando-se à rede Loopp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de cases */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {CASES_MOCK.map((caso, i) => (
            <motion.div
              key={caso.slug}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i}
              className="bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] overflow-hidden flex flex-col hover:border-[#3A7D5A]/30 transition-colors group"
            >
              <div className="h-44 relative overflow-hidden flex items-end p-5">
                <div className="absolute inset-0 bg-[#3A7D5A]/06" />
                {caso.imagem && (
                  <img
                    src={caso.imagem}
                    alt={caso.evento}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="relative z-10">
                  <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full text-white bg-[#3A7D5A]">
                    {caso.tipo} · {caso.ano}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2
                  className="text-lg font-bold text-[#0A0A0A] mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {caso.evento}
                </h2>
                <p className="text-sm text-[#888888] mb-4">{caso.cliente}</p>

                <div className="flex items-center gap-2 bg-[#3A7D5A]/8 rounded-full px-3 py-2 mb-5">
                  <Leaf className="h-4 w-4 text-[#3A7D5A] shrink-0" />
                  <span className="text-sm font-semibold text-[#3A7D5A]">
                    {formatNum(caso.impacto.kgReaproveitado)} kg reaproveitados
                  </span>
                </div>

                <Button
                  size="sm"
                  render={<Link href={`/cases/${caso.slug}`} />}
                  className="mt-auto w-full bg-[#E5E5E5] hover:bg-[#3A7D5A] text-[#0A0A0A] hover:text-white rounded-full gap-1.5 font-semibold transition-colors"
                >
                  Ver case
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-[#3A7D5A] rounded-3xl p-10 text-center"
        >
          <h2
            className="text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Quer um evento assim?
          </h2>
          <p className="text-white/75 mb-6">
            Conte para a gente sobre o seu evento e receba um plano sustentável personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              render={<Link href="/cadastro" />}
              className="bg-white text-[#3A7D5A] hover:bg-[#F9E784] rounded-full px-6 font-semibold transition-colors"
            >
              Criar conta grátis
            </Button>
            <Button
              variant="outline"
              render={<Link href="/calculadora" />}
              className="border-white/40 text-white hover:bg-white/10 rounded-full px-6"
            >
              Calcular meu impacto
            </Button>
          </div>
        </motion.div>
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
