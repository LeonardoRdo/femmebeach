import Img from "./Img";
import Reveal from "./Reveal";

const imgs = ["img11", "img15", "img16", "img18", "img17", "img14"];

export default function Instagram() {
  return (
    <section className="px-page mx-auto grid max-w-[1680px] items-center gap-[clamp(21px,3.4vw,55px)] py-[clamp(89px,10vw,144px)] md:grid-cols-2">
      <Reveal y={34}>
        <h2 className="font-serif text-fluid-h2 font-medium">Siga a <em className="text-terra-500">Femme</em> no Instagram.</h2>
        <p className="mb-34 mt-21 leading-[1.618]">Mais de 24 mil pessoas já seguem a Femme Beach Wear em Maceió.</p>
        <a href="https://www.instagram.com/femmebeachwear_/" target="_blank" rel="noopener noreferrer" className="btn !text-white">Seguir @femmebeachwear_</a>
      </Reveal>
      <div className="grid grid-cols-3 gap-13">
        {imgs.map((n, i) => (
          <Reveal key={n} delay={i * 0.089} y={34}>
            <div className="relative aspect-card overflow-hidden rounded-[13px] bg-terra-500"><Img src={`img/${n}.jpg`} alt="Post do Instagram Femme Beach Wear" fill className="object-cover" /></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
