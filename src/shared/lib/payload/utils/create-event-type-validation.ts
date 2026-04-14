import type { CollectionBeforeValidateHook } from "payload";

import type { Event } from "../types/event.ts";

const extractEventId = (value: unknown): number | null => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsedValue = Number(value);

    return Number.isNaN(parsedValue) ? null : parsedValue;
  }

  if (value && typeof value === "object" && "id" in value) {
    return extractEventId((value as { id: unknown }).id);
  }

  return null;
};

export const createEventTypeValidationHook = (
  event: Event,
): CollectionBeforeValidateHook => {
  return async ({ data, originalDoc, req }) => {
    const mergedData = {
      ...originalDoc,
      ...data,
    };

    const eventId = extractEventId(mergedData.event);

    if (!eventId) {
      return data;
    }

    const eventData = await req.payload.findByID({
      collection: "events",
      id: eventId,
      depth: 0,
    });

    if (eventData?.type !== event) {
      throw new Error(
        `The selected event must be a "${event}" event for this collection.`,
      );
    }

    return data;
  };
};
