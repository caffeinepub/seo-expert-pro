import { j as jsxRuntimeExports, r as reactExports } from "./index-D0kYHSzF.js";
import { C as Canvas, a as useFrame } from "./react-three-fiber.esm-wCcyITY6.js";
import { c as BufferGeometry, d as BufferAttribute } from "./three.module-DUeOZydE.js";
const PARTICLE_COUNT = 140;
function ParticleField() {
  const pointsRef = reactExports.useRef(null);
  const geometry = reactExports.useMemo(() => {
    const geo = new BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, []);
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
    pointsRef.current.rotation.z = state.clock.elapsedTime * 8e-3;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("points", { ref: pointsRef, geometry, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "pointsMaterial",
    {
      size: 0.07,
      color: "#38C98A",
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true
    }
  ) });
}
function StatsParticles() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      camera: { position: [0, 0, 8], fov: 60 },
      gl: { alpha: true, antialias: true },
      dpr: [1, 1.5],
      style: { background: "transparent", width: "100%", height: "100%" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleField, {})
      ]
    }
  );
}
export {
  StatsParticles as default
};
