// Blue verification rosette shown next to Arif's name on his official site.
export default function VerifiedBadge({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={`verified ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Verified official profile"
    >
      <title>Verified official profile of Arif Hassan</title>
      <path
        fill="#1d9bf0"
        d="M22.5 12.5c0-1.58-.88-2.95-2.16-3.65.15-.44.23-.91.23-1.4 0-2.3-1.78-4.17-3.97-4.17-.49 0-.96.09-1.4.26C14.55 2.27 13.27 1.5 12 1.5s-2.55.77-3.2 2.04a3.9 3.9 0 00-1.4-.26C5.2 3.28 3.43 5.15 3.43 7.45c0 .49.08.96.23 1.4C2.38 9.55 1.5 10.92 1.5 12.5c0 1.5.8 2.8 1.97 3.53-.04.25-.06.5-.06.76 0 2.3 1.77 4.16 3.96 4.16.5 0 .97-.1 1.4-.27.66 1.24 1.92 2.07 3.23 2.07s2.58-.83 3.23-2.07c.43.17.9.27 1.4.27 2.2 0 3.97-1.86 3.97-4.16 0-.26-.02-.51-.06-.76 1.16-.73 1.96-2.03 1.96-3.53z"
      />
      <path fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" d="M8.3 12.4l2.6 2.6 5-5.3" />
    </svg>
  );
}
