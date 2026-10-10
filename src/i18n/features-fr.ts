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
    paragraphs: [
      'Une carte imprimée demande au client d’imaginer. La photographie aide un peu. Un film de six secondes montrant l’assiette finie, nappée et posée est ce qui rapproche le plus un client du goût avant l’arrivée du plat — et c’est le levier le plus puissant que nous ayons trouvé sur ce qu’une table commande.',
      'Nos règles de tournage sont volontairement sans glamour. Filmer au passe, pas en studio, parce que les clients reconnaissent la salle où ils sont assis. Garder les boucles sous six secondes et sous 300 ko, parce que le réseau d’une salle pleine est moins bon que celui de votre bureau. Filmer le geste final — le versé, la râpée, la flamme — parce que c’est le mouvement qui porte l’appétit.',
      'Et ne filmez pas tout. Une carte où chaque plat bouge est une carte où rien ne ressort. Nous filmons en général huit à douze assiettes par maison et laissons le reste en texte sobre et élégant, pour que les plats filmés se lisent comme la signature de la maison.',
    ],
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
    paragraphs: [
      'La plupart des clients ne veulent pas parcourir une carte. Ils veulent être sûrs d’un choix dans la première minute, et le tableau imprimé n’a jamais été le goulot d’étranglement — c’était la structure. Nous reconstruisons les catégories autour de la façon dont les clients décident : du léger au riche, du familier à l’audacieux, selon l’heure plutôt que selon le poste en cuisine.',
      'C’est la typographie qui fait le travail. Tailles et graisses sont réglées pour un téléphone tenu à bout de bras dans une salle tamisée, avec un contraste qui résiste aux reflets et des zones de contact qu’un pouce atteint vraiment. Quand une catégorie tient sur un écran, elle reste sur un écran — pas de défilement pour décider.',
      'Le gain opérationnel est le plus discret. Un plat épuisé, un changement de prix ou la rotation du café du jour se mettent à jour en quelques secondes depuis le comptoir, pour que la carte que voient les clients ne soit jamais une vérité de mardi dernier.',
    ],
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
    paragraphs: [
      'L’engagement à table vaut plus qu’une remise en caisse. Une interaction courte et bien faite ne coûte rien à chaque usage, se cumule à chaque service et laisse aux clients quelque chose dont parler — voilà pourquoi la couche de jeux est un élément central de DESA Menu et non un ajout.',
      'Les trois expériences principales couvrent les trois moments où une table a réellement besoin d’aide : qui commande (Qui paie ?), quoi associer (la Roue du combo idéal) et que choisir (le Quiz goût et personnalité). Chacune prend quelques secondes, chacune est à votre marque, et chacune est instrumentée pour vous montrer ce que les clients jouent.',
      'En dessous se trouve la couche configurable — jeux sur mesure et micro-interactions de fidélité conçus par maison : des séries qui survivent à une semaine manquée, des points qui tombent sur une nouvelle commande, une petite attention pour un anniversaire, un classement pour la saison. C’est la partie que les exploitants nous demandent d’inventer pour eux, et celle qui empêche la suite de paraître générique.',
    ],
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
    paragraphs: [
      'La plupart des programmes de fidélité échouent au même endroit : le client doit se souvenir de la carte, télécharger l’application et s’intéresser aux points avant que quoi que ce soit n’arrive. Le nôtre vit dans le menu que les clients scannent déjà : la carte de fidélité s’ouvre avec le menu et le premier tampon tombe avant même la commande.',
      'Comme la carte est attachée à la table plutôt qu’à un support papier, la maison apprend qui revient et ce que l’on commande d’ordinaire. Les habitués retrouvent leur commande épinglée en haut du menu ; les groupes multi-sites obtiennent une identité unique dans chaque salle, bar et rooftop.',
      'Le résultat est une fidélisation que l’on peut montrer dans un rapport hebdomadaire : clients qui reviennent, commandes répétées, et la part des couverts venant de personnes déjà venues plutôt que d’une acquisition payée.',
    ],
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
    paragraphs: [
      'Qui paie ? est un petit jeu à votre marque qui désigne celui qui régale la table. Il dure une quinzaine de secondes. Il est anecdotique à toute mesure raisonnable — et il s’est révélé la chose la plus efficace que nous ayons livrée.',
      'Environ une table sur trois y joue, surtout en groupe, surtout entre le premier et le deuxième tournant. Il crée la raison pour laquelle une table reste assise pour une commande de plus, et il offre à chacun un moment auquel réagir. Les maisons le signalent dans leurs stories et leurs avis sans que personne n’ait été invité à publier.',
      'C’est aussi la démonstration la plus pure de la règle qui porte toute la suite : l’engagement à table vaut plus qu’une remise en caisse, et une interaction courte et bien faite se cumule à chaque service.',
    ],
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
    paragraphs: [
      'La Roue du combo idéal est ce vers quoi se tourne un client qui n’arrive pas à choisir entre deux choses et ne veut pas l’admettre. Un geste, et elle s’arrête sur un accord plat-boisson doté d’un nom et d’une raison de l’aimer.',
      'En dessous, les accords sont pondérés. Les combinaisons bâties sur les assiettes et les verres que la maison veut le plus faire sortir apparaissent plus souvent que celles bâties sur les articles les moins chers de la carte — le client reçoit une décision toute faite, et la cuisine obtient l’accord qu’elle voulait vraiment vendre.',
      'C’est pourquoi il s’agit de la montée en gamme la moins intrusive que nous ayons construite. Une roue qui vous dit quoi commander ressemble à un jeu plutôt qu’à un argumentaire, et les maisons qui la font tourner avec la fidélité voient l’accord revenir en favori dès la deuxième visite.',
    ],
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
    paragraphs: [
      'Le Quiz goût et personnalité s’occupe du client qui veut de la nouveauté mais ne fait pas confiance à la liste. Trois ou quatre questions — comment aimez-vous commencer, d’humeur aventureuse ou non, plutôt vif ou plutôt riche — et la carte se resserre sur une sélection d’assiettes et de cocktails.',
      'C’est la fonction qui sauve la seconde moitié d’une longue carte. Les articles que l’on ne choisit jamais dans une liste sont choisis lorsqu’ils arrivent en recommandation accompagnée d’une raison ; ce sont donc les maisons aux suggestions changeantes et aux longues cartes de boissons qui en tirent le plus.',
      'Le client peut accepter toute la sélection, n’en garder qu’un article ou relancer le quiz. Dans tous les cas, les réponses restent attachées à la session, de sorte que la prochaine recommandation à cette table sait déjà ce qu’ils aiment.',
    ],
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
    paragraphs: [
      'Au-delà des trois expériences principales, nous construisons des touches ludiques façonnées autour de votre maison : séries de fidélité qui survivent à une semaine manquée, récompenses à débloquer en tournant, points qui tombent sur une nouvelle commande, petite attention pour un anniversaire, classements de tables pour une saison.',
      'Ce sont les demandes qui viennent d’exploitants qui connaissent déjà leur salle — l’anniversaire de la première visite d’un client, le défi d’équipe derrière le bar, la campagne saisonnière qui doit ressembler à un événement plutôt qu’à une remise. Comme la couche de jeux est configurable et non figée, ces demandes sont livrées au lieu d’être classées.',
      'Chaque micro-interaction est conçue contre le même cahier des charges : récompenser un comportement que vous voulez vraiment, se comprendre en quelques secondes, et ne jamais se dresser entre un client et ce qu’il voulait déjà. Un jeu de table qui retarde une commande est une taxe ; un jeu qui répond à une question est du chiffre.',
    ],
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
