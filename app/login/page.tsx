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
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col items-center justify-center px-4">
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
            Entrar na plataforma
          </h1>
          <p className="text-sm text-[#6B7280] text-center mb-7">
            Acesse sua conta para gerenciar seus eventos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#E5D9BF] focus:border-[#2D6A4F] focus:ring-[#2D6A4F] rounded-lg h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="senha" className="text-sm font-medium text-[#1A1A1A]">
                Senha
              </Label>
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="border-[#E5D9BF] focus:border-[#2D6A4F] focus:ring-[#2D6A4F] rounded-lg h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D6A4F] hover:bg-[#235540] text-white rounded-xl h-11 font-semibold mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Não tem conta?{" "}
            <Link href="/cadastro" className="text-[#2D6A4F] font-semibold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </Card>

        <p className="text-center text-xs text-[#6B7280]/60 mt-4">
          Admin: admin@loopp.com / admin123
        </p>
      </motion.div>
    </div>
  );
}
