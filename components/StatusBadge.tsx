import { StatusPedido } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<StatusPedido, { label: string; className: string }> = {
  aguardando: {
    label: "Aguardando análise",
    className: "bg-[#F9E784] text-[#7A6800] border-[#E8D04A]",
  },
  em_planejamento: {
    label: "Em planejamento",
    className: "bg-[#4A90D9]/15 text-[#1A5FA8] border-[#4A90D9]/40",
  },
  planejamento_enviado: {
    label: "Planejamento enviado",
    className: "bg-[#2D6A4F]/15 text-[#2D6A4F] border-[#2D6A4F]/40",
  },
  aprovado: {
    label: "Aprovado ✓",
    className: "bg-[#2D6A4F] text-white border-[#2D6A4F]",
  },
  ajuste_solicitado: {
    label: "Ajuste solicitado",
    className: "bg-orange-100 text-orange-700 border-orange-200",
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
