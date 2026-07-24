import type { ReactNode } from "react";
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

import type { EmailTheme } from "./email-theme";

export type EmailCopy = {
  preview: string;
  heading: string;
  greeting: string;
  description: string;
  emphasis?: string;
  cta: string;
  copyAndPasteLabel: string;
  footerNote: string;
};

type Props = {
  copy: EmailCopy;
  name: string;
  ctaHref: string;
  theme: EmailTheme;
  pixelUrl?: string;
  children?: ReactNode;
};

export const TransactionalEmail = ({
  copy,
  name,
  ctaHref,
  theme,
  pixelUrl,
  children,
}: Props) => (
  <Html>
    <Head />
    <Preview>{copy.preview}</Preview>
    <Tailwind config={{ presets: [pixelBasedPreset] }}>
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
              className={`m-0 text-[14px] font-semibold tracking-[0.12em] uppercase ${theme.eyebrowClassName}`}
              style={{
                margin: 0,
                color: theme.eyebrowColor,
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
              {copy.heading}
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
              {copy.greeting} {name},
            </Text>

            <Text
              className={`m-0 text-[15px] leading-[24px] text-[#374151] ${copy.emphasis ? "mb-[8px]" : ""}`}
              style={{
                margin: copy.emphasis ? "0 0 8px" : 0,
                fontSize: "15px",
                lineHeight: "24px",
                color: "#374151",
              }}
            >
              {copy.description}
            </Text>

            {copy.emphasis && (
              <Text
                className="m-0 text-[15px] leading-[24px] text-[#374151]"
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#374151",
                }}
              >
                {copy.emphasis}
              </Text>
            )}
          </Section>

          {children}

          <Section className="mb-[24px] text-center">
            <Button
              href={ctaHref}
              className={`rounded-[12px] px-[20px] py-[14px] text-[14px] font-semibold text-white no-underline ${theme.buttonClassName}`}
              style={{
                backgroundColor: theme.buttonColor,
                borderRadius: "12px",
                color: "#ffffff",
                display: "inline-block",
                fontSize: "14px",
                fontWeight: 600,
                padding: "14px 20px",
                textDecoration: "none",
              }}
            >
              {copy.cta}
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
              {copy.copyAndPasteLabel}
            </Text>

            <Link
              href={ctaHref}
              className={`text-[13px] leading-[22px] underline ${theme.linkClassName}`}
              style={{
                fontSize: "13px",
                lineHeight: "22px",
                color: theme.linkColor,
                textDecoration: "underline",
                wordBreak: "break-all",
              }}
            >
              {ctaHref}
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
            {copy.footerNote}
            <br />
            &copy; {new Date().getFullYear()} WiDS Guayaquil
          </Text>

          {pixelUrl && (
            <Img
              src={pixelUrl}
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
          )}
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
