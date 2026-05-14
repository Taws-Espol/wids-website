"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/components/ui/carousel";
import type { Event } from "@/shared/lib/payload/types/payload";
import { cn } from "@/shared/utils/cn";
import { Countdown } from "./countdown";

interface Props {
  events: Event[];
}

export function HeroSlider({ events }: Props) {
  return (
    <section className="relative right-1/2 left-1/2 mx-[-50vw] w-screen max-w-none">
      <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]}>
        <CarouselContent>
          {events.map((event, index) => {
            const isFirst = index === 0;
            const imageSrc =
              event.type == "conference"
                ? "https://cdn.taws.espol.edu.ec/wids/conference-hero.png"
                : event.type == "nextgen"
                  ? "https://cdn.taws.espol.edu.ec/wids/nextgen-hero.png"
                  : event.type == "datathon"
                    ? "https://cdn.taws.espol.edu.ec/wids/datathon-hero.png"
                    : "";
            const imageAlt =
              event.type == "conference"
                ? "Conference hero"
                : event.type == "nextgen"
                  ? "NextGen hero"
                  : event.type == "datathon"
                    ? "Datathon hero"
                    : "";
            const color =
              event.type == "conference"
                ? "green-light"
                : event.type == "nextgen"
                  ? "yellow"
                  : event.type == "datathon"
                    ? "blue"
                    : "";

            return (
              <CarouselItem key={event.id}>
                <div className="relative aspect-1013/320 w-full">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    fetchPriority={isFirst ? "high" : "auto"}
                    loading={isFirst ? "eager" : "lazy"}
                    sizes="(max-width: 2340px) 100vw, 2340px"
                    className="object-cover"
                  />

                  <div
                    className={cn(
                      "absolute top-0 right-0 flex aspect-square w-32 flex-col items-center justify-center gap-2 rounded-full p-1 text-center wrap-break-word md:w-62 md:p-2 lg:w-82",
                      color && `bg-w-${color}`,
                    )}
                  >
                    <span
                      className={cn(
                        "w-full text-sm text-wrap wrap-break-word whitespace-normal sm:text-base md:text-lg lg:text-2xl",
                        color && `text-w-${color}-foreground`,
                      )}
                    >
                      {event.title}
                    </span>

                    <Countdown targetDate={new Date(event.date)} />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
