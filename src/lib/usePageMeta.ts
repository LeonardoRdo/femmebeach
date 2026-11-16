import { useEffect } from "react";

export const SITE_TITLE = "Moda Praia Feminina em Maceió | Biquínis e Fitness – Femme Beach Wear";
export const SITE_DESCRIPTION = "Roupas de praia feminina, biquínis e moda fitness em Maceió. Loja na Ponta Verde com coleção verão 2026, varejo e atacado e envio para todo o Brasil.";

// Sem servidor não há <head> por rota: título e descrição são trocados no navegador.
// Sem título (rota inválida) não mexe, para não sobrescrever o que a página 404 definiu.
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    if (!title) return;
    document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
