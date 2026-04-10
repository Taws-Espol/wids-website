import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface Props {
  name: string;
  url: string;
}

export const VerifyEmail = ({ url, name }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your WiDS Guayaquil email address</Preview>
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
                className="mt-[12px] mb-0 text-[28px] leading-[34px] font-semibold text-[#111827]"
                style={{
                  margin: "12px 0 0",
                  fontSize: "28px",
                  lineHeight: "34px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                Confirm your email address
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
                Hello {name},
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
                Please confirm your email address to activate your account and
                start using the WiDS Guayaquil CMS.
              </Text>
            </Section>

            <Section
              className="mb-[24px] rounded-[14px] border border-solid border-[#f3d4e0] bg-[#fff8fb] px-[16px] py-[14px]"
              style={{
                marginBottom: "24px",
                border: "1px solid #f3d4e0",
                borderRadius: "14px",
                backgroundColor: "#fff8fb",
                padding: "14px 16px",
              }}
            >
              <Text
                className="m-0 text-[14px] leading-[22px] text-[#8b1e4f]"
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#8b1e4f",
                }}
              >
                This verification link will expire in one hour.
              </Text>
            </Section>

            <Section className="mb-[24px] text-center">
              <Button
                href={url}
                className="rounded-[12px] bg-[#ae1854] px-[20px] py-[14px] text-[14px] font-semibold text-white no-underline"
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
                Verify email
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
                If the button doesn&apos;t work, copy and paste this link into
                your browser:
              </Text>

              <Link
                href={url}
                className="text-[13px] leading-[22px] text-[#ae1854] underline"
                style={{
                  fontSize: "13px",
                  lineHeight: "22px",
                  color: "#ae1854",
                  textDecoration: "underline",
                  wordBreak: "break-all",
                }}
              >
                {url}
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
              If you did not request this email, you can safely ignore it.
              <br />
              &copy; {new Date().getFullYear()} WiDS Guayaquil
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerifyEmail.PreviewProps = {
  url: "https://wids.taws.espol.edu.ec/admin/users/verify/6158dacb71b894e0a914728f6053c4e2dac8a93b",
  name: "Admin",
} as Props;

export default VerifyEmail;
