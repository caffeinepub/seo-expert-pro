import { b as createActorWithConfig } from "./index-DSwezMv8.js";
import { c as createActor } from "./backend-VxQ_4oH3.js";
function useBackend() {
  return new Proxy({}, {
    get: (_target, prop) => {
      return (...args) => createActorWithConfig(createActor).then(
        (actor) => {
          var _a;
          return (_a = actor[String(prop)]) == null ? void 0 : _a.call(actor, ...args);
        }
      ).catch(() => void 0);
    }
  });
}
export {
  useBackend as u
};
