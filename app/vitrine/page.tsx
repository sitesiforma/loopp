"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Leaf, Zap, Truck, Shirt, Star, Package, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { getFornecedores, getUser } from "@/lib/mock-data";
import { Material, TipoEvento, CategoriaVitrine } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

const CATEGORIAS_VITRINE: CategoriaVitrine[] = [
  "Figurino",
  "Resíduos Têxteis",
  "Cenografia",
  "Adereços",
  "Energia",
  "Logística",
  "Decoração",
];

const TIPOS_EVENTO: TipoEvento[] = [
  "Festa",
  "Desfile",
  "Show",
  "Corporativo",
  "Casamento",
  "Formatura",
];

const CATEGORIA_ICONES: Record<CategoriaVitrine, LucideIcon> = {
  Figurino: Shirt,
  "Resíduos Têxteis": Recycle,
  Cenografia: Package,
  Adereços: Star,
  Energia: Zap,
  Logística: Truck,
  Decoração: Leaf,
};

const CATEGORIA_CORES: Record<CategoriaVitrine, string> = {
  Figurino: "bg-pink-100 text-pink-700 border-pink-200",
  "Resíduos Têxteis": "bg-purple-100 text-purple-700 border-purple-200",
  Cenografia: "bg-green-100 text-green-700 border-green-200",
  Adereços: "bg-amber-100 text-amber-700 border-amber-200",
  Energia: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Logística: "bg-blue-100 text-blue-700 border-blue-200",
  Decoração: "bg-rose-100 text-rose-700 border-rose-200",
};

export default function VitrinePage() {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState<CategoriaVitrine | "">("");
  const [tipoFiltro, setTipoFiltro] = useState<TipoEvento | "">("");
  const [busca, setBusca] = useState("");
  const [userLogado, setUserLogado] = useState(false);

  useEffect(() => {
    const fornecedores = getFornecedores();
    const all: Material[] = fornecedores.flatMap((f) =>
      (f.materiais ?? []).map((m) => ({
        ...m,
        fornecedorId: f.id,
        fornecedorNome: f.nome,
      }))
    );
    setMateriais(all);
    const u = getUser();
    setUserLogado(!!u && u.tipo === "cliente");
  }, []);

  const filtrados = useMemo(() => {
    return materiais.filter((m) => {
      if (categoriaFiltro && m.categoria !== categoriaFiltro) return false;
      if (tipoFiltro && !m.tiposEvento.includes(tipoFiltro)) return false;
      if (busca) {
        const q = busca.toLowerCase();
        if (
          !m.nome.toLowerCase().includes(q) &&
          !m.fornecedorNome.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [materiais, categoriaFiltro, tipoFiltro, busca]);

  const ctaHref = userLogado ? "/novo-pedido" : "/cadastro";

  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[#E5D9BF] bg-[#F5EDD8]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" href="/" />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/vitrine"
              className="text-[#2D6A4F] font-semibold"
            >
              Vitrine
            </Link>
            <Link href="/cases" className="text-[#6B7280] hover:text-[#2D6A4F] transition-colors">
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
      <section className="bg-white border-b border-[#E5D9BF] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#2D6A4F]/10 border border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
              <Leaf className="h-3.5 w-3.5" />
              Materiais sustentáveis
            </div>
            <h1
              className="text-4xl font-bold text-[#1A1A1A] mb-3"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Vitrine de Materiais
            </h1>
            <p className="text-[#6B7280] text-lg max-w-2xl">
              Explore os materiais disponíveis nos fornecedores parceiros da
              Loopp. Tudo reaproveitado, tudo com história.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-[#F5EDD8] border-b border-[#E5D9BF] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input
              placeholder="Buscar material ou fornecedor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9 border-[#E5D9BF] bg-white rounded-lg h-9 text-sm"
            />
          </div>
          <select
            value={categoriaFiltro}
            onChange={(e) =>
              setCategoriaFiltro(e.target.value as CategoriaVitrine | "")
            }
            className="border border-[#E5D9BF] bg-white rounded-lg h-9 px-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 cursor-pointer"
          >
            <option value="">Todas as categorias</option>
            {CATEGORIAS_VITRINE.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={tipoFiltro}
            onChange={(e) =>
              setTipoFiltro(e.target.value as TipoEvento | "")
            }
            className="border border-[#E5D9BF] bg-white rounded-lg h-9 px-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 cursor-pointer"
          >
            <option value="">Todos os eventos</option>
            {TIPOS_EVENTO.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {(categoriaFiltro || tipoFiltro || busca) && (
            <button
              onClick={() => {
                setCategoriaFiltro("");
                setTipoFiltro("");
                setBusca("");
              }}
              className="text-sm text-[#6B7280] hover:text-[#2D6A4F] transition-colors underline underline-offset-2"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </section>

      {/* Grid */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        {filtrados.length === 0 ? (
          <div className="text-center py-24">
            <Package className="h-14 w-14 text-[#E5D9BF] mx-auto mb-4" />
            <h2
              className="text-xl font-bold text-[#1A1A1A] mb-2"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Nenhum material encontrado
            </h2>
            <p className="text-[#6B7280]">Tente outros filtros ou limpe a busca.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#6B7280] mb-6">
              {filtrados.length}{" "}
              {filtrados.length === 1 ? "material encontrado" : "materiais encontrados"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtrados.map((material, i) => {
                const Icon = CATEGORIA_ICONES[material.categoria] ?? Package;
                return (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-[#E5D9BF] overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                  >
                    {/* Placeholder colorido */}
                    <div
                      className="h-32 flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: material.cor + "22" }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(circle at 30% 40%, ${material.cor}55, transparent 65%)`,
                        }}
                      />
                      <Icon
                        className="h-12 w-12 relative z-10 opacity-80"
                        style={{ color: material.cor }}
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-[#1A1A1A] text-sm leading-tight">
                          {material.nome}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border shrink-0 font-medium ${CATEGORIA_CORES[material.categoria]}`}
                        >
                          {material.categoria}
                        </span>
                      </div>

                      <span className="inline-block text-xs bg-[#2D6A4F]/10 text-[#2D6A4F] px-2 py-0.5 rounded-full font-medium mb-2 w-fit">
                        {material.fornecedorNome}
                      </span>

                      <p className="text-sm text-[#6B7280] leading-relaxed flex-1 mb-4 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {material.descricao}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {material.tiposEvento.map((t) => (
                          <span
                            key={t}
                            className="text-xs bg-[#F9E784]/60 text-[#7A6800] px-2 py-0.5 rounded-full border border-[#E8D04A]/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        render={<Link href={ctaHref} />}
                        className="w-full bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl font-semibold"
                      >
                        Tenho interesse
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
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
            <Link href="/cases" className="hover:text-[#2D6A4F] transition-colors">Cases</Link>
            <Link href="/calculadora" className="hover:text-[#2D6A4F] transition-colors">Calculadora</Link>
          </nav>
          <p className="text-xs text-[#6B7280]/60">© 2026 Loopp</p>
        </div>
      </footer>
    </div>
  );
}
