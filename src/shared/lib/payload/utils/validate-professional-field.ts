import type {
  TextField,
  TextFieldSingleValidation,
  ValidateOptions,
} from "payload";

export const validateProfessionalField: TextFieldSingleValidation = (
  value,
  {
    siblingData,
  }: ValidateOptions<unknown, { participantType: string }, TextField, string>,
) => {
  if (siblingData?.participantType !== "professional") return true;

  if (typeof value === "string" && value.trim().length > 0) return true;

  return "This field is required for professionals.";
};
