// TODO: trocar pelo número real (DDI+DDD+número, só dígitos) — ou VITE_WHATSAPP no .env
export const WHATSAPP = import.meta.env.VITE_WHATSAPP || "5582900000000";
export const wpp = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const CONTACT_URL = wpp("Olá! Vi o site da Femme Beach Wear e gostaria de mais informações!");
