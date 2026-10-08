import Marquee from '../Marquee';
import { useI18n } from '../../i18n';

/** Thin editorial marquee of the venue types DESA Menu is built for. */
export default function DesaMarquee({ className = '' }: { className?: string }) {
  const { dict } = useI18n();
  return (
    <div aria-label={dict.marquee.aria}>
      <Marquee items={dict.marquee.venues} className={className} fast />
    </div>
  );
}
