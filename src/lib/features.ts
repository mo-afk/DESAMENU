import { BadgeCheck, Brain, Dices, Disc3, ListOrdered, Puzzle, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Single source of truth for the DESA Menu capability and game pages.
 *
 * `DesaFeatures` renders the four capabilities, `DesaGames` renders the four
 * games as tabs, and `/features/:slug` renders either as a full page — all from
 * these entries, so copy and mock panels can never drift apart.
 */
export type FeatureKind = 'capability' | 'game';

/** Which mock panel to render, resolved by `<FeaturePanel />`. */
export type PanelKey = 'video' | 'menu' | 'game' | 'loyalty' | 'roulette' | 'spinner' | 'quiz' | 'micro';

export interface FeatureEntry {
  slug: string;
  n: string;
  kind: FeatureKind;
  kindLabel: string;
  icon: LucideIcon;
  title: string;
  /** One line for cards and tabs. */
  short: string;
  /** Hero line on the detail page. */
  tagline: string;
  paragraphs: string[];
  capabilities: string[];
  stats: { value: string; label: string }[];
  bullets: string[];
  panel: PanelKey;
  /** Substrings matched against a demo's category, services and games. */
  matchKeywords: string[];
  related?: string[];
}

export const FEATURES: FeatureEntry[] = [
  /* ----------------------------- capabilities ----------------------------- */
  {
    slug: 'video-menus',
    n: '01',
    kind: 'capability',
    kindLabel: 'Capability',
    icon: Video,
    title: 'Video Menus',
    short:
      'Show every dish with high-quality visuals and motion that make ordering more intuitive, more premium, and more persuasive.',
    tagline: 'Eight to twelve dishes, filmed on the pass, looped in under six seconds.',
    paragraphs: [
      'A static menu asks guests to imagine. A photograph helps a little. A six-second film of the plate being finished, sauced and set down is the closest a guest gets to tasting it before it arrives — and it is the single strongest lever we have found on what a table orders.',
      'The rules we shoot by are deliberately unglamorous. Film on the pass, not in a studio, because guests recognise the room they are sitting in. Keep loops under six seconds and under 300 kB, because the network in a full dining room is worse than your office. Film the finish — the pour, the shave, the flame — because motion is what carries appetite.',
      'And do not film everything. A menu where every dish moves is a menu where nothing stands out. We typically film eight to twelve plates per venue and let the rest stay quiet, elegant text, so the filmed dishes read as the signature of the house.',
    ],
    capabilities: [
      'Six-second dish loops',
      'Shot on the pass, on your plates',
      'Lazy-loaded under 300 kB',
      'Readable on a weak dining-room network',
      'Tasting notes written with the kitchen',
      'New film added without a reprint',
    ],
    stats: [
      { value: '61%', label: 'Of guests open a dish video' },
      { value: '~2×', label: 'Selection of the filmed signature' },
      { value: '<1s', label: 'Loop start on a busy 4G network' },
    ],
    bullets: ['Cinematic dish previews', 'Stronger appetite appeal', 'Upsell through presentation'],
    panel: 'video',
    matchKeywords: ['Video menu', 'Video Menu', 'Dish film', 'Tasting notes'],
    related: ['text-menus', 'gamified-dining'],
  },
  {
    slug: 'text-menus',
    n: '02',
    kind: 'capability',
    kindLabel: 'Capability',
    icon: ListOrdered,
    title: 'Text & Standard Menus',
    short:
      'Fast, clean, beautifully structured digital menus designed for clarity, speed, and effortless browsing across all devices.',
    tagline: 'The fastest possible path from sitting down to knowing what you want.',
    paragraphs: [
      'Most guests do not want to browse a menu. They want to be confident about one choice in the first minute, and the printed board was never the bottleneck — the structure was. We rebuild categories around how guests decide: light to rich, familiar to adventurous, by time of day rather than by kitchen station.',
      'Type does the heavy lifting. Sizes and weights are set for a phone held at arm’s length in a dim room, with contrast that survives glare and hit targets that a thumb can actually hit. Where a category fits on one screen, it stays on one screen — no scroll for the decision.',
      'The operational win is the quiet one. A sold-out dish, a price change or the day’s brew rotation updates in seconds from the counter, so the menu guests see is never a version of the truth from last Tuesday.',
    ],
    capabilities: [
      'Mobile-first typography and hierarchy',
      'Categories built around how guests decide',
      'Multi-language ready',
      'Sold-out and specials updated in seconds',
      'Single-screen categories where possible',
      'Accessible contrast and hit targets',
    ],
    stats: [
      { value: '−22%', label: 'Scan-to-order time' },
      { value: '0', label: 'Reprints since launch' },
      { value: '5s', label: 'To a confident order' },
    ],
    bullets: ['Mobile-first layout', 'Easy category navigation', 'Elegant menu presentation'],
    panel: 'menu',
    matchKeywords: ['Text menu', 'Interactive menu', 'Menu architecture', 'Menu search', 'Seasonal updates'],
    related: ['video-menus', 'loyalty-cards'],
  },
  {
    slug: 'gamified-dining',
    n: '03',
    kind: 'capability',
    kindLabel: 'Capability',
    icon: Dices,
    title: 'Gamified Dining Ecosystem',
    short:
      'A full suite of table-side games — Who Pays?, the Ideal Combo Spinner and the Taste & Personality Quiz — plus custom games and loyalty micro-interactions.',
    tagline: 'Four ways to turn a table into players, and players into repeat orders.',
    paragraphs: [
      'Engagement at the table is worth more than a discount at the till. A short, well-made interaction costs nothing per use, it compounds every service, and it leaves guests with something to talk about — which is why the games layer is a core part of DESA Menu rather than an add-on.',
      'The three core experiences cover the three moments a table actually needs help: who orders (Who Pays?), what pairs with it (the Ideal Combo Spinner), and what should I get (the Taste & Personality Quiz). Each takes seconds, each is branded to your venue, and each is instrumented so you can see what guests play.',
      'Underneath sits the configurable layer — custom games and loyalty micro-interactions built per venue: streaks that survive a missed week, points that land on a reorder, a small unlock on a birthday, a leaderboard for a season. It is the part operators ask us to invent for them, and the part that keeps the suite from ever feeling generic.',
    ],
    capabilities: [
      'Who Pays? bill roulette',
      'Ideal Combo Spinner pairings',
      'Taste & Personality Quiz curation',
      'Custom games built to your brand',
      'Loyalty micro-interactions and streaks',
      'Play data in the same analytics as the menu',
    ],
    stats: [
      { value: '1 in 3', label: 'Tables play a table game' },
      { value: '23 min', label: 'Longer average dwell time' },
      { value: '+41%', label: 'Second-round reorders' },
    ],
    bullets: ['Three core experiences, every rollout', 'Custom games built to your brand', 'Boost engagement and order value'],
    panel: 'game',
    matchKeywords: ['games suite', 'table game', 'Who Pays?', 'Ideal Combo Spinner', 'Taste & Personality Quiz', 'Custom table games', 'Loyalty micro-interactions'],
    related: ['who-pays', 'combo-spinner', 'taste-quiz'],
  },
  {
    slug: 'loyalty-cards',
    n: '04',
    kind: 'capability',
    kindLabel: 'Capability',
    icon: BadgeCheck,
    title: 'Integrated Loyalty Cards',
    short:
      'Turn one-time visits into repeat business with loyalty systems built directly into the menu experience.',
    tagline: 'Recognition at the table, not a plastic card in a wallet at home.',
    paragraphs: [
      'Most loyalty programmes fail at the same place: the guest has to remember the card, download the app and care about the points before anything happens. Ours lives inside the menu guests already scan, so the card opens with the menu and the first stamp lands before the order is placed.',
      'Because the card is attached to the table rather than to a paper token, the venue learns who is back and what they usually order. Regulars get their usual pinned to the top of the menu; multi-outlet groups get one identity across every room, bar and rooftop.',
      'The result is retention you can point at in a weekly report: returning guests, repeat orders, and the share of covers that come from people who have been before rather than a paid acquisition.',
    ],
    capabilities: [
      'No app to install, no plastic to carry',
      'Recognises returning guests by seat',
      'Points and rewards on reorder',
      'One identity across multiple outlets',
      'Birthday and milestone bonuses',
      'Retention reporting built in',
    ],
    stats: [
      { value: '+46%', label: 'Returning guests across three outlets' },
      { value: '38k', label: 'Cards issued at one beach club' },
      { value: '5 / 5', label: 'Stamps before the reward lands' },
    ],
    bullets: ['Retention-focused design', 'Digital fidelity experience', 'Encourage return visits'],
    panel: 'loyalty',
    matchKeywords: ['Loyalty card', 'Loyalty programme', 'Loyalty', 'loyalty logic'],
    related: ['gamified-dining', 'text-menus'],
  },

  /* --------------------------------- games -------------------------------- */
  {
    slug: 'who-pays',
    n: 'G1',
    kind: 'game',
    kindLabel: 'Interactive game',
    icon: Dices,
    title: 'Who Pays?',
    short: 'The classic table-side game that decides who settles the check.',
    tagline: 'Bill roulette. Fifteen seconds, branded to your venue, endlessly photographed.',
    paragraphs: [
      'Who Pays? is a small, branded game that decides which guest at the table covers the round. It takes about fifteen seconds. It is trivial by any reasonable measure — and it turned out to be the most effective thing we have shipped.',
      'Around one table in three plays it, mostly in groups, mostly between the first and second round. It creates the reason a table stays in the seat for one more order, and it gives everyone at the table a moment worth reacting to. Venues report it appearing in stories and reviews without anyone being asked to post.',
      'It is also the purest demonstration of the rule behind the whole suite: engagement at the table is worth more than a discount at the till, and a small, well-made interaction compounds every service.',
    ],
    capabilities: [
      'Seat-aware, works for tables of two to twelve',
      'Fully branded to your venue and palette',
      'Plays in fifteen seconds, no setup',
      'Triggered from the menu, no download',
      'Play counts and dwell time in analytics',
      'Pairs with a round-specific reward if you want one',
    ],
    stats: [
      { value: '1 in 3', label: 'Tables play it' },
      { value: '23 min', label: 'Longer average dwell time' },
      { value: '+41%', label: 'Second-round reorders' },
    ],
    bullets: ['Decides the bill without friction', 'Best played between rounds', 'Turns tables into repeat orders'],
    panel: 'roulette',
    matchKeywords: ['Who Pays?'],
    related: ['combo-spinner', 'taste-quiz', 'gamified-dining'],
  },
  {
    slug: 'combo-spinner',
    n: 'G2',
    kind: 'game',
    kindLabel: 'Interactive game',
    icon: Disc3,
    title: 'Ideal Combo Spinner',
    short: 'A spin-the-wheel tool that builds fun, personalised meal and drink combinations.',
    tagline: 'A wheel that answers the question the table was already arguing about.',
    paragraphs: [
      'The Ideal Combo Spinner is what a guest reaches for when they cannot choose between two things and do not want to admit it. One tap, and it lands on a meal-and-drink pairing with a name and a reason to like it.',
      'Underneath, the pairings are weighted. Combinations built from the plates and pours a venue most wants to move surface more often than combinations built from the cheapest items on the list — so guests get a decision made for them, and the kitchen gets a pairing it actually wanted to sell.',
      'That is why it is the least intrusive upsell we have built. A wheel that tells you what to order feels like a game rather than a pitch, and venues running it alongside loyalty see the pairing repeated as a favourite on the second visit.',
    ],
    capabilities: [
      'Meal and drink pairings in one tap',
      'Weighted toward the combinations you want to sell',
      'Seasonal and campaign variants',
      'Branded wheel, copy and pairings',
      'Works for food, drinks or both',
      'Every spin recorded for menu planning',
    ],
    stats: [
      { value: '+27%', label: 'Paired-beverage uplift' },
      { value: '24', label: 'Pairings per venue, tuned quarterly' },
      { value: '1 tap', label: 'From deciding to deciding' },
    ],
    bullets: ['Meal and drink pairings in one tap', 'Weighted toward high-margin items', 'Campaign and seasonal variants'],
    panel: 'spinner',
    matchKeywords: ['Ideal Combo Spinner', 'Spinner'],
    related: ['taste-quiz', 'who-pays', 'gamified-dining'],
  },
  {
    slug: 'taste-quiz',
    n: 'G3',
    kind: 'game',
    kindLabel: 'Interactive game',
    icon: Brain,
    title: 'Taste & Personality Quiz',
    short: 'A short interactive quiz that instantly curates a personal selection of dishes and cocktails.',
    tagline: 'Three questions, then a selection built for the person holding the phone.',
    paragraphs: [
      'The Taste & Personality Quiz handles the guest who wants something new but does not trust the list. Three or four questions — how you like to start, how adventurous you are feeling, whether you want bright or rich — and the menu narrows to a curated selection of plates and cocktails.',
      'It is the feature that rescues the second half of a long menu. Items that never get chosen from a list get chosen when they arrive as a recommendation with a reason attached, which is why venues with frequently rotating specials and deep drinks lists get the most out of it.',
      'Guests can accept the whole selection, take one item from it, or rerun the quiz. Either way, the answers stay with the session, so the next recommendation on that table already knows what they like.',
    ],
    capabilities: [
      'Three or four questions, under thirty seconds',
      'Curation across dishes and cocktails together',
      'Answer-driven, not random',
      'Reruns instantly if the guest changes their mind',
      'Selections written with your kitchen',
      'Discovery and acceptance rates tracked',
    ],
    stats: [
      { value: '3–4', label: 'Questions per guest' },
      { value: 'Under 30s', label: 'To a curated selection' },
      { value: '×2', label: 'Discovery of new dishes' },
    ],
    bullets: ['Three or four preference questions', 'Curated plates and cocktails on the spot', 'Personalised guests explore further'],
    panel: 'quiz',
    matchKeywords: ['Taste & Personality Quiz', 'Taste quiz'],
    related: ['combo-spinner', 'who-pays', 'gamified-dining'],
  },
  {
    slug: 'custom-games',
    n: 'G4',
    kind: 'game',
    kindLabel: 'Interactive game',
    icon: Puzzle,
    title: 'Custom Table Games & Loyalty Micro-interactions',
    short: 'Customisable gamified features tailored to boost table engagement and average order value.',
    tagline: 'The layer operators ask us to invent for them — built to your brand, measured like everything else.',
    paragraphs: [
      'Beyond the three core experiences, we build gamified touches shaped around your venue: loyalty streaks that survive a missed week, spin-to-unlock rewards, points that land on a reorder, a small unlock on a birthday, table leaderboards for a season.',
      'These are the requests that come from operators who already understand their room — the anniversary of a guest’s first visit, the team challenge behind the bar, the seasonal campaign that needs to feel like an event rather than a discount. Because the games layer is configurable rather than fixed, those requests ship rather than get filed.',
      'Every micro-interaction is designed against the same brief: it must reward a behaviour you actually want, take seconds to understand, and never stand between a guest and the thing they already wanted. A table game that delays an order is a tax; one that answers a question is revenue.',
    ],
    capabilities: [
      'Loyalty streaks and milestone unlocks',
      'Spin-to-unlock and badge-hunt mechanics',
      'Points on reorder and refer-a-friend codes',
      'Seasonal campaigns and venue-wide leaderboards',
      'Designed to your brand, not a template',
      'Ships with the analytics you already have',
    ],
    stats: [
      { value: '8+', label: 'Micro-interaction patterns in the library' },
      { value: 'Per venue', label: 'Games built to brand, not templates' },
      { value: '1 system', label: 'Games and loyalty in one place' },
    ],
    bullets: ['Built around your brand', 'Rewards behaviours you want', 'Never delays an order'],
    panel: 'micro',
    matchKeywords: ['Custom table games', 'Loyalty micro-interactions'],
    related: ['gamified-dining', 'loyalty-cards', 'who-pays'],
  },
];

export const CAPABILITIES = FEATURES.filter((f) => f.kind === 'capability');
export const GAMES = FEATURES.filter((f) => f.kind === 'game');

export const getFeature = (slug?: string): FeatureEntry | undefined =>
  slug ? FEATURES.find((f) => f.slug === slug) : undefined;

/** Slug before/after this one in the registry, for detail-page pagination. */
export function neighbours(slug: string): { prev?: FeatureEntry; next?: FeatureEntry } {
  const i = FEATURES.findIndex((f) => f.slug === slug);
  if (i === -1) return {};
  return {
    prev: FEATURES[(i - 1 + FEATURES.length) % FEATURES.length],
    next: FEATURES[(i + 1) % FEATURES.length],
  };
}
