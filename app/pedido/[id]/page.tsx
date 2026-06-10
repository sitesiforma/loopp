"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Calendar, MapPin, Users, Wallet, Recycle, Wind, TreePine, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import StatusBadge from "@/components/StatusBadge";
import Stepper from "@/components/Stepper";
import { getUser, getPedidos, savePedidos } from "@/lib/mock-data";
import {
  calcularImpacto,
  tamanhoParaConvidados,
  pedidoTemFantasias,
  formatNum,
} from "@/lib/impact-calculator";
import { Pedido, User } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const IMPACTO_ITEMS = [
  { key: "kgReaproveitado" as const, label: "Kg reaproveitado", icon: Recycle, cor: "#3A7D5A" },
  { key: "co2Evitado" as const, label: "Kg CO₂ evitado", icon: Wind, cor: "#4EAF7A" },
  { key: "arvores" as const, label: "Árvores equiv.", icon: TreePine, cor: "#3A7D5A" },
  { key: "itensResgatados" as const, label: "Itens resgatados", icon: Package, cor: "#4EAF7A" },
];

export default function PedidoPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    if (u.tipo === "admin") { router.push("/admin"); return; }
    setUser(u);
    const todos = getPedidos();
    const found = todos.find((p) => p.id === id);
    if (!found) { router.push("/dashboard"); return; }
    setPedido(found);
  }, [router, id]);

  function updateStatus(novoStatus: "aprovado" | "ajuste_solicitado") {
    if (!pedido) return;
    const pedidos = getPedidos();
    const updated = pedidos.map((p) =>
      p.id === pedido.id
        ? {
            ...p,
            status: novoStatus,
            historico: [
              ...p.historico,
              { status: novoStatus, data: new Date().toISOString() },
            ],
          }
        : p
    );
    savePedidos(updated);
    setPedido((prev) =>
      prev
        ? {
            ...prev,
            status: novoStatus,
            historico: [
              ...prev.historico,
              { status: novoStatus, data: new Date().toISOString() },
            ],
          }
        : prev
    );
    if (novoStatus === "aprovado") {
      toast.success("Planejamento aprovado! Em breve entraremos em contato.");
    } else {
      toast.info("Solicitação de ajuste enviada. Nossa equipe revisará em breve.");
    }
  }

  const impacto = pedido
    ? calcularImpacto({
        tipoEvento: pedido.tipoEvento,
        convidados: tamanhoParaConvidados(pedido.tamanho),
        fantasias: pedidoTemFantasias(pedido.tipoEvento),
        cenografia: true,
        decoracao: true,
      })
    : null;

  if (!user || !pedido) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userName={user.nome} />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-[#888888] hover:text-[#3A7D5A] mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao dashboard
          </Link>

          <div className="flex items-start justify-between gap-4 mb-7">
            <div>
              <h1
                className="text-3xl font-bold text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {pedido.nomeEvento}
              </h1>
              <p className="text-[#888888] mt-1 text-sm">
                Pedido criado em {formatDate(pedido.criadoEm)}
              </p>
            </div>
            <StatusBadge status={pedido.status} className="shrink-0 mt-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Detalhes */}
            <div className="lg:col-span-2 space-y-5">
              <Card className="p-6 bg-[#F5F5F5] border-[#E5E5E5] rounded-2xl">
                <h2
                  className="text-lg font-bold text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Dados do evento
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="h-4 w-4 text-[#3A7D5A] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#888888]">Data</p>
                      <p className="text-sm font-medium text-[#0A0A0A]">
                        {formatDate(pedido.dataEvento)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-[#3A7D5A] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#888888]">Local</p>
                      <p className="text-sm font-medium text-[#0A0A0A]">
                        {pedido.localizacao}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Users className="h-4 w-4 text-[#3A7D5A] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#888888]">Tamanho</p>
                      <p className="text-sm font-medium text-[#0A0A0A]">
                        {pedido.tamanho}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Wallet className="h-4 w-4 text-[#3A7D5A] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#888888]">Orçamento</p>
                      <p className="text-sm font-medium text-[#0A0A0A]">
                        {pedido.orcamento}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-[#E5E5E5]">
                  <p className="text-xs text-[#888888] mb-1">Descrição</p>
                  <p className="text-sm text-[#444444] leading-relaxed">
                    {pedido.descricao}
                  </p>
                </div>
              </Card>

              {/* Planejamento enviado */}
              {pedido.planejamento &&
                (pedido.status === "planejamento_enviado" ||
                  pedido.status === "aprovado" ||
                  pedido.status === "ajuste_solicitado") && (
                  <Card className="p-6 bg-[#F5F5F5] border-[#3A7D5A]/30 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#3A7D5A]" />
                      <h2
                        className="text-lg font-bold text-[#3A7D5A]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        Planejamento sustentável
                      </h2>
                    </div>
                    <div className="prose prose-sm max-w-none text-[#444444] whitespace-pre-wrap text-sm leading-relaxed">
                      {pedido.planejamento}
                    </div>

                    {pedido.status === "planejamento_enviado" && (
                      <div className="flex gap-3 mt-6 pt-5 border-t border-[#E5E5E5]">
                        <Button
                          onClick={() => updateStatus("aprovado")}
                          className="flex-1 bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full h-10 font-semibold"
                        >
                          Aprovar planejamento
                        </Button>
                        <Button
                          onClick={() => updateStatus("ajuste_solicitado")}
                          variant="outline"
                          className="flex-1 border-orange-500/40 text-orange-400 hover:bg-orange-500/10 rounded-full h-10"
                        >
                          Solicitar ajuste
                        </Button>
                      </div>
                    )}

                    {pedido.status === "aprovado" && (
                      <div className="mt-5 pt-4 border-t border-[#E5E5E5]">
                        <p className="text-sm text-[#3A7D5A] font-semibold">
                          ✓ Planejamento aprovado! Nossa equipe entrará em contato para os próximos passos.
                        </p>
                      </div>
                    )}

                    {pedido.status === "ajuste_solicitado" && (
                      <div className="mt-5 pt-4 border-t border-[#E5E5E5]">
                        <p className="text-sm text-orange-400 font-semibold">
                          Solicitação de ajuste enviada. Nossa equipe revisará e retornará em breve.
                        </p>
                      </div>
                    )}
                  </Card>
                )}

              {/* Card de impacto — só aparece quando aprovado */}
              {pedido.status === "aprovado" && impacto && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-6 bg-[#F5F5F5] border-[#3A7D5A]/30 rounded-2xl">
                    <div className="flex items-center gap-2 mb-5">
                      <Recycle className="h-5 w-5 text-[#3A7D5A]" />
                      <h2
                        className="text-lg font-bold text-[#3A7D5A]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        Impacto estimado do seu evento
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {IMPACTO_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const valor = impacto[item.key];
                        return (
                          <div
                            key={item.key}
                            className="bg-white rounded-xl p-4 text-center border border-[#E5E5E5]"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                              style={{ backgroundColor: item.cor + "18" }}
                            >
                              <Icon
                                className="h-4 w-4"
                                style={{ color: item.cor }}
                              />
                            </div>
                            <p
                              className="text-xl font-bold text-[#0A0A0A] mb-0.5"
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
                    <p className="text-xs text-[#888888] mt-4 leading-relaxed">
                      Estimativas baseadas nos dados do seu evento e na metodologia
                      Loopp. Valores reais podem variar conforme os fornecedores
                      acionados.
                    </p>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar: Stepper */}
            <div>
              <Card className="p-6 bg-[#F5F5F5] border-[#E5E5E5] rounded-2xl">
                <h2
                  className="text-base font-bold text-[#0A0A0A] mb-5"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Status do pedido
                </h2>
                <Stepper
                  statusAtual={pedido.status}
                  historico={pedido.historico}
                />
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
