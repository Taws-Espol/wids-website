import type { SanitizedConfig } from "payload";

import { Buffer } from "node:buffer";

import payload from "payload";

const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAB" +
    "Nl7BcQAAAABJRU5ErkJggg==",
  "base64",
);

function placeholderFile(name: string) {
  return {
    data: PLACEHOLDER_PNG,
    mimetype: "image/png",
    name,
    size: PLACEHOLDER_PNG.length,
  };
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config });

  payload.logger.info("Seeding database...");

  // --- Media ---
  const [photo1, photo2, photo3, logo1, logo2, logo3] = await Promise.all([
    payload.create({
      collection: "media",
      data: { alt: "Speaker photo 1" },
      file: placeholderFile("speaker-1.png"),
    }),
    payload.create({
      collection: "media",
      data: { alt: "Speaker photo 2" },
      file: placeholderFile("speaker-2.png"),
    }),
    payload.create({
      collection: "media",
      data: { alt: "Ambassador photo" },
      file: placeholderFile("ambassador-1.png"),
    }),
    payload.create({
      collection: "media",
      data: { alt: "Sponsor logo - TechCorp" },
      file: placeholderFile("logo-techcorp.png"),
    }),
    payload.create({
      collection: "media",
      data: { alt: "Sponsor logo - DataFlow" },
      file: placeholderFile("logo-dataflow.png"),
    }),
    payload.create({
      collection: "media",
      data: { alt: "Sponsor logo - CloudBase" },
      file: placeholderFile("logo-cloudbase.png"),
    }),
  ]);

  // --- Event (without schedule, we need speaker IDs first) ---
  const event = await payload.create({
    collection: "events",
    data: {
      title: "WiDS 2026",
      description:
        "Women in Data Science conference bringing together data professionals, researchers, and students to discuss the latest trends in data science and AI.",
      location: "Tecnológico de Monterrey, Campus Monterrey",
      date: "2026-05-15",
      schedule: [],
    },
  });

  // --- Speakers ---
  const [speaker1, speaker2] = await Promise.all([
    payload.create({
      collection: "speakers",
      data: {
        name: "María García López",
        jobTitle: "Senior Data Scientist",
        company: "Google",
        photo: photo1.id,
        bio: "María is a Senior Data Scientist at Google with over 10 years of experience in machine learning and natural language processing. She leads a team focused on developing responsible AI systems.",
        linkedin: "https://linkedin.com/in/maria-garcia",
        event: event.id,
      },
    }),
    payload.create({
      collection: "speakers",
      data: {
        name: "Ana Rodríguez Martínez",
        jobTitle: "ML Engineering Manager",
        company: "Microsoft",
        photo: photo2.id,
        bio: "Ana manages the ML Engineering team at Microsoft, specializing in computer vision and deep learning. She is passionate about increasing diversity in tech.",
        linkedin: "https://linkedin.com/in/ana-rodriguez",
        event: event.id,
      },
    }),
  ]);

  // --- Ambassadors ---
  await payload.create({
    collection: "ambassadors",
    data: {
      name: "Sofía Hernández",
      title: "Community Lead",
      photo: photo3.id,
      bio: "Sofía is the WiDS Monterrey community lead, organizing workshops and networking events to empower women in data science across Latin America.",
      linkedin: "https://linkedin.com/in/sofia-hernandez",
      event: event.id,
    },
  });

  // --- Sponsors ---
  await Promise.all([
    payload.create({
      collection: "sponsors",
      data: {
        name: "TechCorp",
        logo: logo1.id,
        website: "https://techcorp.example.com",
        tier: "platinum",
        event: event.id,
      },
    }),
    payload.create({
      collection: "sponsors",
      data: {
        name: "DataFlow",
        logo: logo2.id,
        website: "https://dataflow.example.com",
        tier: "gold",
        event: event.id,
      },
    }),
    payload.create({
      collection: "sponsors",
      data: {
        name: "CloudBase",
        logo: logo3.id,
        website: "https://cloudbase.example.com",
        tier: "silver",
        event: event.id,
      },
    }),
  ]);

  // --- Update event with schedule ---
  await payload.update({
    collection: "events",
    id: event.id,
    data: {
      schedule: [
        {
          blockType: "activity",
          title: "Check-in & Registration",
          description: "Pick up your badge and welcome kit at the main lobby.",
          date: "2026-05-15T09:00:00.000Z",
          location: "Main Lobby",
        },
        {
          blockType: "activity",
          title: "Welcome Words",
          description:
            "Opening remarks from the WiDS Monterrey organizing team.",
          date: "2026-05-15T09:30:00.000Z",
          location: "Auditorium A",
        },
        {
          blockType: "talk",
          speaker: speaker1.id,
          title: "Responsible AI: Building Fair ML Systems",
          description:
            "An exploration of fairness metrics, bias detection, and mitigation strategies in production ML pipelines.",
          date: "2026-05-15T10:00:00.000Z",
          location: "Auditorium A",
        },
        {
          blockType: "activity",
          title: "Coffee Break",
          date: "2026-05-15T11:00:00.000Z",
          location: "Terrace",
        },
        {
          blockType: "talk",
          speaker: speaker2.id,
          title: "Computer Vision at Scale: From Research to Production",
          description:
            "How Microsoft deploys computer vision models serving millions of users, and lessons learned along the way.",
          date: "2026-05-15T11:30:00.000Z",
          location: "Auditorium A",
        },
        {
          blockType: "activity",
          title: "Lunch & Networking",
          description: "Enjoy lunch and connect with fellow attendees.",
          date: "2026-05-15T12:30:00.000Z",
          location: "Dining Hall",
        },
        {
          blockType: "activity",
          title: "Closing Remarks & Farewell",
          description: "Thank you for attending WiDS 2026! See you next year.",
          date: "2026-05-15T14:00:00.000Z",
          location: "Auditorium A",
        },
      ],
    },
  });

  payload.logger.info("Successfully seeded!");
  process.exit(0);
};
