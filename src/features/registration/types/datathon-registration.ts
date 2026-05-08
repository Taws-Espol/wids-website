import { z } from "zod";

import { datathonRegistrationSchema } from "@/features/registration/schemas/datathon-registration";

export type DatathonRegistrationValues = z.infer<
  typeof datathonRegistrationSchema
>;
