import { createActorWithConfig } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";

type AnyBackend = Record<string, (...args: unknown[]) => Promise<unknown>>;

// A lightweight wrapper that returns a backend-ready object.
// Falls back to a no-op proxy while the actor is loading.
export function useBackend(): AnyBackend {
  // Since the backend interface is currently empty, return a proxy that
  // silently rejects all calls. Pages wrap all calls in try/catch anyway.
  return new Proxy({} as AnyBackend, {
    get: (_target, prop) => {
      return (...args: unknown[]) =>
        createActorWithConfig(createActor)
          .then((actor) =>
            (actor as unknown as AnyBackend)[String(prop)]?.(...args),
          )
          .catch(() => undefined);
    },
  });
}
