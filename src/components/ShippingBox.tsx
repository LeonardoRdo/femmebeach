import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { brl } from "@/lib/products";
import { BAIRROS, FREE_AT, lookupCep, maskCep, norm } from "@/lib/shipping";

type Msg = { kind: "" | "wait" | "ok" | "bad"; text: string };

// Barra de progresso do frete grátis + endereço de entrega (CEP com ViaCEP ou bairro da lista)
export default function ShippingBox({ invalid }: { invalid: boolean }) {
  const { total, freeLeft, isFree, fee, entrega, setEntrega } = useCart();
  const pct = Math.min(100, (total / FREE_AT) * 100);
  const [cepText, setCepText] = useState(entrega.cep ?? "");
  const [msg, setMsg] = useState<Msg>({ kind: "", text: "" });
  const [manual, setManual] = useState(!!entrega.bairro && !entrega.cep);
  const [busy, setBusy] = useState(false);
  const reqId = useRef(0);
  const numRef = useRef<HTMLInputElement>(null);

  // Carrinho reaberto com CEP salvo: mostra o endereço já confirmado
  useEffect(() => {
    if (entrega.cep && !cepText) setCepText(entrega.cep);
    if (entrega.cep && entrega.bairro) setMsg({ kind: "ok", text: `${entrega.rua ? entrega.rua + ", " : ""}${entrega.bairro}` });
    if (entrega.cep && entrega.fora) setMsg({ kind: "ok", text: `${entrega.fora.cidade} - ${entrega.fora.uf} · frete a combinar no WhatsApp` });
    if (entrega.bairro && !entrega.cep) setManual(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const field = "min-h-[48px] w-full rounded-[13px] border border-terra-900/15 bg-areia-100/60 px-13 text-[15px] text-terra-900 placeholder:text-terra-900/40 focus:border-terra-500 focus:outline-none focus:ring-2 focus:ring-terra-500/30";

  async function consultar(raw: string) {
    const d = raw.replace(/\D/g, "");
    if (d.length !== 8) { setMsg({ kind: "bad", text: "Digite os 8 números do CEP." }); return; }
    const id = ++reqId.current;
    setBusy(true); setMsg({ kind: "wait", text: "Consultando CEP…" });
    setEntrega({ bairro: null, cep: null, rua: "", fora: null });
    const r = await lookupCep(d);
    if (id !== reqId.current) return;
    setBusy(false);
    if (!r.ok) {
      setMsg({ kind: "bad", text: r.reason === "notfound" ? "CEP não encontrado. Confira os números ou escolha o bairro." : "Não deu para consultar o CEP agora. Escolha o bairro abaixo." });
      setManual(true);
      return;
    }
    if (norm(r.cidade) !== "maceio") {
      // Fora de Maceió: a loja envia para todo o Brasil, com frete combinado no WhatsApp
      setEntrega({ cep: r.cep, rua: r.rua, bairro: null, fora: { cidade: r.cidade, uf: r.uf } });
      setMsg({ kind: "ok", text: `${r.cidade} - ${r.uf} · frete a combinar no WhatsApp` });
      setTimeout(() => numRef.current?.focus(), 50);
      return;
    }
    const hit = BAIRROS.find((b) => norm(b[0]) === norm(r.bairro));
    if (!hit) {
      setMsg({ kind: "bad", text: `Ainda não entregamos no bairro ${r.bairro || "informado"}. Escolha outro bairro ou combine pelo WhatsApp.` });
      setManual(true);
      return;
    }
    setEntrega({ cep: r.cep, rua: r.rua, bairro: hit[0], fora: null });
    setMsg({ kind: "ok", text: `${r.rua ? r.rua + ", " : ""}${hit[0]}` });
    setTimeout(() => numRef.current?.focus(), 50);
  }

  function onCep(v: string) {
    const m = maskCep(v);
    setCepText(m);
    if (entrega.cep) { setEntrega({ cep: null, rua: "", bairro: null, fora: null }); setMsg({ kind: "", text: "" }); }
    if (m.replace(/\D/g, "").length === 8) consultar(m);
  }

  function onBairro(b: string) {
    setCepText(""); setMsg({ kind: "", text: "" });
    setEntrega({ bairro: b || null, cep: null, rua: "", fora: null });
  }

  const temEndereco = !!entrega.cep;
  const msgColor = msg.kind === "bad" ? "text-red-800" : msg.kind === "ok" ? "text-terra-900" : "text-terra-900/60";

  return (
    <div className="grid gap-13">
      {/* Barra de progresso do frete grátis */}
      <div className={`rounded-[13px] p-13 ${isFree ? "bg-emerald-700/10" : "bg-areia-100/70"}`}>
        <p className="text-sm leading-snug">
          {isFree ? <><strong className="font-medium text-emerald-800">Frete grátis</strong> liberado para o seu pedido em Maceió! 🎉</>
            : <>Faltam <strong className="font-medium text-terra-500">{brl(freeLeft)}</strong> para ganhar <strong className="font-medium">frete grátis</strong> em Maceió</>}
        </p>
        <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label="Progresso para o frete grátis" className="mt-2 h-2 overflow-hidden rounded-full bg-areia-200">
          <i className={`block h-full rounded-full transition-[width,background-color] duration-700 ease-apple ${isFree ? "bg-emerald-600" : "bg-terra-500"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Endereço de entrega */}
      <div className={`grid gap-2 ${invalid ? "rounded-[13px] ring-2 ring-red-800/60 ring-offset-2 ring-offset-areia-50" : ""}`}>
        <label htmlFor="cep" className="text-sm font-medium">CEP de entrega</label>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <input id="cep" value={cepText} onChange={(e) => onCep(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); consultar(cepText); } }}
            inputMode="numeric" autoComplete="postal-code" maxLength={9} placeholder="00000-000" className={`${field} tabular-nums tracking-[.04em]`} />
          <button type="button" disabled={busy} onClick={() => consultar(cepText)} className="btn-line !min-h-[48px] !px-21 !py-0 disabled:opacity-50">Calcular</button>
        </div>
        {msg.text && (
          <p className={`flex items-center gap-2 text-[13px] ${msgColor}`} aria-live="polite">
            {msg.kind === "wait" && <i aria-hidden className="h-3 w-3 animate-spin rounded-full border-2 border-areia-200 border-t-terra-500" />}
            {msg.text}{msg.kind === "ok" && entrega.bairro && <> · taxa <b className="font-medium text-terra-500">{isFree ? "grátis" : brl(fee ?? 0)}</b></>}
          </p>
        )}
        {temEndereco && (
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-2">
            <label className="grid gap-1 text-[13px]"><span>Número <span className="text-terra-500">*</span></span>
              <input ref={numRef} value={entrega.num} onChange={(e) => setEntrega({ num: e.target.value })} inputMode="numeric" autoComplete="address-line2" maxLength={10} placeholder="Ex.: 532" className={field} /></label>
            <label className="grid gap-1 text-[13px]"><span>Apto / complemento</span>
              <input value={entrega.apto} onChange={(e) => setEntrega({ apto: e.target.value })} maxLength={40} placeholder="Opcional" className={field} /></label>
          </div>
        )}
        {!manual ? (
          <button type="button" onClick={() => setManual(true)} className="justify-self-start text-[13px] underline underline-offset-[3px]">Não sei o CEP, escolher o bairro</button>
        ) : (
          <label className="grid gap-1 text-sm"><span className="font-medium">Bairro de entrega (Maceió)</span>
            <select value={entrega.cep ? "" : entrega.bairro ?? ""} onChange={(e) => onBairro(e.target.value)} className={field}>
              <option value="">Selecione o bairro</option>
              {BAIRROS.map((b) => <option key={b[0]} value={b[0]}>{b[0]} · {brl(b[1])}</option>)}
            </select>
          </label>
        )}
        {invalid && <p role="alert" className="text-[13px] font-medium text-red-800">{temEndereco && !entrega.num.trim() ? "Informe o número do endereço para finalizar." : "Informe o CEP ou escolha o bairro para finalizar o pedido."}</p>}
      </div>
    </div>
  );
}
