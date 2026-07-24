import { TransactionalEmail } from "./transactional-email";

type Props = {
  name: string;
  url: string;
};

/**
 * Sent by Payload's auth `forgotPassword` hook, which has no locale, so the
 * copy is English. The wiring in `collections/users.ts` is currently commented
 * out.
 */
export const ForgotPassword = ({ url, name }: Props) => (
  <TransactionalEmail
    copy={{
      preview: "Reset your WiDS Guayaquil password",
      heading: "Reset your password",
      greeting: "Hello",
      description:
        "We received a request to reset the password for your WiDS Guayaquil CMS account. Use the button below to choose a new password.",
      cta: "Reset password",
      copyAndPasteLabel:
        "If the button doesn't work, copy and paste this link into your browser:",
      footerNote:
        "If you did not request a password reset, you can safely ignore this email.",
    }}
    name={name}
    ctaHref={url}
  />
);

ForgotPassword.PreviewProps = {
  name: "Admin",
  url: "https://wids.taws.espol.edu.ec/admin/reset/6158dacb71b894e0a914728f6053c4e2dac8a93b",
} satisfies Props;

export default ForgotPassword;
