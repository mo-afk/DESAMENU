interface Props {
  items: string[];
  className?: string;
  fast?: boolean;
  outline?: boolean;
}

export default function Marquee({ items, className = '', fast = false, outline = false }: Props) {
  const row = [...items, ...items];
  return (
    <div className={`marquee-hover overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex items-center ${fast ? 'animate-marquee-fast' : 'animate-marquee'}`}>
        {row.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className={`px-6 font-display text-2xl uppercase tracking-tight sm:text-3xl ${outline ? 'text-outline-faint' : ''}`}>
              {item}
            </span>
            <span className="font-display text-xl text-lime">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}
