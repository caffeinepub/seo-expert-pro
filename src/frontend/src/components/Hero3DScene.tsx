import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

const statBadges = [
  {
    val: "+312%",
    label: "Organic Traffic",
    pos: [2.5, 1.4, 0.5] as [number, number, number],
  },
  {
    val: "#1",
    label: "Keyword Rankings",
    pos: [-2.6, 0.8, 0.2] as [number, number, number],
  },
  {
    val: "4,820",
    label: "Leads Generated",
    pos: [2.2, -1.5, 0.3] as [number, number, number],
  },
  {
    val: "890%",
    label: "ROI Delivered",
    pos: [-2.3, -1.2, 0.4] as [number, number, number],
  },
];

function Globe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.004;
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[1.6, 48, 48]} />
        <meshPhongMaterial
          color="#0B2A43"
          emissive="#071520"
          specular="#38C98A"
          shininess={40}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Wireframe network overlay */}
      <mesh>
        <sphereGeometry args={[1.66, 22, 22]} />
        <meshBasicMaterial
          color="#38C98A"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
      {/* Outer atmospheric glow */}
      <mesh>
        <sphereGeometry args={[1.85, 16, 16]} />
        <meshBasicMaterial
          color="#38C98A"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function FloatingShape({
  type,
  position,
  color,
  speed = 1,
  wireframe = false,
}: {
  type: "torus" | "icosahedron" | "octahedron";
  position: [number, number, number];
  color: string;
  speed?: number;
  wireframe?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const origin = useRef(position);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x += 0.009;
    meshRef.current.rotation.y += 0.012;
    meshRef.current.position.y = origin.current[1] + Math.sin(t * 0.7) * 0.28;
    meshRef.current.position.x = origin.current[0] + Math.cos(t * 0.45) * 0.18;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {type === "torus" && <torusGeometry args={[0.38, 0.13, 16, 40]} />}
      {type === "icosahedron" && <icosahedronGeometry args={[0.32, 0]} />}
      {type === "octahedron" && <octahedronGeometry args={[0.3, 0]} />}
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        transparent
        opacity={0.85}
        wireframe={wireframe}
      />
    </mesh>
  );
}

function SceneContent({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.x * 0.35 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x +=
      (mouse.y * -0.2 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#38C98A" />
      <pointLight position={[-8, -6, -6]} intensity={0.6} color="#1a4a6e" />
      <pointLight position={[0, 0, 10]} intensity={1} color="#ffffff" />

      {/* Globe */}
      <Globe />

      {/* Floating shapes */}
      <FloatingShape
        type="torus"
        position={[3.0, 1.6, -0.6]}
        color="#38C98A"
        speed={0.8}
      />
      <FloatingShape
        type="icosahedron"
        position={[-2.8, -1.1, 0.4]}
        color="#38C98A"
        speed={1.1}
        wireframe
      />
      <FloatingShape
        type="octahedron"
        position={[2.6, -2.0, 0.3]}
        color="#7DD3B8"
        speed={0.65}
      />

      {/* Stat HTML badges */}
      {statBadges.map((s) => (
        <Html key={s.label} position={s.pos} center>
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(56,201,138,0.45)",
              borderRadius: "12px",
              padding: "8px 14px",
              boxShadow: "0 4px 16px rgba(56,201,138,0.18)",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                color: "#38C98A",
                fontWeight: 800,
                fontSize: "18px",
                lineHeight: 1,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                color: "#0B2A43",
                fontSize: "11px",
                marginTop: "3px",
                fontWeight: 600,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {s.label}
            </div>
          </div>
        </Html>
      ))}
    </group>
  );
}

export default function Hero3DScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
