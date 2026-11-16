import { useStoreStatus } from "@/lib/hours";

// Selo "Aberto · fecha em 01:23:45" / "Fechado · abre amanhã às 09h" do cabeçalho.
// `compact` (celular): só o ponto e a palavra, sem o relógio.
export default function StoreStatus({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const s = useStoreStatus();
  const dot = s.open ? "bg-emerald-600 shadow-[0_0_0_3px_rgba(5,150,105,.18)]" : "bg-terra-500";
  return (
    <a
      href="#contato"
      aria-live="polite"
      aria-label={s.open ? `Loja aberta, ${s.detail} ${s.countdown}` : `Loja fechada, ${s.detail}`}
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full !text-terra-900 ${compact ? "text-[11px]" : "bg-areia-50/70 px-13 py-1 text-[13px] hover:bg-areia-50"} ${className}`}
    >
      <i aria-hidden className={`h-[7px] w-[7px] flex-none rounded-full ${dot}`} />
      <span className="font-medium">{s.open ? "Aberto" : "Fechado"}</span>
      {compact ? (
        s.open && <span className={`tabular-nums ${s.soon ? "text-terra-500" : "text-terra-900/70"}`}>· {s.countdown}</span>
      ) : (
        <span className="text-terra-900/70">
          · {s.detail}{s.open && <> <span className={`font-medium tabular-nums ${s.soon ? "text-terra-500" : "text-terra-900"}`}>{s.countdown}</span></>}
        </span>
      )}
    </a>
  );
}
