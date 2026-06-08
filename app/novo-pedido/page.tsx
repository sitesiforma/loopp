"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import { getUser, getPedidos, savePedidos } from "@/lib/mock-data";
import { User, TipoEvento, TamanhoEvento } from "@/lib/types";

const TIPOS: TipoEvento[] = ["Festa", "Desfile", "Show", "Corporativo", "Casamento", "Formatura", "Outro"];
const TAMANHOS: TamanhoEvento[] = [
  "Até 50 pessoas", "50–200 pessoas", "200–500 pessoas", "500–1000 pessoas", "+1000 pessoas",
];

export default function NovoPedidoPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nomeEvento: "",
    tipoEvento: "" as TipoEvento | "",
    dataEvento: "",
    localizacao: "",
    tamanho: "" as TamanhoEvento | "",
    orcamento: "",
    descricao: "",
  });

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    if (u.tipo === "admin") { router.push("/admin"); return; }
    setUser(u);
  }, [router]);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nomeEvento || !form.tipoEvento || !form.dataEvento || !form.localizacao || !form.tamanho || !form.orcamento || !form.descricao) {
      toast.error("Preencha todos os campos.");
      return;
    }
    if (form.descricao.length < 100) {
      toast.error("A descrição deve ter pelo menos 100 caracteres.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const pedidos = getPedidos();
    const novo = {
      id: `p_${Date.now()}`,
      clienteId: user!.id,
      clienteNome: user!.nome,
      nomeEvento: form.nomeEvento,
      tipoEvento: form.tipoEvento as TipoEvento,
      dataEvento: form.dataEvento,
      localizacao: form.localizacao,
      tamanho: form.tamanho as TamanhoEvento,
      orcamento: form.orcamento,
      descricao: form.descricao,
      status: "aguardando" as const,
      historico: [{ status: "aguardando" as const, data: new Date().toISOString() }],
      criadoEm: new Date().toISOString(),
    };
    savePedidos([...pedidos, novo]);
    toast.success("Pedido enviado! Nossa equipe entrará em contato em breve.");
    router.push("/dashboard");
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      <Header userName={user.nome} />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-[#1A1A1A]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Novo pedido
            </h1>
            <p className="text-[#6B7280] mt-1">
              Conte sobre o seu evento e nossa equipe monta o planejamento sustentável.
            </p>
          </div>

          <Card className="p-7 bg-white border-[#E5D9BF] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label className="font-medium text-[#1A1A1A]">Nome do evento *</Label>
                <Input
                  placeholder="Ex: Casamento da Marina e Pedro"
                  value={form.nomeEvento}
                  onChange={(e) => update("nomeEvento", e.target.value)}
                  className="border-[#E5D9BF] rounded-lg h-11"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-medium text-[#1A1A1A]">Tipo de evento *</Label>
                  <Select onValueChange={(v) => update("tipoEvento", v as string)}>
                    <SelectTrigger className="border-[#E5D9BF] rounded-lg h-11">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-medium text-[#1A1A1A]">Data do evento *</Label>
                  <Input
                    type="date"
                    value={form.dataEvento}
                    onChange={(e) => update("dataEvento", e.target.value)}
                    className="border-[#E5D9BF] rounded-lg h-11"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-medium text-[#1A1A1A]">Localização *</Label>
                  <Input
                    placeholder="Cidade, Estado"
                    value={form.localizacao}
                    onChange={(e) => update("localizacao", e.target.value)}
                    className="border-[#E5D9BF] rounded-lg h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="font-medium text-[#1A1A1A]">Tamanho estimado *</Label>
                  <Select onValueChange={(v) => update("tamanho", v as string)}>
                    <SelectTrigger className="border-[#E5D9BF] rounded-lg h-11">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {TAMANHOS.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="font-medium text-[#1A1A1A]">Orçamento disponível *</Label>
                <Input
                  placeholder="R$ 0,00"
                  value={form.orcamento}
                  onChange={(e) => update("orcamento", e.target.value)}
                  className="border-[#E5D9BF] rounded-lg h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="font-medium text-[#1A1A1A]">
                  Descrição do evento *
                  <span className="text-[#6B7280] font-normal ml-1 text-xs">
                    (mín. 100 caracteres — {form.descricao.length}/100)
                  </span>
                </Label>
                <Textarea
                  placeholder="Conte mais sobre o evento e o que você precisa. Inclua detalhes sobre o estilo, necessidades especiais, fornecedores que já tem em mente..."
                  value={form.descricao}
                  onChange={(e) => update("descricao", e.target.value)}
                  className="border-[#E5D9BF] rounded-lg min-h-[130px] resize-y"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 border-[#E5D9BF] text-[#6B7280] rounded-xl h-11"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl h-11 font-semibold"
                >
                  {loading ? "Enviando..." : "Enviar pedido"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
