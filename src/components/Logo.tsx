export default function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 52" fill="none" className={className} aria-label="DESA monogram" role="img">
      {/* D — the DESA wordmark */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 6h13a20 20 0 0 1 0 40H4V6Zm7 7v26h6a13 13 0 0 0 0-26h-6Z"
        fill="currentColor"
      />
      {/* Menu lines — the flagship product */}
      <rect x="32" y="10" width="20" height="6.5" fill="#d7ff3f" />
      <rect x="32" y="23" width="13" height="6.5" fill="currentColor" />
      <rect x="32" y="36" width="20" height="6.5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
