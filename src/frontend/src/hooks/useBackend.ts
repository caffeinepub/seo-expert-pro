import type { backendInterface } from "../backend";
import { useActor } from "./useActor";

// A lightweight wrapper that returns a backend-ready object.
// Falls back to a no-op proxy while the actor is loading.
export function useBackend(): backendInterface {
  const { actor } = useActor();
  if (actor) return actor;
  // Return a proxy that throws on every call (actor not yet ready)
  return new Proxy({} as backendInterface, {
    get: (_target, prop) => {
      return () =>
        Promise.reject(new Error(`Actor not ready: ${String(prop)}`));
    },
  });
}
