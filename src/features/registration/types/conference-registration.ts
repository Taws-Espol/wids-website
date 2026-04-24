import { z } from "zod";

import { conferenceRegistrationSchema } from "@/features/registration/schemas/conference-registration";

export type ConferenceRegistrationValues = z.infer<
  typeof conferenceRegistrationSchema
>;
