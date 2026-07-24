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

import { getDatathonRegistrationReminderPixelUrl } from "@/shared/lib/umami/umami-email-pixels";
import type { Locale } from "@/shared/lib/next-intl/types";

type Props = {
  locale: Locale;
  name: string;
  teamName: string;
  eventTitle: string;
  eventDateTimeText: string;
  eventLocation: string;
  eventUrl: string;
};

export const DatathonRegistrationReminderEmail = async ({
  locale,
  name,
  teamName,
  eventTitle,
  eventDateTimeText,
  eventLocation,
  eventUrl,
}: Props) => {
  const messages = (await import(`../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({
    locale,
    messages,
    namespace: "features.registration.datathon-emails.reminder",
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
        <Body className="m-0 bg-transparent px-[16px] py-[32px] font-sans text-[#111827]">
          <Container
            className="mx-auto w-full max-w-[440px] rounded-[20px] border border-solid border-[#e5e7eb] bg-white px-[28px] py-[32px]"
            style={{
              margin: "0 auto",
              maxWidth: "440px",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              backgroundColor: "#ffffff",
              padding: "32px 28px",
            }}
          >
            <Section className="mb-[28px]">
              <Text
                className="m-0 text-[14px] font-semibold tracking-[0.12em] text-[#135ca0] uppercase"
                style={{
                  margin: 0,
                  color: "#135ca0",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                WiDS Guayaquil
              </Text>

              <Heading
                className="mt-[12px] mb-0 text-[28px] leading-[34px] font-semibold text-[#111827]"
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

            <Section className="mb-[24px]">
              <Text
                className="m-0 mb-[12px] text-[15px] leading-[24px] text-[#374151]"
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
                className="m-0 mb-[8px] text-[15px] leading-[24px] text-[#374151]"
                style={{
                  margin: "0 0 8px",
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#374151",
                }}
              >
                {t("description")}
              </Text>

              <Text
                className="m-0 text-[15px] leading-[24px] text-[#374151]"
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#374151",
                }}
              >
                {t("emphasis")}
              </Text>
            </Section>

            <Section
              className="mb-[24px] rounded-[14px] border border-solid border-[#d8e8f6] bg-[#f7fbff] px-[16px] py-[14px]"
              style={{
                marginBottom: "24px",
                border: "1px solid #d8e8f6",
                borderRadius: "14px",
                backgroundColor: "#f7fbff",
                padding: "14px 16px",
              }}
            >
              <Text
                className="m-0 mb-[8px] text-[14px] leading-[22px] font-semibold text-[#135ca0]"
                style={{
                  margin: "0 0 8px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontWeight: 600,
                  color: "#135ca0",
                }}
              >
                {eventTitle}
              </Text>

              <Text
                className="m-0 mb-[8px] text-[14px] leading-[22px] text-[#135ca0]"
                style={{
                  margin: "0 0 8px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#135ca0",
                }}
              >
                {t("team-name-label")} {teamName}
              </Text>

              <Text
                className="m-0 text-[14px] leading-[22px] text-[#135ca0]"
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#135ca0",
                }}
              >
                {t("event-date-label")} {eventDateTimeText}
                <br />
                {t("event-location-label")} {eventLocation}
              </Text>
            </Section>

            <Section className="mb-[24px] text-center">
              <Button
                href={eventUrl}
                className="rounded-[12px] bg-[#135ca0] px-[20px] py-[14px] text-[14px] font-semibold text-white no-underline"
                style={{
                  backgroundColor: "#135ca0",
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

            <Section className="border-t border-solid border-[#f3f4f6] pt-[20px]">
              <Text
                className="m-0 mb-[8px] text-[13px] leading-[22px] text-[#6b7280]"
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
                href={eventUrl}
                className="text-[13px] leading-[22px] text-[#135ca0] underline"
                style={{
                  fontSize: "13px",
                  lineHeight: "22px",
                  color: "#135ca0",
                  textDecoration: "underline",
                  wordBreak: "break-all",
                }}
              >
                {eventUrl}
              </Link>
            </Section>

            <Text
              className="m-0 mt-[24px] text-center text-[12px] leading-[18px] text-[#9ca3af]"
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
              src={getDatathonRegistrationReminderPixelUrl()}
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

DatathonRegistrationReminderEmail.PreviewProps = {
  locale: "es",
  name: "Ana",
  teamName: "Data Alchemists",
  eventTitle: "WiDS Datathon Guayaquil 2026",
  eventDateTimeText: "20 de mayo de 2026, 09:00",
  eventLocation: "ESPOL, Guayaquil",
  eventUrl: "https://wids.taws.espol.edu.ec/es/aprender/datathon",
} as Props;

export default DatathonRegistrationReminderEmail;
