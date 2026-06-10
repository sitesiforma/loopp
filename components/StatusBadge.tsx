import { StatusPedido } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<StatusPedido, { label: string; className: string }> = {
  aguardando: {
    label: "Aguardando análise",
    className: "bg-[#F9E784] text-[#0A0A0A] border-[#F9E784]",
  },
  em_planejamento: {
    label: "Em planejamento",
    className: "bg-transparent text-[#444444] border-[#444444]/40",
  },
  planejamento_enviado: {
    label: "Planejamento enviado",
    className: "bg-[#3A7D5A] text-white border-[#3A7D5A]",
  },
  aprovado: {
    label: "Aprovado ✓",
    className: "bg-[#4EAF7A] text-[#0A0A0A] border-[#4EAF7A]",
  },
  ajuste_solicitado: {
    label: "Ajuste solicitado",
    className: "bg-transparent text-red-400 border-red-500/60",
  },
};

interface StatusBadgeProps {
  status: StatusPedido;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
