import type { EVENT_TYPES } from "@/shared/lib/payload/constants/event-types";

export type Event = (typeof EVENT_TYPES)[number];
