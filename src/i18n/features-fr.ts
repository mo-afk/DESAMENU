/**
 * French copy for the capability and game entries in `lib/features.ts`.
 *
 * Structure (slug, icon, panel, numbering) stays in the source file; only the
 * words live here. Checked against `Dict` at the import site in `fr.ts`, so a
 * misspelled field or a wrong list shape is a compile error.
 */
export const FR_FEATURES = {
  'video-menus': {
    title: 'Menus vidéo',
    kindLabel: 'Capacité',
    short:
      'Présentez chaque plat avec des visuels et du mouvement haut de gamme qui rendent la commande plus intuitive, plus premium et plus convaincante.',
    tagline: 'Huit à douze plats, filmés au passe, en boucle de moins de six secondes.',
    bullets: ['Aperçus de plats cinématographiques', 'Appétit renforcé', 'Vente additionnelle par la présentation'],
    capabilities: [
      'Boucles de six secondes par plat',
      'Tourné au passe, sur vos assiettes',
      'Chargement différé sous 300 ko',
      'Lisible sur un réseau de salle faible',
      'Notes de dégustation écrites avec la cuisine',
      'Nouvelle vidéo ajoutée sans réimpression',
    ],
    stats: [
      { value: '61%', label: 'Des clients ouvrent une vidéo de plat' },
      { value: '~2×', label: 'Sélection du plat signature filmé' },
      { value: '<1s', label: 'Démarrage de la boucle en 4G chargée' },
    ],
  },

  'text-menus': {
    title: 'Menus texte et standard',
    kindLabel: 'Capacité',
    short:
      'Des menus numériques rapides, clairs et superbement structurés, pensés pour la lisibilité, la vitesse et une navigation sans effort sur tous les appareils.',
    tagline: 'Le chemin le plus court entre l’arrivée à table et l’envie déjà claire.',
    bullets: ['Mise en page pensée pour le mobile', 'Navigation par catégories fluide', 'Présentation élégante de la carte'],
    capabilities: [
      'Typographie et hiérarchie pensées pour le mobile',
      'Des catégories construites sur la façon dont les clients choisissent',
      'Prêt pour plusieurs langues',
      'Épuisé et plats du jour mis à jour en quelques secondes',
      'Catégories sur un seul écran quand c’est possible',
      'Contrastes et zones tactiles accessibles',
    ],
    stats: [
      { value: '−22%', label: 'De temps de scan à la commande' },
      { value: '0', label: 'Réimpression depuis le lancement' },
      { value: '5s', label: 'Pour une commande assurée' },
    ],
  },

  'gamified-dining': {
    title: 'Écosystème de jeu à table',
    kindLabel: 'Capacité',
    short:
      'Une suite complète de jeux à table — Qui paie ?, la Roue du combo idéal et le Quiz goût et personnalité — plus des jeux sur mesure et des micro-interactions de fidélité.',
    tagline: 'Quatre façons de transformer une table en joueurs, et les joueurs en commandes répétées.',
    bullets: ['Trois expériences clés à chaque déploiement', 'Jeux sur mesure au service de votre marque', 'Engagement et panier moyen renforcés'],
    capabilities: [
      'Roulette d’addition Qui paie ?',
      'Accords de la Roue du combo idéal',
      'Sélection par le Quiz goût et personnalité',
      'Jeux sur mesure construits pour votre marque',
      'Micro-interactions et séries de fidélité',
      'Données de jeu dans les mêmes statistiques que le menu',
    ],
    stats: [
      { value: '1 table sur 3', label: 'Joue à un jeu de table' },
      { value: '23 min', label: 'De présence en plus en moyenne' },
      { value: '+41%', label: 'Commandes supplémentaires' },
    ],
  },

  'loyalty-cards': {
    title: 'Cartes de fidélité intégrées',
    kindLabel: 'Capacité',
    short:
      'Transformez une visite en visite répétée grâce à des programmes de fidélité intégrés directement à l’expérience du menu.',
    tagline: 'La reconnaissance à table, pas une carte en plastique restée dans un portefeuille.',
    bullets: ['Conçu pour la rétention', 'Expérience de fidélité numérique', 'Encourage les retours'],
    capabilities: [
      'Aucune application à installer, aucun plastique à porter',
      'Reconnaît les habitués par place',
      'Points et récompenses à la recommande',
      'Une identité pour plusieurs établissements',
      'Bonus anniversaire et étapes clés',
      'Rapports de rétention intégrés',
    ],
    stats: [
      { value: '+46%', label: 'De clients revenus sur trois établissements' },
      { value: '38k', label: 'Cartes émises dans un beach club' },
      { value: '5 / 5', label: 'Tampons avant la récompense' },
    ],
  },

  'who-pays': {
    title: 'Qui paie ?',
    kindLabel: 'Jeu interactif',
    short: 'Le jeu de table classique qui décide qui règle l’addition.',
    tagline: 'Roulette d’addition. Quinze secondes, à l’image de votre établissement, photographiée sans fin.',
    bullets: ['Tranche l’addition sans friction', 'Se joue idéalement entre deux tournées', 'Transforme les tables en commandes répétées'],
    capabilities: [
      'Conscient des places, de deux à douze convives',
      'Entièrement aux couleurs de votre établissement',
      'Se joue en quinze secondes, sans installation',
      'Lancé depuis le menu, sans téléchargement',
      'Parties et temps passé dans les statistiques',
      'S’associe à une récompense par tournée si vous le souhaitez',
    ],
    stats: [
      { value: '1 table sur 3', label: 'Y joue' },
      { value: '23 min', label: 'De présence en plus en moyenne' },
      { value: '+41%', label: 'Commandes supplémentaires' },
    ],
  },

  'combo-spinner': {
    title: 'Roue du combo idéal',
    kindLabel: 'Jeu interactif',
    short: 'Une roue qui compose des accords mets-boissons ludiques et personnalisés.',
    tagline: 'Une roue qui tranche la question que la table débattait déjà.',
    bullets: ['Accords mets et boissons en un geste', 'Pondérée vers les plats à forte marge', 'Variantes saisonnières et campagnes'],
    capabilities: [
      'Accords mets et boissons en un geste',
      'Pondérée vers les combinaisons que vous voulez vendre',
      'Variantes saisonnières et campagnes',
      'Roue, textes et accords à votre marque',
      'Fonctionne pour le solide, le liquide ou les deux',
      'Chaque tour enregistré pour construire vos cartes',
    ],
    stats: [
      { value: '+27%', label: 'De hausse sur les boissons en accord' },
      { value: '24', label: 'Accords par établissement, ajustés chaque trimestre' },
      { value: '1 geste', label: 'De l’hésitation au choix' },
    ],
  },

  'taste-quiz': {
    title: 'Quiz goût et personnalité',
    kindLabel: 'Jeu interactif',
    short: 'Un quiz interactif et court qui compose instantanément une sélection personnelle de plats et de cocktails.',
    tagline: 'Trois questions, puis une sélection pensée pour la personne qui tient le téléphone.',
    bullets: ['Trois ou quatre questions de préférence', 'Plats et cocktails sur mesure, immédiatement', 'Les clients personnalisés explorent plus loin'],
    capabilities: [
      'Trois ou quatre questions, moins de trente secondes',
      'Sélection croisée entre plats et cocktails',
      'Guidée par les réponses, jamais aléatoire',
      'Rejouable instantanément si le client change d’avis',
      'Sélections écrites avec votre cuisine',
      'Taux de découverte et d’adhésion suivis',
    ],
    stats: [
      { value: '3–4', label: 'Questions par client' },
      { value: 'Moins de 30 s', label: 'Pour une sélection sur mesure' },
      { value: '×2', label: 'De découvertes de nouveaux plats' },
    ],
  },

  'custom-games': {
    title: 'Jeux de table sur mesure et micro-interactions de fidélité',
    kindLabel: 'Jeu interactif',
    short: 'Des fonctions de jeu personnalisables, pensées pour renforcer l’engagement à table et le panier moyen.',
    tagline: 'La couche que les exploitants nous demandent d’inventer — construite pour votre marque, mesurée comme le reste.',
    bullets: ['Construits autour de votre marque', 'Récompensent les comportements que vous voulez', 'Ne retardent jamais une commande'],
    capabilities: [
      'Séries de fidélité et paliers à débloquer',
      'Mécaniques de roue et chasse aux badges',
      'Points à la recommande et codes de parrainage',
      'Campagnes saisonnières et classements d’établissement',
      'Conçu pour votre marque, pas un modèle',
      'Livré avec les statistiques que vous avez déjà',
    ],
    stats: [
      { value: '8+', label: 'Modèles de micro-interactions dans la bibliothèque' },
      { value: 'Sur mesure', label: 'Jeux construits pour la marque, pas des modèles' },
      { value: '1 système', label: 'Jeux et fidélité au même endroit' },
    ],
  },
};
