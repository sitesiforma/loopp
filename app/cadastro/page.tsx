"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "@/components/Logo";
import { setUser } from "@/lib/mock-data";

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipoConta: "",
    empresa: "",
  });
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nome || !form.email || !form.senha || !form.confirmarSenha || !form.tipoConta) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }
    if (form.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (form.tipoConta === "pj" && !form.empresa) {
      toast.error("Informe o nome da empresa.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setUser({
      id: `c_${Date.now()}`,
      nome: form.nome,
      email: form.email,
      tipo: "cliente",
      tipoConta: form.tipoConta,
      empresa: form.empresa,
    });
    toast.success("Conta criada! Bem-vindo à Loopp.");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <Card className="p-8 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)] border-[#E5D9BF] rounded-2xl">
          <h1
            className="text-2xl font-bold text-[#1A1A1A] mb-1 text-center"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Criar sua conta
          </h1>
          <p className="text-sm text-[#6B7280] text-center mb-7">
            Comece a planejar eventos sustentáveis.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#1A1A1A]">Nome completo *</Label>
              <Input
                placeholder="Seu nome"
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                className="border-[#E5D9BF] rounded-lg h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#1A1A1A]">E-mail *</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="border-[#E5D9BF] rounded-lg h-11"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#1A1A1A]">Senha *</Label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={form.senha}
                  onChange={(e) => update("senha", e.target.value)}
                  className="border-[#E5D9BF] rounded-lg h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#1A1A1A]">Confirmar *</Label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={form.confirmarSenha}
                  onChange={(e) => update("confirmarSenha", e.target.value)}
                  className="border-[#E5D9BF] rounded-lg h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#1A1A1A]">Tipo de conta *</Label>
              <Select onValueChange={(v) => update("tipoConta", v as string)}>
                <SelectTrigger className="border-[#E5D9BF] rounded-lg h-11">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pf">Pessoa Física</SelectItem>
                  <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.tipoConta === "pj" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-1.5"
              >
                <Label className="text-sm font-medium text-[#1A1A1A]">Nome da empresa *</Label>
                <Input
                  placeholder="Razão social ou nome fantasia"
                  value={form.empresa}
                  onChange={(e) => update("empresa", e.target.value)}
                  className="border-[#E5D9BF] rounded-lg h-11"
                />
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl h-11 font-semibold mt-2"
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Já tem conta?{" "}
            <Link href="/login" className="text-[#2D6A4F] font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
