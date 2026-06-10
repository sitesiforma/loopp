"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { getFornecedores, getUser } from "@/lib/mock-data";
import { Fornecedor, CategoriaFornecedor } from "@/lib/types";

const CATEGORIAS: CategoriaFornecedor[] = [
  "Resíduos Têxteis",
  "Confecção Sustentável",
  "Energia Renovável",
  "Cenografia Sustentável",
  "Logística Verde",
];

const CATEGORIA_CORES: Record<CategoriaFornecedor, string> = {
  "Resíduos Têxteis": "bg-purple-900/30 text-purple-300 border-purple-800/40",
  "Confecção Sustentável": "bg-pink-900/30 text-pink-300 border-pink-800/40",
  "Energia Renovável": "bg-yellow-900/30 text-[#F9E784] border-yellow-800/40",
  "Cenografia Sustentável": "bg-[#3A7D5A]/15 text-[#4EAF7A] border-[#3A7D5A]/30",
  "Logística Verde": "bg-blue-900/30 text-blue-300 border-blue-800/40",
  Alimentação: "bg-orange-900/30 text-orange-300 border-orange-800/40",
  Outro: "bg-neutral-800/30 text-neutral-400 border-neutral-700/40",
};

const CATEGORIA_ACCENT: Record<CategoriaFornecedor, string> = {
  "Resíduos Têxteis": "#9333ea",
  "Confecção Sustentável": "#ec4899",
  "Energia Renovável": "#F9E784",
  "Cenografia Sustentável": "#3A7D5A",
  "Logística Verde": "#3b82f6",
  Alimentação: "#f97316",
  Outro: "#888888",
};

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Fornecedor[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState<CategoriaFornecedor | "">("");
  const [busca, setBusca] = useState("");
  const [userLogado, setUserLogado] = useState(false);

  useEffect(() => {
    setEmpresas(getFornecedores());
    const u = getUser();
    setUserLogado(!!u && u.tipo === "cliente");
  }, []);

  const filtradas = useMemo(() => {
    return empresas.filter((e) => {
      if (categoriaFiltro && e.categoria !== categoriaFiltro) return false;
      if (busca) {
        const q = busca.toLowerCase();
        if (
          !e.nome.toLowerCase().includes(q) &&
          !e.descricao.toLowerCase().includes(q) &&
          !e.tags.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [empresas, categoriaFiltro, busca]);

  const ctaHref = userLogado ? "/novo-pedido" : "/cadastro";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav pill */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[800px] bg-[#111111]/95 border border-[#2A2A2A] rounded-[100px] backdrop-blur-[12px]">
        <div className="px-5 h-12 flex items-center justify-between gap-4">
          <Logo size="sm" href="/" />
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#888888]">
            <Link href="/empresas" className="text-white font-semibold">Empresas</Link>
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
      <div className="h-20" aria-hidden="true" />

      {/* Hero */}
      <section className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#3A7D5A]/10 border border-[#3A7D5A]/20 text-[#3A7D5A] text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
              <Leaf className="h-3.5 w-3.5" />
              Rede de parceiros
            </div>
            <h1
              className="text-4xl font-bold text-[#0A0A0A] mb-3"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Empresas de Sustentabilidade
            </h1>
            <p className="text-[#888888] text-lg max-w-2xl">
              Conheça os fornecedores parceiros da Loopp — empresas comprometidas
              com a economia circular e a produção sustentável de eventos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b border-[#E5E5E5] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
            <Input
              placeholder="Buscar empresa ou área..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9 border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-9 text-sm"
            />
          </div>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value as CategoriaFornecedor | "")}
            className="border border-[#E5E5E5] bg-white text-[#0A0A0A] rounded-full h-9 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A7D5A]/30 cursor-pointer"
          >
            <option value="">Todas as categorias</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {(categoriaFiltro || busca) && (
            <button
              onClick={() => { setCategoriaFiltro(""); setBusca(""); }}
              className="text-sm text-[#888888] hover:text-[#0A0A0A] transition-colors underline underline-offset-2"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </section>

      {/* Grid */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        {filtradas.length === 0 ? (
          <div className="text-center py-24">
            <Leaf className="h-14 w-14 text-[#2A2A2A] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-2">
              Nenhuma empresa encontrada
            </h2>
            <p className="text-[#888888]">Tente outros filtros ou limpe a busca.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#888888] mb-6">
              {filtradas.length}{" "}
              {filtradas.length === 1 ? "empresa encontrada" : "empresas encontradas"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtradas.map((empresa, i) => {
                const accent = CATEGORIA_ACCENT[empresa.categoria] ?? "#3A7D5A";
                const totalMateriais = empresa.materiais?.length ?? 0;
                return (
                  <motion.div
                    key={empresa.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={`/empresas/${empresa.id}`}
                      className="group block h-full bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] overflow-hidden hover:border-[#3A7D5A]/40 hover:shadow-lg transition-all duration-200"
                    >
                      {/* Faixa colorida */}
                      <div
                        className="h-2 w-full"
                        style={{ backgroundColor: accent, opacity: 0.7 }}
                      />

                      <div className="p-6 flex flex-col h-full">
                        {/* Header do card */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div
                            className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                            style={{ backgroundColor: accent }}
                          >
                            {empresa.nome.charAt(0)}
                          </div>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border font-medium shrink-0 ${CATEGORIA_CORES[empresa.categoria]}`}
                          >
                            {empresa.categoria}
                          </span>
                        </div>

                        <h3
                          className="text-lg font-bold text-[#0A0A0A] mb-2 group-hover:text-[#3A7D5A] transition-colors"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {empresa.nome}
                        </h3>

                        <p className="text-sm text-[#888888] leading-relaxed mb-4 flex-1"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {empresa.descricao}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {empresa.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-[#3A7D5A]/8 text-[#3A7D5A] px-2 py-0.5 rounded-full border border-[#3A7D5A]/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E5]">
                          <span className="text-xs text-[#888888]">
                            {totalMateriais}{" "}
                            {totalMateriais === 1 ? "material" : "materiais"}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#3A7D5A] font-semibold group-hover:gap-2 transition-all">
                            Saber mais <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 bg-[#0A0A0A] rounded-2xl p-8 text-center"
            >
              <h2
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Quer usar essas empresas no seu evento?
              </h2>
              <p className="text-[#888888] mb-6">
                Crie um pedido e nossa equipe monta o planejamento sustentável pra você.
              </p>
              <Button
                render={<Link href={ctaHref} />}
                className="bg-[#3A7D5A] text-white hover:bg-[#4EAF7A] rounded-full font-semibold px-8"
              >
                Fazer um pedido
              </Button>
            </motion.div>
          </>
        )}
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
            <Link href="/empresas" className="hover:text-white transition-colors">Empresas</Link>
            <Link href="/vitrine" className="hover:text-white transition-colors">Vitrine</Link>
            <Link href="/cases" className="hover:text-white transition-colors">Cases</Link>
            <Link href="/calculadora" className="hover:text-white transition-colors">Calculadora</Link>
          </nav>
          <p className="text-xs text-[#888888]/40">© 2026 Loopp</p>
        </div>
      </footer>
    </div>
  );
}
