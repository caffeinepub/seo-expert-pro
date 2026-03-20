import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

type Vec3 = [number, number, number];

interface FloatingShapeProps {
  position: Vec3;
  shape: "sphere" | "box" | "octahedron" | "tetrahedron";
  color: string;
  speed: number;
  phase: number;
  scale?: number;
}

function FloatingShape({
  position,
  shape,
  color,
  speed,
  phase,
  scale = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += speed * 0.8;
    meshRef.current.rotation.y += speed;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.15;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5 + phase) * 0.08;
  });

  const geo = () => {
    if (shape === "sphere")
      return <sphereGeometry args={[0.22 * scale, 12, 12]} />;
    if (shape === "box")
      return <boxGeometry args={[0.35 * scale, 0.35 * scale, 0.35 * scale]} />;
    if (shape === "octahedron")
      return <octahedronGeometry args={[0.28 * scale]} />;
    return <tetrahedronGeometry args={[0.3 * scale]} />;
  };

  return (
    <mesh ref={meshRef} position={position}>
      {geo()}
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.65}
        shininess={80}
      />
    </mesh>
  );
}

function FloatingShapeWire({
  position,
  shape,
  color,
  speed,
  phase,
  scale = 1,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += speed * 0.8;
    meshRef.current.rotation.y += speed;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.15;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5 + phase) * 0.08;
  });

  const geo = () => {
    if (shape === "sphere")
      return <sphereGeometry args={[0.24 * scale, 12, 12]} />;
    if (shape === "box")
      return <boxGeometry args={[0.37 * scale, 0.37 * scale, 0.37 * scale]} />;
    if (shape === "octahedron")
      return <octahedronGeometry args={[0.3 * scale]} />;
    return <tetrahedronGeometry args={[0.32 * scale]} />;
  };

  return (
    <mesh ref={meshRef} position={position}>
      {geo()}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
    </mesh>
  );
}

const shapes: FloatingShapeProps[] = [
  {
    position: [-5, 0.4, -1],
    shape: "octahedron",
    color: "#38C98A",
    speed: 0.008,
    phase: 0,
    scale: 1.2,
  },
  {
    position: [-3.2, -0.5, -0.5],
    shape: "sphere",
    color: "#4fa8d8",
    speed: 0.006,
    phase: 1.2,
  },
  {
    position: [-1.4, 0.7, -1.5],
    shape: "box",
    color: "#38C98A",
    speed: 0.01,
    phase: 2.4,
  },
  {
    position: [0.8, -0.3, -0.8],
    shape: "tetrahedron",
    color: "#5be0a8",
    speed: 0.007,
    phase: 0.8,
  },
  {
    position: [2.6, 0.6, -1],
    shape: "octahedron",
    color: "#4fa8d8",
    speed: 0.009,
    phase: 1.8,
    scale: 0.9,
  },
  {
    position: [4.4, -0.4, -0.5],
    shape: "sphere",
    color: "#38C98A",
    speed: 0.005,
    phase: 3.0,
  },
  {
    position: [5.8, 0.3, -1.5],
    shape: "box",
    color: "#5be0a8",
    speed: 0.011,
    phase: 0.4,
    scale: 0.8,
  },
  {
    position: [-4.5, 0.8, -2],
    shape: "tetrahedron",
    color: "#38C98A",
    speed: 0.006,
    phase: 2.0,
    scale: 0.7,
  },
];

export default function Services3DHeader() {
  return (
    <div
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.7}
          color="#38C98A"
        />
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.3}
          color="#4fa8d8"
        />
        {shapes.map((s) => (
          <FloatingShape key={`${s.shape}-${s.position[0]}`} {...s} />
        ))}
        {shapes.map((s) => (
          <FloatingShapeWire key={`wire-${s.shape}-${s.position[0]}`} {...s} />
        ))}
      </Canvas>
    </div>
  );
}
