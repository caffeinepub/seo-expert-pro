import { r as reactExports, a as useThree, c as clientExports, u as useFrame, V as Vector3, D as DoubleSide, b as Vector2, P as PerspectiveCamera, O as OrthographicCamera, j as jsxRuntimeExports, C as Canvas, B as BackSide } from "./index-Dg75evqh.js";
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
    statBadges.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: s.pos, center: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
          gl: { alpha: true, antialias: true },
          dpr: [1, 2],
          style: { background: "transparent", width: "100%", height: "100%" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SceneContent, { mouse }) })
        }
      )
    }
  );
}
export {
  Hero3DScene as default
};
