import { Link } from "react-router";
import { usePageMeta } from "@/lib/usePageMeta";

export default function NotFound() {
  usePageMeta("Página não encontrada | Femme Beach Wear");
  return (
    <div className="px-page mx-auto max-w-[1280px] py-[clamp(89px,10vw,144px)] text-center">
      <p className="eyebrow">Erro 404</p>
      <h1 className="font-serif text-fluid-h2 font-medium">Página não <em className="text-terra-500">encontrada.</em></h1>
      <Link to="/" className="btn mt-34 !text-white">Voltar ao início</Link>
    </div>
  );
}
