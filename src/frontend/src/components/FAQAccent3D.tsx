import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

function Dodecahedron() {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (solidRef.current) {
      solidRef.current.rotation.x = t * 0.25;
      solidRef.current.rotation.y = t * 0.35;
      solidRef.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.25;
      wireRef.current.rotation.y = t * 0.35;
      wireRef.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
  });

  return (
    <>
      <mesh ref={solidRef}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhongMaterial
          color="#0d3a5c"
          emissive="#0a2d4a"
          specular="#38C98A"
          shininess={40}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={wireRef}>
        <dodecahedronGeometry args={[1.02, 0]} />
        <meshBasicMaterial
          color="#38C98A"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </>
  );
}

export default function FAQAccent3D() {
  return (
    <div
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-40 h-40 hidden lg:block"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={0.9}
          color="#38C98A"
        />
        <Dodecahedron />
      </Canvas>
    </div>
  );
}
