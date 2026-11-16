import { useEffect, useState } from "react";

// Horário da loja, por dia da semana (0 = domingo). [abre, fecha] em horas; null = fechado.
// Deve bater com "openingHours" do JSON-LD em index.html e com o rodapé.
export const SCHEDULE: readonly ([number, number] | null)[] = [null, [9, 19], [9, 19], [9, 19], [9, 19], [9, 19], [9, 17]];
export const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
// Ordem de exibição: segunda a domingo
export const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

const pad = (n: number) => (n < 10 ? "0" : "") + n;
export const hh = (h: number) => pad(h) + "h";
export const rangeLabel = (d: number) => { const s = SCHEDULE[d]; return s ? `${hh(s[0])} às ${hh(s[1])}` : "Fechado"; };

// Hora atual em Maceió, independente do fuso do visitante
function nowMaceio() {
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Maceio", weekday: "short", hour: "numeric", minute: "numeric", second: "numeric", hour12: false }).formatToParts(new Date());
    const o: Record<string, string> = {};
    parts.forEach((x) => { o[x.type] = x.value; });
    const d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
    return { d, sec: (parseInt(o.hour, 10) % 24) * 3600 + parseInt(o.minute, 10) * 60 + (parseInt(o.second, 10) || 0) };
  } catch {
    const n = new Date();
    return { d: n.getDay(), sec: n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds() };
  }
}

export type StoreStatus = {
  open: boolean;
  // Em quanto tempo fecha (aberta) — hh:mm:ss, atualizado a cada segundo
  countdown: string;
  // "fecha em" / "abre hoje às 09h" / "abre amanhã às 09h" / "abre segunda às 09h"
  detail: string;
  // Falta menos de 1h para fechar
  soon: boolean;
  today: number;
};

function compute(): StoreStatus {
  const { d, sec } = nowMaceio();
  const today = SCHEDULE[d];
  if (today && sec >= today[0] * 3600 && sec < today[1] * 3600) {
    const left = today[1] * 3600 - sec;
    const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
    return { open: true, countdown: `${pad(h)}:${pad(m)}:${pad(s)}`, detail: "fecha em", soon: left < 3600, today: d };
  }
  // Fechada: encontra a próxima abertura
  if (today && sec < today[0] * 3600) return { open: false, countdown: "", detail: `abre hoje às ${hh(today[0])}`, soon: false, today: d };
  for (let i = 1; i <= 7; i++) {
    const nd = (d + i) % 7, s = SCHEDULE[nd];
    if (s) return { open: false, countdown: "", detail: `abre ${i === 1 ? "amanhã" : DAY_NAMES[nd].toLowerCase()} às ${hh(s[0])}`, soon: false, today: d };
  }
  return { open: false, countdown: "", detail: "", soon: false, today: d };
}

// Recalcula a cada segundo para o relógio regressivo
export function useStoreStatus(): StoreStatus {
  const [st, setSt] = useState<StoreStatus>(compute);
  useEffect(() => {
    const id = setInterval(() => setSt(compute()), 1000);
    return () => clearInterval(id);
  }, []);
  return st;
}
