import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DesaProcess from '../components/desa/DesaProcess';
import DesaComparison from '../components/desa/DesaComparison';
import DesaCta from '../components/desa/DesaCta';

/** How a DESA Menu deployment works, from first audit to launch. */
export default function HowItWorks() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'How it works — DESA Menu';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="pt-[72px]">
      <PageHeader
        index="02"
        eyebrow="How it works"
        title={
          <>
            From concept to guest interaction <span className="text-outline">in three steps.</span>
          </>
        }
        description="Five weeks for a single venue, six to ten for a group. One shoot day on your pass, your team's sign-off before anything goes live, and a performance review thirty days after launch."
      />
      <DesaProcess />
      <DesaComparison />
      <DesaCta />
    </div>
  );
}
