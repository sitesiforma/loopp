"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { setUser } from "@/lib/mock-data";

interface HeaderProps {
  userName?: string;
  isAdmin?: boolean;
}

export default function Header({ userName, isAdmin }: HeaderProps) {
  const router = useRouter();

  function handleLogout() {
    setUser(null);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5D9BF] bg-[#F5EDD8]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo size="md" href={isAdmin ? "/admin" : userName ? "/dashboard" : "/"} />

        <div className="flex items-center gap-3">
          {userName ? (
            <>
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{userName}</span>
                {isAdmin && (
                  <span className="bg-[#2D6A4F] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    Admin
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-[#6B7280] hover:text-[#1A1A1A] gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" render={<Link href="/login" />}>
                Entrar
              </Button>
              <Button
                size="sm"
                render={<Link href="/cadastro" />}
                className="bg-[#2D6A4F] text-white hover:bg-[#235540]"
              >
                Sou cliente
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
