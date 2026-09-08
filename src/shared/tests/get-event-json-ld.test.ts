import { describe, expect, it } from "vitest";

import {
  getEventEndDate,
  getEventJsonLd,
} from "@/features/landing/utils/get-event-json-ld";
import type { Event } from "@/shared/lib/payload/types/payload";

const baseEvent = {
  id: 1,
  edition: 1,
  type: "conference",
  title: "WiDS Guayaquil 2026 | Conference",
  description: "A conference.",
  location: "STEM, ESPOL, Guayaquil, Ecuador",
  date: "2026-07-31T15:00:00.000Z",
  date_tz: "America/Bogota",
  duration: 5,
  durationUnit: "hours",
  updatedAt: "2026-01-01T00:00:00.000Z",
  createdAt: "2026-01-01T00:00:00.000Z",
} as Event;

describe("getEventEndDate", () => {
  it.each([
    ["minutes", 90, "2026-07-31T16:30:00.000Z"],
    ["hours", 5, "2026-07-31T20:00:00.000Z"],
    ["days", 2, "2026-08-02T15:00:00.000Z"],
  ] as const)("handles %s", (durationUnit, duration, expected) => {
    expect(getEventEndDate({ ...baseEvent, duration, durationUnit })).toBe(
      expected,
    );
  });
});

describe("getEventJsonLd", () => {
  it("maps the fields schema.org needs", () => {
    const jsonLd = getEventJsonLd(baseEvent);

    expect(jsonLd["@type"]).toBe("Event");
    expect(jsonLd.name).toBe(baseEvent.title);
    expect(jsonLd.startDate).toBe("2026-07-31T15:00:00.000Z");
    expect(jsonLd.location).toMatchObject({
      "@type": "Place",
      name: baseEvent.location,
    });
  });

  it("omits the place URL rather than emitting an empty one", () => {
    const jsonLd = getEventJsonLd(baseEvent);

    expect(jsonLd.location).not.toHaveProperty("url");
  });

  it("includes the place URL when the CMS has one", () => {
    const jsonLd = getEventJsonLd({
      ...baseEvent,
      locationUrl: "https://maps.example/espol",
    });

    expect(jsonLd.location).toHaveProperty("url", "https://maps.example/espol");
  });

  it("omits offers entirely when registration has no start", () => {
    expect(getEventJsonLd(baseEvent)).not.toHaveProperty("offers");
  });

  it("maps the registration window onto an offer", () => {
    const jsonLd = getEventJsonLd({
      ...baseEvent,
      registrationStart: "2026-06-01T00:00:00.000Z",
      registrationEnd: "2026-07-30T00:00:00.000Z",
    });

    expect(jsonLd.offers).toMatchObject({
      "@type": "Offer",
      validFrom: "2026-06-01T00:00:00.000Z",
      validThrough: "2026-07-30T00:00:00.000Z",
    });
  });

  it("emits an open-ended offer when registration has no end", () => {
    const jsonLd = getEventJsonLd({
      ...baseEvent,
      registrationStart: "2026-06-01T00:00:00.000Z",
    });

    expect(jsonLd.offers).not.toHaveProperty("validThrough");
  });
});
