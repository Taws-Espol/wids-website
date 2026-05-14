import Image from "next/image";
import Link from "next/link";

import type { Sponsor, Media } from "@/shared/lib/payload/types/payload";

interface Props {
  sponsor: Sponsor;
}

export function SponsorCard({ sponsor }: Props) {
  const logo = sponsor.logo as Media;

  if (!sponsor.website) return null;

  return (
    <Link
      className="flex w-52 max-w-full flex-none flex-col items-center gap-1"
      title={sponsor.name}
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative aspect-square w-38">
        <Image
          src={logo.url as string}
          alt={logo.alt as string}
          fill
          sizes="152px"
          className="rounded-full object-contain"
        />
      </div>

      <div className="-mt-4 flex w-full flex-col text-center wrap-anywhere">
        <span className="text-2xl font-bold wrap-break-word whitespace-normal">
          {sponsor.name}
        </span>
        <span className="text-sm wrap-break-word whitespace-normal">
          {sponsor.tier}
        </span>
      </div>
    </Link>
  );
}
