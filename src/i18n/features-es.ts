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
    paragraphs: [
      'Una carta impresa pide al cliente que imagine. La fotografía ayuda un poco. Un vídeo de seis segundos del plato terminándose, salseándose y sirviéndose es lo más cerca que un cliente está de probarlo antes de que llegue — y es la palanca más potente que hemos encontrado sobre lo que pide una mesa.',
      'Nuestras reglas de rodaje son deliberadamente poco glamurosas. Grabar en el pase, no en un estudio, porque los clientes reconocen la sala en la que están sentados. Mantener los bucles por debajo de seis segundos y de 300 kB, porque la red de un comedor lleno es peor que la de su oficina. Grabar el gesto final — el vertido, el rallado, la llama — porque es el movimiento lo que despierta el apetito.',
      'Y no lo grabe todo. Una carta en la que cada plato se mueve es una carta en la que nada destaca. Normalmente grabamos de ocho a doce platos por local y dejamos el resto como texto sobrio y elegante, para que los platos grabados se lean como la firma de la casa.',
    ],
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
    paragraphs: [
      'La mayoría de los clientes no quiere recorrer una carta. Quiere tener clara una elección en el primer minuto, y el cartel impreso nunca fue el cuello de botella: lo era la estructura. Reconstruimos las categorías en torno a cómo deciden los clientes: de lo ligero a lo contundente, de lo conocido a lo atrevido, según la hora del día y no según la partida de cocina.',
      'La tipografía hace el trabajo pesado. Tamaños y grosores están ajustados para un teléfono sostenido a la distancia del brazo en una sala en penumbra, con un contraste que resiste los reflejos y unas zonas de pulsación que un pulgar alcanza de verdad. Cuando una categoría cabe en una pantalla, se queda en una pantalla: sin desplazamiento para decidir.',
      'La ganancia operativa es la discreta. Un plato agotado, un cambio de precio o la rotación del café del día se actualizan en segundos desde la barra, de modo que la carta que ven los clientes nunca es una verdad del martes pasado.',
    ],
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
    paragraphs: [
      'La interacción en la mesa vale más que un descuento en caja. Una interacción breve y bien hecha no cuesta nada por uso, se acumula en cada servicio y deja a los clientes algo de lo que hablar: por eso la capa de juegos es una parte central de DESA Menu y no un añadido.',
      'Las tres experiencias principales cubren los tres momentos en que una mesa necesita ayuda de verdad: quién pide (¿Quién paga?), qué combina con ello (la Ruleta del combo ideal) y qué elijo (el Test de gusto y personalidad). Cada una lleva segundos, cada una lleva su marca y cada una está instrumentada para que vea a qué juegan los clientes.',
      'Debajo está la capa configurable: juegos a medida y microinteracciones de fidelidad construidas para cada local — rachas que sobreviven a una semana perdida, puntos que caen al repetir pedido, un pequeño desbloqueo en un cumpleaños, una clasificación por temporada. Es la parte que los operadores nos piden inventar para ellos, y la que evita que la suite resulte genérica.',
    ],
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
    paragraphs: [
      'La mayoría de los programas de fidelidad fracasan en el mismo punto: el cliente tiene que acordarse de la tarjeta, descargar la aplicación e interesarse por los puntos antes de que ocurra nada. La nuestra vive dentro del menú que los clientes ya escanean, así que la tarjeta se abre con el menú y el primer sello cae antes de hacer el pedido.',
      'Como la tarjeta está asociada a la mesa y no a un soporte de papel, el local sabe quién vuelve y qué suele pedir. Los habituales encuentran su pedido de siempre fijado arriba del menú, y los grupos con varios locales obtienen una única identidad en cada sala, barra y terraza.',
      'El resultado es una retención que se puede señalar en un informe semanal: clientes que vuelven, pedidos que se repiten y la parte de los cubiertos que procede de quien ya estuvo antes y no de una adquisición de pago.',
    ],
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
    paragraphs: [
      '¿Quién paga? es un pequeño juego con su marca que decide qué cliente de la mesa invita a la ronda. Dura unos quince segundos. Es trivial según cualquier medida razonable — y resultó ser lo más eficaz que hemos lanzado.',
      'La juega aproximadamente una mesa de cada tres, sobre todo en grupo y sobre todo entre la primera y la segunda ronda. Crea el motivo por el que una mesa se queda en el asiento para pedir una vez más, y da a todos un momento al que reaccionar. Los locales cuentan que aparece en historias y reseñas sin que nadie haya pedido publicarlo.',
      'Es también la demostración más pura de la regla que sostiene toda la suite: la interacción en la mesa vale más que un descuento en caja, y una interacción breve y bien hecha se acumula en cada servicio.',
    ],
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
    paragraphs: [
      'La Ruleta del combo ideal es a lo que recurre un cliente cuando no sabe elegir entre dos cosas y no quiere admitirlo. Un toque, y se detiene en un maridaje de plato y bebida con nombre y con una razón para que le guste.',
      'Por debajo, los maridajes están ponderados. Las combinaciones construidas con los platos y las bebidas que el local más quiere mover aparecen más a menudo que las construidas con los artículos más baratos de la carta: el cliente recibe una decisión tomada, y la cocina consigue el maridaje que de verdad quería vender.',
      'Por eso es la venta adicional menos invasiva que hemos construido. Una ruleta que le dice qué pedir parece un juego y no un argumento de venta, y los locales que la usan junto con la fidelidad ven cómo el maridaje se repite como favorito en la segunda visita.',
    ],
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
    paragraphs: [
      'El Test de gusto y personalidad se ocupa del cliente que quiere algo nuevo pero no se fía de la lista. Tres o cuatro preguntas — cómo le gusta empezar, con qué ánimo aventurero viene, si prefiere sabores vivos o contundentes — y la carta se estrecha a una selección cuidada de platos y cócteles.',
      'Es la función que rescata la segunda mitad de una carta larga. Los artículos que nunca se eligen en una lista se eligen cuando llegan como recomendación acompañada de una razón; por eso los locales con sugerencias rotativas y cartas de bebidas extensas son los que más le sacan partido.',
      'El cliente puede aceptar toda la selección, quedarse con un solo artículo o repetir el test. En cualquier caso, las respuestas permanecen en la sesión, de modo que la siguiente recomendación en esa mesa ya sabe lo que les gusta.',
    ],
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
    paragraphs: [
      'Más allá de las tres experiencias principales, construimos toques lúdicos moldeados en torno a su local: rachas de fidelidad que sobreviven a una semana perdida, recompensas que se desbloquean girando, puntos que caen al repetir pedido, un pequeño desbloqueo en un cumpleaños y clasificaciones de mesas por temporada.',
      'Son las peticiones que llegan de operadores que ya conocen su sala — el aniversario de la primera visita de un cliente, el reto de equipo detrás de la barra, la campaña de temporada que debe parecer un acontecimiento y no un descuento. Como la capa de juegos es configurable y no fija, esas peticiones se entregan en lugar de archivarse.',
      'Cada microinteracción se diseña contra el mismo encargo: recompensar un comportamiento que usted quiera de verdad, entenderse en segundos y no interponerse nunca entre un cliente y lo que ya quería. Un juego de mesa que retrasa un pedido es un impuesto; uno que responde a una pregunta es facturación.',
    ],
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
