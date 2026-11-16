import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { wpp } from "@/lib/whatsapp";
import { brl } from "@/lib/products";
import { FREE_AT, feeOf } from "@/lib/shipping";

export type Item = {
  key: string; nome: string; preco: number; cor: string; tam: string; qtd: number;
  // Opcionais: carrinhos salvos antes da miniatura existir não têm foto
  img?: string; imgClass?: string;
};
// Endereço de entrega preenchido no carrinho (CEP via ViaCEP ou bairro escolhido na lista)
export type Entrega = {
  bairro: string | null; cep: string | null; rua: string; num: string; apto: string;
  // CEP de fora de Maceió: a loja envia para todo o Brasil, mas o frete é combinado no WhatsApp
  fora: { cidade: string; uf: string } | null;
};
const ENTREGA_VAZIA: Entrega = { bairro: null, cep: null, rua: "", num: "", apto: "", fora: null };

type Ctx = {
  items: Item[]; open: boolean; setOpen: (v: boolean) => void;
  add: (i: Omit<Item, "key">) => void; remove: (key: string) => void;
  setQty: (key: string, qtd: number) => void;
  count: number; total: number; checkoutUrl: string;
  // Abre o carrinho e chama atenção para o botão de finalizar; o contador muda a cada chamada para reanimar
  openCheckout: () => void; checkoutPulse: number;
  // Muda a cada item adicionado: dispara o confete
  celebrate: number;
  entrega: Entrega; setEntrega: (patch: Partial<Entrega>) => void;
  // Taxa de entrega (null = ainda sem bairro), quanto falta para frete grátis e se já ganhou
  fee: number | null; freeLeft: number; isFree: boolean; grandTotal: number;
};
export const MAX_QTD = 10;
const clampQty = (n: number) => Math.min(MAX_QTD, Math.max(1, n));

const C = createContext<Ctx>(null as never);
export const useCart = () => useContext(C);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [checkoutPulse, setCheckoutPulse] = useState(0);
  const [celebrate, setCelebrate] = useState(0);
  const [entrega, setEntregaState] = useState<Entrega>(ENTREGA_VAZIA);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem("femme-cart") || "[]")); } catch {}
    try { setEntregaState({ ...ENTREGA_VAZIA, ...JSON.parse(localStorage.getItem("femme-entrega") || "{}") }); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("femme-cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("femme-entrega", JSON.stringify(entrega)); }, [entrega]);

  const v = useMemo<Ctx>(() => {
    const count = items.reduce((a, i) => a + i.qtd, 0);
    const total = items.reduce((a, i) => a + i.qtd * i.preco, 0);
    const isFree = total >= FREE_AT;
    const freeLeft = Math.max(0, FREE_AT - total);
    const bairroFee = feeOf(entrega.bairro);
    const fee = isFree ? 0 : bairroFee;
    const grandTotal = total + (fee ?? 0);

    const endereco = [entrega.rua, entrega.num ? `nº ${entrega.num}` : "", entrega.apto, entrega.bairro, entrega.cep ? `CEP ${entrega.cep}` : ""].filter(Boolean).join(", ");
    const frete = entrega.fora ? `a combinar (envio para ${entrega.fora.cidade} - ${entrega.fora.uf})` : isFree ? "grátis" : fee != null ? brl(fee) : "a combinar";
    const msg = "Olá! Quero finalizar meu pedido:\n" + items.map((i) => `• ${i.qtd}x ${i.nome} (${i.cor}, ${i.tam}) – ${brl(i.preco * i.qtd)}`).join("\n") +
      `\nProdutos: ${brl(total)}` +
      (endereco ? `\nEntrega em: ${endereco}` : "") +
      `\nFrete: ${frete}` +
      `\n*Total: ${brl(grandTotal)}*`;
    return {
      items, open, setOpen, count, total, checkoutUrl: wpp(msg), checkoutPulse, celebrate,
      entrega, fee, freeLeft, isFree, grandTotal,
      setEntrega: (patch) => setEntregaState((cur) => ({ ...cur, ...patch })),
      openCheckout: () => { setOpen(true); setCheckoutPulse((n) => n + 1); },
      add: (i) => {
        setItems((cur) => {
          const key = `${i.nome}|${i.cor}|${i.tam}`;
          return cur.some((c) => c.key === key) ? cur.map((c) => (c.key === key ? { ...c, qtd: clampQty(c.qtd + i.qtd) } : c)) : [...cur, { ...i, key }];
        });
        setCelebrate((n) => n + 1);
      },
      remove: (key) => setItems((cur) => cur.filter((c) => c.key !== key)),
      setQty: (key, qtd) => setItems((cur) => cur.map((c) => (c.key === key ? { ...c, qtd: clampQty(qtd) } : c))),
    };
  }, [items, open, checkoutPulse, celebrate, entrega]);
  return <C.Provider value={v}>{children}</C.Provider>;
}
