"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "default" | "white";
  dark?: boolean;
}

export default function Logo({ size = "md", href = "/", dark = false }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <Link
      href={href}
      className="inline-flex items-center select-none"
      aria-label="Loopp — página inicial"
    >
      <span
        className={`${sizes[size]} ${dark ? "text-[#0A0A0A]" : "text-white"}`}
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 800, letterSpacing: "-0.025em" }}
      >
        Loo<span style={{ color: "#3A7D5A" }}>pp</span>
      </span>
    </Link>
  );
}
