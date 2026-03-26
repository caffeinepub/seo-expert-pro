import { j as jsxRuntimeExports, r as reactExports } from "./index-Bju-sJbZ.js";
import { C as Canvas, a as useFrame } from "./react-three-fiber.esm-Dgo2wqnm.js";
import "./three.module-DUeOZydE.js";
function FloatingTorus({
  position,
  rotSpeed,
  color
}) {
  const ref = reactExports.useRef(null);
  const baseY = position[1];
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += rotSpeed[0];
    ref.current.rotation.y += rotSpeed[1];
    ref.current.rotation.z += rotSpeed[2];
    ref.current.position.y = baseY + Math.sin(t * 0.5 + position[0]) * 0.25;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, position, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.5, 0.06, 12, 40] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color, wireframe: true, transparent: true, opacity: 0.35 })
  ] });
}
function FloatingOct({
  position,
  scale,
  color
}) {
  const ref = reactExports.useRef(null);
  const baseY = position[1];
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 7e-3;
    ref.current.rotation.y += 0.011;
    ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.4 + position[2]) * 0.18;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, position, scale, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [1, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhongMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.5
      }
    )
  ] });
}
function FloatingSphere({
  position,
  color
}) {
  const ref = reactExports.useRef(null);
  const baseY = position[1];
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.2;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref, position, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.2, 16, 16] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhongMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.6
      }
    )
  ] });
}
function Particles() {
  const ref = reactExports.useRef(null);
  const positions = reactExports.useMemo(() => {
    const pos = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.025;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("bufferGeometry", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointsMaterial",
      {
        color: "#38C98A",
        size: 0.05,
        transparent: true,
        opacity: 0.3,
        sizeAttenuation: true
      }
    )
  ] });
}
function Contact3DScene() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      camera: { position: [0, 0, 7], fov: 60 },
      dpr: [1, 1.5],
      gl: { antialias: true, alpha: true },
      style: { background: "transparent" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [3, 3, 3], intensity: 1.2, color: "#38C98A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-3, -2, 2], intensity: 0.6, color: "#4fa8d8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Particles, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingTorus,
          {
            position: [-3, 1, 0],
            rotSpeed: [8e-3, 5e-3, 3e-3],
            color: "#38C98A"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingTorus,
          {
            position: [3, -1, -1],
            rotSpeed: [5e-3, 9e-3, 7e-3],
            color: "#5be0a8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FloatingTorus,
          {
            position: [0, 2, -2],
            rotSpeed: [4e-3, 6e-3, 0.01],
            color: "#2db87a"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingOct, { position: [-2, -1.5, 0], scale: 0.3, color: "#38C98A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingOct, { position: [2.5, 1, -1], scale: 0.2, color: "#4fa8d8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingSphere, { position: [1.5, -2, 0], color: "#38C98A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingSphere, { position: [-2.5, 0.5, 0], color: "#5be0a8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingSphere, { position: [0.5, 2, -1], color: "#2db87a" })
      ]
    }
  ) });
}
export {
  Contact3DScene as default
};
