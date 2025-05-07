export function sleep(timeout = 1000) {
  return new Promise<void>(resolve => setTimeout(resolve, timeout));
}
