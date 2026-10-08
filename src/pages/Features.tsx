import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DesaValueGrid from '../components/desa/DesaValueGrid';
import DesaFeatures from '../components/desa/DesaFeatures';
import DesaGames from '../components/desa/DesaGames';
import DesaUseCases from '../components/desa/DesaUseCases';
import { useI18n } from '../i18n';

/** Deep dive on the DESA Menu capabilities, including the games suite. */
export default function Features() {
  const { t, dict } = useI18n();
  const f = dict.features.page;

  useEffect(() => {
    const previous = document.title;
    document.title = t('meta.features');
    return () => {
      document.title = previous;
    };
  }, [t]);

  return (
    <div className="pt-[72px]">
      <PageHeader
        index={f.index}
        eyebrow={dict.features.eyebrow}
        title={
          <>
            {f.titlePre} <span className="text-outline">{f.titleAccent}</span>
          </>
        }
        description={f.description}
      />
      <DesaValueGrid />
      <DesaFeatures />
      <DesaGames />
      <DesaUseCases />
    </div>
  );
}
