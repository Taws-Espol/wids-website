import type { EVENT_TYPES } from "../constants/event-types.ts";

export type Event = (typeof EVENT_TYPES)[number];
