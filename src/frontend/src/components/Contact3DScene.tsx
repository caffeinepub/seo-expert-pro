import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";

function FloatingTorus({
  position,
  rotSpeed,
  color,
}: {
  position: [number, number, number];
  rotSpeed: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += rotSpeed[0];
    ref.current.rotation.y += rotSpeed[1];
    ref.current.rotation.z += rotSpeed[2];
    ref.current.position.y = baseY + Math.sin(t * 0.5 + position[0]) * 0.25;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.5, 0.06, 12, 40]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function FloatingOct({
  position,
  scale,
  color,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.007;
    ref.current.rotation.y += 0.011;
    ref.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 0.4 + position[2]) * 0.18;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

function FloatingSphere({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
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

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#38C98A"
        size={0.05}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function Contact3DScene() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#38C98A" />
        <pointLight position={[-3, -2, 2]} intensity={0.6} color="#4fa8d8" />
        <Particles />
        <FloatingTorus
          position={[-3, 1, 0]}
          rotSpeed={[0.008, 0.005, 0.003]}
          color="#38C98A"
        />
        <FloatingTorus
          position={[3, -1, -1]}
          rotSpeed={[0.005, 0.009, 0.007]}
          color="#5be0a8"
        />
        <FloatingTorus
          position={[0, 2, -2]}
          rotSpeed={[0.004, 0.006, 0.01]}
          color="#2db87a"
        />
        <FloatingOct position={[-2, -1.5, 0]} scale={0.3} color="#38C98A" />
        <FloatingOct position={[2.5, 1, -1]} scale={0.2} color="#4fa8d8" />
        <FloatingSphere position={[1.5, -2, 0]} color="#38C98A" />
        <FloatingSphere position={[-2.5, 0.5, 0]} color="#5be0a8" />
        <FloatingSphere position={[0.5, 2, -1]} color="#2db87a" />
      </Canvas>
    </div>
  );
}
