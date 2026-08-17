import { loadScripts } from "./scripts.ts";

main();

function main(): void {
  Promise.resolve()
    .then(() => pause(5000))
    .then(() => loadScripts())
    .catch((err) => {
      console.error(err);
    });
}

function pause(delay: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
