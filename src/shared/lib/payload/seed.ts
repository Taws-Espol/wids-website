import payloadConfig from "@payload-config";
// import { readFile } from "node:fs/promises";
import { basename /* extname, resolve */ } from "node:path";
import { getPayload, type Payload } from "payload";
import type {
  Ambassador,
  Edition,
  Event,
  Schedule,
  Speaker,
  Sponsor,
} from "./types/payload.ts";

// const LOCAL_IMAGE_MIME_TYPES: Record<string, string> = {
//   ".jpeg": "image/jpeg",
//   ".jpg": "image/jpeg",
//   ".png": "image/png",
//   ".svg": "image/svg+xml",
//   ".webp": "image/webp",
// };

async function findOrCreateSeedRemoteMedia(
  payload: Payload,
  args: {
    alt: string;
    url: string;
  },
) {
  const existing = await payload.find({
    collection: "media",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      filename: {
        equals: basename(args.url),
      },
    },
  });

  if (existing.docs.length > 0) {
    return existing.docs[0];
  }

  const response = await fetch(args.url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch seed media (${response.status}): ${args.url}`,
    );
  }

  const imageBuffer = await response.arrayBuffer();

  const created = await payload.create({
    collection: "media",
    overrideAccess: true,
    data: {
      alt: args.alt,
    },
    file: {
      data: Buffer.from(imageBuffer),
      mimetype: response.headers.get("content-type") as string,
      name: basename(args.url),
      size: Buffer.from(imageBuffer).byteLength,
    },
  });

  payload.logger.info(
    `Uploaded seed media ${created.id} (${basename(args.url)}).`,
  );

  return created;
}

// async function findOrCreateSeedLocalMedia(
//   payload: Payload,
//   args: {
//     alt: string;
//     filePath: string;
//   },
// ) {
//   const existing = await payload.find({
//     collection: "media",
//     depth: 0,
//     limit: 1,
//     overrideAccess: true,
//     where: {
//       filename: {
//         equals: basename(args.filePath),
//       },
//     },
//   });

//   if (existing.docs.length > 0) {
//     return existing.docs[0];
//   }

//   const absolutePath = resolve(process.cwd(), args.filePath);
//   const imageBuffer = await readFile(absolutePath);
//   const fileName = basename(args.filePath);
//   const extension = extname(fileName).toLowerCase();
//   const mimetype = LOCAL_IMAGE_MIME_TYPES[extension];

//   if (!mimetype) {
//     throw new Error(
//       `Unsupported seed media extension "${extension}" for ${fileName}`,
//     );
//   }

//   const created = await payload.create({
//     collection: "media",
//     overrideAccess: true,
//     data: {
//       alt: args.alt,
//     },
//     file: {
//       data: imageBuffer,
//       mimetype,
//       name: fileName,
//       size: imageBuffer.byteLength,
//     },
//   });

//   payload.logger.info(`Uploaded seed media ${created.id} (${fileName}).`);

//   return created;
// }

type LocalizedSeedDataByCollection = {
  ambassadors: Pick<Ambassador, "about" | "title">;
  editions: Pick<Edition, "title" | "description">;
  events: Pick<Event, "description" | "requirements" | "title">;
  schedules: Pick<Schedule, "description" | "title">;
  speakers: Pick<Speaker, "about" | "title">;
  sponsors: Pick<Sponsor, "name">;
};

async function seedLocales<
  TCollection extends keyof LocalizedSeedDataByCollection,
>(
  payload: Payload,
  args: {
    collection: TCollection;
    id: number;
    en: Partial<LocalizedSeedDataByCollection[TCollection]>;
  },
) {
  await payload.update({
    collection: args.collection,
    id: args.id,
    locale: "en",
    overrideAccess: true,
    data: args.en as never,
  });
}

function buildRequirementItems(requirements?: string[]) {
  return requirements?.map((text) => ({ text }));
}

export const script = async () => {
  let payload: Payload | undefined;

  try {
    payload = await getPayload({ config: payloadConfig });

    const adminUser = await payload.create({
      collection: "users",
      overrideAccess: true,
      data: {
        email: "wids_taws@fiec.espol.edu.ec",
        password: "admin",
        name: "Admin",
        role: "admin",
        _verified: true,
      },
    });

    // const media = await findOrCreateSeedRemoteMedia(payload, {
    //   alt: "WiDS logo",
    //   url: "https://cdn.taws.espol.edu.ec/wids/WiDS-line1-3.svg",
    // });

    const editionNames = [
      {
        key: "wids-guayaquil-2026",
        year: 2026,
        titleEs: "WiDS Guayaquil 2026",
        titleEn: "WiDS Guayaquil 2026",
        descriptionEs:
          "Cultivando la próxima generación de líderes en Ciencia de Datos y Inteligencia Artificial proporcionando recursos para capacitar, networking, mentoría y oportunidades de crecimiento para todos, desde estudiantes hasta profesionales experimentados.",
        descriptionEn:
          "Cultivating the next generation of Data Science and AI leaders by providing resources for upskilling, networking, mentorship, and growth opportunities—from students to professionals.",
      },
    ];

    const editionsByKey: Record<string, Edition> = {};
    for (const editionData of editionNames) {
      const edition = await payload.create({
        collection: "editions",
        overrideAccess: true,
        data: {
          title: editionData.titleEs,
          description: editionData.descriptionEs,
          year: editionData.year,
        },
      });

      await seedLocales(payload, {
        collection: "editions",
        id: edition.id,
        en: {
          title: editionData.titleEn,
          description: editionData.descriptionEn,
        },
      });

      editionsByKey[editionData.key] = edition;
    }

    const eventsData = [
      {
        key: "conference-2026",
        editionKey: "wids-guayaquil-2026",
        type: "conference" as const,
        titleEs: "WiDS Guayaquil 2026 | Conferencia",
        titleEn: "WiDS Guayaquil 2026 | Conference",
        descriptionEs:
          "Evento que forma parte de la iniciativa global Women in Data Science, orientado a promover la participación y el liderazgo de las mujeres en la ciencia de datos y la inteligencia artificial. Organizada en la ESPOL, reúne a estudiantes, profesionales y expertos para compartir conocimientos, experiencias y avances en el área, a través de charlas, paneles y espacios de networking.",
        descriptionEn:
          "Conference that is part of the global Women in Data Science initiative, aimed at promoting the participation and leadership of women in data science and artificial intelligence. Organized at the ESPOL, brings together students, professionals and experts to share knowledge, experiences and advances in the area, through talks, panels and networking spaces.",
        location: "STEM, ESPOL, Guayaquil, Ecuador",
        date: "2026-07-31T10:00:00.000-05:00",
        duration: 5,
        durationUnit: "hours" as const,
      },
      {
        key: "nextgen-2026",
        editionKey: "wids-guayaquil-2026",
        type: "nextgen" as const,
        titleEs: "WiDS Guayaquil 2026 | NextGen",
        titleEn: "WiDS Guayaquil 2026 | NextGen",
        descriptionEs:
          "WiDS está comprometido con proporcionar recursos para capacitar, networking, mentoría y oportunidades de crecimiento para todos, desde estudiantes hasta profesionales experimentados.",
        descriptionEn:
          "WiDS Worldwide is dedicated to providing resources for upskilling, networking, mentorship, and growth opportunities for everyone, from students to seasoned professionals.",
        location: "Laboratorio Norte",
        date: "2026-05-08T15:00:00.000-05:00",
        duration: 3,
        durationUnit: "hours" as const,
        requirementsEs: [
          "Ser estudiante de secundaria",
          "Un profesor debe acompañar como supervisor",
          "Registrarse en el formulario de inscripción",
        ],
        requirementsEn: [
          "Be a secondary school student",
          "A teacher must accompany as supervisor",
          "Register in the registration form",
        ],
      },
      {
        key: "datathon-2026",
        editionKey: "wids-guayaquil-2026",
        type: "datathon" as const,
        titleEs: "WiDS Guayaquil 2026 | Datathon",
        titleEn: "WiDS Guayaquil 2026 | Datathon",
        descriptionEs:
          "El Datathon WiDS es una oportunidad para descubrir y perfeccionar habilidades en ciencia de datos mientras se resuelve un reto de impacto social interesante y crítico. Ya sea que seas un científico de datos en formación o un entusiasta de la ciencia de datos, WiDS proporciona un ambiente acogedor para que los participantes se conecten, compartan intereses, aprendan unos de otros, ayuden mutuamente y se diviertan mucho!",
        descriptionEn:
          "The WiDS Datathon is an opportunity to discover and hone data science skills while solving an interesting and critical social impact challenge. Whether you are an aspiring data scientist or a data science enthusiast, WiDS provides a supportive environment for participants to connect, share interests, learn from, help each other, and have a lot of fun!",
        location: "Centro de Innovación",
        date: "2026-05-06T00:00:00.000-05:00",
        duration: 4,
        durationUnit: "days" as const,
        requirementsEs: [
          "Ser estudiante universitario",
          "Equipos de hasta 4 personas",
          "Al menos la mitad de los miembros del equipo deben ser mujeres",
          "Registrarse en el formulario de inscripción",
        ],
        requirementsEn: [
          "Be a university student",
          "Teams of up to 4 people",
          "At least half of the team members must be women",
          "Register in the registration form",
        ],
      },
    ];

    const eventsByKey: Record<string, Event> = {};
    for (const eventData of eventsData) {
      const edition = editionsByKey[eventData.editionKey];
      if (!edition) {
        throw new Error(`Missing edition for event key "${eventData.key}"`);
      }

      const event = await payload.create({
        collection: "events",
        overrideAccess: true,
        data: {
          edition: edition.id,
          type: eventData.type,
          title: eventData.titleEs,
          description: eventData.descriptionEs,
          requirements: buildRequirementItems(eventData.requirementsEs),
          location: eventData.location,
          date: eventData.date,
          date_tz: "America/Bogota",
          duration: eventData.duration,
          durationUnit: eventData.durationUnit,
        },
      });

      await seedLocales(payload, {
        collection: "events",
        id: event.id,
        en: {
          title: eventData.titleEn,
          description: eventData.descriptionEn,
          requirements: buildRequirementItems(eventData.requirementsEn),
        },
      });

      eventsByKey[eventData.key] = event;
    }

    const speakersData = [
      {
        key: "ana-perez",
        eventKey: "conference-2026",
        name: "Ana Perez",
        titleEs: "Líder de Ciencia de Datos",
        titleEn: "Head of Data Science",
        affiliation: "DataLab Caribe",
        photoUrl: "https://cdn.taws.espol.edu.ec/wids/carmen-vaca-pfp.png",
        photoAlt: "Ana Perez profile photo",
        aboutEs:
          "Ana trabaja en equipos de producto y analítica para convertir datos complejos en decisiones simples.",
        aboutEn:
          "Ana works with product and analytics teams to turn complex data into simple decisions.",
        linkedin: "https://www.linkedin.com/in/ana-perez",
      },
      {
        key: "luis-gomez",
        eventKey: "nextgen-2026",
        name: "Luis Gomez",
        titleEs: "Mentor de IA",
        titleEn: "AI Mentor",
        affiliation: "Studio ML",
        photoUrl: "https://cdn.taws.espol.edu.ec/wids/carmen-vaca-pfp.png",
        photoAlt: "Luis Gomez profile photo",
        aboutEs:
          "Luis acompaña a equipos junior en prototipos de machine learning y despliegue de modelos.",
        aboutEn:
          "Luis mentors junior teams on machine learning prototypes and model deployment.",
        linkedin: "https://www.linkedin.com/in/luis-gomez",
      },
      {
        key: "camila-rios",
        eventKey: "datathon-2026",
        name: "Camila Rios",
        titleEs: "Mentora de Datathon",
        titleEn: "Datathon Mentor",
        affiliation: "Analytics Lab",
        photoUrl: "https://cdn.taws.espol.edu.ec/wids/carmen-vaca-pfp.png",
        photoAlt: "Camila Rios profile photo",
        aboutEs:
          "Camila acompana a equipos en formulacion de problemas, validacion experimental y comunicacion de resultados.",
        aboutEn:
          "Camila supports teams with problem framing, experimental validation, and communicating results.",
        linkedin: "https://www.linkedin.com/in/camila-rios",
      },
    ];

    const speakersByKey: Record<string, Speaker> = {};
    for (const speakerData of speakersData) {
      const event = eventsByKey[speakerData.eventKey];
      if (!event) {
        throw new Error(`Missing event for speaker key "${speakerData.key}"`);
      }

      const speakerPhoto = await findOrCreateSeedRemoteMedia(payload, {
        alt: speakerData.photoAlt,
        url: speakerData.photoUrl,
      });

      const speaker = await payload.create({
        collection: "speakers",
        overrideAccess: true,
        data: {
          name: speakerData.name,
          title: speakerData.titleEs,
          affiliation: speakerData.affiliation,
          photo: speakerPhoto.id,
          about: speakerData.aboutEs,
          linkedin: speakerData.linkedin,
          event: event.id,
        },
      });

      await seedLocales(payload, {
        collection: "speakers",
        id: speaker.id,
        en: {
          title: speakerData.titleEn,
          about: speakerData.aboutEn,
        },
      });

      speakersByKey[speakerData.key] = speaker;
    }

    const schedulesData = [
      {
        eventKey: "conference-2026",
        type: "activity" as const,
        titleEs: "Registro y networking",
        titleEn: "Registration and networking",
        descriptionEs:
          "Bienvenida, acreditación y espacio para conocer a la comunidad.",
        descriptionEn:
          "Welcome desk, badge pickup, and time to meet the community.",
        startTime: "2026-03-24T13:30:00.000-05:00",
        duration: 30,
        durationUnit: "minutes" as const,
        location: "Lobby",
      },
      {
        eventKey: "conference-2026",
        speakerKey: "ana-perez",
        type: "talk" as const,
        titleEs: "Modelos confiables para productos reales",
        titleEn: "Reliable models for real products",
        descriptionEs:
          "Una sesión sobre evaluación, monitoreo y decisiones de producto alrededor de modelos.",
        descriptionEn:
          "A session on evaluation, monitoring, and product decisions around production models.",
        startTime: "2026-03-24T15:00:00.000-05:00",
        duration: 45,
        durationUnit: "minutes" as const,
        location: "Auditorio Principal",
      },
      {
        eventKey: "conference-2026",
        speakerKey: "ana-perez",
        type: "talk" as const,
        titleEs: "IA responsable en productos de alto impacto",
        titleEn: "Responsible AI for high-impact products",
        descriptionEs:
          "Buenas prácticas para diseñar modelos transparentes y auditables en entornos reales.",
        descriptionEn:
          "Best practices to build transparent and auditable models for real-world environments.",
        startTime: "2026-03-24T15:50:00.000-05:00",
        duration: 35,
        durationUnit: "minutes" as const,
        location: "Auditorio Principal",
      },
      {
        eventKey: "conference-2026",
        speakerKey: "ana-perez",
        type: "talk" as const,
        titleEs: "Del dashboard a la decisión de negocio",
        titleEn: "From dashboard to business decision",
        descriptionEs:
          "Cómo traducir métricas analíticas en decisiones accionables para equipos ejecutivos.",
        descriptionEn:
          "How to translate analytics metrics into actionable decisions for executive teams.",
        startTime: "2026-03-24T16:30:00.000-05:00",
        duration: 30,
        durationUnit: "minutes" as const,
        location: "Auditorio Principal",
      },
      {
        eventKey: "conference-2026",
        speakerKey: "ana-perez",
        type: "talk" as const,
        titleEs: "Gobernanza de datos para equipos multidisciplinarios",
        titleEn: "Data governance for multidisciplinary teams",
        descriptionEs:
          "Un marco práctico para definir ownership, calidad y acceso a datos en organizaciones.",
        descriptionEn:
          "A practical framework to define ownership, quality, and data access across organizations.",
        startTime: "2026-03-24T17:05:00.000-05:00",
        duration: 25,
        durationUnit: "minutes" as const,
        location: "Auditorio Principal",
      },
      {
        eventKey: "conference-2026",
        speakerKey: "ana-perez",
        type: "talk" as const,
        titleEs: "Experimentación rápida con modelos en producción",
        titleEn: "Rapid experimentation with production models",
        descriptionEs:
          "Estrategias para iterar modelos en producción sin comprometer estabilidad del producto.",
        descriptionEn:
          "Strategies to iterate production models without compromising product stability.",
        startTime: "2026-03-24T17:35:00.000-05:00",
        duration: 20,
        durationUnit: "minutes" as const,
        location: "Auditorio Principal",
      },
      {
        eventKey: "conference-2026",
        speakerKey: "ana-perez",
        type: "talk" as const,
        titleEs: "Cierre técnico: lecciones para escalar equipos de datos",
        titleEn: "Technical closing: lessons for scaling data teams",
        descriptionEs:
          "Aprendizajes clave para crecer capacidades analíticas y de IA en etapas tempranas.",
        descriptionEn:
          "Key lessons to scale analytics and AI capabilities in early growth stages.",
        startTime: "2026-03-24T17:55:00.000-05:00",
        duration: 5,
        durationUnit: "minutes" as const,
        location: "Auditorio Principal",
      },
      {
        eventKey: "nextgen-2026",
        speakerKey: "luis-gomez",
        type: "workshop" as const,
        titleEs: "Tu primer pipeline de datos",
        titleEn: "Your first data pipeline",
        descriptionEs:
          "Un taller guiado para limpiar datos, entrenar un modelo simple y compartir resultados.",
        descriptionEn:
          "A guided workshop to clean data, train a simple model, and share results.",
        startTime: "2026-03-25T15:30:00.000-05:00",
        duration: 2,
        durationUnit: "hours" as const,
        location: "Laboratorio Norte",
      },
      {
        eventKey: "nextgen-2026",
        speakerKey: "luis-gomez",
        type: "workshop" as const,
        titleEs: "Python para análisis exploratorio",
        titleEn: "Python for exploratory analysis",
        descriptionEs:
          "Sesión práctica para explorar datasets, detectar patrones y preparar hallazgos.",
        descriptionEn:
          "Hands-on session to explore datasets, detect patterns, and prepare insights.",
        startTime: "2026-03-25T15:05:00.000-05:00",
        duration: 30,
        durationUnit: "minutes" as const,
        location: "Laboratorio Norte - Sala A",
      },
      {
        eventKey: "nextgen-2026",
        speakerKey: "luis-gomez",
        type: "workshop" as const,
        titleEs: "Feature engineering en 30 minutos",
        titleEn: "Feature engineering in 30 minutes",
        descriptionEs:
          "Técnicas rápidas para transformar variables y mejorar señales predictivas.",
        descriptionEn:
          "Quick techniques to transform variables and improve predictive signals.",
        startTime: "2026-03-25T15:45:00.000-05:00",
        duration: 30,
        durationUnit: "minutes" as const,
        location: "Laboratorio Norte - Sala B",
      },
      {
        eventKey: "nextgen-2026",
        speakerKey: "luis-gomez",
        type: "workshop" as const,
        titleEs: "Evaluación de modelos para principiantes",
        titleEn: "Model evaluation for beginners",
        descriptionEs:
          "Cómo interpretar métricas clave y elegir el modelo correcto para tu caso.",
        descriptionEn:
          "How to interpret key metrics and choose the right model for your use case.",
        startTime: "2026-03-25T16:20:00.000-05:00",
        duration: 25,
        durationUnit: "minutes" as const,
        location: "Laboratorio Norte - Sala A",
      },
      {
        eventKey: "nextgen-2026",
        speakerKey: "luis-gomez",
        type: "workshop" as const,
        titleEs: "Despliegue básico con APIs",
        titleEn: "Basic deployment with APIs",
        descriptionEs:
          "Construye un endpoint simple para publicar inferencias de tu modelo.",
        descriptionEn: "Build a simple endpoint to serve model predictions.",
        startTime: "2026-03-25T16:55:00.000-05:00",
        duration: 25,
        durationUnit: "minutes" as const,
        location: "Laboratorio Norte - Sala B",
      },
      {
        eventKey: "nextgen-2026",
        speakerKey: "luis-gomez",
        type: "workshop" as const,
        titleEs: "Demo final de proyectos NextGen",
        titleEn: "NextGen project final demo",
        descriptionEs:
          "Espacio para presentar prototipos, feedback y próximos pasos de aprendizaje.",
        descriptionEn:
          "Space to present prototypes, gather feedback, and define next learning steps.",
        startTime: "2026-03-25T17:30:00.000-05:00",
        duration: 25,
        durationUnit: "minutes" as const,
        location: "Laboratorio Norte",
      },
      {
        eventKey: "datathon-2026",
        speakerKey: "camila-rios",
        type: "workshop" as const,
        titleEs: "Kickoff del reto",
        titleEn: "Challenge kickoff",
        descriptionEs:
          "Revision del problema, reglas de evaluación y organización de equipos para el datathon.",
        descriptionEn:
          "Review of the problem statement, scoring rules, and team formation for the datathon.",
        startTime: "2026-03-26T13:30:00.000-05:00",
        duration: 90,
        durationUnit: "minutes" as const,
        location: "Centro de Innovación",
      },
      {
        eventKey: "datathon-2026",
        speakerKey: "camila-rios",
        type: "workshop" as const,
        titleEs: "Limpieza y validación del dataset",
        titleEn: "Dataset cleaning and validation",
        descriptionEs:
          "Guía para identificar outliers, valores faltantes y consistencia en variables clave.",
        descriptionEn:
          "Guide to identify outliers, missing values, and consistency across key variables.",
        startTime: "2026-03-26T15:15:00.000-05:00",
        duration: 60,
        durationUnit: "minutes" as const,
        location: "Centro de Innovación - Sala A",
      },
      {
        eventKey: "datathon-2026",
        speakerKey: "camila-rios",
        type: "workshop" as const,
        titleEs: "Baseline modeling sprint",
        titleEn: "Baseline modeling sprint",
        descriptionEs:
          "Construcción de una solución base para comparar mejoras durante el reto.",
        descriptionEn:
          "Build a baseline solution to benchmark improvements during the challenge.",
        startTime: "2026-03-26T16:30:00.000-05:00",
        duration: 45,
        durationUnit: "minutes" as const,
        location: "Centro de Innovación - Sala B",
      },
      {
        eventKey: "datathon-2026",
        speakerKey: "camila-rios",
        type: "workshop" as const,
        titleEs: "Optimización de features y tuning",
        titleEn: "Feature optimization and tuning",
        descriptionEs:
          "Prácticas para iterar hiperparámetros y mejorar desempeño sin sobreajuste.",
        descriptionEn:
          "Practices to iterate hyperparameters and improve performance without overfitting.",
        startTime: "2026-03-26T17:30:00.000-05:00",
        duration: 60,
        durationUnit: "minutes" as const,
        location: "Centro de Innovación - Sala A",
      },
      {
        eventKey: "datathon-2026",
        speakerKey: "camila-rios",
        type: "workshop" as const,
        titleEs: "Visualización para storytelling de resultados",
        titleEn: "Visualization for result storytelling",
        descriptionEs:
          "Cómo construir visualizaciones claras para comunicar hallazgos a jurado y stakeholders.",
        descriptionEn:
          "How to build clear visualizations to present insights to judges and stakeholders.",
        startTime: "2026-03-26T18:45:00.000-05:00",
        duration: 45,
        durationUnit: "minutes" as const,
        location: "Centro de Innovación - Sala B",
      },
      {
        eventKey: "datathon-2026",
        speakerKey: "camila-rios",
        type: "workshop" as const,
        titleEs: "Preparación del pitch final",
        titleEn: "Final pitch preparation",
        descriptionEs:
          "Estructura recomendada para presentar problema, solución, métricas e impacto.",
        descriptionEn:
          "Recommended structure to present problem, solution, metrics, and impact.",
        startTime: "2026-03-26T19:45:00.000-05:00",
        duration: 60,
        durationUnit: "minutes" as const,
        location: "Centro de Innovación",
      },
    ];

    for (const scheduleData of schedulesData) {
      const event = eventsByKey[scheduleData.eventKey];
      if (!event) {
        throw new Error(
          `Missing event for schedule "${scheduleData.titleEs}" (${scheduleData.eventKey})`,
        );
      }

      const speaker = scheduleData.speakerKey
        ? speakersByKey[scheduleData.speakerKey]
        : undefined;
      if (scheduleData.speakerKey && !speaker) {
        throw new Error(
          `Missing speaker for schedule "${scheduleData.titleEs}" (${scheduleData.speakerKey})`,
        );
      }

      if (scheduleData.type === "workshop" && !speaker) {
        throw new Error(
          `Workshop schedule "${scheduleData.titleEs}" requires a speaker.`,
        );
      }

      const schedule = await payload.create({
        collection: "schedules",
        overrideAccess: true,
        data: {
          event: event.id,
          type: scheduleData.type,
          title: scheduleData.titleEs,
          description: scheduleData.descriptionEs,
          speaker: speaker?.id,
          startTime: scheduleData.startTime,
          startTime_tz: "America/Bogota",
          duration: scheduleData.duration,
          durationUnit: scheduleData.durationUnit,
          location: scheduleData.location,
        },
      });

      await seedLocales(payload, {
        collection: "schedules",
        id: schedule.id,
        en: {
          title: scheduleData.titleEn,
          description: scheduleData.descriptionEn,
        },
      });
    }

    const currentEdition = editionsByKey["wids-guayaquil-2026"];
    if (!currentEdition) {
      throw new Error(
        "Missing default edition for ambassador and sponsor seeds.",
      );
    }

    const ambassadorNames = [
      {
        name: "Ph.D. Carmen Vaca",
        role: "ambassador" as const,
        photoUrl: "https://cdn.taws.espol.edu.ec/wids/carmen-vaca-pfp.png",
        photoAlt: "Ph.D. Carmen Vaca profile photo",
        titleEs: "Investigadora en IA & Líder en Ciencia de Datos",
        titleEn: "AI Researcher & Data Science Leader",
        affiliation: "Escuela Superior Politécnica del Litoral (ESPOL)",
        linkedin: "https://www.linkedin.com/in/carmen-vaca-ruiz/",
        aboutEs:
          "Soy investigadora en IA, profesora universitaria y directora de Coding Bootcamps, y mi trabajo se centra en ayudar a organizaciones y personas a aprovechar la analítica y la inteligencia artificial para tomar mejores decisiones y crear nuevas oportunidades. ",
        aboutEn:
          "I am an AI researcher, university professor, and director of Coding Bootcamps, and my work focuses on helping organizations and people to leverage analytics and artificial intelligence to make better decisions and create new opportunities.",
      },
      {
        name: "M.Sc. Adriana Collaguazo",
        role: "co-ambassador" as const,
        photoUrl:
          "https://cdn.taws.espol.edu.ec/wids/adriana-collaguazo-pfp.jpeg",
        photoAlt: "M.Sc. Adriana Collaguazo profile photo",
        titleEs:
          "Ingeniera de Inteligencia Artificial, Científica de Datos, Profesora, Investigadora",
        titleEn:
          "Artificial Intelligence Engineer, Data Scientist, Professor, Researcher",
        affiliation: "Escuela Superior Politécnica del Litoral (ESPOL)",
        linkedin: "https://www.linkedin.com/in/adrianacollaguazo/",
        aboutEs:
          "Creo en invertir en la capacitación de la fuerza laboral para la era de la Inteligencia Artificial a través del aprendizaje permanente, y he construido toda mi carrera en torno a esa convicción.",
        aboutEn:
          "I believe in investing in the training of the workforce for the era of Artificial Intelligence through continuous learning, and I have built my entire career around that conviction.",
      },
      {
        name: "Gabriela Jiménez",
        role: "co-ambassador" as const,
        photoUrl: "https://cdn.taws.espol.edu.ec/wids/gabriela-jimenez-pfp.png",
        photoAlt: "Gabriela Jiménez profile photo",
        titleEs: "Estudiante de Ingeniería en Ciencias de la Computación",
        titleEn: "Computer Science Engineering Student",
        affiliation: "Escuela Superior Politécnica del Litoral (ESPOL)",
        linkedin: "https://www.linkedin.com/in/gabriela-jiménez-1b0558252/",
        aboutEs: "Gabriela about text",
        aboutEn: "Gabriela about text",
      },
      {
        name: "Maitte Apupalo",
        role: "co-ambassador" as const,
        photoUrl: "https://cdn.taws.espol.edu.ec/wids/maitte-apupalo-pfp.jpeg",
        photoAlt: "Maitte Apupalo profile photo",
        titleEs: "Estudiante de Ingeniería en Logística y Transporte",
        titleEn: "Logistics and Transportation Engineering Student",
        affiliation: "Escuela Superior Politécnica del Litoral (ESPOL)",
        linkedin: "https://www.linkedin.com/in/maitteapupalo/",
        aboutEs: "Maitte about text",
        aboutEn: "Maitte about text",
      },
      {
        name: "Mariu Andrade",
        role: "co-ambassador" as const,
        photoUrl: "https://cdn.taws.espol.edu.ec/wids/mariu-andrade-pfp.jpeg",
        photoAlt: "Mariu Andrade profile photo",
        titleEs: "Estudiante de Ingeniería en Ciencias de la Computación",
        titleEn: "Computer Science Engineering Student",
        affiliation: "Escuela Superior Politécnica del Litoral (ESPOL)",
        linkedin: "https://www.linkedin.com/in/mariu-andrade-veloz-9256b9279",
        aboutEs: "Mariu about text",
        aboutEn: "Mariu about text",
      },
      {
        name: "Ainhara Meza",
        role: "co-ambassador" as const,
        photoUrl: "https://cdn.taws.espol.edu.ec/wids/ainhara-meza-pfp.png",
        photoAlt: "Ainhara Meza profile photo",
        titleEs: "Estudiante de Administración de Empresas",
        titleEn: "Business Administration Student",
        affiliation: "Escuela Superior Politécnica del Litoral (ESPOL)",
        linkedin: "https://www.linkedin.com/in/ainhara-meza-70648527a/",
        aboutEs: "Ainhara about text",
        aboutEn: "Ainhara about text",
      },
    ];

    for (const ambassadorData of ambassadorNames) {
      const ambassadorPhoto = await findOrCreateSeedRemoteMedia(payload, {
        alt: ambassadorData.photoAlt,
        url: ambassadorData.photoUrl,
      });

      const ambassador = await payload.create({
        collection: "ambassadors",
        overrideAccess: true,
        data: {
          name: ambassadorData.name,
          role: ambassadorData.role,
          title: ambassadorData.titleEs,
          affiliation: ambassadorData.affiliation,
          photo: ambassadorPhoto.id,
          about: ambassadorData.aboutEs,
          linkedin: ambassadorData.linkedin,
          edition: currentEdition.id,
        },
      });

      await seedLocales(payload, {
        collection: "ambassadors",
        id: ambassador.id,
        en: {
          title: ambassadorData.titleEn,
          about: ambassadorData.aboutEn,
        },
      });
    }

    const sponsorNames = [
      {
        nameEs: "Banco Guayaquil",
        nameEn: "Banco Guayaquil",
        logoUrl: "https://cdn.taws.espol.edu.ec/wids/banco-guayaquil-logo.png",
        logoAlt: "Banco Guayaquil logo",
        website: "https://www.bancoguayaquil.com",
        tier: "gold" as const,
      },
      {
        nameEs: "Google DeepMind",
        nameEn: "Google DeepMind",
        logoUrl: "https://cdn.taws.espol.edu.ec/wids/google-deepmind-logo.png",
        logoAlt: "Google DeepMind logo",
        website: "https://deepmind.google",
        tier: "platinum" as const,
      },
    ];

    const sponsors = [];
    for (const sponsorData of sponsorNames) {
      const sponsorLogo = await findOrCreateSeedRemoteMedia(payload, {
        alt: sponsorData.logoAlt,
        url: sponsorData.logoUrl,
      });

      const sponsor = await payload.create({
        collection: "sponsors",
        overrideAccess: true,
        data: {
          name: sponsorData.nameEs,
          logo: sponsorLogo.id,
          website: sponsorData.website,
          tier: sponsorData.tier,
          edition: currentEdition.id,
        },
      });

      await seedLocales(payload, {
        collection: "sponsors",
        id: sponsor.id,
        en: {
          name: sponsorData.nameEn,
        },
      });

      sponsors.push(sponsor);
    }

    payload.logger.info(
      `Successfully seeded Payload with admin user ${adminUser.email}, edition ${currentEdition.id}, sponsors ${sponsors.map((sponsor) => sponsor.id).join(", ")}.`,
    );

    process.exit(0);
  } catch (error) {
    payload?.logger.error(error);
    process.exit(1);
  }
};
