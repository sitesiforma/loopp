"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Leaf, Package, LogOut, Calendar, MapPin, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import StatusBadge from "@/components/StatusBadge";
import Stepper from "@/components/Stepper";
import { getUser, getPedidos, savePedidos, getFornecedores, setUser as setUserStorage } from "@/lib/mock-data";
import { Pedido, User, Fornecedor } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_LABELS: Record<string, string> = {
  aguardando: "Aguardando análise",
  em_planejamento: "Em planejamento",
  planejamento_enviado: "Planejamento enviado",
  aprovado: "Aprovado",
  ajuste_solicitado: "Ajuste solicitado",
};

export default function AdminPedidoPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [user, setUserState] = useState<User | null>(null);
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [planejamento, setPlanejamento] = useState("");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    if (u.tipo !== "admin") { router.push("/dashboard"); return; }
    setUserState(u);
    const todos = getPedidos();
    const found = todos.find((p) => p.id === id);
    if (!found) { router.push("/admin"); return; }
    setPedido(found);
    setPlanejamento(found.planejamento || "");
    setSelecionados(found.fornecedoresSelecionados || []);
    setFornecedores(getFornecedores());
  }, [router, id]);

  function handleLogout() {
    setUserStorage(null);
    router.push("/");
  }

  function toggleFornecedor(fId: string) {
    setSelecionados((prev) =>
      prev.includes(fId) ? prev.filter((x) => x !== fId) : [...prev, fId]
    );
  }

  async function handleSalvar(novoStatus?: "planejamento_enviado" | "aprovado") {
    if (!pedido) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    const pedidos = getPedidos();
    const status = novoStatus ?? pedido.status;
    const historico =
      novoStatus && novoStatus !== pedido.status
        ? [...pedido.historico, { status: novoStatus, data: new Date().toISOString() }]
        : pedido.historico;

    const updated = pedidos.map((p) =>
      p.id === pedido.id
        ? { ...p, planejamento, fornecedoresSelecionados: selecionados, status, historico }
        : p
    );
    savePedidos(updated);
    setPedido((prev) =>
      prev ? { ...prev, planejamento, fornecedoresSelecionados: selecionados, status, historico } : prev
    );
    setSaving(false);
    if (novoStatus === "planejamento_enviado") {
      toast.success("Planejamento enviado ao cliente!");
    } else if (novoStatus === "aprovado") {
      toast.success("Pedido marcado como aprovado.");
    } else {
      toast.success("Rascunho salvo.");
    }
  }

  if (!user || !pedido) return null;

  return (
    <div className="min-h-screen bg-[#F5EDD8] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E5D9BF] flex flex-col fixed h-full z-40">
        <div className="p-5 border-b border-[#E5D9BF]">
          <Logo size="md" href="/admin" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#6B7280] hover:bg-[#F5EDD8] hover:text-[#1A1A1A] font-medium text-sm transition-colors"
          >
            <Package className="h-4 w-4" />
            Pedidos
          </Link>
          <Link
            href="/admin/fornecedores"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#6B7280] hover:bg-[#F5EDD8] hover:text-[#1A1A1A] font-medium text-sm transition-colors"
          >
            <Leaf className="h-4 w-4" />
            Fornecedores
          </Link>
        </nav>
        <div className="p-4 border-t border-[#E5D9BF]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#2D6A4F] mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar aos pedidos
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
                Cliente: <span className="font-medium text-[#1A1A1A]">{pedido.clienteNome}</span>
              </p>
            </div>
            <StatusBadge status={pedido.status} className="shrink-0 mt-1" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              {/* Dados do evento */}
              <Card className="p-6 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <h2
                  className="text-lg font-bold text-[#1A1A1A] mb-4"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Dados do evento
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Data</p>
                      <p className="text-sm font-medium">{formatDate(pedido.dataEvento)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Local</p>
                      <p className="text-sm font-medium">{pedido.localizacao}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Users className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Tamanho</p>
                      <p className="text-sm font-medium">{pedido.tamanho}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Wallet className="h-4 w-4 text-[#4A90D9] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Orçamento</p>
                      <p className="text-sm font-medium">{pedido.orcamento}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#E5D9BF]">
                  <p className="text-xs text-[#6B7280] mb-1">Descrição</p>
                  <p className="text-sm text-[#1A1A1A] leading-relaxed">{pedido.descricao}</p>
                </div>
              </Card>

              {/* Fornecedores */}
              <Card className="p-6 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <h2
                  className="text-lg font-bold text-[#1A1A1A] mb-4"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Fornecedores sugeridos
                </h2>
                <div className="space-y-3">
                  {fornecedores.map((f) => (
                    <div
                      key={f.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        selecionados.includes(f.id)
                          ? "border-[#2D6A4F]/40 bg-[#2D6A4F]/5"
                          : "border-[#E5D9BF] hover:bg-[#F5EDD8]/60"
                      }`}
                      onClick={() => toggleFornecedor(f.id)}
                    >
                      <Checkbox
                        checked={selecionados.includes(f.id)}
                        onCheckedChange={() => toggleFornecedor(f.id)}
                        className="mt-0.5 border-[#2D6A4F] data-[state=checked]:bg-[#2D6A4F]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-[#1A1A1A]">{f.nome}</p>
                          <span className="text-xs bg-[#4A90D9]/10 text-[#4A90D9] px-2 py-0.5 rounded-full border border-[#4A90D9]/20">
                            {f.categoria}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{f.descricao}</p>
                        <p className="text-xs text-[#2D6A4F] mt-1">{f.contato}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Editor de planejamento */}
              <Card className="p-6 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <h2
                  className="text-lg font-bold text-[#1A1A1A] mb-4"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Planejamento sustentável
                </h2>
                <Textarea
                  placeholder="Descreva o planejamento: quais fornecedores serão acionados, o que cada um entrega, cronograma de contato, estimativa de custo e impacto sustentável..."
                  value={planejamento}
                  onChange={(e) => setPlanejamento(e.target.value)}
                  className="border-[#E5D9BF] rounded-xl min-h-[220px] resize-y text-sm leading-relaxed"
                />

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleSalvar()}
                    disabled={saving}
                    className="flex-1 border-[#E5D9BF] text-[#6B7280] rounded-xl h-10"
                  >
                    {saving ? "Salvando..." : "Salvar rascunho"}
                  </Button>
                  <Button
                    onClick={() => handleSalvar("planejamento_enviado")}
                    disabled={saving || !planejamento.trim()}
                    className="flex-1 bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl h-10 font-semibold"
                  >
                    Enviar ao cliente
                  </Button>
                </div>

                {(pedido.status === "planejamento_enviado" || pedido.status === "aprovado") && (
                  <Button
                    onClick={() => handleSalvar("aprovado")}
                    disabled={saving}
                    variant="outline"
                    className="w-full mt-2 border-[#2D6A4F]/30 text-[#2D6A4F] hover:bg-[#2D6A4F]/5 rounded-xl h-10"
                  >
                    Marcar como aprovado
                  </Button>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <Card className="p-5 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <h3
                  className="text-base font-bold text-[#1A1A1A] mb-4"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Histórico
                </h3>
                <div className="space-y-3">
                  {[...pedido.historico].reverse().map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#2D6A4F] mt-1.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A]">
                          {STATUS_LABELS[h.status] || h.status}
                        </p>
                        <p className="text-xs text-[#6B7280]">{formatDateTime(h.data)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <h3
                  className="text-base font-bold text-[#1A1A1A] mb-4"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Status do fluxo
                </h3>
                <Stepper statusAtual={pedido.status} historico={pedido.historico} />
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
