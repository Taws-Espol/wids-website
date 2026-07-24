import { TransactionalEmail } from "./transactional-email";

type Props = {
  name: string;
  url: string;
};

/**
 * Sent by Payload's auth `verify` hook, which has no locale, so the copy is
 * English. The wiring in `collections/users.ts` is currently commented out.
 */
export const VerifyEmail = ({ url, name }: Props) => (
  <TransactionalEmail
    copy={{
      preview: "Confirm your WiDS Guayaquil email address",
      heading: "Confirm your email address",
      greeting: "Hello",
      description:
        "Please confirm your email address to activate your account and start using the WiDS Guayaquil CMS.",
      cta: "Verify email",
      copyAndPasteLabel:
        "If the button doesn't work, copy and paste this link into your browser:",
      footerNote:
        "If you did not request this email, you can safely ignore it.",
    }}
    name={name}
    ctaHref={url}
  />
);

VerifyEmail.PreviewProps = {
  name: "Admin",
  url: "https://wids.taws.espol.edu.ec/admin/users/verify/6158dacb71b894e0a914728f6053c4e2dac8a93b",
} satisfies Props;

export default VerifyEmail;
