import type { ReactNode } from "react";
import { Section, Text } from "react-email";

import { EMAIL_PROGRAM_STYLES, type EmailProgram } from "./email-program";

type Props = {
  title: string;
  rows: ReactNode[];
  program?: EmailProgram;
};

export const EmailDetailsCard = ({
  title,
  rows,
  program = "general",
}: Props) => (
  <Section
    className={`mb-[24px] rounded-[14px] px-[16px] py-[14px] ${EMAIL_PROGRAM_STYLES[program].card}`}
  >
    <Text className="text-w-foreground m-0 mb-[8px] text-[14px] leading-[22px] font-semibold">
      {title}
    </Text>

    {rows.map((row, index) => (
      <Text
        key={index}
        className={`text-w-foreground m-0 text-[14px] leading-[22px] ${index === rows.length - 1 ? "" : "mb-[8px]"}`}
      >
        {row}
      </Text>
    ))}
  </Section>
);
