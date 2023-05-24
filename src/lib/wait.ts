/**
 * Pauses the execution of the current async function for the specified amount of time.
 */
export default function wait(seconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
}
