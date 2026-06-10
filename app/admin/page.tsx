"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Package, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "@/components/Logo";
import StatusBadge from "@/components/StatusBadge";
import { getUser, getPedidos, setUser } from "@/lib/mock-data";
import { Pedido, StatusPedido, TipoEvento, User } from "@/lib/types";

const STATUSES: { value: StatusPedido | "todos"; label: string }[] = [
  { value: "todos", label: "Todos os status" },
  { value: "aguardando", label: "Aguardando análise" },
  { value: "em_planejamento", label: "Em planejamento" },
  { value: "planejamento_enviado", label: "Planejamento enviado" },
  { value: "aprovado", label: "Aprovado" },
  { value: "ajuste_solicitado", label: "Ajuste solicitado" },
];

const TIPOS: { value: TipoEvento | "todos"; label: string }[] = [
  { value: "todos", label: "Todos os tipos" },
  { value: "Festa", label: "Festa" },
  { value: "Desfile", label: "Desfile" },
  { value: "Show", label: "Show" },
  { value: "Corporativo", label: "Corporativo" },
  { value: "Casamento", label: "Casamento" },
  { value: "Formatura", label: "Formatura" },
  { value: "Outro", label: "Outro" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<StatusPedido | "todos">("todos");
  const [filtroTipo, setFiltroTipo] = useState<TipoEvento | "todos">("todos");

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    if (u.tipo !== "admin") { router.push("/dashboard"); return; }
    setUserState(u);
    setPedidos(getPedidos());
  }, [router]);

  function handleLogout() {
    setUser(null);
    router.push("/");
  }

  const pedidosFiltrados = pedidos.filter((p) => {
    const statusOk = filtroStatus === "todos" || p.status === filtroStatus;
    const tipoOk = filtroTipo === "todos" || p.tipoEvento === filtroTipo;
    return statusOk && tipoOk;
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] border-r border-[#2A2A2A] flex flex-col fixed h-full z-40">
        <div className="p-5 border-b border-[#2A2A2A]">
          <Logo size="md" href="/admin" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#3A7D5A]/10 text-[#3A7D5A] font-semibold text-sm"
          >
            <Package className="h-4 w-4" />
            Pedidos
          </Link>
          <Link
            href="/admin/fornecedores"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#888888] hover:bg-[#2A2A2A] hover:text-white font-medium text-sm transition-colors"
          >
            <Leaf className="h-4 w-4" />
            Fornecedores
          </Link>
        </nav>
        <div className="p-4 border-t border-[#2A2A2A]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors w-full"
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
          <div className="flex items-center justify-between mb-7">
            <div>
              <h1
                className="text-3xl font-bold text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Pedidos
              </h1>
              <p className="text-[#888888] mt-1 text-sm">
                {pedidosFiltrados.length} pedido{pedidosFiltrados.length !== 1 ? "s" : ""} encontrado{pedidosFiltrados.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#888888] bg-[#F5F5F5] border border-[#E5E5E5] px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#3A7D5A]" />
              Admin: {user.nome}
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-3 mb-6">
            <Select
              onValueChange={(v) => setFiltroStatus(v as StatusPedido | "todos")}
              defaultValue="todos"
            >
              <SelectTrigger className="w-52 bg-white border-[#E5E5E5] text-[#0A0A0A] rounded-full h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(v) => setFiltroTipo(v as TipoEvento | "todos")}
              defaultValue="todos"
            >
              <SelectTrigger className="w-48 bg-white border-[#E5E5E5] text-[#0A0A0A] rounded-full h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPOS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <Card className="bg-[#F5F5F5] border-[#E5E5E5] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5] bg-white">
                    <th className="text-left px-5 py-3.5 font-semibold text-[#888888] text-xs uppercase tracking-wider">Cliente</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-[#888888] text-xs uppercase tracking-wider">Evento</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-[#888888] text-xs uppercase tracking-wider">Tipo</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-[#888888] text-xs uppercase tracking-wider">Data</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-[#888888] text-xs uppercase tracking-wider">Orçamento</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-[#888888] text-xs uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-[#888888]">
                        Nenhum pedido encontrado com os filtros selecionados.
                      </td>
                    </tr>
                  ) : (
                    pedidosFiltrados.map((pedido) => (
                      <tr
                        key={pedido.id}
                        className="border-b border-[#E5E5E5] hover:bg-white transition-colors"
                      >
                        <td className="px-5 py-4 font-medium text-[#0A0A0A]">{pedido.clienteNome}</td>
                        <td className="px-5 py-4 text-[#0A0A0A] max-w-[200px]">
                          <span className="line-clamp-1">{pedido.nomeEvento}</span>
                        </td>
                        <td className="px-5 py-4 text-[#888888]">{pedido.tipoEvento}</td>
                        <td className="px-5 py-4 text-[#888888] whitespace-nowrap">{formatDate(pedido.dataEvento)}</td>
                        <td className="px-5 py-4 text-[#888888]">{pedido.orcamento}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={pedido.status} />
                        </td>
                        <td className="px-5 py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            render={<Link href={`/admin/pedido/${pedido.id}`} />}
                            className="border-[#3A7D5A]/30 text-[#3A7D5A] hover:bg-[#3A7D5A]/10 rounded-full whitespace-nowrap"
                          >
                            Ver / Gerenciar
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
