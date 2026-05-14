import { z } from "zod";

import { datathonRegistrationIndividualSchema } from "@/features/registration/schemas/datathon-registration-individuals";

export type DatathonRegistrationIndividualValues = z.infer<
  typeof datathonRegistrationIndividualSchema
>;
