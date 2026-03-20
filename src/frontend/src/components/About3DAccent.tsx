import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.004;
    meshRef.current.rotation.y += 0.007;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.32, 120, 16, 2, 3]} />
      <meshPhongMaterial
        color="#0d3a5c"
        emissive="#0a2d4a"
        specular="#38C98A"
        shininess={60}
        wireframe={false}
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

function TorusKnotWire() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.004;
    meshRef.current.rotation.y += 0.007;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.32, 120, 16, 2, 3]} />
      <meshBasicMaterial color="#38C98A" wireframe transparent opacity={0.28} />
    </mesh>
  );
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3;
      ring1.current.rotation.z = t * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.25;
      ring2.current.rotation.z = -t * 0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1} position={[0, 0, 0]}>
        <torusGeometry args={[1.6, 0.015, 8, 80]} />
        <meshBasicMaterial color="#38C98A" transparent opacity={0.18} />
      </mesh>
      <mesh ref={ring2} position={[0, 0, 0]}>
        <torusGeometry args={[2.0, 0.01, 8, 80]} />
        <meshBasicMaterial color="#5be0a8" transparent opacity={0.12} />
      </mesh>
    </>
  );
}

export default function About3DAccent() {
  return (
    <div
      className="pointer-events-none absolute right-0 top-0 h-full w-64 hidden md:block"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[3, 5, 3]}
          intensity={0.8}
          color="#38C98A"
        />
        <directionalLight
          position={[-3, -2, -3]}
          intensity={0.3}
          color="#4fa8d8"
        />
        <FloatingRings />
        <TorusKnot />
        <TorusKnotWire />
      </Canvas>
    </div>
  );
}
