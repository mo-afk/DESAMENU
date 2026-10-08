import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DesaProcess from '../components/desa/DesaProcess';
import DesaComparison from '../components/desa/DesaComparison';
import DesaFaq from '../components/desa/DesaFaq';
import DesaCta from '../components/desa/DesaCta';
import { useI18n } from '../i18n';

/** How a DESA Menu deployment works, from first audit to launch. */
export default function HowItWorks() {
  const { t, dict } = useI18n();
  const p = dict.process.page;

  useEffect(() => {
    const previous = document.title;
    document.title = t('meta.howItWorks');
    return () => {
      document.title = previous;
    };
  }, [t]);

  return (
    <div className="pt-[72px]">
      <PageHeader
        index={p.index}
        eyebrow={dict.process.eyebrow}
        title={
          <>
            {p.titlePre} <span className="text-outline">{p.titleAccent}</span>
          </>
        }
        description={p.description}
      />
      <DesaProcess />
      <DesaComparison />
      <DesaFaq />
      <DesaCta />
    </div>
  );
}
