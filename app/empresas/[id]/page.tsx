"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Tag, Leaf, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { getFornecedores, getUser } from "@/lib/mock-data";
import { Fornecedor, CategoriaFornecedor, CategoriaVitrine } from "@/lib/types";

const CATEGORIA_ACCENT: Record<CategoriaFornecedor, string> = {
  "Resíduos Têxteis": "#9333ea",
  "Confecção Sustentável": "#ec4899",
  "Energia Renovável": "#ca8a04",
  "Cenografia Sustentável": "#3A7D5A",
  "Logística Verde": "#3b82f6",
  Alimentação: "#f97316",
  Outro: "#888888",
};

const CATEGORIA_CORES: Record<CategoriaFornecedor, string> = {
  "Resíduos Têxteis": "bg-purple-900/30 text-purple-300 border-purple-800/40",
  "Confecção Sustentável": "bg-pink-900/30 text-pink-300 border-pink-800/40",
  "Energia Renovável": "bg-yellow-900/30 text-[#F9E784] border-yellow-800/40",
  "Cenografia Sustentável": "bg-[#3A7D5A]/15 text-[#4EAF7A] border-[#3A7D5A]/30",
  "Logística Verde": "bg-blue-900/30 text-blue-300 border-blue-800/40",
  Alimentação: "bg-orange-900/30 text-orange-300 border-orange-800/40",
  Outro: "bg-neutral-800/30 text-neutral-400 border-neutral-700/40",
};

const MATERIAL_CORES: Partial<Record<CategoriaVitrine, string>> = {
  Figurino: "bg-pink-900/30 text-pink-300 border-pink-800/40",
  "Resíduos Têxteis": "bg-purple-900/30 text-purple-300 border-purple-800/40",
  Cenografia: "bg-[#3A7D5A]/15 text-[#4EAF7A] border-[#3A7D5A]/30",
  Adereços: "bg-amber-900/30 text-amber-300 border-amber-800/40",
  Energia: "bg-yellow-900/30 text-[#F9E784] border-yellow-800/40",
  Logística: "bg-blue-900/30 text-blue-300 border-blue-800/40",
  Decoração: "bg-rose-900/30 text-rose-300 border-rose-800/40",
};

export default function EmpresaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [empresa, setEmpresa] = useState<Fornecedor | null>(null);
  const [userLogado, setUserLogado] = useState(false);

  useEffect(() => {
    const fornecedores = getFornecedores();
    const found = fornecedores.find((f) => f.id === id) ?? null;
    setEmpresa(found);
    const u = getUser();
    setUserLogado(!!u && u.tipo === "cliente");
  }, [id]);

  const ctaHref = userLogado ? "/novo-pedido" : "/cadastro";

  if (!empresa) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Leaf className="h-12 w-12 text-[#3A7D5A] mb-4 opacity-40" />
        <p className="text-[#888888]">Empresa não encontrada.</p>
        <Link href="/empresas" className="mt-4 text-sm text-[#3A7D5A] underline">
          Ver todas as empresas
        </Link>
      </div>
    );
  }

  const accent = CATEGORIA_ACCENT[empresa.categoria] ?? "#3A7D5A";
  const materiais = empresa.materiais ?? [];

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

      {/* Hero da empresa */}
      <section
        className="border-b border-[#E5E5E5] py-12"
        style={{ background: `linear-gradient(135deg, ${accent}10 0%, #F5F5F5 60%)` }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/empresas"
            className="inline-flex items-center gap-1.5 text-sm text-[#888888] hover:text-[#0A0A0A] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Todas as empresas
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 items-start"
          >
            {/* Avatar */}
            <div
              className="h-20 w-20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shrink-0 shadow-lg"
              style={{ backgroundColor: accent }}
            >
              {empresa.nome.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1
                  className="text-3xl font-bold text-[#0A0A0A]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {empresa.nome}
                </h1>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${CATEGORIA_CORES[empresa.categoria]}`}
                >
                  {empresa.categoria}
                </span>
              </div>
              <p className="text-[#888888] text-lg leading-relaxed max-w-2xl">
                {empresa.descricao}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Coluna lateral */}
          <div className="lg:col-span-1 flex flex-col gap-5">

            {/* Contato */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] p-5"
            >
              <h2 className="text-sm font-semibold text-[#0A0A0A] mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#3A7D5A]" />
                Contato
              </h2>
              <a
                href={`mailto:${empresa.contato}`}
                className="text-sm text-[#3A7D5A] hover:underline break-all"
              >
                {empresa.contato}
              </a>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] p-5"
            >
              <h2 className="text-sm font-semibold text-[#0A0A0A] mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-[#3A7D5A]" />
                Especialidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {empresa.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#3A7D5A]/8 text-[#3A7D5A] px-2.5 py-1 rounded-full border border-[#3A7D5A]/20 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0A0A0A] rounded-2xl p-5 text-center"
            >
              <Leaf className="h-8 w-8 text-[#3A7D5A] mx-auto mb-3" />
              <h3 className="text-white font-bold mb-1 text-sm">
                Quer essa empresa no seu evento?
              </h3>
              <p className="text-[#888888] text-xs mb-4">
                Faça um pedido e nossa equipe inclui {empresa.nome} no seu planejamento.
              </p>
              <Button
                render={<Link href={ctaHref} />}
                className="w-full bg-[#3A7D5A] text-white hover:bg-[#4EAF7A] rounded-full font-semibold text-sm"
              >
                Fazer um pedido
              </Button>
            </motion.div>
          </div>

          {/* Materiais */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2
                className="text-xl font-bold text-[#0A0A0A] mb-5 flex items-center gap-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <Package className="h-5 w-5 text-[#3A7D5A]" />
                Materiais disponíveis
                <span className="ml-1 text-sm font-normal text-[#888888]">
                  ({materiais.length})
                </span>
              </h2>

              {materiais.length === 0 ? (
                <div className="text-center py-16 bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5]">
                  <Package className="h-10 w-10 text-[#888888] mx-auto mb-3 opacity-40" />
                  <p className="text-[#888888] text-sm">Nenhum material cadastrado.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {materiais.map((material, i) => (
                    <motion.div
                      key={material.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="bg-[#F5F5F5] rounded-2xl border border-[#E5E5E5] p-5 hover:border-[#3A7D5A]/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-[#0A0A0A] text-sm leading-tight">
                          {material.nome}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border shrink-0 font-medium ${MATERIAL_CORES[material.categoria] ?? "bg-neutral-800/20 text-neutral-400 border-neutral-700/30"}`}
                        >
                          {material.categoria}
                        </span>
                      </div>

                      <p className="text-sm text-[#888888] leading-relaxed mb-3">
                        {material.descricao}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {material.tiposEvento.map((t) => (
                          <span
                            key={t}
                            className="text-xs bg-[#3A7D5A]/8 text-[#3A7D5A] px-2 py-0.5 rounded-full border border-[#3A7D5A]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] rounded-t-[24px] py-8 mt-8">
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
