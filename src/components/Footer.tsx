import { DAY_NAMES, DAY_ORDER, rangeLabel, useStoreStatus } from "@/lib/hours";

const L = "!text-areia-50 hover:underline";

// Horário de funcionamento com o dia de hoje em destaque e o status ao vivo
function OpeningHours() {
  const s = useStoreStatus();
  return (
    <div className="mt-21">
      <p className="mb-13 flex items-center gap-2 text-xs uppercase tracking-[.2em] opacity-80">
        Horário <i aria-hidden className={`h-[7px] w-[7px] rounded-full ${s.open ? "bg-emerald-400" : "bg-areia-200"}`} />
        <span className="normal-case tracking-normal">{s.open ? `aberta agora · ${s.detail} ${s.countdown}` : `fechada · ${s.detail}`}</span>
      </p>
      <ul className="grid gap-1">
        {DAY_ORDER.map((d) => {
          const today = d === s.today;
          return (
            <li key={d} aria-current={today ? "date" : undefined} className={`flex justify-between gap-13 rounded-[8px] px-13 py-1 ${today ? "bg-areia-50/10 font-medium ring-1 ring-areia-50/30" : ""}`}>
              <span>{DAY_NAMES[d]}{today && <span className="ml-2 rounded-full bg-areia-50 px-2 text-[11px] font-medium leading-5 text-terra-900">hoje</span>}</span>
              <span className="tabular-nums">{rangeLabel(d)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
const STORE_QUERY = encodeURIComponent("Femme Beach Wear, Rua Durval Guimarães, 532, Ponta Verde, Maceió - AL, 57035-060");
// Embed sem chave de API; o link abre a loja no app/site do Google Maps, de onde o cliente traça a rota
const MAP_EMBED = `https://www.google.com/maps?q=${STORE_QUERY}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${STORE_QUERY}`;
export default function Footer() {
  return (
    <footer id="contato" className="bg-terra-900 px-[clamp(21px,5vw,89px)] pb-34 pt-[clamp(55px,7vw,89px)] text-areia-50">
      <div className="mx-auto grid max-w-[1680px] gap-[clamp(21px,3.4vw,55px)] md:grid-cols-3">
        <div className="text-[15px] leading-[1.618]">
          <address className="not-italic">
            <p className="mb-13 text-xs uppercase tracking-[.2em] opacity-80">Onde estamos</p>
            Rua Durval Guimarães, 532, Edf. Time<br />Ponta Verde, Maceió - AL<br />CEP 57035-060
          </address>
          <OpeningHours />
          <iframe
            src={MAP_EMBED}
            title="Mapa da loja Femme Beach Wear na Ponta Verde, Maceió"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-21 aspect-[1.618/1] w-full rounded-[13px] border-0"
          />
          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn mt-13 w-full !bg-areia-50 !text-terra-900 hover:!bg-areia-100">Abrir no Google Maps</a>
        </div>
        <div className="text-center">
          <p className="font-serif text-[55px] italic leading-none">femme</p>
          <p className="mb-21 mt-2 text-[10px] tracking-[.3em]">BEACH WEAR</p>
          <p className="mx-auto max-w-[30em] text-[15px] leading-[1.618]">Moda praia e fitness feminina em Maceió. Varejo e atacado, com envio para todo o Brasil.</p>
        </div>
        <div className="text-[15px] leading-loose md:text-right">
          <p className="mb-13 text-xs uppercase tracking-[.2em] opacity-80">Links úteis</p>
          <a className={L} href="https://linktr.ee/femmebeach" target="_blank" rel="noopener noreferrer">linktr.ee/femmebeach</a><br />
          <a className={L} href="https://www.instagram.com/femmebeachwear_/" target="_blank" rel="noopener noreferrer">Instagram</a><br />
          <a className={L} href={MAP_LINK} target="_blank" rel="noopener noreferrer">Como chegar</a>
        </div>
      </div>
      <p className="mx-auto mt-55 max-w-[1680px] border-t border-areia-50/20 pt-21 text-[13px] opacity-80">© 2026 Femme Beach Wear · CNPJ 00.000.000/0001-00</p>
    </footer>
  );
}
