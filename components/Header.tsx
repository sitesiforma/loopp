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
    <>
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[720px] bg-[#111111]/95 border border-[#2A2A2A] rounded-[100px] backdrop-blur-[12px]">
        <div className="px-5 h-12 flex items-center justify-between gap-4">
          <Logo size="sm" href={isAdmin ? "/admin" : userName ? "/dashboard" : "/"} />

          <div className="flex items-center gap-2">
            {userName ? (
              <>
                <div className="flex items-center gap-2 text-sm text-[#888888]">
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{userName}</span>
                  {isAdmin && (
                    <span className="bg-[#3A7D5A] text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      Admin
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-[#888888] hover:text-white hover:bg-white/10 gap-1 rounded-full"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-xs">Sair</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  render={<Link href="/login" />}
                  className="text-[#888888] hover:text-white hover:bg-white/10 rounded-full text-xs"
                >
                  Entrar
                </Button>
                <Button
                  size="sm"
                  render={<Link href="/cadastro" />}
                  className="bg-[#3A7D5A] text-white hover:bg-[#4EAF7A] rounded-full text-xs font-semibold"
                >
                  Sou cliente
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
