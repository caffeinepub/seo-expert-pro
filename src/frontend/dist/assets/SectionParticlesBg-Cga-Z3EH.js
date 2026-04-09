import { j as jsxRuntimeExports, r as reactExports } from "./index-DSwezMv8.js";
import { C as Canvas, a as useFrame } from "./react-three-fiber.esm-C5jeBHDt.js";
import "./three.module-CDwbhIs2.js";
function Particles({ color, count, opacity }) {
  const meshRef = reactExports.useRef(null);
  const positions = reactExports.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count]);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.position.y = Math.sin(t * 0.1) * 0.3;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref: meshRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("bufferGeometry", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointsMaterial",
      {
        color,
        size: 0.06,
        transparent: true,
        opacity,
        sizeAttenuation: true
      }
    )
  ] });
}
function SectionParticlesBg({
  color = "#38C98A",
  count = 80,
  opacity = 0.3
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 8], fov: 60 },
      dpr: [1, 1.5],
      gl: { antialias: false, alpha: true },
      style: { background: "transparent" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Particles, { color, count, opacity })
    }
  ) });
}
export {
  SectionParticlesBg as default
};
