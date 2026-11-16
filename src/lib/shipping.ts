// Entrega em Maceió: valor acima do qual o frete é grátis e taxa por bairro.
// TODO: confirmar com a loja os valores, os bairros atendidos e o mínimo para frete grátis
export const FREE_AT = 299;
export const BAIRROS: readonly (readonly [string, number])[] = [
  ["Ponta Verde", 8], ["Pajuçara", 8], ["Jatiúca", 9], ["Cruz das Almas", 10], ["Mangabeiras", 10], ["Farol", 10],
  ["Jacintinho", 10], ["Gruta de Lourdes", 12], ["Poço", 10], ["Centro", 12], ["Stella Maris", 14], ["Benedito Bentes", 15], ["Tabuleiro do Martins", 15],
];
export const feeOf = (bairro: string | null) => (bairro ? BAIRROS.find((b) => b[0] === bairro)?.[1] ?? null : null);

export const norm = (s: string) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
export const maskCep = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 8); return d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d; };

export type CepResult =
  | { ok: true; cep: string; rua: string; bairro: string; cidade: string; uf: string }
  | { ok: false; reason: "invalid" | "notfound" | "offline" };

// Consulta pública do ViaCEP; 7 s de limite para não travar o carrinho
export async function lookupCep(raw: string): Promise<CepResult> {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 8) return { ok: false, reason: "invalid" };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 7000);
  try {
    const r = await fetch(`https://viacep.com.br/ws/${d}/json/`, { signal: ctrl.signal });
    const j = await r.json();
    if (!j || j.erro) return { ok: false, reason: "notfound" };
    return { ok: true, cep: d.slice(0, 5) + "-" + d.slice(5), rua: j.logradouro || "", bairro: j.bairro || "", cidade: j.localidade || "", uf: j.uf || "" };
  } catch {
    return { ok: false, reason: "offline" };
  } finally {
    clearTimeout(t);
  }
}
