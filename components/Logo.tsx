"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function Logo({ size = "md", href = "/" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <Link href={href} className="inline-flex items-center group select-none">
      <span
        className={`font-bold tracking-tight ${sizes[size]}`}
        style={{ fontFamily: "var(--font-fraunces)", color: "#2D6A4F" }}
      >
        Loo
      </span>
      <span className="relative inline-flex items-center">
        <svg
          viewBox="0 0 40 20"
          className={size === "sm" ? "h-5 w-8" : size === "md" ? "h-6 w-10" : "h-9 w-14"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <text
            x="0"
            y="17"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 700,
              fontSize: size === "sm" ? 16 : size === "md" ? 19 : 28,
              fill: "#2D6A4F",
            }}
          >
            pp
          </text>
          <path
            d="M28 4 Q35 0 38 8 Q41 16 34 18"
            stroke="#2D6A4F"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <polyline
            points="34,14 34,18 38,18"
            stroke="#2D6A4F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </span>
    </Link>
  );
}
