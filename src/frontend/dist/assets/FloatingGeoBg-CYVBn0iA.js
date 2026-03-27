import { r as reactExports, j as jsxRuntimeExports } from "./index-3hJhzIkM.js";
import { C as Canvas, a as useFrame } from "./react-three-fiber.esm-DFEZ5E13.js";
import "./three.module-DUeOZydE.js";
function GeoShape({ position, scale, rotSpeed, type, color }) {
  const meshRef = reactExports.useRef(null);
  const baseY = position[1];
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += rotSpeed[0];
    meshRef.current.rotation.y += rotSpeed[1];
    meshRef.current.rotation.z += rotSpeed[2];
    meshRef.current.position.y = baseY + Math.sin(t * 0.4 + position[0]) * 0.2;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, position, scale, children: [
    type === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [1, 0] }),
    type === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [1, 0] }),
    type === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("tetrahedronGeometry", { args: [1, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color, wireframe: true, transparent: true, opacity: 0.25 })
  ] });
}
function FloatingGeoBg({
  color = "#38C98A",
  count = 12
}) {
  const shapes = reactExports.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ],
      scale: 0.1 + Math.random() * 0.2,
      rotSpeed: [
        (Math.random() - 0.5) * 8e-3,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 6e-3
      ],
      type: Math.floor(Math.random() * 3)
    }));
  }, [count]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 8], fov: 70 },
      dpr: [1, 1.5],
      gl: { antialias: false, alpha: true },
      style: { background: "transparent" },
      children: shapes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        GeoShape,
        {
          position: s.position,
          scale: s.scale,
          rotSpeed: s.rotSpeed,
          type: s.type,
          color
        },
        s.id
      ))
    }
  ) });
}
export {
  FloatingGeoBg as default
};
