import Img from "./Img";
import { Link } from "react-router";
import Reveal from "./Reveal";
import { Cat } from "@/lib/products";
import { Category, GRUPOS, PUBLICOS, categoriesOf, publicosOf } from "@/lib/categories";

const ORDEM: readonly Cat[] = ["praia", "fitness"];

export default function ShopByCategory() {
  return (
    <section id="categorias" className="px-page mx-auto max-w-[1680px] py-[clamp(55px,8vw,144px)]">
      <Reveal y={34}>
        <p className="eyebrow">Categorias</p>
        <h2 className="font-serif text-fluid-h2 font-medium">Compre por <em className="text-terra-500">categoria.</em></h2>
      </Reveal>
      {ORDEM.map((grupo) => (
        <div key={grupo} className="mt-[clamp(34px,4vw,55px)]">
          <h3 className="font-serif text-[clamp(1.618rem,2.4vw,2.618rem)] font-medium italic">{GRUPOS[grupo]}</h3>
          {publicosOf(grupo).map((publico, _, publicos) => (
            <div key={publico} className="mt-21">
              {publicos.length > 1 && <h4 className="eyebrow !mb-0">{PUBLICOS[publico]}</h4>}
              <ul className="mt-13 grid grid-cols-[repeat(auto-fill,minmax(clamp(144px,15vw,233px),1fr))] gap-[clamp(13px,1.6vw,21px)]">
                {categoriesOf(grupo, publico).map((c) => (
                  <li key={c.slug}><CategoryCard c={c} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

function CategoryCard({ c }: { c: Category }) {
  return (
    <Link to={`/categoria/${c.slug}`} className="group relative block aspect-card overflow-hidden rounded-[21px] bg-terra-500">
      {c.img && <Img src={c.img} alt="" fill className={`object-cover transition-transform duration-[1400ms] ease-apple group-hover:scale-[1.06] ${c.imgPos ?? ""}`} />}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-13 pb-13 pt-55 font-medium text-white">{c.nome}</span>
    </Link>
  );
}
