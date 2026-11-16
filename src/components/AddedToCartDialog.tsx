import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";

export type AddedItem = { nome: string; cor: string; tam: string; qtd: number };

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AddedToCartDialog({ item, onClose }: { item: AddedItem | null; onClose: () => void }) {
  const navigate = useNavigate();
  const { openCheckout } = useCart();
  const firstAction = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    firstAction.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  const continueShopping = () => { onClose(); navigate("/"); };
  const checkout = () => { onClose(); openCheckout(); };

  return (
    <AnimatePresence>
      {item && (
        <div role="dialog" aria-modal="true" aria-labelledby="added-title" className="fixed inset-0 z-[70] grid place-items-center p-21">
          <motion.div className="absolute inset-0 bg-terra-900/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="relative w-[min(100%,420px)] rounded-[21px] bg-areia-50 p-34 text-center shadow-2xl"
            initial={{ opacity: 0, y: 34, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 21 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 id="added-title" className="font-serif text-3xl italic">Adicionado ao carrinho</h2>
            <p className="mt-13">{item.qtd}x {item.nome}</p>
            <p className="text-sm">{item.cor} · {item.tam}</p>
            <div className="mt-34 flex flex-col gap-13">
              <button ref={firstAction} onClick={checkout} className="btn w-full">Finalizar compra</button>
              <button onClick={continueShopping} className="btn-line w-full">Continuar comprando</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
