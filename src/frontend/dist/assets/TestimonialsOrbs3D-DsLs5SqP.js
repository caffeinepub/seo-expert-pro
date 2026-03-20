import { j as jsxRuntimeExports, C as Canvas, r as reactExports, u as useFrame } from "./index-Dg75evqh.js";
function Orb({
  orbitRadius,
  speed,
  phase,
  color
}) {
  const meshRef = reactExports.useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    meshRef.current.position.x = Math.cos(t) * orbitRadius;
    meshRef.current.position.y = Math.sin(t) * orbitRadius * 0.6;
    meshRef.current.position.z = Math.sin(t * 0.5) * 0.5;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.18, 16, 16] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhongMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.8
      }
    )
  ] });
}
function TestimonialsOrbs3D() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pointer-events-none absolute left-0 top-0 h-full w-32 hidden lg:block",
      style: { zIndex: 1 },
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Canvas,
        {
          camera: { position: [0, 0, 4], fov: 50 },
          dpr: [1, 1.5],
          gl: { antialias: true, alpha: true },
          style: { background: "transparent" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [2, 2, 2], intensity: 1, color: "#38C98A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Orb, { orbitRadius: 0.9, speed: 0.5, phase: 0, color: "#38C98A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Orb, { orbitRadius: 0.9, speed: 0.5, phase: 2.094, color: "#5be0a8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Orb, { orbitRadius: 0.9, speed: 0.5, phase: 4.188, color: "#2db87a" })
          ]
        }
      )
    }
  );
}
export {
  TestimonialsOrbs3D as default
};
