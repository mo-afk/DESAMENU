import { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DesaValueGrid from '../components/desa/DesaValueGrid';
import DesaFeatures from '../components/desa/DesaFeatures';
import DesaGames from '../components/desa/DesaGames';
import DesaUseCases from '../components/desa/DesaUseCases';

/** Deep dive on the DESA Menu capabilities, including the games suite. */
export default function Features() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Features — DESA Menu';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="pt-[72px]">
      <PageHeader
        index="01"
        eyebrow="Features"
        title={
          <>
            Everything your menu needs to do — <span className="text-outline">in one system.</span>
          </>
        }
        description="Interactive text menus, cinematic dish video, a full gamified dining ecosystem — Who Pays?, the Ideal Combo Spinner, the Taste & Personality Quiz — plus digital loyalty and the analytics that show what guests actually look at."
      />
      <DesaValueGrid />
      <DesaFeatures />
      <DesaGames />
      <DesaUseCases />
    </div>
  );
}
