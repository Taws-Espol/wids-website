import type { TextFieldValidation } from "payload";

const NUM_PROV_ECUADOR = 24;

export const validateValidNationalId: TextFieldValidation = (value) => {
  if (!value) return true;

  // Must be exactly 10 digits
  if (value.length !== 10) {
    return "National ID must be exactly 10 digits";
  }

  // Convert string to array of digits
  const digitos: number[] = [];
  for (const char of value) {
    const digito = parseInt(char, 10);
    if (isNaN(digito)) {
      return "National ID must contain only digits";
    }
    digitos.push(digito);
  }

  // First two digits represent the province code: [AB] = 10*A + B
  const provincia = 10 * digitos[0] + digitos[1];

  // Validate province code: 1-24 for Ecuador, 30 for foreigners, not 0
  if ((provincia !== 30 && provincia > NUM_PROV_ECUADOR) || provincia === 0) {
    return "Invalid province code";
  }

  // Luhn algorithm with coefficients
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2, 1];
  let suma = 0;

  for (let i = 0; i < digitos.length; i++) {
    suma += ((digitos[i] * coeficientes[i] - 1) % 9) + 1;
  }

  if (suma % 10 !== 0) return "Invalid national ID";

  return true;
};
