/**
 * The colour coding system from the WiDS brand guidelines (p.17): each
 * programme carries its own colour, and general items use the primary dark
 * green.
 *
 * Colour appears only on graphic elements — the container frame and the details
 * card — never on text. The primaries are background-only; none of them reaches
 * 3:1 against white, so headings, body copy and the button stay dark green.
 *
 * Classes are written out in full rather than composed, because Tailwind needs
 * to see complete class names, and solid rather than opacity-modified, because
 * an opacity modifier emits four-argument `rgb()` which Outlook cannot parse.
 */
export type EmailProgram = "general" | "conference" | "datathon";

export const EMAIL_PROGRAM_STYLES: Record<
  EmailProgram,
  { border: string; card: string }
> = {
  general: { border: "border-w-green-dark", card: "bg-ws-green" },
  conference: { border: "border-w-green-light", card: "bg-ws-green" },
  datathon: { border: "border-w-blue", card: "bg-ws-blue" },
};
