import Marquee from '../Marquee';

const VENUES = ['Fine Dining', 'Cocktail Bars', 'Specialty Cafés', 'Lounges', 'Boutique Hotels', 'Beach Clubs', 'Rooftop Bars', 'Brunch Spots'];

/** Thin editorial marquee of the venue types DESA Menu is built for. */
export default function DesaMarquee({ className = '' }: { className?: string }) {
  return (
    <div aria-label="Venue types using DESA Menu">
      <Marquee items={VENUES} className={className} fast />
    </div>
  );
}
