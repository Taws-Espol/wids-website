export let cronograma = {
  agendaEvents: [
    {
      type: 'header',
      time: '8:00',
      title: 'Registro de participantes',
      color: 'default', // O puedes definir un color específico si el header tiene fondo
    },
    {
      type: 'header',
      time: '9:00',
      title: 'Bienvenvenida y palabras de apertura',
      description: [
        '• Introducción a WiDS',
        '• ¿Por qué organizamos este evento?',
        '• Presentaciones de patrocinadores:',
        '  o North Highland',
        '  o Banco Guayaquil',
        '  o Coding Bootcamps',
        '• Organizado por:',
        '  o TAWS',
        '  o Coding Bootcamps',
        '  o ESPOL',
      ],
      color: 'default',
    },
    {
      type: 'room_session',
      time: '09:20',
      roomA: {
        title:
          'Conectar datos, personas y estrategias: liderazgo femenino desde la inteligencia de negocios + Q&A',
        speaker: 'Kelly Carvajal',
        work: 'Jefa de Planificación Comercial y Gobernanza de Datos Corporativos',
        image: 'KellyCarvajal.png', // Asegúrate de tener esta imagen
        color: 'verde',
      },
      roomB: {
        title: 'Aplicaciones de IA Generativa en Marketing Digital + Q&A',
        speaker: 'Karen Calva',
        work: 'Jefa de Inteligencia de Datos',
        image: 'KarenCalva.png', // Asegúrate de tener esta imagen
        color: 'verde', // O el color que corresponda para esta sección
      },
    },
    {
      type: 'room_session',
      time: '09:40',
      roomA: {
        title:
          'Storytelling: Contando historias a través de datos – Un caso práctico + Q&A',
        speaker: 'Estefanía Cisneros Freire',
        work: 'Jefa de Analítica de Datos de Crédito',
        image: 'EstefaniaCisnerosFreire.png', // Asegúrate de tener esta imagen
        color: 'verde',
      },
      roomB: {
        title:
          'Más allá del código: Cómo comunicar datos para influir, liderar y transformar- Q&A',
        speaker: 'Diana Once',
        work: 'Especialista en Herramientas de TI',
        image: 'DianaOnce.png', // Asegúrate de tener esta imagen
        color: 'verde',
      },
    },
    {
      type: 'break',
      time: '10:00',
      title: 'Coffee Break',
    },
    {
      type: 'single_session',
      time: '10:30',
      title: 'Más que modelos: El arte de descubrir valor en los datos + Q&A',
      speaker: 'Iris Bustamante',
      work: 'Científica de Datos Senior',
      image: 'IrisBustamante.png', // Asegúrate de tener esta imagen
      color: 'verde',
    },
    {
      type: 'single_session',
      time: '10:50',
      title:
        'Monitorear modelos: Cómo detectar el deterioro antes que impacte el negocio + Q&A',
      speaker: 'Denisse Orozco',
      work: 'Oficial Senior de Modelos de Riesgo en Banco Guayaquil',
      // No hay speaker/work/image explícito para este, solo el título
      color: 'verde',
    },
    {
      type: 'single_session',
      time: '11:10',
      title: 'Conocer al cliente mediante la data + Q&A',
      speaker: 'Sofía España',
      work: 'Científica de Datos en Xtrim',
      image: 'SofiaEspana.png', // Asegúrate de tener esta imagen
      color: 'verde',
    },
    {
      type: 'single_session',
      time: '11:30',
      title:
        'Del caos al control: Cómo usar datos y métricas para anticipar fallos y proteger tu negocio + Q&A',
      speaker: 'Vicky Valverde',
      work: 'Ingeniera Full Stack Senior',
      image: 'VickyValverde.png', // Asegúrate de tener esta imagen
      color: 'verde',
    },
    {
      type: 'single_session',
      time: '11:50',
      title:
        'Sin rumbo claro: Cómo los riesgos te llevan a crecer profesionalmente + Q&A',
      speaker: 'Nicole Agila',
      work: 'Científica de Datos Senior',
      image: 'NicoleAgila.png', // Asegúrate de tener esta imagen
      color: 'verde',
    },
    {
      type: 'closing_remarks',
      time: '12:10',
      title: 'Cierre del evento',
      points: [
        '• Agradecimientos a patrocinadores',
        '• Agradecimientos a ponentes',
        '• Agradecimientos a colaboradores',
        '• Agradecimientos a los asistentes',
      ],
    },
    {
      type: 'end_session',
      time: '12:30',
      title: 'Fin de la sesión',
    },
  ],
  Conferencias: [
    {
      index: 0,
      color: 'verde',
      title: 'Bienvenida',
      info: 'Carmen Vaca',
      image: 'carmenVacaRuiz.webp',
      work: 'Ph.D., Profesora de FIEC, ESPOL',
      time: '09:00 AM',
    },
    {
      index: 1,
      color: 'amarillo',
      title: 'Transformando Empresas con datos e insights',
      info: 'Ysabel Atiencia',
      image: 'YsabelAtiencia.png',
      work: 'Ing., Analista de Datos, AB InBev',
      time: '09:20 AM',
    },
    {
      index: 2,
      color: 'celeste',
      title: 'Importancia de Model Governance en la era de la Ciecia de Datos',
      info: 'Valeria Valencia',
      image: 'ValeriaValenciaRenteria.webp',
      work: 'Subgerente Model Governance, Banco Guayaquil',
      time: '09:40 AM',
    },
    {
      index: 3,
      color: 'rosa',
      title:
        'MRI Segmentation of Brainstem Structures using Deep Learning Techniques',
      info: 'Seoyoung Oh',
      image: 'SeoyoungOh.png',
      work: 'M.Sc., Candidata Ph.D., Sorbonne University',
      time: '10:00 AM',
    },
    {
      index: 4,
      color: 'verde',
      title:
        'Optimizando el Análisis de Datos: Cómo la Segmentación de Usuarios Potencia el Entendimiento Profundo',
      info: 'Viviana Córdova',
      image: 'VivianaCordova.webp',
      work: 'Lic., Líder de conversión y análisis, Rappi',
      time: '10:25 AM',
    },
    {
      index: 5,
      color: 'amarillo',
      title:
        'De las Olas a los Datos: Cómo la Ciencia de Datos Revolucionó mi Vida Profesional',
      info: 'Kelly Mendoza',
      image: 'KellyMendoza.webp',
      work: 'Ing., Científica de Datos, ESPOL',
      time: '10:45 AM',
    },
  ],
  Talleres: [
    {
      index: 1,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 1',
      info: 'Juan Francisco Fernández',
      work: 'Estudiante de Ingeniería en Computación en ESPOL',
      time: '8:00 PM',
    },
    {
      index: 2,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 2',
      info: 'Jonathan Zambrano',
      work: 'Estudiante de Ingeniería en Computación en ESPOL',
      time: '9:30 PM',
    },
    {
      index: 3,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 3',
      info: 'Juan Andrés Munizaga',
      work: 'Estudiante de Ingeniería en Computación en ESPOL',
      time: '8:00 PM',
    },
    {
      index: 4,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 4',
      info: 'Mariu Andrade',
      work: 'Estudiante de Ingeniería en Computación en ESPOL',
      time: '9:30 PM',
    },
    {
      index: 5,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 5',
      info: 'Jonathan Zambrano',
      work: 'Estudiante de Ingeniería en Computación en ESPOL',
      time: '8:00 PM',
    },
    {
      index: 6,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 6',
      info: 'Darwin Pacheco',
      work: 'Estudiante de Ingeniería en Computación en ESPOL',
      time: '9:30 PM',
    },
    {
      index: 7,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 7',
      info: 'Diego Salazar',
      work: 'Estudiante de Administración de Empresas en ESPOL',
      time: '8:00 PM',
    },
    {
      index: 8,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 8',
      info: 'Juan Andrés Munizaga',
      work: 'Estudiante de Ingeniería en Computación en ESPOL',
      time: '9:30 PM',
    },
  ],
  NextGen: [
    {
      index: 1,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 1',
      info: 'Samira Carrillo',
      image: 'SamiraCarrillo.webp',
      work: 'Estudiante de Economía en ESPOL',
      time: '9:00 AM',
    },
    {
      index: 2,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 2',
      info: 'Andrea Mero',
      image: 'AndreaMero.webp',
      work: 'Ingeniera en Computación',
      time: '9:50 AM',
    },
    {
      index: 3,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 3 - Parte 1',
      info: 'Isabella Martín',
      image: 'isa_1.webp',
      work: 'Estudiantes de Ingeniería en Computación de ESPOL',
      time: '10:50 PM',
    },
    {
      index: 4,
      color: 'morado',
      type: 'Taller',
      title: 'Taller 3 - Parte 2',
      info: 'Annabella Sánchez',
      image: 'anna.webp',
      work: 'Estudiantes de Ingeniería en Computación de ESPOL',
      time: '11:20 PM',
    },
  ],
};
