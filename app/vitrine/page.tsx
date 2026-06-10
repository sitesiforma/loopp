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

const CATEGORIA_IMAGENS: Record<CategoriaVitrine, string> = {
  Figurino:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&h=280&q=70",
  "Resíduos Têxteis":
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&h=280&q=70",
  Cenografia:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&h=280&q=70",
  Adereços:
    "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=600&h=280&q=70",
  Energia:
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&h=280&q=70",
  Logística:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&h=280&q=70",
  Decoração:
    "https://images.unsplash.com/photo-1519225421880-453fee844ee0?auto=format&fit=crop&w=600&h=280&q=70",
};

const CATEGORIA_CORES: Record<CategoriaVitrine, string> = {
  Figurino: "bg-pink-900/30 text-pink-300 border-pink-800/40",
  "Resíduos Têxteis": "bg-purple-900/30 text-purple-300 border-purple-800/40",
  Cenografia: "bg-[#3A7D5A]/15 text-[#4EAF7A] border-[#3A7D5A]/30",
  Adereços: "bg-amber-900/30 text-amber-300 border-amber-800/40",
  Energia: "bg-yellow-900/30 text-[#F9E784] border-yellow-800/40",
  Logística: "bg-blue-900/30 text-blue-300 border-blue-800/40",
  Decoração: "bg-rose-900/30 text-rose-300 border-rose-800/40",
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav pill */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[800px] bg-[#111111]/95 border border-[#2A2A2A] rounded-[100px] backdrop-blur-[12px]">
        <div className="px-5 h-12 flex items-center justify-between gap-4">
          <Logo size="sm" href="/" />
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#888888]">
            <Link href="/empresas" className="hover:text-white transition-colors">Empresas</Link>
            <Link href="/vitrine" className="text-white font-semibold">Vitrine</Link>
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
              Materiais sustentáveis
            </div>
            <h1
              className="text-4xl font-bold text-[#0A0A0A] mb-3"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Vitrine de Materiais
            </h1>
            <p className="text-[#888888] text-lg max-w-2xl">
              Explore os materiais disponíveis nos fornecedores parceiros da
              Loopp. Tudo reaproveitado, tudo com história.
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
              placeholder="Buscar material ou fornecedor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9 border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-9 text-sm"
            />
          </div>
          <select
            value={categoriaFiltro}
            onChange={(e) =>
              setCategoriaFiltro(e.target.value as CategoriaVitrine | "")
            }
            className="border border-[#E5E5E5] bg-white text-[#0A0A0A] rounded-full h-9 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A7D5A]/30 cursor-pointer"
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
            className="border border-[#E5E5E5] bg-white text-[#0A0A0A] rounded-full h-9 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A7D5A]/30 cursor-pointer"
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
              className="text-sm text-[#888888] hover:text-white transition-colors underline underline-offset-2"
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
            <Package className="h-14 w-14 text-[#2A2A2A] mx-auto mb-4" />
            <h2
              className="text-xl font-bold text-[#0A0A0A] mb-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Nenhum material encontrado
            </h2>
            <p className="text-[#888888]">Tente outros filtros ou limpe a busca.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#888888] mb-6">
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
                    className="group bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] overflow-hidden flex flex-col hover:border-[#3A7D5A]/30 transition-colors"
                  >
                    {/* Imagem da categoria */}
                    <div className="h-36 relative overflow-hidden bg-[#3A7D5A]/06">
                      <img
                        src={CATEGORIA_IMAGENS[material.categoria]}
                        alt={material.categoria}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const t = e.currentTarget;
                          t.style.display = "none";
                          (t.nextElementSibling as HTMLElement | null)?.style.setProperty("display", "flex");
                        }}
                      />
                      {/* Fallback ícone — oculto por padrão, visível se imagem falhar */}
                      <div
                        className="absolute inset-0 items-center justify-center"
                        style={{ display: "none" }}
                      >
                        <Icon className="h-12 w-12 text-[#3A7D5A] opacity-40" />
                      </div>
                      {/* Overlay sutil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-[#0A0A0A] text-sm leading-tight">
                          {material.nome}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border shrink-0 font-medium ${CATEGORIA_CORES[material.categoria]}`}
                        >
                          {material.categoria}
                        </span>
                      </div>

                      <span className="inline-block text-xs bg-[#3A7D5A]/10 text-[#3A7D5A] px-2 py-0.5 rounded-full font-medium mb-2 w-fit">
                        {material.fornecedorNome}
                      </span>

                      <p className="text-sm text-[#888888] leading-relaxed flex-1 mb-4 overflow-hidden"
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
                            className="text-xs bg-[#3A7D5A]/8 text-[#3A7D5A] px-2 py-0.5 rounded-full border border-[#3A7D5A]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        render={<Link href={ctaHref} />}
                        className="w-full bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full font-semibold"
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
      <footer className="bg-[#0A0A0A] rounded-t-[24px] py-8 mt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Logo size="sm" />
            <p className="text-sm text-[#888888]">Feche o ciclo do seu evento.</p>
          </div>
          <nav className="flex items-center gap-5 text-sm text-[#888888]">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <Link href="/cases" className="hover:text-white transition-colors">Cases</Link>
            <Link href="/calculadora" className="hover:text-white transition-colors">Calculadora</Link>
          </nav>
          <p className="text-xs text-[#888888]/40">© 2026 Loopp</p>
        </div>
      </footer>
    </div>
  );
}
