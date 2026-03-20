import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

function Orb({
  orbitRadius,
  speed,
  phase,
  color,
}: {
  orbitRadius: number;
  speed: number;
  phase: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    meshRef.current.position.x = Math.cos(t) * orbitRadius;
    meshRef.current.position.y = Math.sin(t) * orbitRadius * 0.6;
    meshRef.current.position.z = Math.sin(t * 0.5) * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function TestimonialsOrbs3D() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 h-full w-32 hidden lg:block"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#38C98A" />
        <Orb orbitRadius={0.9} speed={0.5} phase={0} color="#38C98A" />
        <Orb orbitRadius={0.9} speed={0.5} phase={2.094} color="#5be0a8" />
        <Orb orbitRadius={0.9} speed={0.5} phase={4.188} color="#2db87a" />
      </Canvas>
    </div>
  );
}
