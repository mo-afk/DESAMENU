import { useEffect } from 'react';
import DesaHero from '../components/desa/DesaHero';
import DesaValueGrid from '../components/desa/DesaValueGrid';
import DesaFeatures from '../components/desa/DesaFeatures';
import DesaDemos from '../components/desa/DesaDemos';
import DesaComparison from '../components/desa/DesaComparison';
import DesaProcess from '../components/desa/DesaProcess';
import DesaUseCases from '../components/desa/DesaUseCases';
import DesaCta from '../components/desa/DesaCta';
import DesaContact from '../components/desa/DesaContact';

/**
 * DESA Menu — the flagship hospitality product page.
 * Every section is a self-contained component in `src/components/desa`.
 */
export default function DesaMenu() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'DESA Menu — Premium digital menu ecosystems for hospitality';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <DesaHero />
      <DesaValueGrid />
      <DesaFeatures />
      <DesaDemos />
      <DesaComparison />
      <DesaProcess />
      <DesaUseCases />
      <DesaCta />
      <DesaContact />
    </>
  );
}
