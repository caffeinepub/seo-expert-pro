import { j as jsxRuntimeExports, r as reactExports } from "./index-3hJhzIkM.js";
import { C as Canvas, a as useFrame } from "./react-three-fiber.esm-DFEZ5E13.js";
import "./three.module-DUeOZydE.js";
function BarChart() {
  const groupRef = reactExports.useRef(null);
  const heights = reactExports.useMemo(
    () => [0.4, 0.7, 0.5, 1, 0.8, 1.3, 1.1, 1.5, 1.2, 1.6],
    []
  );
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: groupRef, position: [0, -0.5, 0], children: heights.map((h, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static geometry array
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [(i - 4.5) * 0.35, h / 2, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [0.22, h, 0.22] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshPhongMaterial",
        {
          color: "#38C98A",
          emissive: "#1a6644",
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: 0.85
        }
      )
    ] }, i)
  )) });
}
function FloatingIcos() {
  const shapes = reactExports.useMemo(
    () => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      pos: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        -1 - Math.random() * 3
      ],
      scale: 0.08 + Math.random() * 0.15,
      spd: 3e-3 + Math.random() * 7e-3
    })),
    []
  );
  const refs = reactExports.useRef([]);
  useFrame(() => {
    for (const m of refs.current) {
      if (!m) continue;
      m.rotation.x += 6e-3;
      m.rotation.y += 9e-3;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: shapes.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "mesh",
    {
      ref: (el) => {
        refs.current[i] = el;
      },
      position: s.pos,
      scale: s.scale,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [1, 0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshBasicMaterial",
          {
            color: "#38C98A",
            wireframe: true,
            transparent: true,
            opacity: 0.2
          }
        )
      ]
    },
    i
  )) });
}
function Particles() {
  const ref = reactExports.useRef(null);
  const positions = reactExports.useMemo(() => {
    const pos = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("bufferGeometry", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointsMaterial",
      {
        color: "#38C98A",
        size: 0.05,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true
      }
    )
  ] });
}
function CaseStudiesHero3D() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      camera: { position: [0, 0, 7], fov: 60 },
      dpr: [1, 1.5],
      gl: { antialias: true, alpha: true },
      style: { background: "transparent" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [5, 5, 5], intensity: 1, color: "#38C98A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "directionalLight",
          {
            position: [-3, -2, 2],
            intensity: 0.4,
            color: "#4fa8d8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Particles, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingIcos, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart, {})
      ]
    }
  ) });
}
export {
  CaseStudiesHero3D as default
};
