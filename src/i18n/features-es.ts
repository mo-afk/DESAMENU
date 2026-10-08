/**
 * Spanish copy for the capability and game entries in `lib/features.ts`.
 * European Spanish, gastronomic register — «carta» rather than «menú» where
 * the document itself is meant, «usted» forms in the surrounding chrome.
 */
export const ES_FEATURES = {
  'video-menus': {
    title: 'Cartas en vídeo',
    kindLabel: 'Capacidad',
    short: 'Muestre cada plato con imagen y movimiento de alta calidad que hacen el pedido más intuitivo, más premium y más persuasivo.',
    tagline: 'De ocho a doce platos, rodados en el pase, en bucle por debajo de seis segundos.',
    bullets: ['Avance de platos cinematográfico', 'Más apetito en la mesa', 'Venta adicional a través de la presentación'],
    capabilities: [
      'Bucles de seis segundos por plato',
      'Rodado en el pase, en sus platos',
      'Carga diferida por debajo de 300 kB',
      'Legible en una red floja de sala',
      'Notas de cata escritas con la cocina',
      'Añadir un vídeo nuevo sin reimprimir',
    ],
    stats: [
      { value: '61%', label: 'De clientes abre un vídeo de plato' },
      { value: '~2×', label: 'Elección del plato insignia rodado' },
      { value: '<1s', label: 'Arranque del bucle en 4G cargada' },
    ],
  },

  'text-menus': {
    title: 'Cartas de texto y estándar',
    kindLabel: 'Capacidad',
    short: 'Cartas digitales rápidas, limpias y magníficamente estructuradas, pensadas para la claridad, la velocidad y una navegación sin esfuerzo en cualquier dispositivo.',
    tagline: 'El camino más corto entre sentarse y saber qué apetece.',
    bullets: ['Diseño pensado para el móvil', 'Navegación fácil por categorías', 'Presentación elegante de la carta'],
    capabilities: [
      'Tipografía y jerarquía pensadas para el móvil',
      'Categorías construidas según cómo decide el cliente',
      'Preparada para varios idiomas',
      'Agotados y sugerencias actualizados en segundos',
      'Categorías en una sola pantalla siempre que se pueda',
      'Contraste y áreas táctiles accesibles',
    ],
    stats: [
      { value: '−22%', label: 'De tiempo de escaneo al pedido' },
      { value: '0', label: 'Reimpresiones desde el lanzamiento' },
      { value: '5s', label: 'Hasta un pedido seguro' },
    ],
  },

  'gamified-dining': {
    title: 'Ecosistema de juego en mesa',
    kindLabel: 'Capacidad',
    short: 'Una suite completa de juegos en mesa — ¿Quién paga?, la Ruleta del combo ideal y el Test de gusto y personalidad — más juegos a medida y microinteracciones de fidelidad.',
    tagline: 'Cuatro formas de convertir una mesa en jugadores, y a los jugadores en pedidos repetidos.',
    bullets: ['Tres experiencias clave en cada implantación', 'Juegos a medida para su marca', 'Más interacción y más ticket medio'],
    capabilities: [
      'Ruleta de la cuenta ¿Quién paga?',
      'Maridajes de la Ruleta del combo ideal',
      'Selección con el Test de gusto y personalidad',
      'Juegos a medida creados para su marca',
      'Microinteracciones y rachas de fidelidad',
      'Datos de juego en los mismos análisis que la carta',
    ],
    stats: [
      { value: '1 de cada 3', label: 'Mesas juega a un juego de mesa' },
      { value: '23 min', label: 'Más de permanencia media' },
      { value: '+41%', label: 'Pedidos de segunda ronda' },
    ],
  },

  'loyalty-cards': {
    title: 'Tarjetas de fidelidad integradas',
    kindLabel: 'Capacidad',
    short: 'Convierta una visita única en negocio recurrente con programas de fidelidad integrados directamente en la experiencia de la carta.',
    tagline: 'Reconocimiento en la mesa, no una tarjeta de plástico olvidada en casa.',
    bullets: ['Diseñado para retener', 'Experiencia de fidelidad digital', 'Favorece la vuelta'],
    capabilities: [
      'Sin app que instalar ni plástico que llevar',
      'Reconoce a quien vuelve por su asiento',
      'Puntos y recompensas al repetir pedido',
      'Una sola identidad en varios locales',
      'Bonus de cumpleaños e hitos',
      'Informes de retención incluidos',
    ],
    stats: [
      { value: '+46%', label: 'De clientes que vuelven en tres locales' },
      { value: '38k', label: 'Tarjetas emitidas en un beach club' },
      { value: '5 / 5', label: 'Sellos antes de la recompensa' },
    ],
  },

  'who-pays': {
    title: '¿Quién paga?',
    kindLabel: 'Juego interactivo',
    short: 'El clásico juego de mesa que decide quién paga la cuenta.',
    tagline: 'Ruleta de la cuenta. Quince segundos, con la marca de su local, fotografiada sin fin.',
    bullets: ['Resuelve la cuenta sin fricción', 'Ideal entre rondas', 'Convierte mesas en pedidos repetidos'],
    capabilities: [
      'Consciente del asiento, de dos a doce comensales',
      'Totalmente con la marca y la paleta de su local',
      'Se juega en quince segundos, sin montaje',
      'Se lanza desde la carta, sin descargas',
      'Partidas y permanencia en los análisis',
      'Se combina con una recompensa por ronda si lo desea',
    ],
    stats: [
      { value: '1 de cada 3', label: 'Mesas lo juega' },
      { value: '23 min', label: 'Más de permanencia media' },
      { value: '+41%', label: 'Pedidos de segunda ronda' },
    ],
  },

  'combo-spinner': {
    title: 'Ruleta del combo ideal',
    kindLabel: 'Juego interactivo',
    short: 'Una ruleta que crea combinaciones divertidas y personalizadas de platos y bebidas.',
    tagline: 'Una ruleta que resuelve la discusión que la mesa ya tenía.',
    bullets: ['Maridaje plato-bebida en un toque', 'Ponderada hacia los platos de más margen', 'Variantes de temporada y campañas'],
    capabilities: [
      'Maridaje de plato y bebida en un toque',
      'Ponderada hacia las combinaciones que quiere vender',
      'Variantes de temporada y campañas',
      'Ruleta, textos y maridajes con su marca',
      'Funciona para comida, bebida o ambos',
      'Cada giro registrado para planificar la carta',
    ],
    stats: [
      { value: '+27%', label: 'De mejora en bebida maridada' },
      { value: '24', label: 'Maridajes por local, ajustados cada trimestre' },
      { value: '1 toque', label: 'De la duda a la decisión' },
    ],
  },

  'taste-quiz': {
    title: 'Test de gusto y personalidad',
    kindLabel: 'Juego interactivo',
    short: 'Un test interactivo y breve que cura al instante una selección personal de platos y cócteles.',
    tagline: 'Tres preguntas y una selección hecha para quien sostiene el teléfono.',
    bullets: ['Tres o cuatro preguntas de preferencia', 'Platos y cócteles a medida al momento', 'Quien se siente único explora más'],
    capabilities: [
      'Tres o cuatro preguntas, menos de treinta segundos',
      'Selección conjunta de platos y cócteles',
      'Guiado por las respuestas, nunca aleatorio',
      'Se repite al instante si el cliente cambia de idea',
      'Selecciones escritas con su cocina',
      'Tasas de descubrimiento y aceptación medidas',
    ],
    stats: [
      { value: '3–4', label: 'Preguntas por cliente' },
      { value: 'Menos de 30 s', label: 'Hasta una selección a medida' },
      { value: '×2', label: 'De descubrimiento de platos nuevos' },
    ],
  },

  'custom-games': {
    title: 'Juegos de mesa a medida y micro-interacciones de fidelidad',
    kindLabel: 'Juego interactivo',
    short: 'Funciones de juego personalizables, pensadas para elevar la interacción en mesa y el ticket medio.',
    tagline: 'La capa que los operadores nos piden inventar — hecha para su marca, medida como todo lo demás.',
    bullets: ['Construidos en torno a su marca', 'Premian la conducta que usted quiere', 'Nunca retrasan un pedido'],
    capabilities: [
      'Rachas de fidelidad e hitos que se desbloquean',
      'Mecánicas de ruleta y caza de insignias',
      'Puntos al repetir y códigos de recomendar a un amigo',
      'Campañas de temporada y clasificaciones por local',
      'Diseñado para su marca, no una plantilla',
      'Se entrega con los análisis que ya tiene',
    ],
    stats: [
      { value: '8+', label: 'Patrones de microinteracción en la biblioteca' },
      { value: 'A medida', label: 'Juegos con marca, no plantillas' },
      { value: '1 sistema', label: 'Juegos y fidelidad en un solo sitio' },
    ],
  },
};
