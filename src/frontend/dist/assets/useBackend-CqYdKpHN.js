import { b as useActor } from "./index-h-JWjTnO.js";
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
