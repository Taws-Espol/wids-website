import { describe, expect, it } from "vitest";

import { conferenceRegistrationConfirmationEmail } from "@/shared/lib/react-email/conference-registration-confirmation";
import { datathonRegistrationReminderEmail } from "@/shared/lib/react-email/datathon-registration-reminder";
import { WIDS_PALETTE } from "@/shared/constants/wids-palette";
import {
  renderTransactionalEmail,
  type EmailDefinition,
} from "@/shared/lib/react-email/render-transactional-email";

/** Tailwind renders colours as `rgb(r,g,b)`, so compare in that form. */
const toRgb = (hex: string) => {
  const value = Number.parseInt(hex.slice(1), 16);

  return `rgb(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255})`;
};

const conferenceData = {
  eventTitle: "WiDS Conference Guayaquil 2026",
  eventDateTimeText: "12 de mayo de 2026, 09:00",
  eventLocation: "ESPOL, Guayaquil",
};

describe("renderTransactionalEmail", () => {
  it("reads the subject and the body from the same namespace", async () => {
    const { subject, html } = await renderTransactionalEmail({
      definition: conferenceRegistrationConfirmationEmail,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/conferencia",
      data: conferenceData,
    });

    // Both halves come from features.registration.conference-emails.confirmation,
    // so a namespace typo cannot leave the subject and body out of step.
    expect(subject).toBe("WiDS Guayaquil | Registro a conferencia confirmado");
    expect(html).toContain("Tu registro fue exitoso");
  });

  it("translates the body for the requested locale", async () => {
    const { subject, html } = await renderTransactionalEmail({
      definition: conferenceRegistrationConfirmationEmail,
      locale: "en",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/en/conference",
      data: conferenceData,
    });

    expect(subject).not.toContain("Registro a conferencia");
    expect(html).toContain("You are registered");
    expect(html).toContain("Hello");
  });

  it("renders the caller's children and CTA target", async () => {
    const { html } = await renderTransactionalEmail({
      definition: datathonRegistrationReminderEmail,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/aprender/datathon",
      data: {
        teamName: "Data Alchemists",
        eventTitle: "WiDS Datathon Guayaquil 2026",
        eventDateTimeText: "20 de mayo de 2026, 09:00",
        eventLocation: "ESPOL, Guayaquil",
      },
    });

    expect(html).toContain("Data Alchemists");
    expect(html).toContain("https://wids.espol.edu.ec/es/aprender/datathon");
  });

  it("omits the tracking pixel when the definition supplies none", async () => {
    const withoutPixel: EmailDefinition<Record<string, never>> = {
      namespace: "features.registration.conference-emails.confirmation",
    };

    const { html } = await renderTransactionalEmail({
      definition: withoutPixel,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/conferencia",
      data: {},
    });

    expect(html).not.toContain("<img");
  });

  it("applies the WiDS brand colour to the rendered markup", async () => {
    const { html } = await renderTransactionalEmail({
      definition: conferenceRegistrationConfirmationEmail,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/conferencia",
      data: conferenceData,
    });

    // Tailwind emits colours as rgb(), not as the source hex. Match on the
    // channel triplet so an opacity modifier (which appends an alpha argument)
    // does not break the assertion.
    const [r, g, b] = [0, 2, 4].map((i) =>
      Number.parseInt(WIDS_PALETTE["ws-green"].slice(1 + i, 3 + i), 16),
    );

    expect(html).toContain(toRgb(WIDS_PALETTE["w-green-dark"]));
    expect(html).toContain(`rgb(${r},${g},${b}`);
    expect(html).toContain("Barlow");
  });

  it("colour-codes each programme per the brand guidelines", async () => {
    const conference = await renderTransactionalEmail({
      definition: conferenceRegistrationConfirmationEmail,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/conferencia",
      data: conferenceData,
    });

    const datathon = await renderTransactionalEmail({
      definition: datathonRegistrationReminderEmail,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/aprender/datathon",
      data: {
        teamName: "Data Alchemists",
        eventTitle: "WiDS Datathon Guayaquil 2026",
        eventDateTimeText: "20 de mayo de 2026, 09:00",
        eventLocation: "ESPOL, Guayaquil",
      },
    });

    expect(conference.html).toContain(toRgb(WIDS_PALETTE["w-green-light"]));
    expect(datathon.html).toContain(toRgb(WIDS_PALETTE["w-blue"]));
    expect(conference.html).not.toContain(toRgb(WIDS_PALETTE["w-blue"]));

    // Colour codes graphic elements only — the button stays dark green, which
    // is the only one of these that reaches AA against white.
    for (const { html } of [conference, datathon]) {
      expect(html).toContain(toRgb(WIDS_PALETTE["w-green-dark"]));
    }
  });

  it("emits no alpha colours, which Outlook cannot parse", async () => {
    const { html } = await renderTransactionalEmail({
      definition: conferenceRegistrationConfirmationEmail,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/conferencia",
      data: conferenceData,
    });

    // An opacity modifier renders as rgb(r,g,b,a) — four arguments.
    expect(html).not.toMatch(/rgba?\([^)]*,[^)]*,[^)]*,[^)]*\)/);
  });

  it("uses no colour outside the WiDS palette", async () => {
    const { html } = await renderTransactionalEmail({
      definition: conferenceRegistrationConfirmationEmail,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/conferencia",
      data: conferenceData,
    });

    // The retired per-event colours must not come back.
    expect(html).not.toContain(toRgb("#ae1854"));
    expect(html).not.toContain("#ae1854");
    expect(html).not.toContain(toRgb("#135ca0"));
    expect(html).not.toContain("#135ca0");
  });
});
