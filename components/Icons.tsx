import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const S = (props: P) => <svg viewBox="0 0 24 24" className="i" aria-hidden="true" {...props} />;
const F = (props: P) => <svg viewBox="0 0 24 24" className="i fill" aria-hidden="true" {...props} />;

export const YouTubeIcon = (p: P) => (
  <F {...p}><path d="M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2 31 31 0 00.6 12 31 31 0 001 16.8a3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-4.8 31 31 0 00-.4-4.8zM9.7 15.1V8.9l5.8 3.1z" /></F>
);
export const InstagramIcon = (p: P) => (
  <F {...p}><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z" /></F>
);
export const FacebookIcon = (p: P) => (
  <F {...p}><path d="M24 12a12 12 0 10-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0024 12z" /></F>
);
export const WhatsAppIcon = (p: P) => (
  <F {...p}><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.3c0-.1-.2-.2-.4-.3z" /></F>
);
export const PlatformIcon = ({ id, ...p }: P & { id: "youtube" | "instagram" | "facebook" }) =>
  id === "youtube" ? <YouTubeIcon {...p} /> : id === "instagram" ? <InstagramIcon {...p} /> : <FacebookIcon {...p} />;

export const LaptopIcon = (p: P) => <S {...p}><rect x="4" y="4.5" width="16" height="11" rx="1.5" /><path d="M2 19.5h20" /></S>;
export const CarIcon = (p: P) => <S {...p}><path d="M5 16.5H3.5v-4l2-5h13l2 5v4H19" /><path d="M3.5 12.5h17" /><circle cx="7.5" cy="16.5" r="2" /><circle cx="16.5" cy="16.5" r="2" /><path d="M9.5 16.5h5" /></S>;
export const StoreIcon = (p: P) => <S {...p}><path d="M3.5 9.5L5 4h14l1.5 5.5M3.5 9.5h17M3.5 9.5a2.8 2.8 0 005.6 0 2.8 2.8 0 005.8 0 2.8 2.8 0 005.6 0M5 12v8h14v-8M10 20v-5h4v5" /></S>;
export const PawIcon = (p: P) => <S {...p}><circle cx="6" cy="10" r="2" /><circle cx="10" cy="5.5" r="2" /><circle cx="14" cy="5.5" r="2" /><circle cx="18" cy="10" r="2" /><path d="M12 11.5c-3 0-6 4.5-6 7 0 1.5 1.3 2 2.5 2 1.4 0 2.2-.8 3.5-.8s2.1.8 3.5.8c1.2 0 2.5-.5 2.5-2 0-2.5-3-7-6-7z" /></S>;
export const NicheIcon = ({ name, ...p }: P & { name: string }) =>
  name === "laptop" ? <LaptopIcon {...p} /> : name === "car" ? <CarIcon {...p} /> : name === "store" ? <StoreIcon {...p} /> : <PawIcon {...p} />;

export const ArrowIcon = (p: P) => <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>;
export const ExtIcon = (p: P) => <S {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></S>;
export const CheckIcon = (p: P) => <S {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></S>;
export const ShieldIcon = (p: P) => <S {...p}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></S>;
export const EyeIcon = (p: P) => <S {...p}><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" /><circle cx="12" cy="12" r="3" /></S>;
export const DownloadIcon = (p: P) => <S {...p}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></S>;
export const MailIcon = (p: P) => <S {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></S>;
export const PinIcon = (p: P) => <S {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></S>;
export const ClockIcon = (p: P) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>;
export const UsersIcon = (p: P) => <S {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M16 4.8a3.5 3.5 0 010 6.4M18 14.8c2 .7 3.2 2.4 3.6 5.2" /></S>;
export const GenderIcon = (p: P) => <S {...p}><circle cx="10" cy="14" r="5" /><path d="M14 10l6-6M15 4h5v5" /></S>;
export const PhoneIcon = (p: P) => <S {...p}><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></S>;
export const PlayIcon = (p: P) => <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="M7 4.5v15l12.5-7.5z" /></svg>;
export const PlusIcon = (p: P) => <S {...p}><path d="M12 5v14M5 12h14" /></S>;
