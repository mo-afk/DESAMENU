export default function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 52" fill="none" className={className} aria-label="DG monogram" role="img">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 6h14a20 20 0 0 1 0 40H4V6Zm7 7v26h7a13 13 0 0 0 0-26h-7Z"
        fill="currentColor"
      />
      <path d="M51 16.5A13.5 13.5 0 1 0 54 34" stroke="currentColor" strokeWidth="6.5" strokeLinecap="butt" />
      <path d="M41 27.5h11V36" stroke="currentColor" strokeWidth="6.5" strokeLinecap="butt" strokeLinejoin="miter" />
    </svg>
  );
}
