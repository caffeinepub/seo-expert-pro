import { j as jsxRuntimeExports, r as reactExports } from "./index-BCNwlkVQ.js";
import { C as Canvas, a as useFrame } from "./react-three-fiber.esm-uZEeE8Xe.js";
import "./three.module-DUeOZydE.js";
function Dodecahedron() {
  const solidRef = reactExports.useRef(null);
  const wireRef = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (solidRef.current) {
      solidRef.current.rotation.x = t * 0.25;
      solidRef.current.rotation.y = t * 0.35;
      solidRef.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.25;
      wireRef.current.rotation.y = t * 0.35;
      wireRef.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: solidRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dodecahedronGeometry", { args: [1, 0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshPhongMaterial",
        {
          color: "#0d3a5c",
          emissive: "#0a2d4a",
          specular: "#38C98A",
          shininess: 40,
          transparent: true,
          opacity: 0.6
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: wireRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dodecahedronGeometry", { args: [1.02, 0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#38C98A",
          wireframe: true,
          transparent: true,
          opacity: 0.35
        }
      )
    ] })
  ] });
}
function FAQAccent3D() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-40 h-40 hidden lg:block",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Canvas,
        {
          camera: { position: [0, 0, 3.5], fov: 50 },
          dpr: [1, 1.5],
          gl: { antialias: true, alpha: true },
          style: { background: "transparent" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "directionalLight",
              {
                position: [3, 4, 3],
                intensity: 0.9,
                color: "#38C98A"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Dodecahedron, {})
          ]
        }
      )
    }
  );
}
export {
  FAQAccent3D as default
};
