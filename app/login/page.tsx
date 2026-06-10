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
import Logo from "@/components/Logo";
import { setUser } from "@/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !senha) {
      toast.error("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (email === "admin@loopp.com" && senha === "admin123") {
      setUser({ id: "admin", nome: "Admin Loopp", email, tipo: "admin" });
      toast.success("Bem-vindo, Admin!");
      router.push("/admin");
    } else {
      const nome = email.split("@")[0].replace(/[._]/g, " ");
      setUser({ id: `c_${Date.now()}`, nome, email, tipo: "cliente" });
      toast.success(`Bem-vindo de volta!`);
      router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Painel esquerdo — imagem */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#111111]">
        <img
          src="https://images.unsplash.com/photo-1519741347686-99eda95cc0ec?auto=format&fit=crop&w=900&q=75"
          alt="Evento sustentável"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-[#3A7D5A]/20" />
        <div className="relative z-10 flex flex-col justify-between p-10 h-full">
          <Logo size="md" />
          <div>
            <p
              className="text-3xl font-bold text-white leading-snug mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Celebrar não precisa custar ao planeta.
            </p>
            <p className="text-white/50 text-sm">
              Conectamos você a fornecedores sustentáveis e montamos um plano completo para o seu evento.
            </p>
          </div>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
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
            Entrar na plataforma
          </h1>
          <p className="text-sm text-[#888888] mb-7">
            Acesse sua conta para gerenciar seus eventos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-[#0A0A0A]">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 focus:border-[#3A7D5A] rounded-full h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="senha" className="text-sm font-medium text-[#0A0A0A]">
                Senha
              </Label>
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="border-[#E5E5E5] bg-white text-[#0A0A0A] placeholder:text-[#888888]/60 focus:border-[#3A7D5A] rounded-full h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3A7D5A] hover:bg-[#4EAF7A] text-white rounded-full h-11 font-semibold mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-sm text-[#888888] mt-6">
            Não tem conta?{" "}
            <Link href="/cadastro" className="text-[#3A7D5A] font-semibold hover:text-[#4EAF7A]">
              Cadastre-se
            </Link>
          </p>

          <p className="text-xs text-[#888888]/40 mt-8">
            Admin: admin@loopp.com / admin123
          </p>
        </motion.div>
      </div>
    </div>
  );
}
