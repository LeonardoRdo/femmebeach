import Img from "./Img";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MAX_QTD, useCart } from "./CartProvider";
import ShippingBox from "./ShippingBox";
import { brl } from "@/lib/products";

export default function CartDrawer() {
  const { open, setOpen, items, remove, setQty, total, checkoutUrl, checkoutPulse, entrega, fee, isFree, grandTotal } = useCart();
  const reduceMotion = useReducedMotion();
  const pump = checkoutPulse > 0 && !reduceMotion;
  const [invalid, setInvalid] = useState(false);
  useEffect(() => { if (!open) setInvalid(false); }, [open]);
  // Endereço completo: CEP (com número) ou bairro escolhido na lista
  const addressOk = entrega.cep ? !!entrega.num.trim() : !!entrega.bairro;
  useEffect(() => { if (addressOk) setInvalid(false); }, [addressOk]);
  const freteLabel = entrega.fora ? "A combinar" : isFree ? "Grátis" : fee != null ? brl(fee) : "Informe o CEP";

  return (
    <AnimatePresence>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Seu carrinho" className="fixed inset-0 z-[60]">
          <motion.div className="absolute inset-0 bg-terra-900/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-[min(100%,420px)] flex-col bg-areia-50 shadow-2xl"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-21 pt-21">
              <h2 className="font-serif text-3xl italic">Seu carrinho</h2>
              <button aria-label="Fechar carrinho" className="h-11 w-11 rounded-full hover:bg-areia-100" onClick={() => setOpen(false)}>✕</button>
            </div>
            {items.length === 0 ? <p className="mt-34 px-21">Seu carrinho está vazio.</p> : (
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-21">
                <ul className="mt-21 divide-y divide-areia-200">
                  {items.map((i) => (
                    <li key={i.key} className="flex items-start gap-13 py-13">
                      <div className="relative aspect-card w-[clamp(68px,18vw,89px)] flex-none overflow-hidden rounded-[13px] bg-terra-500">
                        {i.img && <Img src={i.img} alt="" fill className={`object-cover ${i.imgClass ?? ""}`} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{i.nome}</p>
                        <p className="text-sm">{i.cor} · {i.tam}</p>
                        <div className="mt-2 inline-flex items-center rounded-full border border-terra-500" role="group" aria-label={`Quantidade de ${i.nome}`}>
                          <button aria-label="Diminuir quantidade" disabled={i.qtd <= 1} className="h-11 w-11 disabled:opacity-35" onClick={() => setQty(i.key, i.qtd - 1)}>−</button>
                          <span className="w-8 text-center" aria-live="polite">{i.qtd}</span>
                          <button aria-label="Aumentar quantidade" disabled={i.qtd >= MAX_QTD} className="h-11 w-11 disabled:opacity-35" onClick={() => setQty(i.key, i.qtd + 1)}>+</button>
                        </div>
                      </div>
                      <div className="flex-none text-right"><p className="text-terra-500">{brl(i.preco * i.qtd)}</p><button className="text-sm underline" onClick={() => remove(i.key)}>Remover</button></div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-areia-200 py-21">
                  <ShippingBox invalid={invalid} />
                </div>
              </div>
            )}
            {items.length > 0 && (
              <div className="border-t border-areia-200 px-21 pb-21 pt-13">
                <dl className="grid gap-1 text-sm">
                  <div className="flex justify-between"><dt>Produtos</dt><dd className="tabular-nums">{brl(total)}</dd></div>
                  <div className="flex justify-between"><dt>Entrega</dt><dd className={`tabular-nums ${isFree && !entrega.fora ? "font-medium text-emerald-800" : ""}`}>{freteLabel}</dd></div>
                </dl>
                <p className="mb-13 mt-2 flex items-baseline justify-between text-lg"><span>Total</span><span className="font-serif text-3xl italic tabular-nums">{brl(grandTotal)}</span></p>
                <motion.a
                  key={checkoutPulse}
                  href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="btn w-full !text-white"
                  onClick={(e) => { if (!addressOk) { e.preventDefault(); setInvalid(true); document.getElementById("cep")?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" }); } }}
                  animate={pump ? { scale: [1, 1.08, 1, 1.04, 1] } : undefined}
                  transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
                >Finalizar pelo WhatsApp</motion.a>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
