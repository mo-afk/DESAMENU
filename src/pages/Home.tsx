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
 * DESA Menu — the product homepage.
 * Interactive text menus, cinematic dish video, table-side games and
 * digital loyalty cards, presented as one system.
 */
export default function Home() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'DESA Menu — Turn every menu into a premium digital experience';
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
