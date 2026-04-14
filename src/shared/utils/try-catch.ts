type TryCatchInput<T> = Promise<T> | (() => Promise<T>);

export const tryCatch = async <T>(
  input: TryCatchInput<T>,
): Promise<{ data: T | null; error: Error | null }> => {
  let data: T | null = null;
  let error: Error | null = null;

  try {
    data = await (typeof input === "function" ? input() : input);
  } catch (_error) {
    error = _error instanceof Error ? _error : new Error(String(_error));
  }

  return {
    data,
    error,
  };
};
