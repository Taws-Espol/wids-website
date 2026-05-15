const NUM_PROV_ECUADOR = 24;
const COEFICIENTES = [2, 1, 2, 1, 2, 1, 2, 1, 2];

export const validateNationalId = (value: string) => {
  if (!value) return true;

  if (value.length !== 10) return false;

  const digitos: number[] = [];
  for (const char of value) {
    const digito = parseInt(char, 10);
    if (isNaN(digito)) return false;
    digitos.push(digito);
  }

  const provincia = 10 * digitos[0] + digitos[1];
  if ((provincia !== 30 && provincia > NUM_PROV_ECUADOR) || provincia === 0) {
    return false;
  }

  let suma = 0;
  for (let i = 0; i < COEFICIENTES.length; i++) {
    let resultado = digitos[i] * COEFICIENTES[i];
    if (resultado >= 10) resultado -= 9;
    suma += resultado;
  }

  const digitoVerificador = (10 - (suma % 10)) % 10;
  return digitoVerificador === digitos[9];
};
