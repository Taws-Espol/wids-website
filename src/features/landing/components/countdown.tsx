"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/shared/utils/cn";

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

interface CountdownProps {
  targetDate: Date | string;
  className?: string;
  labels?: Partial<CountdownLabels>;
}

const DEFAULT_LABELS: CountdownLabels = {
  days: "d",
  hours: "h",
  minutes: "m",
  seconds: "s",
};

const ZERO_VALUES: CountdownValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeRemaining(
  targetDate: Date,
  currentTime = Date.now(),
): CountdownValues {
  const diff = Math.max(targetDate.getTime() - currentTime, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  return { days, hours, minutes, seconds };
}

function formatUnit(value: number) {
  return value.toString().padStart(2, "0");
}

interface CountdownUnitProps {
  label: string;
  value: number;
}

function CountdownUnit({ label, value }: CountdownUnitProps) {
  const formattedValue = formatUnit(value);
  const valueRef = useRef<HTMLSpanElement>(null);
  const currentValueRef = useRef(formattedValue);
  const [displayValue, setDisplayValue] = useState(formattedValue);

  useEffect(() => {
    if (formattedValue === currentValueRef.current) {
      return;
    }

    let cancelled = false;
    const element = valueRef.current;

    const runAnimation = async () => {
      if (!element) {
        currentValueRef.current = formattedValue;
        setDisplayValue(formattedValue);
        return;
      }

      try {
        const exitAnimation = element.animate(
          [
            { transform: "translateY(0%)", opacity: 1 },
            { transform: "translateY(-50%)", opacity: 0 },
          ],
          { duration: 300, easing: "ease-out", fill: "forwards" },
        );

        await exitAnimation.finished;
        exitAnimation.cancel();
      } catch {
        return;
      }

      if (cancelled) {
        return;
      }

      currentValueRef.current = formattedValue;
      setDisplayValue(formattedValue);

      requestAnimationFrame(() => {
        if (cancelled || !element) {
          return;
        }

        const enterAnimation = element.animate(
          [
            { transform: "translateY(50%)", opacity: 0 },
            { transform: "translateY(0%)", opacity: 1 },
          ],
          { duration: 300, easing: "ease-out", fill: "both" },
        );

        enterAnimation.finished
          .then(() => enterAnimation.cancel())
          .catch(() => {});
      });
    };

    void runAnimation();

    return () => {
      cancelled = true;
      element?.getAnimations().forEach((animation) => animation.cancel());
    };
  }, [formattedValue]);

  return (
    <span className="font-barlow items-center justify-center leading-none tabular-nums">
      <span
        ref={valueRef}
        aria-label={`${displayValue} ${label}`}
        className="flex items-baseline"
      >
        {displayValue}
        <span className="font-barlow-condensed text-sm">{label}</span>
      </span>
    </span>
  );
}

export function Countdown({ targetDate, className, labels }: CountdownProps) {
  const parsedTargetDate = useMemo(
    () =>
      targetDate instanceof Date
        ? new Date(targetDate.getTime())
        : new Date(targetDate),
    [targetDate],
  );
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [now, setNow] = useState<number | null>(null);

  const timeRemaining = useMemo(
    () =>
      now === null || Number.isNaN(parsedTargetDate.getTime())
        ? ZERO_VALUES
        : getTimeRemaining(parsedTargetDate, now),
    [now, parsedTargetDate],
  );

  useEffect(() => {
    if (Number.isNaN(parsedTargetDate.getTime())) {
      return;
    }

    let interval: number | undefined;

    const tick = () => {
      const nextNow = Date.now();
      setNow(nextNow);

      if (parsedTargetDate.getTime() - nextNow <= 0 && interval !== undefined) {
        window.clearInterval(interval);
      }
    };

    const timeout = window.setTimeout(() => {
      tick();

      if (parsedTargetDate.getTime() - Date.now() <= 0) {
        return;
      }

      interval = window.setInterval(tick, 1000);
    }, 0);

    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) {
        window.clearInterval(interval);
      }
    };
  }, [parsedTargetDate]);

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-center gap-1 text-xs md:gap-2 md:text-sm",
        className,
      )}
    >
      <CountdownUnit label={mergedLabels.days} value={timeRemaining.days} />
      <CountdownUnit label={mergedLabels.hours} value={timeRemaining.hours} />
      <CountdownUnit
        label={mergedLabels.minutes}
        value={timeRemaining.minutes}
      />
      <CountdownUnit
        label={mergedLabels.seconds}
        value={timeRemaining.seconds}
      />
    </div>
  );
}
