import type { ReactNode } from "react";
import { Section, Text } from "react-email";

import type { EmailTheme } from "./email-theme";

type Props = {
  title: string;
  rows: ReactNode[];
  theme: EmailTheme;
};

export const EmailDetailsCard = ({ title, rows, theme }: Props) => (
  <Section
    className={`mb-[24px] rounded-[14px] border border-solid px-[16px] py-[14px] ${theme.cardClassName}`}
    style={{
      marginBottom: "24px",
      border: `1px solid ${theme.cardBorderColor}`,
      borderRadius: "14px",
      backgroundColor: theme.cardBackgroundColor,
      padding: "14px 16px",
    }}
  >
    <Text
      className={`m-0 mb-[8px] text-[14px] leading-[22px] font-semibold ${theme.cardTextClassName}`}
      style={{
        margin: "0 0 8px",
        fontSize: "14px",
        lineHeight: "22px",
        fontWeight: 600,
        color: theme.cardTextColor,
      }}
    >
      {title}
    </Text>

    {rows.map((row, index) => {
      const isLast = index === rows.length - 1;

      return (
        <Text
          key={index}
          className={`m-0 text-[14px] leading-[22px] ${theme.cardTextClassName} ${isLast ? "" : "mb-[8px]"}`}
          style={{
            margin: isLast ? 0 : "0 0 8px",
            fontSize: "14px",
            lineHeight: "22px",
            color: theme.cardTextColor,
          }}
        >
          {row}
        </Text>
      );
    })}
  </Section>
);
