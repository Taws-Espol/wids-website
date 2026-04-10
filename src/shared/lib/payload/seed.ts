import payloadConfig from "@payload-config";
import { getPayload, type Payload } from "payload";
import type {
  Ambassador,
  Edition,
  Event,
  Schedule,
  Speaker,
} from "./types/payload.ts";

/**
 * Seeds demo content. Intended for an empty database (migrate first, clear data if needed).
 */

const SEED_LOGO_URL = "https://cdn.taws.espol.edu.ec/wids/WiDS-line1-3.svg";

/** Match this `alt` to reuse the same logo row across runs. */
const SEED_LOGO_MEDIA_ALT = "WiDS logo";

async function fetchLogoBuffer(): Promise<Buffer> {
  const response = await fetch(SEED_LOGO_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch seed logo (${response.status}): ${SEED_LOGO_URL}`,
    );
  }

  return Buffer.from(await response.arrayBuffer());
}

async function findOrCreateSeedLogoMedia(payload: Payload) {
  const existing = await payload.find({
    collection: "media",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      alt: {
        equals: SEED_LOGO_MEDIA_ALT,
      },
    },
  });

  if (existing.docs.length > 0) {
    return existing.docs[0];
  }

  const logoBuffer = await fetchLogoBuffer();
  const created = await payload.create({
    collection: "media",
    overrideAccess: true,
    data: {
      alt: SEED_LOGO_MEDIA_ALT,
    },
    file: {
      data: logoBuffer,
      mimetype: "image/svg+xml",
      name: "logo.svg",
      size: logoBuffer.byteLength,
    },
  });

  payload.logger.info(`Uploaded seed logo media ${created.id}.`);

  return created;
}

type LocalizedSeedDataByCollection = {
  ambassadors: Pick<Ambassador, "about" | "title">;
  editions: Pick<Edition, "title">;
  events: Pick<Event, "description" | "title">;
  schedules: Pick<Schedule, "description" | "title">;
  speakers: Pick<Speaker, "about" | "title">;
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

    const media = await findOrCreateSeedLogoMedia(payload);

    const edition = await payload.create({
      collection: "editions",
      overrideAccess: true,
      data: {
        title: "WiDS Guayaquil 2026",
        year: 2026,
      },
    });

    await seedLocales(payload, {
      collection: "editions",
      id: edition.id,
      en: {
        title: "WiDS Guayaquil 2026",
      },
    });

    const conferenceEvent = await payload.create({
      collection: "events",
      overrideAccess: true,
      data: {
        edition: edition.id,
        type: "conference",
        title: "Conferencia WiDS 2026",
        description:
          "Charlas y paneles sobre ciencia de datos aplicada en salud, educación y negocios.",
        location: "Auditorio Principal",
        date: "2026-03-24T14:00:00.000Z",
        duration: 4,
        durationUnit: "hours",
      },
    });

    await seedLocales(payload, {
      collection: "events",
      id: conferenceEvent.id,
      en: {
        title: "WiDS Conference 2026",
        description:
          "Talks and panels about applied data science in healthcare, education, and business.",
      },
    });

    const nextgenEvent = await payload.create({
      collection: "events",
      overrideAccess: true,
      data: {
        edition: edition.id,
        type: "nextgen",
        title: "WiDS NextGen 2026",
        description:
          "Un taller practico para estudiantes que quieren empezar a construir productos con datos.",
        location: "Laboratorio Norte",
        date: "2026-03-25T15:00:00.000Z",
        duration: 3,
        durationUnit: "hours",
      },
    });

    await seedLocales(payload, {
      collection: "events",
      id: nextgenEvent.id,
      en: {
        title: "WiDS NextGen 2026",
        description:
          "A hands-on workshop for students who want to start building data-driven products.",
      },
    });

    const datathonEvent = await payload.create({
      collection: "events",
      overrideAccess: true,
      data: {
        edition: edition.id,
        type: "datathon",
        title: "Datathon WiDS 2026",
        description:
          "Un reto colaborativo para resolver un caso real con equipos interdisciplinarios.",
        location: "Centro de Innovación",
        date: "2026-03-26T13:00:00.000Z",
        duration: 8,
        durationUnit: "hours",
      },
    });

    await seedLocales(payload, {
      collection: "events",
      id: datathonEvent.id,
      en: {
        title: "WiDS Datathon 2026",
        description:
          "A collaborative challenge to solve a real-world problem with cross-functional teams.",
      },
    });

    const conferenceSpeaker = await payload.create({
      collection: "speakers",
      overrideAccess: true,
      data: {
        name: "Ana Perez",
        title: "Líder de Ciencia de Datos",
        affiliation: "DataLab Caribe",
        photo: media.id,
        about:
          "Ana trabaja en equipos de producto y analítica para convertir datos complejos en decisiones simples.",
        linkedin: "https://www.linkedin.com/in/ana-perez",
        event: conferenceEvent.id,
      },
    });

    await seedLocales(payload, {
      collection: "speakers",
      id: conferenceSpeaker.id,
      en: {
        title: "Head of Data Science",
        about:
          "Ana works with product and analytics teams to turn complex data into simple decisions.",
      },
    });

    const nextgenSpeaker = await payload.create({
      collection: "speakers",
      overrideAccess: true,
      data: {
        name: "Luis Gomez",
        title: "Mentor de IA",
        affiliation: "Studio ML",
        photo: media.id,
        about:
          "Luis acompaña a equipos junior en prototipos de machine learning y despliegue de modelos.",
        linkedin: "https://www.linkedin.com/in/luis-gomez",
        event: nextgenEvent.id,
      },
    });

    await seedLocales(payload, {
      collection: "speakers",
      id: nextgenSpeaker.id,
      en: {
        title: "AI Mentor",
        about:
          "Luis mentors junior teams on machine learning prototypes and model deployment.",
      },
    });

    const conferenceActivity = await payload.create({
      collection: "schedules",
      overrideAccess: true,
      data: {
        event: conferenceEvent.id,
        type: "activity",
        title: "Registro y networking",
        description:
          "Bienvenida, acreditación y espacio para conocer a la comunidad.",
        startTime: "2026-03-24T13:30:00.000Z",
        duration: 30,
        durationUnit: "minutes",
        location: "Lobby",
      },
    });

    await seedLocales(payload, {
      collection: "schedules",
      id: conferenceActivity.id,
      en: {
        title: "Registration and networking",
        description:
          "Welcome desk, badge pickup, and time to meet the community.",
      },
    });

    const conferenceTalk = await payload.create({
      collection: "schedules",
      overrideAccess: true,
      data: {
        event: conferenceEvent.id,
        type: "talk",
        title: "Modelos confiables para productos reales",
        description:
          "Una sesión sobre evaluación, monitoreo y decisiones de producto alrededor de modelos.",
        speaker: conferenceSpeaker.id,
        startTime: "2026-03-24T15:00:00.000Z",
        duration: 45,
        durationUnit: "minutes",
        location: "Auditorio Principal",
      },
    });

    await seedLocales(payload, {
      collection: "schedules",
      id: conferenceTalk.id,
      en: {
        title: "Reliable models for real products",
        description:
          "A session on evaluation, monitoring, and product decisions around production models.",
      },
    });

    const nextgenWorkshop = await payload.create({
      collection: "schedules",
      overrideAccess: true,
      data: {
        event: nextgenEvent.id,
        type: "workshop",
        title: "Tu primer pipeline de datos",
        description:
          "Un taller guiado para limpiar datos, entrenar un modelo simple y compartir resultados.",
        speaker: nextgenSpeaker.id,
        startTime: "2026-03-25T15:30:00.000Z",
        duration: 2,
        durationUnit: "hours",
        location: "Laboratorio Norte",
      },
    });

    await seedLocales(payload, {
      collection: "schedules",
      id: nextgenWorkshop.id,
      en: {
        title: "Your first data pipeline",
        description:
          "A guided workshop to clean data, train a simple model, and share results.",
      },
    });

    const datathonWorkshop = await payload.create({
      collection: "schedules",
      overrideAccess: true,
      data: {
        event: datathonEvent.id,
        type: "workshop",
        title: "Kickoff del reto",
        description:
          "Revision del problema, reglas de evaluación y organización de equipos para el datathon.",
        startTime: "2026-03-26T13:30:00.000Z",
        duration: 90,
        durationUnit: "minutes",
        location: "Centro de Innovación",
      },
    });

    await seedLocales(payload, {
      collection: "schedules",
      id: datathonWorkshop.id,
      en: {
        title: "Challenge kickoff",
        description:
          "Review of the problem statement, scoring rules, and team formation for the datathon.",
      },
    });

    const ambassadorNames = [
      {
        name: "Camilo Herrera",
        titleEs: "Embajadora de comunidad",
        titleEn: "Community ambassador",
        affiliation: "WiDS Dominicana",
        aboutEs:
          "Camilo conecta estudiantes y profesionales con oportunidades para aprender ciencia de datos.",
        aboutEn:
          "Camilo connects students and professionals with opportunities to learn data science.",
      },
      {
        name: "Maria Santos",
        titleEs: "Líder de alianzas",
        titleEn: "Partnerships lead",
        affiliation: "Women in Tech DR",
        aboutEs:
          "Maria impulsa colaboraciones con organizaciones que apoyan talento femenino en tecnología.",
        aboutEn:
          "Maria drives partnerships with organizations that support women in technology.",
      },
      {
        name: "Ana Castro",
        titleEs: "Mentora regional",
        titleEn: "Regional mentor",
        affiliation: "Data Futures",
        aboutEs:
          "Ana acompaña a nuevas participantes para que conviertan curiosidad en proyectos concretos.",
        aboutEn:
          "Ana mentors new participants so they can turn curiosity into concrete projects.",
      },
    ];

    for (const ambassadorData of ambassadorNames) {
      const ambassador = await payload.create({
        collection: "ambassadors",
        overrideAccess: true,
        data: {
          name: ambassadorData.name,
          title: ambassadorData.titleEs,
          affiliation: ambassadorData.affiliation,
          photo: media.id,
          about: ambassadorData.aboutEs,
          edition: edition.id,
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

    const sponsor = await payload.create({
      collection: "sponsors",
      overrideAccess: true,
      data: {
        name: "Acme Data Cloud",
        logo: media.id,
        website: "https://example.com",
        tier: "gold",
        edition: edition.id,
      },
    });

    payload.logger.info(
      `Successfully seeded Payload with admin user ${adminUser.email}, shared media ${media.id}, edition ${edition.id}, sponsor ${sponsor.id}.`,
    );

    process.exit(0);
  } catch (error) {
    payload?.logger.error(error);
    process.exit(1);
  }
};
