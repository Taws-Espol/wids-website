// Transitional: preserves the per-event colours the templates used before the
// shell was extracted. Replaced by the WiDS palette in the following commit.

export type EmailTheme = {
  eyebrowClassName: string;
  eyebrowColor: string;
  buttonClassName: string;
  buttonColor: string;
  linkClassName: string;
  linkColor: string;
  cardClassName: string;
  cardBorderColor: string;
  cardBackgroundColor: string;
  cardTextClassName: string;
  cardTextColor: string;
};

export const CONFERENCE_EMAIL_THEME: EmailTheme = {
  eyebrowClassName: "text-[#ae1854]",
  eyebrowColor: "#ae1854",
  buttonClassName: "bg-[#ae1854]",
  buttonColor: "#ae1854",
  linkClassName: "text-[#ae1854]",
  linkColor: "#ae1854",
  cardClassName: "border-[#f3d4e0] bg-[#fff8fb]",
  cardBorderColor: "#f3d4e0",
  cardBackgroundColor: "#fff8fb",
  cardTextClassName: "text-[#8b1e4f]",
  cardTextColor: "#8b1e4f",
};

export const DATATHON_EMAIL_THEME: EmailTheme = {
  eyebrowClassName: "text-[#135ca0]",
  eyebrowColor: "#135ca0",
  buttonClassName: "bg-[#135ca0]",
  buttonColor: "#135ca0",
  linkClassName: "text-[#135ca0]",
  linkColor: "#135ca0",
  cardClassName: "border-[#d8e8f6] bg-[#f7fbff]",
  cardBorderColor: "#d8e8f6",
  cardBackgroundColor: "#f7fbff",
  cardTextClassName: "text-[#135ca0]",
  cardTextColor: "#135ca0",
};
