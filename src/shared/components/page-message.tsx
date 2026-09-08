import type { ReactNode } from "react";

import { TypographyH1 } from "@/shared/components/ui/typography-h1";
import { TypographyParagraph } from "@/shared/components/ui/typography-paragraph";

type Props = {
  title: string;
  description: string;
  /** The way out: a link home, a retry button, or nothing. */
  action?: ReactNode;
};

/**
 * A centred "something to tell you" block, for empty, missing and error states.
 *
 * Deliberately not a `<main>`: it is used both as a whole page (the error
 * boundary) and inside one (a blog post that does not exist), and nesting
 * `<main>` elements is invalid. The caller supplies the landmark.
 *
 * Mirrors the shape the attendance page already uses for its own not-found
 * state, so the site has one treatment for this rather than three.
 */
export function PageMessage({ title, description, action }: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <TypographyH1>{title}</TypographyH1>

      <TypographyParagraph className="text-muted-foreground max-w-110">
        {description}
      </TypographyParagraph>

      {action}
    </div>
  );
}
