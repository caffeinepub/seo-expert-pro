import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";

function BarChart() {
  const groupRef = useRef<THREE.Group>(null);
  const heights = useMemo(
    () => [0.4, 0.7, 0.5, 1.0, 0.8, 1.3, 1.1, 1.5, 1.2, 1.6],
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {heights.map((h, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static geometry array
        <mesh key={i} position={[(i - 4.5) * 0.35, h / 2, 0]}>
          <boxGeometry args={[0.22, h, 0.22]} />
          <meshPhongMaterial
            color="#38C98A"
            emissive="#1a6644"
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingIcos() {
  const shapes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        pos: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          -1 - Math.random() * 3,
        ] as [number, number, number],
        scale: 0.08 + Math.random() * 0.15,
        spd: 0.003 + Math.random() * 0.007,
      })),
    [],
  );

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    for (const m of refs.current) {
      if (!m) continue;
      m.rotation.x += 0.006;
      m.rotation.y += 0.009;
    }
  });

  return (
    <>
      {shapes.map((s, i) => (
        <mesh
          // biome-ignore lint/suspicious/noArrayIndexKey: static geometry array
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={s.pos}
          scale={s.scale}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#38C98A"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
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

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#38C98A"
        size={0.05}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

export default function CaseStudiesHero3D() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#38C98A" />
        <directionalLight
          position={[-3, -2, 2]}
          intensity={0.4}
          color="#4fa8d8"
        />
        <Particles />
        <FloatingIcos />
        <BarChart />
      </Canvas>
    </div>
  );
}
