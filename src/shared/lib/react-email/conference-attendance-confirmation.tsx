import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "react-email";
import { createTranslator } from "next-intl";

import { getConferenceAttendanceConfirmationPixelUrl } from "@/shared/lib/umami/umami-email-pixels";
import type { Locale } from "@/shared/lib/next-intl/types";

type Props = {
  locale: Locale;
  name: string;
  eventTitle: string;
  eventDateTimeText: string;
  eventLocation: string;
  confirmUrl: string;
};

export const ConferenceAttendanceConfirmationEmail = async ({
  locale,
  name,
  eventTitle,
  eventDateTimeText,
  eventLocation,
  confirmUrl,
}: Props) => {
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({
    locale,
    messages,
    namespace:
      "features.registration.conference-emails.attendance-confirmation",
  });

  return (
    <Html>
      <Head />
      <Preview>{t("preview")}</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="m-0 bg-transparent px-4 py-8 font-sans text-[#111827]">
          <Container
            className="mx-auto w-full max-w-110 rounded-[20px] border border-solid border-[#e5e7eb] bg-white px-7 py-8"
            style={{
              margin: "0 auto",
              maxWidth: "440px",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              backgroundColor: "#ffffff",
              padding: "32px 28px",
            }}
          >
            <Section className="mb-7">
              <Text
                className="m-0 text-[14px] font-semibold tracking-[0.12em] text-[#ae1854] uppercase"
                style={{
                  margin: 0,
                  color: "#ae1854",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                WiDS Guayaquil
              </Text>

              <Heading
                className="mt-3 mb-0 text-[28px] leading-8.5 font-semibold text-[#111827]"
                style={{
                  margin: "12px 0 0",
                  fontSize: "28px",
                  lineHeight: "34px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {t("heading")}
              </Heading>
            </Section>

            <Section className="mb-6">
              <Text
                className="m-0 mb-3 text-[15px] leading-6 text-[#374151]"
                style={{
                  margin: "0 0 12px",
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#374151",
                }}
              >
                {t("greeting")} {name},
              </Text>

              <Text
                className="m-0 text-[15px] leading-6 text-[#374151]"
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#374151",
                }}
              >
                {t("description")}
              </Text>
            </Section>

            <Section
              className="mb-6 rounded-[14px] border border-solid border-[#f3d4e0] bg-[#fff8fb] px-4 py-3.5"
              style={{
                marginBottom: "24px",
                border: "1px solid #f3d4e0",
                borderRadius: "14px",
                backgroundColor: "#fff8fb",
                padding: "14px 16px",
              }}
            >
              <Text
                className="m-0 mb-2 text-[14px] leading-5.5 font-semibold text-[#8b1e4f]"
                style={{
                  margin: "0 0 8px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 600,
                  color: "#8b1e4f",
                }}
              >
                {eventTitle}
              </Text>

              <Text
                className="m-0 text-[14px] leading-5.5 text-[#8b1e4f]"
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#8b1e4f",
                }}
              >
                {t("event-date-label")} {eventDateTimeText}
                <br />
                {t("event-location-label")} {eventLocation}
              </Text>
            </Section>

            <Section className="mb-6 text-center">
              <Button
                href={confirmUrl}
                className="rounded-[12px] bg-[#ae1854] px-5 py-3.5 text-[14px] font-semibold text-white no-underline"
                style={{
                  backgroundColor: "#ae1854",
                  borderRadius: "12px",
                  color: "#ffffff",
                  display: "inline-block",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "14px 20px",
                  textDecoration: "none",
                }}
              >
                {t("cta")}
              </Button>
            </Section>

            <Section className="border-t border-solid border-[#f3f4f6] pt-5">
              <Text
                className="m-0 mb-2 text-[13px] leading-5.5 text-[#6b7280]"
                style={{
                  margin: "0 0 8px",
                  fontSize: "13px",
                  lineHeight: "22px",
                  color: "#6b7280",
                }}
              >
                {t("copy-and-paste-label")}
              </Text>

              <Link
                href={confirmUrl}
                className="text-[13px] leading-5.5 text-[#ae1854] underline"
                style={{
                  fontSize: "13px",
                  lineHeight: "22px",
                  color: "#ae1854",
                  textDecoration: "underline",
                  wordBreak: "break-all",
                }}
              >
                {confirmUrl}
              </Link>
            </Section>

            <Text
              className="m-0 mt-6 text-center text-[12px] leading-4.5 text-[#9ca3af]"
              style={{
                margin: "24px 0 0",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              {t("footer-note")}
              <br />
              &copy; {new Date().getFullYear()} WiDS Guayaquil
            </Text>

            <Img
              src={getConferenceAttendanceConfirmationPixelUrl()}
              alt=""
              width="1"
              height="1"
              style={{
                display: "block",
                width: "1px",
                height: "1px",
                opacity: 0,
                overflow: "hidden",
              }}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ConferenceAttendanceConfirmationEmail.PreviewProps = {
  locale: "es",
  name: "Ana",
  eventTitle: "WiDS Conference Guayaquil 2026",
  eventDateTimeText: "12 de mayo de 2026, 09:00",
  eventLocation: "ESPOL, Guayaquil",
  confirmUrl:
    "https://wids.taws.espol.edu.ec/api/attendance?t=example-token&utm_source=email&utm_medium=email&utm_campaign=attendance-confirmation",
} as Props;

export default ConferenceAttendanceConfirmationEmail;
