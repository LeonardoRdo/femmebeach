import { Link } from "react-router";
import Reveal from "./Reveal";
import { TAMANHOS, sizeSlug } from "@/lib/products";

export default function SizeFinder() {
  return (
    <section aria-labelledby="ajuste-titulo" className="px-page mx-auto max-w-[1280px] py-[clamp(55px,6vw,89px)] text-center">
      <Reveal y={34}>
        <h2 id="ajuste-titulo" className="font-serif text-fluid-h2 font-medium">Encontre seu <em className="text-terra-500">ajuste perfeito.</em></h2>
        <p className="mt-13">Peças pensadas para valorizar todos os corpos.</p>
      </Reveal>
      <nav aria-label="Comprar por tamanho" className="mt-34 grid grid-cols-[repeat(auto-fit,minmax(89px,1fr))] gap-13">
        {TAMANHOS.map((t) => (
          <Link
            key={t}
            to={`/tamanho/${sizeSlug(t)}`}
            aria-label={`Ver peças no tamanho ${t}`}
            className="grid min-h-[55px] place-items-center rounded-[13px] border border-terra-900/15 bg-areia-50 text-lg font-medium !text-terra-900 transition-colors hover:border-terra-500 hover:bg-terra-500 hover:!text-white"
          >
            {t}
          </Link>
        ))}
      </nav>
    </section>
  );
}
