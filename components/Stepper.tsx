"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import { StatusPedido, HistoricoStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STEPS: { status: StatusPedido; label: string }[] = [
  { status: "aguardando", label: "Aguardando análise" },
  { status: "em_planejamento", label: "Em planejamento" },
  { status: "planejamento_enviado", label: "Planejamento enviado" },
  { status: "aprovado", label: "Aprovado" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface StepperProps {
  statusAtual: StatusPedido;
  historico: HistoricoStatus[];
}

export default function Stepper({ statusAtual, historico }: StepperProps) {
  const statusOrder: StatusPedido[] = [
    "aguardando",
    "em_planejamento",
    "planejamento_enviado",
    "aprovado",
  ];
  const currentIndex = statusOrder.indexOf(statusAtual);
  const isAjuste = statusAtual === "ajuste_solicitado";

  const steps = isAjuste
    ? [
        ...STEPS.slice(0, 3),
        { status: "ajuste_solicitado" as StatusPedido, label: "Ajuste solicitado" },
      ]
    : STEPS;

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const histEntry = historico.find((h) => h.status === step.status);
        const isDone =
          !isAjuste
            ? index < currentIndex
            : step.status === "ajuste_solicitado"
            ? true
            : index < 2;
        const isCurrent = step.status === statusAtual;

        return (
          <div key={step.status} className="flex">
            <div className="flex flex-col items-center">
              {isDone ? (
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[#2D6A4F]" />
              ) : isCurrent ? (
                <Clock className="h-6 w-6 shrink-0 text-[#4A90D9]" />
              ) : (
                <Circle className="h-6 w-6 shrink-0 text-[#6B7280]/40" />
              )}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-px grow my-1",
                    isDone ? "bg-[#2D6A4F]" : "bg-[#E5D9BF]"
                  )}
                />
              )}
            </div>
            <div className="ml-3 pb-5">
              <p
                className={cn(
                  "text-sm font-semibold",
                  isCurrent
                    ? "text-[#4A90D9]"
                    : isDone
                    ? "text-[#2D6A4F]"
                    : "text-[#6B7280]/60"
                )}
              >
                {step.label}
              </p>
              {histEntry && (
                <p className="text-xs text-[#6B7280] mt-0.5">
                  {formatDate(histEntry.data)}
                </p>
              )}
              {!histEntry && (
                <p className="text-xs text-[#6B7280]/50 mt-0.5">Pendente</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
