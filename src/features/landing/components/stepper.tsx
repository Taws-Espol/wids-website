import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons/core-free-icons";

import { COLORS } from "@/shared/constants/colors";
import { cn } from "@/shared/utils/cn";

export interface StepperItem {
  date: Date | string;
  description: string;
  duration: string;
  location: string;
  speakerName?: string;
  speakerTitle?: string;
  title: string;
}

interface StepperProps {
  color?: keyof typeof COLORS;
  items: StepperItem[];
  locale?: string;
  timeZone?: string;
}

type StepperGroup = {
  date: Date;
  dateKey: string;
  items: StepperItem[];
};

type StepperTimeGroup = {
  items: StepperItem[];
  timeKey: string;
};

const DATE_FALLBACK = new Date(0);
const ISO_DATE_TIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;

function toDate(value: Date | string) {
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return DATE_FALLBACK;
  return parsed;
}

function getStartDate(item: StepperItem) {
  return toDate(item.date);
}

function getDatePartsFromValue(
  value: Date | string,
  locale: string,
  timeZone: string,
) {
  if (typeof value === "string") {
    const match = value.match(ISO_DATE_TIME_PATTERN);

    if (match) {
      const [, year, month, day, hour, minute] = match;

      return {
        day,
        hour,
        minute,
        month,
        year,
      };
    }
  }

  const date = toDate(value);
  const formatter = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    timeZone,
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);

  return {
    day: parts.find((part) => part.type === "day")?.value ?? "01",
    hour: parts.find((part) => part.type === "hour")?.value ?? "00",
    minute: parts.find((part) => part.type === "minute")?.value ?? "00",
    month: parts.find((part) => part.type === "month")?.value ?? "01",
    year: parts.find((part) => part.type === "year")?.value ?? "1970",
  };
}

function formatStartTime(item: StepperItem, locale: string, timeZone: string) {
  const parsed = getStartDate(item);
  if (parsed.getTime() === DATE_FALLBACK.getTime()) return null;

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    hour12: false,
  }).format(parsed);
}

function formatDateLabel(item: StepperItem, locale: string, timeZone: string) {
  const parsed = getStartDate(item);
  if (parsed.getTime() === DATE_FALLBACK.getTime()) return null;

  const { day, month, year } = getDatePartsFromValue(
    item.date,
    locale,
    timeZone,
  );
  const stableDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day), 12),
  );

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(stableDate);
}

function toTimeKey(item: StepperItem, locale: string, timeZone: string) {
  const parsed = getStartDate(item);
  if (parsed.getTime() === DATE_FALLBACK.getTime()) return "invalid-time";

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    hour12: false,
  });
  const parts = formatter.formatToParts(parsed);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";

  return `${hour}:${minute}`;
}

function groupByStartTime(
  items: StepperItem[],
  locale: string,
  timeZone: string,
): StepperTimeGroup[] {
  const groupsMap = new Map<string, StepperItem[]>();

  for (const item of items) {
    const timeKey = toTimeKey(item, locale, timeZone);
    const existing = groupsMap.get(timeKey);

    if (existing) {
      existing.push(item);
      continue;
    }

    groupsMap.set(timeKey, [item]);
  }

  return [...groupsMap.entries()].map(([timeKey, timeItems]) => ({
    items: timeItems,
    timeKey,
  }));
}

function groupByDay(
  items: StepperItem[],
  locale: string,
  timeZone: string,
): StepperGroup[] {
  const sorted = [...items].sort(
    (a, b) => getStartDate(a).getTime() - getStartDate(b).getTime(),
  );

  const groupsMap = new Map<string, StepperGroup>();

  for (const item of sorted) {
    const date = getStartDate(item);
    const { day, month, year } = getDatePartsFromValue(
      item.date,
      locale,
      timeZone,
    );
    const dateKey = `${year}-${month}-${day}`;
    const existing = groupsMap.get(dateKey);

    if (existing) {
      existing.items.push(item);
      continue;
    }

    groupsMap.set(dateKey, {
      date,
      dateKey,
      items: [item],
    });
  }

  return [...groupsMap.values()];
}

export function Stepper({
  color = "blue",
  items,
  locale = "en",
  timeZone = "America/Guayaquil",
}: StepperProps) {
  const colorHex = COLORS[color];
  const groups = groupByDay(items, locale, timeZone);

  return (
    <section className="relative w-full pl-6 md:pl-14">
      <div className="flex flex-col gap-12">
        {groups.map((group) => {
          const timeGroups = groupByStartTime(group.items, locale, timeZone);
          const formattedDate =
            formatDateLabel(group.items[0], locale, timeZone) ?? "";

          return (
            <article key={group.dateKey} className="relative">
              <span className="text-w-green-dark font-barlow text-[24px] leading-[1.2] font-semibold">
                {formattedDate}
              </span>

              <div className="mt-3 flex flex-col gap-4">
                {timeGroups.map((timeGroup, timeGroupIndex) => {
                  const hasParallelItems = timeGroup.items.length > 1;
                  const isFirstLevel = timeGroupIndex === 0;
                  const isLastLevel = timeGroupIndex === timeGroups.length - 1;
                  const lineClassName =
                    timeGroups.length === 1
                      ? null
                      : isFirstLevel
                        ? "top-6 -bottom-4"
                        : isLastLevel
                          ? "-top-4 top-6"
                          : "-top-4 -bottom-4";

                  return (
                    <div
                      key={`${group.dateKey}-${timeGroup.timeKey}-${timeGroupIndex}`}
                      className="relative pl-12"
                    >
                      {lineClassName && (
                        <div
                          className={cn(
                            "absolute left-6 z-10 w-px -translate-x-1/2",
                            lineClassName,
                          )}
                          style={{ backgroundColor: colorHex }}
                        />
                      )}
                      <div
                        className="absolute top-6 left-6 z-20 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: colorHex }}
                      />

                      <div
                        className={cn(
                          "relative flex flex-col gap-3",
                          hasParallelItems &&
                            "md:grid md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] md:gap-4",
                        )}
                      >
                        {timeGroup.items.map((item, index) => {
                          const startTime = formatStartTime(
                            item,
                            locale,
                            timeZone,
                          );
                          const duration = item.duration;

                          return (
                            <div
                              key={`${group.dateKey}-${timeGroup.timeKey}-${index}-${item.title}`}
                              className="relative bg-white/70 p-4"
                            >
                              {(startTime || duration) && (
                                <p className="font-barlow-condensed text-sm opacity-70">
                                  {[startTime, duration]
                                    .filter(Boolean)
                                    .join(" • ")}
                                </p>
                              )}
                              <p className="text-w-green-dark font-barlow text-xl font-semibold">
                                {item.title}
                              </p>
                              {(item.speakerName || item.speakerTitle) && (
                                <p className="font-barlow-condensed mt-1 text-sm opacity-80">
                                  {[item.speakerName, item.speakerTitle]
                                    .filter(Boolean)
                                    .join(" • ")}
                                </p>
                              )}
                              <p className="font-barlow-condensed mt-1 text-lg">
                                {item.description}
                              </p>
                              {item.location && (
                                <p className="font-barlow-condensed mt-2 flex items-center gap-1 text-sm opacity-70">
                                  <HugeiconsIcon
                                    icon={Location01Icon}
                                    className="text-w-green-dark size-4 shrink-0"
                                  />
                                  {item.location}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
