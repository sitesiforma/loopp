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
    <div className="min-h-screen bg-white flex flex-col">
      <Header userName={user.nome} />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de boas-vindas */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl overflow-hidden mb-8 h-36 bg-[#111111]"
        >
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&h=300&q=70"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
          <div className="relative z-10 h-full flex items-center justify-between px-7">
            <div>
              <p className="text-white/60 text-sm mb-1">Bem-vindo de volta</p>
              <h1
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {user.nome}
              </h1>
            </div>
            <Button
              render={<Link href="/novo-pedido" />}
              className="bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full gap-2 shrink-0"
            >
              <Plus className="h-4 w-4" />
              Novo pedido
            </Button>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              className="text-xl font-bold text-[#0A0A0A]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Meus eventos
            </h2>
            <p className="text-[#888888] mt-0.5 text-sm">
              {pedidos.length === 0
                ? "Nenhum pedido ainda."
                : `${pedidos.length} pedido${pedidos.length > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {pedidos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#3A7D5A]/10 flex items-center justify-center mb-5">
              <Leaf className="h-9 w-9 text-[#3A7D5A]" />
            </div>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Tudo pronto para começar
            </h2>
            <p className="text-[#888888] max-w-sm mb-7">
              Você ainda não tem pedidos. Crie seu primeiro evento sustentável e
              deixa a Loopp cuidar do resto.
            </p>
            <Button
              render={<Link href="/novo-pedido" />}
              className="bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full gap-2"
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
                <Card className="p-5 bg-[#F5F5F5] border-[#E5E5E5] rounded-2xl hover:border-[#3A7D5A]/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-[#0A0A0A] line-clamp-1">
                        {pedido.nomeEvento}
                      </h3>
                      <p className="text-xs text-[#888888] mt-0.5">
                        {pedido.tipoEvento} · {formatDate(pedido.dataEvento)}
                      </p>
                    </div>
                    <StatusBadge status={pedido.status} />
                  </div>
                  <p className="text-sm text-[#888888] mb-4 line-clamp-2">
                    {pedido.localizacao} · {pedido.tamanho}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={`/pedido/${pedido.id}`} />}
                    className="w-full border-[#3A7D5A]/30 text-[#3A7D5A] hover:bg-[#3A7D5A]/10 rounded-full"
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
