import { b as useActor } from "./index-E0l8bml0.js";
function useBackend() {
  const { actor } = useActor();
  if (actor) return actor;
  return new Proxy({}, {
    get: (_target, prop) => {
      return () => Promise.reject(new Error(`Actor not ready: ${String(prop)}`));
    }
  });
}
export {
  useBackend as u
};
