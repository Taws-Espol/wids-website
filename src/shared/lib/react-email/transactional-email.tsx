import type { ReactNode } from "react";
import {
  Body,
  Button,
  Container,
  Font,
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

import { WIDS_PALETTE } from "@/shared/constants/wids-palette";

import { EMAIL_PROGRAM_STYLES, type EmailProgram } from "./email-program";

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
  program?: EmailProgram;
  pixelUrl?: string;
  children?: ReactNode;
};

/**
 * The shell every transactional email renders inside. Pure and synchronous —
 * copy arrives already resolved, so this module knows nothing about locales,
 * events or teams.
 *
 * Styling is expressed only as Tailwind classes. `<Tailwind>` inlines them at
 * render time, so a mirrored `style` object would be a second copy of the same
 * values with nothing keeping the two in step.
 */
export const TransactionalEmail = ({
  copy,
  name,
  ctaHref,
  program = "general",
  pixelUrl,
  children,
}: Props) => (
  <Html>
    <Head>
      <Font
        fontFamily="Barlow"
        fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
        webFont={{
          url: "https://fonts.gstatic.com/s/barlow/v12/7cHpv4kjgoGqM7E_DMs5.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>{copy.preview}</Preview>
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: { extend: { colors: WIDS_PALETTE } },
      }}
    >
      <Body className="text-w-foreground m-0 bg-transparent px-[16px] py-[32px] font-sans">
        {/*
         * If a per-side border colour is ever reintroduced here, set physical
         * sides rather than the `border-<color>` shorthand: Tailwind emits the
         * shorthand after `border-top-color` and silently overwrites it, and
         * `border-x-` emits the logical `border-inline-color`, which older
         * Outlook does not support.
         */}
        <Container
          className={`mx-auto w-full max-w-[440px] rounded-[20px] border border-solid bg-white px-[28px] py-[32px] ${EMAIL_PROGRAM_STYLES[program].border}`}
        >
          <Section className="mb-[28px]">
            <Text className="text-w-green-dark m-0 text-[14px] font-semibold tracking-[0.12em] uppercase">
              WiDS Guayaquil
            </Text>

            <Heading className="text-w-foreground mt-[12px] mb-0 text-[28px] leading-[34px] font-semibold">
              {copy.heading}
            </Heading>
          </Section>

          <Section className="mb-[24px]">
            <Text className="text-w-foreground m-0 mb-[12px] text-[15px] leading-[24px]">
              {copy.greeting} {name},
            </Text>

            <Text
              className={`text-w-foreground m-0 text-[15px] leading-[24px] ${copy.emphasis ? "mb-[8px]" : ""}`}
            >
              {copy.description}
            </Text>

            {copy.emphasis && (
              <Text className="text-w-foreground m-0 text-[15px] leading-[24px] font-semibold">
                {copy.emphasis}
              </Text>
            )}
          </Section>

          {children}

          <Section className="mb-[24px] text-center">
            <Button
              href={ctaHref}
              className="bg-w-green-dark text-w-white rounded-[12px] px-[20px] py-[14px] text-[14px] font-semibold no-underline"
            >
              {copy.cta}
            </Button>
          </Section>

          <Section className="border-t border-solid border-[#f3f4f6] pt-[20px]">
            <Text className="text-w-gray m-0 mb-[8px] text-[13px] leading-[22px]">
              {copy.copyAndPasteLabel}
            </Text>

            <Link
              href={ctaHref}
              className="text-w-green-dark text-[13px] leading-[22px] break-all underline"
            >
              {ctaHref}
            </Link>
          </Section>

          <Text className="text-w-gray m-0 mt-[24px] text-center text-[12px] leading-[18px]">
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
              className="block h-[1px] w-[1px] overflow-hidden opacity-0"
            />
          )}
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
