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
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[#3A7D5A]" />
              ) : isCurrent ? (
                <Clock className="h-6 w-6 shrink-0 text-[#3A7D5A]" />
              ) : (
                <Circle className="h-6 w-6 shrink-0 text-[#888888]/40" />
              )}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-px grow my-1",
                    isDone ? "bg-[#3A7D5A]" : "bg-[#E5E5E5]"
                  )}
                />
              )}
            </div>
            <div className="ml-3 pb-5">
              <p
                className={cn(
                  "text-sm font-semibold",
                  isCurrent
                    ? "text-[#3A7D5A]"
                    : isDone
                    ? "text-[#3A7D5A]"
                    : "text-[#0A0A0A]/30"
                )}
              >
                {step.label}
              </p>
              {histEntry && (
                <p className="text-xs text-[#888888] mt-0.5">
                  {formatDate(histEntry.data)}
                </p>
              )}
              {!histEntry && (
                <p className="text-xs text-[#888888]/50 mt-0.5">Pendente</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
