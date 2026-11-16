import Img from "./Img";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Slide = { img: string; alt: string; eyebrow: string; title: string; text: string; href: string };

const SLIDES: readonly Slide[] = [
  { img: "img02", alt: "Mulher com conjunto de praia roxo de top assimétrico e saia em Maceió", eyebrow: "nova coleção", title: "Verão 2026", text: "feita para dançar com o sol de Maceió", href: "/colecao/verao-2026" },
  { img: "img03", alt: "Mulher com biquíni triângulo laranja com detalhes em pedras", eyebrow: "moda praia", title: "Pôr do sol", text: "biquínis que brilham da areia ao fim de tarde", href: "/colecao/por-do-sol" },
  { img: "img05", alt: "Mulher em pé com conjunto fitness verde de regata com zíper e short", eyebrow: "moda fitness", title: "Movimento", text: "conforto e sustentação para todo treino", href: "/colecao/movimento" },
  { img: "img04", alt: "Mulher loira em pé com conjunto fitness terracota de top e legging", eyebrow: "moda fitness", title: "Terra", text: "tons quentes para treinar com estilo", href: "/colecao/terra" },
];

const AUTOPLAY_MS = 6000;
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const autoplay = !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, autoplay]);

  const go = (step: 1 | -1) => setIndex((i) => (i + step + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];
  return (
    <section
      id="inicio"
      aria-roledescription="carrossel"
      aria-label="Coleções em destaque"
      className="relative h-[100svh] min-h-[540px] overflow-hidden bg-terra-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.img}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          {/* Fotos são verticais: a cópia desfocada preenche as laterais e a foto inteira (com rosto) fica visível por cima */}
          <Img src={`img/${slide.img}.jpg`} alt="" aria-hidden fill className="scale-110 object-cover blur-2xl" />
          <Img src={`img/${slide.img}.jpg`} alt={slide.alt} fill priority={index === 0} className="object-contain" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="px-page relative flex h-full flex-col items-center justify-center text-center text-white" aria-live={autoplay ? "off" : "polite"}>
        <motion.div key={slide.img} initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: EASE }}>
          <p className="text-[clamp(1rem,1.6vw,1.382rem)] tracking-[.3em]">{slide.eyebrow}</p>
          <h1 className="mt-2 font-serif text-fluid-h1 font-medium uppercase tracking-[.04em]">{slide.title}</h1>
          <p className="mx-auto mt-21 max-w-[34em] text-[clamp(1rem,1.3vw,1.382rem)]">{slide.text}</p>
          <Link to={slide.href} className="mt-34 inline-flex min-h-[44px] min-w-[clamp(220px,18vw,320px)] items-center justify-center rounded-full bg-white px-34 py-13 font-medium !text-terra-900 transition-colors hover:bg-areia-100">
            garantir coleção
          </Link>
        </motion.div>
      </div>

      <ArrowButton direction="prev" onClick={() => go(-1)} />
      <ArrowButton direction="next" onClick={() => go(1)} />
    </section>
  );
}

const ARROWS = {
  prev: { label: "Slide anterior", side: "left-[clamp(13px,3vw,55px)]", path: "M15 18l-6-6 6-6" },
  next: { label: "Próximo slide", side: "right-[clamp(13px,3vw,55px)]", path: "M9 18l6-6-6-6" },
} as const;

function ArrowButton({ direction, onClick }: { direction: keyof typeof ARROWS; onClick: () => void }) {
  const { label, side, path } = ARROWS[direction];
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 ${side} grid h-[clamp(44px,4vw,55px)] w-[clamp(44px,4vw,55px)] -translate-y-1/2 place-items-center rounded-full bg-terra-900 text-white shadow-lg transition-colors hover:bg-terra-500`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </button>
  );
}
