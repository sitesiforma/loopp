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
  { key: "kgReaproveitado" as const, label: "Kg reaproveitado", icon: Recycle, cor: "#2D6A4F" },
  { key: "co2Evitado" as const, label: "Kg CO₂ evitado", icon: Wind, cor: "#4A90D9" },
  { key: "arvores" as const, label: "Árvores equiv.", icon: TreePine, cor: "#2D6A4F" },
  { key: "itensResgatados" as const, label: "Itens resgatados", icon: Package, cor: "#4A90D9" },
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
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      <Header userName={user.nome} />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#2D6A4F] mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao dashboard
          </Link>

          <div className="flex items-start justify-between gap-4 mb-7">
            <div>
              <h1
                className="text-3xl font-bold text-[#1A1A1A]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {pedido.nomeEvento}
              </h1>
              <p className="text-[#6B7280] mt-1 text-sm">
                Pedido criado em {formatDate(pedido.criadoEm)}
              </p>
            </div>
            <StatusBadge status={pedido.status} className="shrink-0 mt-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Detalhes */}
            <div className="lg:col-span-2 space-y-5">
              <Card className="p-6 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <h2
                  className="text-lg font-bold text-[#1A1A1A] mb-4"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Dados do evento
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Data</p>
                      <p className="text-sm font-medium text-[#1A1A1A]">
                        {formatDate(pedido.dataEvento)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Local</p>
                      <p className="text-sm font-medium text-[#1A1A1A]">
                        {pedido.localizacao}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Users className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Tamanho</p>
                      <p className="text-sm font-medium text-[#1A1A1A]">
                        {pedido.tamanho}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Wallet className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Orçamento</p>
                      <p className="text-sm font-medium text-[#1A1A1A]">
                        {pedido.orcamento}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-[#E5D9BF]">
                  <p className="text-xs text-[#6B7280] mb-1">Descrição</p>
                  <p className="text-sm text-[#1A1A1A] leading-relaxed">
                    {pedido.descricao}
                  </p>
                </div>
              </Card>

              {/* Planejamento enviado */}
              {pedido.planejamento &&
                (pedido.status === "planejamento_enviado" ||
                  pedido.status === "aprovado" ||
                  pedido.status === "ajuste_solicitado") && (
                  <Card className="p-6 bg-white border-[#2D6A4F]/30 rounded-2xl shadow-[0_2px_16px_rgba(45,106,79,0.08)]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
                      <h2
                        className="text-lg font-bold text-[#2D6A4F]"
                        style={{ fontFamily: "var(--font-fraunces)" }}
                      >
                        Planejamento sustentável
                      </h2>
                    </div>
                    <div className="prose prose-sm max-w-none text-[#1A1A1A] whitespace-pre-wrap text-sm leading-relaxed">
                      {pedido.planejamento}
                    </div>

                    {pedido.status === "planejamento_enviado" && (
                      <div className="flex gap-3 mt-6 pt-5 border-t border-[#E5D9BF]">
                        <Button
                          onClick={() => updateStatus("aprovado")}
                          className="flex-1 bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl h-10 font-semibold"
                        >
                          Aprovar planejamento
                        </Button>
                        <Button
                          onClick={() => updateStatus("ajuste_solicitado")}
                          variant="outline"
                          className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl h-10"
                        >
                          Solicitar ajuste
                        </Button>
                      </div>
                    )}

                    {pedido.status === "aprovado" && (
                      <div className="mt-5 pt-4 border-t border-[#E5D9BF]">
                        <p className="text-sm text-[#2D6A4F] font-semibold">
                          ✓ Planejamento aprovado! Nossa equipe entrará em contato para os próximos passos.
                        </p>
                      </div>
                    )}

                    {pedido.status === "ajuste_solicitado" && (
                      <div className="mt-5 pt-4 border-t border-[#E5D9BF]">
                        <p className="text-sm text-orange-600 font-semibold">
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
                  <Card className="p-6 bg-white border-[#4A90D9]/30 rounded-2xl shadow-[0_2px_16px_rgba(74,144,217,0.08)]">
                    <div className="flex items-center gap-2 mb-5">
                      <Recycle className="h-5 w-5 text-[#4A90D9]" />
                      <h2
                        className="text-lg font-bold text-[#4A90D9]"
                        style={{ fontFamily: "var(--font-fraunces)" }}
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
                            className="bg-[#F5EDD8] rounded-xl p-4 text-center border border-[#E5D9BF]"
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
                              className="text-xl font-bold text-[#1A1A1A] mb-0.5"
                              style={{ fontFamily: "var(--font-fraunces)" }}
                            >
                              {formatNum(valor)}
                            </p>
                            <p className="text-xs text-[#6B7280] leading-tight">
                              {item.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-4 leading-relaxed">
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
              <Card className="p-6 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <h2
                  className="text-base font-bold text-[#1A1A1A] mb-5"
                  style={{ fontFamily: "var(--font-fraunces)" }}
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
