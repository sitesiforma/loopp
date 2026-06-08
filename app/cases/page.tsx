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
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[#E5D9BF] bg-[#F5EDD8]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" href="/" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/vitrine" className="text-[#6B7280] hover:text-[#2D6A4F] transition-colors">
              Vitrine
            </Link>
            <Link href="/cases" className="text-[#2D6A4F] font-semibold">
              Cases
            </Link>
            <Link href="/calculadora" className="text-[#6B7280] hover:text-[#2D6A4F] transition-colors">
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
      <section className="bg-white border-b border-[#E5D9BF] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#2D6A4F]/10 border border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-semibold px-3 py-1.5 rounded-full mb-5">
              <Recycle className="h-3.5 w-3.5" />
              Prova real
            </div>
            <h1
              className="text-5xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Eventos que fecharam o ciclo
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl mx-auto">
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
              className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[#E5D9BF] overflow-hidden flex flex-col hover:shadow-lg transition-shadow group"
            >
              {/* Capa placeholder */}
              <div
                className="h-44 relative overflow-hidden flex items-end p-5"
                style={{ backgroundColor: caso.corCard + "22" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 20% 50%, ${caso.corCard}66, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 opacity-20"
                  style={{ borderColor: caso.corCard }}
                />
                <div
                  className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border opacity-10"
                  style={{ borderColor: caso.corCard }}
                />
                <div className="relative z-10">
                  <span
                    className="inline-block text-xs font-bold px-2.5 py-1 rounded-full text-white mb-2"
                    style={{ backgroundColor: caso.corCard }}
                  >
                    {caso.tipo} · {caso.ano}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2
                  className="text-lg font-bold text-[#1A1A1A] mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {caso.evento}
                </h2>
                <p className="text-sm text-[#6B7280] mb-4">{caso.cliente}</p>

                <div className="flex items-center gap-2 bg-[#2D6A4F]/8 rounded-xl px-3 py-2 mb-5">
                  <Leaf className="h-4 w-4 text-[#2D6A4F] shrink-0" />
                  <span className="text-sm font-semibold text-[#2D6A4F]">
                    {formatNum(caso.impacto.kgReaproveitado)} kg reaproveitados
                  </span>
                </div>

                <Button
                  size="sm"
                  render={<Link href={`/cases/${caso.slug}`} />}
                  className="mt-auto w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl gap-1.5 font-semibold group-hover:bg-[#2D6A4F] transition-colors"
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
          className="mt-16 bg-[#2D6A4F] rounded-3xl p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-6 right-12 w-32 h-32 rounded-full border-2 border-white/10" />
          <div className="absolute bottom-4 left-8 w-20 h-20 rounded-full border border-white/10" />
          <h2
            className="text-3xl font-bold text-white mb-3 relative z-10"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Quer um evento assim?
          </h2>
          <p className="text-white/75 mb-6 relative z-10">
            Conte para a gente sobre o seu evento e receba um plano sustentável personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Button
              render={<Link href="/cadastro" />}
              className="bg-white text-[#2D6A4F] hover:bg-[#F9E784] rounded-xl px-6 font-semibold transition-colors"
            >
              Criar conta grátis
            </Button>
            <Button
              variant="outline"
              render={<Link href="/calculadora" />}
              className="border-white/40 text-white hover:bg-white/10 rounded-xl px-6"
            >
              Calcular meu impacto
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5D9BF] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Logo size="sm" />
            <p className="text-sm text-[#6B7280]">Feche o ciclo do seu evento.</p>
          </div>
          <nav className="flex items-center gap-5 text-sm text-[#6B7280]">
            <Link href="/" className="hover:text-[#2D6A4F] transition-colors">Início</Link>
            <Link href="/vitrine" className="hover:text-[#2D6A4F] transition-colors">Vitrine</Link>
            <Link href="/calculadora" className="hover:text-[#2D6A4F] transition-colors">Calculadora</Link>
          </nav>
          <p className="text-xs text-[#6B7280]/60">© 2026 Loopp</p>
        </div>
      </footer>
    </div>
  );
}
