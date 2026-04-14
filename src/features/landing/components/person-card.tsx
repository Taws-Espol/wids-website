import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { LinkedinIcon } from "@hugeicons/core-free-icons";

import type {
  Ambassador,
  Media,
  Speaker,
} from "@/shared/lib/payload/types/payload";
import { Link } from "@/shared/components/ui/link";

interface Props {
  person: Ambassador | Speaker;
}

export function PersonCard({ person }: Props) {
  const photo = person.photo as Media;

  return (
    <div className="flex w-full max-w-[18rem] flex-col items-center gap-4">
      <div className="relative aspect-square w-38">
        <Image
          src={photo.url as string}
          alt={photo.alt as string}
          fill
          sizes="152px"
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex w-full flex-col text-center wrap-anywhere">
        <span className="text-2xl font-bold wrap-break-word whitespace-normal">
          {person.name}
        </span>
        <span className="text-sm wrap-break-word whitespace-normal">
          {person.title}
        </span>
        <span className="text-sm font-light wrap-break-word whitespace-normal">
          {person.affiliation}
        </span>
      </div>

      {person.linkedin && (
        <Link
          title="LinkedIn"
          href={person.linkedin}
          className="flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon icon={LinkedinIcon} className="size-5" />
        </Link>
      )}
    </div>
  );
}
