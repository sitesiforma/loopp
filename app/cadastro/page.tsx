"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="min-h-screen bg-white flex">
      {/* Painel esquerdo — imagem */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#111111]">
        <img
          src="https://images.unsplash.com/photo-1540575467-a5e0e9d6a76c?auto=format&fit=crop&w=900&q=75"
          alt="Festival sustentável"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-[#3A7D5A]/20" />
        <div className="relative z-10 flex flex-col justify-between p-10 h-full">
          <Logo size="md" />
          <div>
            <p
              className="text-3xl font-bold text-white leading-snug mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Seu evento começa aqui.
            </p>
            <p className="text-white/50 text-sm">
              Acesse a rede de fornecedores sustentáveis e monte um plano personalizado para o seu evento.
            </p>
          </div>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-8 lg:hidden">
          <Logo size="lg" dark />
        </div>

        <h1
          className="text-2xl font-bold text-[#0A0A0A] mb-1"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Criar sua conta
        </h1>
        <p className="text-sm text-[#888888] mb-7">
          Comece a planejar eventos sustentáveis.
        </p>

        <div className="space-y-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#0A0A0A]">Nome completo *</Label>
              <Input
                placeholder="Seu nome"
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#0A0A0A]">E-mail *</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-11"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#0A0A0A]">Senha *</Label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={form.senha}
                  onChange={(e) => update("senha", e.target.value)}
                  className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#0A0A0A]">Confirmar *</Label>
                <Input
                  type="password"
                  placeholder="••••••"
                  value={form.confirmarSenha}
                  onChange={(e) => update("confirmarSenha", e.target.value)}
                  className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#0A0A0A]">Tipo de conta *</Label>
              <Select onValueChange={(v) => update("tipoConta", v as string)}>
                <SelectTrigger className="border-[#E5E5E5] bg-white text-[#0A0A0A] rounded-full h-11">
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
                <Label className="text-sm font-medium text-[#0A0A0A]">Nome da empresa *</Label>
                <Input
                  placeholder="Razão social ou nome fantasia"
                  value={form.empresa}
                  onChange={(e) => update("empresa", e.target.value)}
                  className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 rounded-full h-11"
                />
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full h-11 font-semibold mt-2"
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <p className="text-sm text-[#888888] mt-6">
            Já tem conta?{" "}
            <Link href="/login" className="text-[#3A7D5A] font-semibold hover:text-[#4EAF7A]">
              Entrar
            </Link>
          </p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
