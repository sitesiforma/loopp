"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import StatusBadge from "@/components/StatusBadge";
import { getUser, getPedidos } from "@/lib/mock-data";
import { Pedido, User } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    if (u.tipo === "admin") { router.push("/admin"); return; }
    setUser(u);
    const todos = getPedidos();
    setPedidos(todos.filter((p) => p.clienteId === u.id));
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      <Header userName={user.nome} />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-3xl font-bold text-[#1A1A1A]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Meus eventos
            </h1>
            <p className="text-[#6B7280] mt-1 text-sm">
              {pedidos.length === 0
                ? "Nenhum pedido ainda."
                : `${pedidos.length} pedido${pedidos.length > 1 ? "s" : ""}`}
            </p>
          </div>
          <Button
            render={<Link href="/novo-pedido" />}
            className="bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Novo Pedido
          </Button>
        </div>

        {/* Empty state */}
        {pedidos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center mb-5">
              <Leaf className="h-9 w-9 text-[#2D6A4F]" />
            </div>
            <h2
              className="text-2xl font-bold text-[#1A1A1A] mb-2"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Tudo pronto para começar
            </h2>
            <p className="text-[#6B7280] max-w-sm mb-7">
              Você ainda não tem pedidos. Crie seu primeiro evento sustentável e
              deixa a Loopp cuidar do resto.
            </p>
            <Button
              render={<Link href="/novo-pedido" />}
              className="bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl gap-2"
            >
              <Plus className="h-4 w-4" />
              Criar meu primeiro pedido
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pedidos.map((pedido, i) => (
              <motion.div
                key={pedido.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="p-5 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] line-clamp-1">
                        {pedido.nomeEvento}
                      </h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {pedido.tipoEvento} · {formatDate(pedido.dataEvento)}
                      </p>
                    </div>
                    <StatusBadge status={pedido.status} />
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                    {pedido.localizacao} · {pedido.tamanho}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={`/pedido/${pedido.id}`} />}
                    className="w-full border-[#2D6A4F]/30 text-[#2D6A4F] hover:bg-[#2D6A4F]/5 rounded-lg"
                  >
                    Ver detalhes
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
