import { useEffect } from 'react';
import DesaHero from '../components/desa/DesaHero';
import DesaValueGrid from '../components/desa/DesaValueGrid';
import DesaFeatures from '../components/desa/DesaFeatures';
import DesaGames from '../components/desa/DesaGames';
import DesaDemos from '../components/desa/DesaDemos';
import DesaComparison from '../components/desa/DesaComparison';
import DesaProcess from '../components/desa/DesaProcess';
import DesaUseCases from '../components/desa/DesaUseCases';
import DesaFaq from '../components/desa/DesaFaq';
import DesaCta from '../components/desa/DesaCta';
import DesaContact from '../components/desa/DesaContact';
import { useI18n } from '../i18n';

/**
 * DESA Menu — the product homepage.
 * Interactive text menus, cinematic dish video, the gamified dining
 * ecosystem and digital loyalty cards, presented as one system.
 */
export default function Home() {
  const { t } = useI18n();

  useEffect(() => {
    const previous = document.title;
    document.title = t('meta.home');
    return () => {
      document.title = previous;
    };
  }, [t]);

  return (
    <>
      <DesaHero />
      <DesaValueGrid />
      <DesaFeatures />
      <DesaGames />
      <DesaDemos />
      <DesaComparison />
      <DesaProcess />
      <DesaUseCases />
      <DesaFaq />
      <DesaCta />
      <DesaContact />
    </>
  );
}
