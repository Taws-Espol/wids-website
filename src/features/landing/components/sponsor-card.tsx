import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { GlobeIcon } from "@hugeicons/core-free-icons";

import type { Sponsor, Media } from "@/shared/lib/payload/types/payload";
import { Link } from "@/shared/components/ui/link";

interface Props {
  sponsor: Sponsor;
}

export function SponsorCard({ sponsor }: Props) {
  const logo = sponsor.logo as Media;

  return (
    <div className="flex w-52 max-w-full flex-none flex-col items-center gap-1">
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

      {sponsor.website && (
        <Link
          title="Website"
          href={sponsor.website}
          className="flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon icon={GlobeIcon} className="size-5" />
        </Link>
      )}
    </div>
  );
}
