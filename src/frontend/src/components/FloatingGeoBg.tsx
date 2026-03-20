import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  scale: number;
  rotSpeed: [number, number, number];
  type: number;
  color: string;
}

function GeoShape({ position, scale, rotSpeed, type, color }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += rotSpeed[0];
    meshRef.current.rotation.y += rotSpeed[1];
    meshRef.current.rotation.z += rotSpeed[2];
    meshRef.current.position.y = baseY + Math.sin(t * 0.4 + position[0]) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 0 && <icosahedronGeometry args={[1, 0]} />}
      {type === 1 && <octahedronGeometry args={[1, 0]} />}
      {type === 2 && <tetrahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
    </mesh>
  );
}

interface Props {
  color?: string;
  count?: number;
}

export default function FloatingGeoBg({
  color = "#38C98A",
  count = 12,
}: Props) {
  const shapes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.2,
      rotSpeed: [
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.006,
      ] as [number, number, number],
      type: Math.floor(Math.random() * 3),
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        {shapes.map((s) => (
          <GeoShape
            key={s.id}
            position={s.position}
            scale={s.scale}
            rotSpeed={s.rotSpeed}
            type={s.type}
            color={color}
          />
        ))}
      </Canvas>
    </div>
  );
}
