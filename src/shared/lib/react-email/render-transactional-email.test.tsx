import { describe, expect, it } from "vitest";

import { conferenceRegistrationConfirmationEmail } from "./conference-registration-confirmation";
import { datathonRegistrationReminderEmail } from "./datathon-registration-reminder";
import { CONFERENCE_EMAIL_THEME } from "./email-theme";
import {
  renderTransactionalEmail,
  type EmailDefinition,
} from "./render-transactional-email";

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
      theme: CONFERENCE_EMAIL_THEME,
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

  it("applies the theme colour to the rendered markup", async () => {
    const { html } = await renderTransactionalEmail({
      definition: conferenceRegistrationConfirmationEmail,
      locale: "es",
      name: "Ana",
      ctaHref: "https://wids.espol.edu.ec/es/conferencia",
      data: conferenceData,
    });

    expect(html).toContain(CONFERENCE_EMAIL_THEME.buttonColor);
  });
});
