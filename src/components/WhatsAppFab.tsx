import { CONTACT_URL } from "@/lib/whatsapp";

export default function WhatsAppFab() {
  return (
    <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
      className="fixed bottom-21 right-21 z-50 grid h-[55px] w-[55px] place-items-center rounded-full bg-terra-500 !text-white shadow-[0_13px_34px_-8px_rgba(74,42,27,.5)] transition-colors hover:bg-terra-600">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" /></svg>
    </a>
  );
}
