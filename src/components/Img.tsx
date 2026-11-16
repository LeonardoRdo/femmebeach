import type { ImgHTMLAttributes } from "react";

// Substitui o next/image: `fill` cobre o pai posicionado; `priority` carrega já (imagem acima da dobra)
type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; fill?: boolean; priority?: boolean };

export default function Img({ fill = false, priority = false, className = "", ...rest }: Props) {
  const fillClass = fill ? "absolute inset-0 h-full w-full" : "";
  return <img {...rest} loading={priority ? "eager" : "lazy"} decoding="async" className={`${fillClass} ${className}`.trim()} />;
}
