// Browsers store setTimeout delays as a 32-bit signed integer, so any delay
// above 2^31 - 1 ms (~24.8 days) overflows and fires immediately.
const MAX_TIMEOUT_MS = 2_147_483_647;

/**
 * Drop-in replacement for setTimeout that clamps delays larger than the
 * maximum 32-bit signed integer (2,147,483,647 ms / ~24.8 days) instead of
 * letting them overflow and fire immediately.
 */
export function safeTimeout<TArgs extends unknown[]>(
  callback: (...callbackArgs: TArgs) => void,
  delay: number,
  ...args: TArgs
): ReturnType<typeof globalThis.setTimeout> {
  if (delay > MAX_TIMEOUT_MS) {
    console.error(
      `safeTimeout: delay ${delay} exceeds the maximum of ${MAX_TIMEOUT_MS} ms (~24.8 days). Using the maximum value.`,
    );
    delay = MAX_TIMEOUT_MS;
  }
  return globalThis.setTimeout(callback, delay, ...args);
}
