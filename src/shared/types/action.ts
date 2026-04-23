export type ActionResponse<T> = {
  data?: T;
  error?: {
    errorKeys?: string[]; // keys del diccionario de lenguajes (en el caso de que se necesite traduccion)
    fields?: string[]; // campos que hayan tenido errores (en el caso que se necesite)
    message: string; // este mensaje es interno y no necesita i18n, generalmente no se muestra al usuario
  };
};
