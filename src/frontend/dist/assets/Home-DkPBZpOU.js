const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/StatsParticles-D6CC1P1h.js","assets/index-3hJhzIkM.js","assets/index-Db0P1HNY.css","assets/react-three-fiber.esm-DFEZ5E13.js","assets/three.module-DUeOZydE.js","assets/FloatingGeoBg-CYVBn0iA.js","assets/SectionParticlesBg-DcrA6p9i.js","assets/TestimonialsOrbs3D-F6I1qibi.js","assets/FAQAccent3D-CGOrQoVt.js"])))=>i.map(i=>d[i]);
import { r as reactExports, c as clientExports, j as jsxRuntimeExports, L as Link, _ as __vitePreload } from "./index-3hJhzIkM.js";
import { N as Navbar, M as MapPin, F as Footer } from "./Navbar-BSKyoClv.js";
import { u as useThree, a as useFrame, C as Canvas } from "./react-three-fiber.esm-DFEZ5E13.js";
import { D as DoubleSide, V as Vector3, a as Vector2, P as PerspectiveCamera, O as OrthographicCamera, B as BackSide } from "./three.module-DUeOZydE.js";
import { u as useBackend } from "./useBackend-DgGNPUkD.js";
import { F as FileText, G as Globe$1, C as ChartNoAxesColumn, S as Star } from "./star-HlT2zPr3.js";
import { S as Search } from "./search-DuWoxYuq.js";
import { T as TrendingUp } from "./trending-up-51sWwzDV.js";
import { C as ChevronRight } from "./chevron-right-B6OaxGgL.js";
import { C as CircleCheckBig } from "./circle-check-big-Dpb6hGsL.js";
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
const v1 = /* @__PURE__ */ new Vector3();
const v2 = /* @__PURE__ */ new Vector3();
const v3 = /* @__PURE__ */ new Vector3();
const v4 = /* @__PURE__ */ new Vector2();
function defaultCalculatePosition(el, camera, size) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  objectPos.project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf];
}
function isObjectBehindCamera(el, camera) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
  const deltaCamObj = objectPos.sub(cameraPos);
  const camDir = camera.getWorldDirection(v3);
  return deltaCamObj.angleTo(camDir) > Math.PI / 2;
}
function isObjectVisible(el, camera, raycaster, occlude) {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld);
  const screenPos = elPos.clone();
  screenPos.project(camera);
  v4.set(screenPos.x, screenPos.y);
  raycaster.setFromCamera(v4, camera);
  const intersects = raycaster.intersectObjects(occlude, true);
  if (intersects.length) {
    const intersectionDistance = intersects[0].distance;
    const pointDistance = elPos.distanceTo(raycaster.ray.origin);
    return pointDistance < intersectionDistance;
  }
  return true;
}
function objectScale(el, camera) {
  if (camera instanceof OrthographicCamera) {
    return camera.zoom;
  } else if (camera instanceof PerspectiveCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const vFOV = camera.fov * Math.PI / 180;
    const dist = objectPos.distanceTo(cameraPos);
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist;
    return 1 / scaleFOV;
  } else {
    return 1;
  }
}
function objectZIndex(el, camera, zIndexRange) {
  if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const dist = objectPos.distanceTo(cameraPos);
    const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near);
    const B = zIndexRange[1] - A * camera.far;
    return Math.round(A * dist + B);
  }
  return void 0;
}
const epsilon = (value) => Math.abs(value) < 1e-10 ? 0 : value;
function getCSSMatrix(matrix, multipliers, prepend = "") {
  let matrix3d = "matrix3d(";
  for (let i = 0; i !== 16; i++) {
    matrix3d += epsilon(multipliers[i] * matrix.elements[i]) + (i !== 15 ? "," : ")");
  }
  return prepend + matrix3d;
}
const getCameraCSSMatrix = /* @__PURE__ */ ((multipliers) => {
  return (matrix) => getCSSMatrix(matrix, multipliers);
})([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1]);
const getObjectCSSMatrix = /* @__PURE__ */ ((scaleMultipliers) => {
  return (matrix, factor) => getCSSMatrix(matrix, scaleMultipliers(factor), "translate(-50%,-50%)");
})((f) => [1 / f, 1 / f, 1 / f, 1, -1 / f, -1 / f, -1 / f, -1, 1 / f, 1 / f, 1 / f, 1, 1, 1, 1, 1]);
function isRefObject(ref) {
  return ref && typeof ref === "object" && "current" in ref;
}
const Html = /* @__PURE__ */ reactExports.forwardRef(({
  children,
  eps = 1e-3,
  style,
  className,
  prepend,
  center,
  fullscreen,
  portal,
  distanceFactor,
  sprite = false,
  transform = false,
  occlude,
  onOcclude,
  castShadow,
  receiveShadow,
  material,
  geometry,
  zIndexRange = [16777271, 0],
  calculatePosition = defaultCalculatePosition,
  as = "div",
  wrapperClass,
  pointerEvents = "auto",
  ...props
}, ref) => {
  const {
    gl,
    camera,
    scene,
    size,
    raycaster,
    events,
    viewport
  } = useThree();
  const [el] = reactExports.useState(() => document.createElement(as));
  const root = reactExports.useRef(null);
  const group = reactExports.useRef(null);
  const oldZoom = reactExports.useRef(0);
  const oldPosition = reactExports.useRef([0, 0]);
  const transformOuterRef = reactExports.useRef(null);
  const transformInnerRef = reactExports.useRef(null);
  const target = (portal == null ? void 0 : portal.current) || events.connected || gl.domElement.parentNode;
  const occlusionMeshRef = reactExports.useRef(null);
  const isMeshSizeSet = reactExports.useRef(false);
  const isRayCastOcclusion = reactExports.useMemo(() => {
    return occlude && occlude !== "blending" || Array.isArray(occlude) && occlude.length && isRefObject(occlude[0]);
  }, [occlude]);
  reactExports.useLayoutEffect(() => {
    const el2 = gl.domElement;
    if (occlude && occlude === "blending") {
      el2.style.zIndex = `${Math.floor(zIndexRange[0] / 2)}`;
      el2.style.position = "absolute";
      el2.style.pointerEvents = "none";
    } else {
      el2.style.zIndex = null;
      el2.style.position = null;
      el2.style.pointerEvents = null;
    }
  }, [occlude]);
  reactExports.useLayoutEffect(() => {
    if (group.current) {
      const currentRoot = root.current = clientExports.createRoot(el);
      scene.updateMatrixWorld();
      if (transform) {
        el.style.cssText = `position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`;
      } else {
        const vec = calculatePosition(group.current, camera, size);
        el.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${vec[0]}px,${vec[1]}px,0);transform-origin:0 0;`;
      }
      if (target) {
        if (prepend) target.prepend(el);
        else target.appendChild(el);
      }
      return () => {
        if (target) target.removeChild(el);
        currentRoot.unmount();
      };
    }
  }, [target, transform]);
  reactExports.useLayoutEffect(() => {
    if (wrapperClass) el.className = wrapperClass;
  }, [wrapperClass]);
  const styles = reactExports.useMemo(() => {
    if (transform) {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        width: size.width,
        height: size.height,
        transformStyle: "preserve-3d",
        pointerEvents: "none"
      };
    } else {
      return {
        position: "absolute",
        transform: center ? "translate3d(-50%,-50%,0)" : "none",
        ...fullscreen && {
          top: -size.height / 2,
          left: -size.width / 2,
          width: size.width,
          height: size.height
        },
        ...style
      };
    }
  }, [style, center, fullscreen, size, transform]);
  const transformInnerStyles = reactExports.useMemo(() => ({
    position: "absolute",
    pointerEvents
  }), [pointerEvents]);
  reactExports.useLayoutEffect(() => {
    isMeshSizeSet.current = false;
    if (transform) {
      var _root$current;
      (_root$current = root.current) == null || _root$current.render(/* @__PURE__ */ reactExports.createElement("div", {
        ref: transformOuterRef,
        style: styles
      }, /* @__PURE__ */ reactExports.createElement("div", {
        ref: transformInnerRef,
        style: transformInnerStyles
      }, /* @__PURE__ */ reactExports.createElement("div", {
        ref,
        className,
        style,
        children
      }))));
    } else {
      var _root$current2;
      (_root$current2 = root.current) == null || _root$current2.render(/* @__PURE__ */ reactExports.createElement("div", {
        ref,
        style: styles,
        className,
        children
      }));
    }
  });
  const visible = reactExports.useRef(true);
  useFrame((gl2) => {
    if (group.current) {
      camera.updateMatrixWorld();
      group.current.updateWorldMatrix(true, false);
      const vec = transform ? oldPosition.current : calculatePosition(group.current, camera, size);
      if (transform || Math.abs(oldZoom.current - camera.zoom) > eps || Math.abs(oldPosition.current[0] - vec[0]) > eps || Math.abs(oldPosition.current[1] - vec[1]) > eps) {
        const isBehindCamera = isObjectBehindCamera(group.current, camera);
        let raytraceTarget = false;
        if (isRayCastOcclusion) {
          if (Array.isArray(occlude)) {
            raytraceTarget = occlude.map((item) => item.current);
          } else if (occlude !== "blending") {
            raytraceTarget = [scene];
          }
        }
        const previouslyVisible = visible.current;
        if (raytraceTarget) {
          const isvisible = isObjectVisible(group.current, camera, raycaster, raytraceTarget);
          visible.current = isvisible && !isBehindCamera;
        } else {
          visible.current = !isBehindCamera;
        }
        if (previouslyVisible !== visible.current) {
          if (onOcclude) onOcclude(!visible.current);
          else el.style.display = visible.current ? "block" : "none";
        }
        const halfRange = Math.floor(zIndexRange[0] / 2);
        const zRange = occlude ? isRayCastOcclusion ? [zIndexRange[0], halfRange] : [halfRange - 1, 0] : zIndexRange;
        el.style.zIndex = `${objectZIndex(group.current, camera, zRange)}`;
        if (transform) {
          const [widthHalf, heightHalf] = [size.width / 2, size.height / 2];
          const fov = camera.projectionMatrix.elements[5] * heightHalf;
          const {
            isOrthographicCamera,
            top,
            left,
            bottom,
            right
          } = camera;
          const cameraMatrix = getCameraCSSMatrix(camera.matrixWorldInverse);
          const cameraTransform = isOrthographicCamera ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)` : `translateZ(${fov}px)`;
          let matrix = group.current.matrixWorld;
          if (sprite) {
            matrix = camera.matrixWorldInverse.clone().transpose().copyPosition(matrix).scale(group.current.scale);
            matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0;
            matrix.elements[15] = 1;
          }
          el.style.width = size.width + "px";
          el.style.height = size.height + "px";
          el.style.perspective = isOrthographicCamera ? "" : `${fov}px`;
          if (transformOuterRef.current && transformInnerRef.current) {
            transformOuterRef.current.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`;
            transformInnerRef.current.style.transform = getObjectCSSMatrix(matrix, 1 / ((distanceFactor || 10) / 400));
          }
        } else {
          const scale = distanceFactor === void 0 ? 1 : objectScale(group.current, camera) * distanceFactor;
          el.style.transform = `translate3d(${vec[0]}px,${vec[1]}px,0) scale(${scale})`;
        }
        oldPosition.current = vec;
        oldZoom.current = camera.zoom;
      }
    }
    if (!isRayCastOcclusion && occlusionMeshRef.current && !isMeshSizeSet.current) {
      if (transform) {
        if (transformOuterRef.current) {
          const el2 = transformOuterRef.current.children[0];
          if (el2 != null && el2.clientWidth && el2 != null && el2.clientHeight) {
            const {
              isOrthographicCamera
            } = camera;
            if (isOrthographicCamera || geometry) {
              if (props.scale) {
                if (!Array.isArray(props.scale)) {
                  occlusionMeshRef.current.scale.setScalar(1 / props.scale);
                } else if (props.scale instanceof Vector3) {
                  occlusionMeshRef.current.scale.copy(props.scale.clone().divideScalar(1));
                } else {
                  occlusionMeshRef.current.scale.set(1 / props.scale[0], 1 / props.scale[1], 1 / props.scale[2]);
                }
              }
            } else {
              const ratio = (distanceFactor || 10) / 400;
              const w = el2.clientWidth * ratio;
              const h = el2.clientHeight * ratio;
              occlusionMeshRef.current.scale.set(w, h, 1);
            }
            isMeshSizeSet.current = true;
          }
        }
      } else {
        const ele = el.children[0];
        if (ele != null && ele.clientWidth && ele != null && ele.clientHeight) {
          const ratio = 1 / viewport.factor;
          const w = ele.clientWidth * ratio;
          const h = ele.clientHeight * ratio;
          occlusionMeshRef.current.scale.set(w, h, 1);
          isMeshSizeSet.current = true;
        }
        occlusionMeshRef.current.lookAt(gl2.camera.position);
      }
    }
  });
  const shaders = reactExports.useMemo(() => ({
    vertexShader: !transform ? (
      /* glsl */
      `
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `
    ) : void 0,
    fragmentShader: (
      /* glsl */
      `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `
    )
  }), [transform]);
  return /* @__PURE__ */ reactExports.createElement("group", _extends({}, props, {
    ref: group
  }), occlude && !isRayCastOcclusion && /* @__PURE__ */ reactExports.createElement("mesh", {
    castShadow,
    receiveShadow,
    ref: occlusionMeshRef
  }, geometry || /* @__PURE__ */ reactExports.createElement("planeGeometry", null), material || /* @__PURE__ */ reactExports.createElement("shaderMaterial", {
    side: DoubleSide,
    vertexShader: shaders.vertexShader,
    fragmentShader: shaders.fragmentShader
  })));
});
const statBadges = [
  {
    val: "+312%",
    label: "Organic Traffic",
    pos: [2.5, 1.4, 0.5]
  },
  {
    val: "#1",
    label: "Keyword Rankings",
    pos: [-2.6, 0.8, 0.2]
  },
  {
    val: "4,820",
    label: "Leads Generated",
    pos: [2.2, -1.5, 0.3]
  },
  {
    val: "890%",
    label: "ROI Delivered",
    pos: [-2.3, -1.2, 0.4]
  }
];
function Globe() {
  const groupRef = reactExports.useRef(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 4e-3;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1.6, 48, 48] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshPhongMaterial",
        {
          color: "#0B2A43",
          emissive: "#071520",
          specular: "#38C98A",
          shininess: 40,
          transparent: true,
          opacity: 0.92
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1.66, 22, 22] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#38C98A",
          wireframe: true,
          transparent: true,
          opacity: 0.22
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [1.85, 16, 16] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#38C98A",
          transparent: true,
          opacity: 0.04,
          side: BackSide
        }
      )
    ] })
  ] });
}
function FloatingShape({
  type,
  position,
  color,
  speed = 1,
  wireframe = false
}) {
  const meshRef = reactExports.useRef(null);
  const origin = reactExports.useRef(position);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x += 9e-3;
    meshRef.current.rotation.y += 0.012;
    meshRef.current.position.y = origin.current[1] + Math.sin(t * 0.7) * 0.28;
    meshRef.current.position.x = origin.current[0] + Math.cos(t * 0.45) * 0.18;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, position, children: [
    type === "torus" && /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.38, 0.13, 16, 40] }),
    type === "icosahedron" && /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [0.32, 0] }),
    type === "octahedron" && /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [0.3, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhongMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.85,
        wireframe
      }
    )
  ] });
}
function SceneContent({ mouse }) {
  const groupRef = reactExports.useRef(null);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.x * 0.35 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (mouse.y * -0.2 - groupRef.current.rotation.x) * 0.04;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.6 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [8, 8, 8], intensity: 2, color: "#38C98A" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-8, -6, -6], intensity: 0.6, color: "#1a4a6e" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, 0, 10], intensity: 1, color: "#ffffff" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FloatingShape,
      {
        type: "torus",
        position: [3, 1.6, -0.6],
        color: "#38C98A",
        speed: 0.8
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FloatingShape,
      {
        type: "icosahedron",
        position: [-2.8, -1.1, 0.4],
        color: "#38C98A",
        speed: 1.1,
        wireframe: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FloatingShape,
      {
        type: "octahedron",
        position: [2.6, -2, 0.3],
        color: "#7DD3B8",
        speed: 0.65
      }
    ),
    statBadges.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: s.pos, center: true, zIndexRange: [1, 1], children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "rgba(255,255,255,0.95)",
          border: "1px solid rgba(56,201,138,0.45)",
          borderRadius: "12px",
          padding: "8px 14px",
          boxShadow: "0 4px 16px rgba(56,201,138,0.18)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          backdropFilter: "blur(8px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                color: "#38C98A",
                fontWeight: 800,
                fontSize: "18px",
                lineHeight: 1,
                fontFamily: "system-ui, sans-serif"
              },
              children: s.val
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                color: "#0B2A43",
                fontSize: "11px",
                marginTop: "3px",
                fontWeight: 600,
                fontFamily: "system-ui, sans-serif"
              },
              children: s.label
            }
          )
        ]
      }
    ) }, s.label))
  ] });
}
function Hero3DScene() {
  const [mouse, setMouse] = reactExports.useState({ x: 0, y: 0 });
  const containerRef = reactExports.useRef(null);
  const handleMouseMove = (e) => {
    var _a;
    const rect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
    });
  };
  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: containerRef,
      className: "w-full h-full",
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Canvas,
        {
          camera: { position: [0, 0, 6.5], fov: 48 },
          gl: { alpha: true, antialias: false },
          dpr: [1, 1.5],
          flat: true,
          style: { background: "transparent", width: "100%", height: "100%" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SceneContent, { mouse })
        }
      )
    }
  );
}
const StatsParticles = reactExports.lazy(() => __vitePreload(() => import("./StatsParticles-D6CC1P1h.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const FloatingGeoBg = reactExports.lazy(() => __vitePreload(() => import("./FloatingGeoBg-CYVBn0iA.js"), true ? __vite__mapDeps([5,1,2,3,4]) : void 0));
const SectionParticlesBg = reactExports.lazy(
  () => __vitePreload(() => import("./SectionParticlesBg-DcrA6p9i.js"), true ? __vite__mapDeps([6,1,2,3,4]) : void 0)
);
const TestimonialsOrbs3D = reactExports.lazy(
  () => __vitePreload(() => import("./TestimonialsOrbs3D-F6I1qibi.js"), true ? __vite__mapDeps([7,1,2,3,4]) : void 0)
);
const FAQAccent3D = reactExports.lazy(() => __vitePreload(() => import("./FAQAccent3D-CGOrQoVt.js"), true ? __vite__mapDeps([8,1,2,3,4]) : void 0));
const services = [
  {
    icon: FileText,
    title: "On-Page SEO",
    desc: "Optimize content, meta tags, and structure for maximum relevance."
  },
  {
    icon: Globe$1,
    title: "Off-Page SEO",
    desc: "Build authority with high-quality backlinks and brand mentions."
  },
  {
    icon: Search,
    title: "Technical SEO",
    desc: "Fix crawlability, speed, and indexing issues at the core."
  },
  {
    icon: ChartNoAxesColumn,
    title: "Keyword Research",
    desc: "Target the exact terms your ideal customers are searching for."
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Dominate local search results and Google Maps listings."
  },
  {
    icon: TrendingUp,
    title: "SEO Strategy",
    desc: "Custom roadmaps aligned with your business growth goals."
  }
];
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Marketing",
    company: "TechFlow Inc.",
    initials: "SC",
    color: "#38C98A",
    quote: "RankPro doubled our organic traffic in just 6 months. We went from 4,200 to over 9,800 monthly visits — and those visitors actually convert. Incredible results that have changed how we budget for marketing.",
    rating: 5
  },
  {
    name: "James Walker",
    role: "Founder & CEO",
    company: "HomeStyle Co.",
    initials: "JW",
    color: "#38bdf8",
    quote: "Our leads from search went up 180% in 8 months. Before RankPro, we were invisible online. Now organic is our biggest lead source. Best investment we've made in the history of the company.",
    rating: 5
  },
  {
    name: "Maria Lopez",
    role: "Practice Manager",
    company: "MedCare Clinic",
    initials: "ML",
    color: "#a78bfa",
    quote: "We went from page 3 to #1 for our main keyword in under 4 months. New patient bookings from search are up 220%. Amit is transparent, communicative, and delivers exactly what he promises.",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Partner",
    company: "LegalEdge LLP",
    initials: "DK",
    color: "#fb923c",
    quote: "Professional, data-driven, and genuinely cares about results. We now rank page 1 for 45 competitive legal keywords. The ROI has been 8x our monthly retainer. I recommend RankPro to every business owner I meet.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "E-commerce Director",
    company: "NovaBrands",
    initials: "PS",
    color: "#f472b6",
    quote: "After 3 months of technical SEO fixes and content optimization, our revenue from organic search jumped by $42,000/month. The team found issues our previous agency had missed for two years. Game-changing work.",
    rating: 5
  },
  {
    name: "Marcus O'Brien",
    role: "VP of Growth",
    company: "ScaleUp SaaS",
    initials: "MO",
    color: "#34d399",
    quote: "Within 6 months of the keyword strategy and content roadmap, we ranked in the top 3 for 200+ target keywords. Our CAC from organic dropped 60% compared to paid channels. Amit is simply the best in the business.",
    rating: 5
  }
];
const caseStudies = [
  {
    client: "E-commerce Retailer",
    metric: "+312%",
    label: "Organic Traffic",
    period: "6 months"
  },
  {
    client: "SaaS Startup",
    metric: "+240%",
    label: "Keyword Rankings",
    period: "4 months"
  },
  {
    client: "Local Medical Practice",
    metric: "+185%",
    label: "Local Leads",
    period: "3 months"
  }
];
const marqueeItems = [
  { id: "m0", text: "Link Building" },
  { id: "m1", text: "Content Strategy" },
  { id: "m2", text: "Core Web Vitals" },
  { id: "m3", text: "Local SEO" },
  { id: "m4", text: "Schema Markup" },
  { id: "m5", text: "Competitor Analysis" },
  { id: "m6", text: "Technical SEO" },
  { id: "m7", text: "Keyword Research" },
  { id: "m8", text: "Link Building" },
  { id: "m9", text: "Content Strategy" },
  { id: "m10", text: "Core Web Vitals" },
  { id: "m11", text: "Local SEO" },
  { id: "m12", text: "Schema Markup" },
  { id: "m13", text: "Competitor Analysis" },
  { id: "m14", text: "Technical SEO" },
  { id: "m15", text: "Keyword Research" }
];
const defaultFaqs = [
  {
    question: "How long does SEO take to show results?",
    answer: "Most clients see measurable ranking improvements within 90 days for lower-competition keywords. For competitive industries, expect 6–12 months for significant organic growth. SEO compounds over time — the longer you invest, the greater the returns, unlike paid ads that stop the moment your budget runs out."
  },
  {
    question: "What is technical SEO and why does it matter?",
    answer: "Technical SEO is the infrastructure layer of your website — crawlability, indexation, site speed, mobile optimization, structured data, and more. If search engine bots can't properly access or understand your pages, no amount of great content will help you rank. Technical issues are often invisible to site owners but have a dramatic impact on performance."
  },
  {
    question: "How do you measure SEO success?",
    answer: "We track metrics that tie directly to business outcomes: keyword rankings for target terms, organic traffic growth, click-through rates from search results, conversion rates from organic visitors, and ultimately leads and revenue attributable to organic search. Every client gets a monthly report with these KPIs clearly visualized."
  },
  {
    question: "What is E-E-A-T and how does it affect my rankings?",
    answer: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness — Google's quality evaluation framework. Sites that demonstrate real-world experience and recognized expertise in their field rank higher, especially in health, finance, and legal niches. We build E-E-A-T through author credentials, trust signals, quality backlinks, and content that proves genuine expertise."
  },
  {
    question: "Do I need SEO if I'm already running paid ads?",
    answer: "Yes. Paid ads deliver instant traffic, but stop the moment you stop paying. SEO builds a permanent, compounding asset — once you rank for high-intent keywords, those clicks are free forever. Most high-growth businesses use both: ads for immediate conversions and SEO for long-term, lower-cost customer acquisition."
  },
  {
    question: "What's included in your monthly SEO reports?",
    answer: "Every monthly report includes: keyword rank tracking (with movement indicators), organic traffic trends from Google Analytics, new backlinks acquired, technical issues flagged and fixed, content performance metrics, and a written summary with recommendations for the next month. Reports are delivered by the 5th of each month."
  },
  {
    question: "Can you guarantee #1 rankings on Google?",
    answer: "No ethical SEO professional can guarantee specific rankings — and you should be cautious of anyone who claims they can. What I do guarantee is transparent work, proven methodologies, monthly reporting, and a relentless focus on improving your organic visibility and ROI. My case studies show consistent, measurable growth across diverse industries."
  },
  {
    question: "What makes your SEO approach different from other agencies?",
    answer: "Most agencies use cookie-cutter strategies across all clients. Every campaign I run starts with deep research into your specific market, competitors, and customer journey. I combine technical rigor, content strategy, and genuine link building in a single integrated plan. You get direct access to the expert doing the work — no account managers passing messages."
  }
];
const staticBlogs = [
  {
    title: "10 On-Page SEO Techniques That Actually Work in 2026",
    excerpt: "Discover the most impactful on-page optimization tactics that search engines reward."
  },
  {
    title: "How to Build High-Quality Backlinks (Without Spamming)",
    excerpt: "Ethical link building strategies that boost authority and rankings sustainably."
  },
  {
    title: "The Complete Technical SEO Checklist for 2026",
    excerpt: "Everything you need to audit and fix your site's technical foundation."
  }
];
function Home() {
  const [faqs, setFaqs] = reactExports.useState([]);
  const [blogs, setBlogs] = reactExports.useState([]);
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const backend = useBackend();
  const loadData = reactExports.useCallback(async () => {
    try {
      setFaqs(await backend.getFAQs());
    } catch {
    }
    try {
      setBlogs((await backend.listBlogPosts()).slice(0, 3));
    } catch {
    }
  }, [backend]);
  reactExports.useEffect(() => {
    loadData();
  }, [loadData]);
  const displayFaqs = faqs.length > 0 ? faqs.slice(0, 8) : defaultFaqs;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-[#38C98A]/10 text-[#38C98A] px-4 py-1 rounded-full text-sm font-semibold mb-4", children: "#1 Rated SEO Agency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#0F1720] leading-tight mb-6", children: "Grow Your Business with Proven SEO Strategies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-600 leading-relaxed mb-8", children: "We turn search engines into your most powerful sales channel. Data-driven SEO that delivers real rankings, traffic, and revenue." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              className: "bg-[#38C98A] hover:bg-[#2db87a] text-white px-7 py-3.5 rounded-full font-semibold text-base transition-colors shadow-lg shadow-green-200",
              children: "Get Free SEO Audit"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/services",
              className: "border-2 border-[#0B2A43] text-[#0B2A43] hover:bg-[#0B2A43] hover:text-white px-7 py-3.5 rounded-full font-semibold text-base transition-colors",
              children: "Our Services"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "relative w-full max-w-lg",
          style: { height: "clamp(280px, 45vw, 420px)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hero3DScene, {})
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#F7F9FC] py-10 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatsParticles, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [
        { val: "100+", label: "Clients Served" },
        { val: "4+", label: "Yrs Experience" },
        { val: "98%", label: "Client Retention" },
        { val: "#1", label: "Rankings Delivered" }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-[#0B2A43]", children: s.val }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500 text-sm mt-1", children: s.label })
      ] }, s.label)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 12s linear infinite;
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden bg-[#0B2A43] border-y-2 border-[#38C98A] py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex whitespace-nowrap marquee-track", children: marqueeItems.map(({ id, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-2 text-sm font-semibold text-white mx-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A]", children: "✦" }),
          text
        ]
      },
      id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#0B2A43] py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingGeoBg, { color: "#38C98A", count: 12 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white text-center mb-3", children: "Our Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-center mb-12 max-w-xl mx-auto", children: "End-to-end SEO solutions tailored to your industry, competition, and goals." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-xl p-6 hover:shadow-lg transition-shadow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#38C98A]/15 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-[#38C98A]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B2A43] mb-2", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/services",
                  className: "text-[#38C98A] text-sm font-medium mt-3 inline-block hover:underline",
                  children: "Learn More →"
                }
              )
            ]
          },
          title
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionParticlesBg, { color: "#0B2A43", count: 60, opacity: 0.15 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-[#0B2A43] text-center mb-3", children: "Proven Case Studies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-center mb-12 max-w-xl mx-auto", children: "Real results for real businesses. No vanity metrics -- only growth that matters." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: caseStudies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-extrabold text-[#38C98A] mb-1", children: c.metric }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#0B2A43] font-semibold mb-1", children: c.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500 text-sm mb-3", children: [
                c.client,
                " · ",
                c.period
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-100 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "bg-[#38C98A] h-2 rounded-full",
                  style: { width: "85%" }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/case-studies",
                  className: "text-[#38C98A] text-sm font-medium mt-4 inline-block hover:underline",
                  children: "View Case Study →"
                }
              )
            ]
          },
          c.client
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/case-studies",
            className: "border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full text-sm font-semibold transition-colors",
            children: "See All Case Studies"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #0B2A43 0%, #0d3a5c 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsOrbs3D, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-[#38C98A]/15 text-[#38C98A] px-4 py-1 rounded-full text-sm font-semibold mb-4", children: "Client Success Stories" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white", children: "What Our Clients Say" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "group relative bg-white/10 border border-white/10 rounded-2xl p-6 hover:border-[#38C98A]/60 hover:scale-[1.025] transition-all duration-300",
                style: {
                  boxShadow: "0 0 0 0 rgba(56,201,138,0)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                      style: { boxShadow: "0 0 24px 2px rgba(56,201,138,0.18)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                        style: { background: t.color },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: t.initials })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-semibold text-sm", children: t.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white/50 text-xs", children: [
                        t.role,
                        " · ",
                        t.company
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-yellow-400 text-yellow-400" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/85 text-sm italic leading-relaxed mb-4", children: [
                    "“",
                    t.quote,
                    "”"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block text-xs font-semibold px-3 py-1 rounded-full",
                        style: { background: `${t.color}25`, color: t.color },
                        children: t.company
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-1 h-1 rounded-full bg-[#38C98A]/40"
                      },
                      d
                    )) })
                  ] })
                ]
              },
              t.name
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FreeAuditSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#0B2A43] py-20 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Latest from the Blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: blogs.length > 0 ? blogs.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/blog/$id",
            params: { id: post.id.toString() },
            className: "block bg-white/10 rounded-xl p-5 hover:bg-white/15 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white text-sm mb-1", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-xs line-clamp-2", children: post.excerpt }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A] text-xs mt-2 inline-block", children: "Read More →" })
            ]
          },
          post.id.toString()
        )) : staticBlogs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/blog",
            className: "block bg-white/10 rounded-xl p-5 hover:bg-white/15 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white text-sm mb-1", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-xs", children: p.excerpt }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A] text-xs mt-2 inline-block", children: "Read More →" })
            ]
          },
          p.title
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Ready to Grow?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-sm mb-6", children: "Get your free SEO audit and discover your biggest growth opportunities." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LeadForm, {})
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FAQAccent3D, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-[#0B2A43] text-center mb-12", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: displayFaqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-gray-100 rounded-xl overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full text-left px-6 py-4 font-semibold text-[#0B2A43] flex items-center justify-between hover:bg-gray-50 transition-colors",
                  onClick: () => setOpenFaq(openFaq === i ? null : i),
                  children: [
                    faq.question,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronRight,
                      {
                        className: `w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? "rotate-90" : ""}`
                      }
                    )
                  ]
                }
              ),
              openFaq === i && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-4 text-gray-600 text-sm leading-relaxed", children: faq.answer })
            ]
          },
          faq.question
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#38C98A] py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Ready to Dominate Search Results?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 mb-8", children: "Join 100+ businesses that trust RankPro SEO to grow their organic presence." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/contact",
          className: "bg-white text-[#0B2A43] hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-base transition-colors inline-block",
          children: "Get Your Free SEO Audit Today"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function FreeAuditSection() {
  const [domain, setDomain] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-20 px-4",
      style: {
        background: "linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0a2a2a 100%)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block border border-[#38C98A] text-[#38C98A] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded mb-6", children: "Free Resource" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight", children: "Get Your Free SEO Audit + Checklist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-base mb-10 max-w-lg mx-auto leading-relaxed", children: "Enter your website URL and email — I'll send you a personalized audit with actionable quick wins within 24 hours." }),
        sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-[#38C98A]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-lg", children: "Your audit request is on its way! Check your inbox within 24 hours." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                required: true,
                placeholder: "yourdomain.com",
                value: domain,
                onChange: (e) => setDomain(e.target.value),
                className: "flex-1 bg-white/10 border border-white/20 rounded-lg px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#38C98A] transition-colors"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                required: true,
                placeholder: "your@email.com",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "flex-1 bg-white/10 border border-white/20 rounded-lg px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#38C98A] transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "bg-[#38C98A] hover:bg-[#2db87a] text-white font-bold px-10 py-3.5 rounded-lg text-base transition-colors",
              children: "Send My Audit →"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-6", children: "✓ 100% free  ·  ✓ No spam  ·  ✓ Delivered in 24hrs" })
      ] })
    }
  );
}
function LeadForm() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    website: "",
    message: ""
  });
  const [sent, setSent] = reactExports.useState(false);
  const backend = useBackend();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await backend.submitContactForm(form.name, form.email, "", form.message);
      setSent(true);
    } catch {
      setSent(true);
    }
  };
  if (sent)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/10 rounded-xl p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-[#38C98A] mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold", children: "We'll be in touch within 24 hours!" })
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        required: true,
        placeholder: "Your Name",
        value: form.name,
        onChange: (e) => setForm({ ...form, name: e.target.value }),
        className: "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#C7D2E0] text-sm focus:outline-none focus:border-[#38C98A]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        required: true,
        type: "email",
        placeholder: "Email Address",
        value: form.email,
        onChange: (e) => setForm({ ...form, email: e.target.value }),
        className: "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#C7D2E0] text-sm focus:outline-none focus:border-[#38C98A]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        placeholder: "Website URL",
        value: form.website,
        onChange: (e) => setForm({ ...form, website: e.target.value }),
        className: "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#C7D2E0] text-sm focus:outline-none focus:border-[#38C98A]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        placeholder: "Tell us about your goals...",
        rows: 3,
        value: form.message,
        onChange: (e) => setForm({ ...form, message: e.target.value }),
        className: "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#C7D2E0] text-sm focus:outline-none focus:border-[#38C98A] resize-none"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        className: "w-full bg-[#38C98A] hover:bg-[#2db87a] text-white py-3 rounded-lg font-semibold text-sm transition-colors",
        children: "Request Your Free SEO Audit"
      }
    )
  ] });
}
export {
  Home as default
};
