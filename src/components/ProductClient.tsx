import Img from "./Img";
import { Link } from "react-router";
import { ReactNode, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Product, brl, imgSrc } from "@/lib/products";
import { MAX_QTD, useCart } from "./CartProvider";
import AddedToCartDialog, { AddedItem } from "./AddedToCartDialog";
import { SaleBadge } from "./ProductCard";

const MEDIDAS = [["P", "80-84", "66-70", "88-90"], ["M", "88-92", "74-78", "94-98"], ["G", "96-100", "82-86", "102-106"], ["GG", "104-108", "90-94", "110-114"], ["XG", "112-118", "98-104", "118-124"]];

type Crumb = { label: string; href: string };
type Props = { p: Product; parent?: Crumb; imgClass?: string; aside?: ReactNode };

export default function ProductClient({ p, parent, imgClass = "", aside }: Props) {
  const crumb = parent ?? { label: p.cat === "praia" ? "Moda Praia" : "Moda Fitness", href: "/#colecao" };
  const { add } = useCart();
  const [cor, setCor] = useState(p.cores[0].nome);
  const [tam, setTam] = useState("");
  const [qtd, setQtd] = useState(1);
  const [erro, setErro] = useState("");
  const [added, setAdded] = useState<AddedItem | null>(null);
  const closeDialog = useCallback(() => setAdded(null), []);
  const pill = (on: boolean) => `min-h-[44px] min-w-[48px] rounded-full border border-terra-500 px-[14px] transition-colors ${on ? "bg-terra-500 text-white" : "text-terra-500"}`;

  return (
    <div className={`px-page mx-auto pb-[89px] pt-[clamp(89px,10vw,144px)] ${aside ? "max-w-[1680px]" : "max-w-[1280px]"}`}>
      <nav aria-label="Você está em" className="text-sm"><Link to="/" className="underline">Início</Link> / <Link to={crumb.href} className="underline">{crumb.label}</Link> / <span aria-current="page">{p.nome}</span></nav>
      <div className={`mt-34 grid items-start gap-[clamp(21px,3.4vw,55px)] ${aside ? "md:grid-cols-[minmax(144px,233px)_1.618fr_1fr]" : "md:grid-cols-phi"}`}>
        {aside}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-[1/1.25] overflow-hidden rounded-[21px] bg-terra-500">
          <Img src={imgSrc(p.hero ?? p.img)} alt={p.alt} fill priority className={`object-cover ${imgClass}`} />
          <SaleBadge p={p} className="absolute left-21 top-21 z-[1] !text-[13px]" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="md:sticky md:top-[89px]">
          <h1 className="font-serif text-[clamp(2.618rem,4vw,4.236rem)] font-medium italic leading-none">{p.nome}</h1>
          <p className="mt-21 flex flex-wrap items-baseline gap-x-13 text-2xl text-terra-500">
            {brl(p.preco)}
            {p.precoAntigo && <s className="text-lg text-terra-900/55" aria-label={`de ${brl(p.precoAntigo)}`}>{brl(p.precoAntigo)}</s>}
          </p>
          <p className="text-sm">ou 3x de {brl(p.preco / 3)} sem juros</p>
          <p className="mt-21 leading-[1.618]">{p.desc}</p>

          <fieldset className="mt-34"><legend className="font-medium">Cor</legend>
            <div className="mt-2 flex flex-wrap gap-2">{p.cores.map((c) => (
              <button key={c.nome} onClick={() => setCor(c.nome)} aria-pressed={cor === c.nome} className={`${pill(cor === c.nome)} inline-flex items-center gap-2 !pl-[10px]`}>
                <i className="h-5 w-5 rounded-full border border-terra-900/35" style={{ background: c.hex }} />{c.nome}
              </button>))}</div>
          </fieldset>
          <fieldset className="mt-34"><legend className="font-medium">Tamanho</legend>
            <div className="mt-2 flex flex-wrap gap-2">{p.tamanhos.map((t) => <button key={t} onClick={() => { setTam(t); setErro(""); }} aria-pressed={tam === t} className={pill(tam === t)}>{t}</button>)}</div>
          </fieldset>

          <details className="mt-21 rounded-[21px] bg-areia-50 p-21">
            <summary className="cursor-pointer font-medium">Tabela de medidas</summary>
            <SizeTable />
          </details>

          {erro && <p role="alert" className="mt-21 font-medium text-red-800">{erro}</p>}
          <div className="mt-34 flex items-center gap-21">
            <div className="flex items-center rounded-full border border-terra-500">
              <button aria-label="Diminuir quantidade" className="h-11 w-11" onClick={() => setQtd(Math.max(1, qtd - 1))}>−</button>
              <span className="w-8 text-center" aria-live="polite">{qtd}</span>
              <button aria-label="Aumentar quantidade" className="h-11 w-11" onClick={() => setQtd(Math.min(MAX_QTD, qtd + 1))}>+</button>
            </div>
            <button className="btn flex-1" onClick={() => {
              if (!tam) return setErro("Escolha um tamanho.");
              add({ nome: p.nome, preco: p.preco, cor, tam, qtd, img: imgSrc(p.img), imgClass });
              setAdded({ nome: p.nome, cor, tam, qtd });
            }}>Adicionar ao carrinho</button>
          </div>
        </motion.div>
      </div>
      <AddedToCartDialog item={added} onClose={closeDialog} />
    </div>
  );
}

function SizeTable() {
  return (
    <>
      <p className="mt-13 text-sm font-medium">Medidas do corpo, em centímetros</p>
      <table className="mt-2 w-full border-collapse text-center text-sm">
        <thead><tr>{["Tamanho", "Busto", "Cintura", "Quadril"].map((h) => <th key={h} scope="col" className="bg-terra-900 px-2 py-2 font-medium text-areia-50">{h}</th>)}</tr></thead>
        <tbody>{MEDIDAS.map(([t, ...r]) => <tr key={t}><th scope="row" className="border border-areia-200 bg-areia-100 px-2 py-2 font-medium">{t}</th>{r.map((v, i) => <td key={i} className="border border-areia-200 px-2 py-2">{v}</td>)}</tr>)}</tbody>
      </table>
      <Img
        src="img/medidas-corpo.webp"
        alt="Ilustração de como medir o corpo: fita métrica no busto, sob o busto, na cintura e no quadril"
        width={400}
        height={468}
        className="mx-auto mt-21 h-auto w-full max-w-[233px]"
      />
    </>
  );
}
