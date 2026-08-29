"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Float, Sparkles } from "@react-three/drei";

export function QuranModel() {
  const groupRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1 + 0.1;
    }
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1} // Up/down float intensity
      floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within
    >
      <group ref={groupRef}>
        {/* Book Cover */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[3, 4, 0.5]} />
          <meshStandardMaterial color="#0a4d3c" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Pages (white inner part) */}
        <mesh position={[0.1, 0, 0.05]} castShadow>
          <boxGeometry args={[2.8, 3.8, 0.45]} />
          <meshStandardMaterial color="#f0f3eb" roughness={0.8} />
        </mesh>

        {/* Gold accents / ornament */}
        <mesh position={[0, 0, 0.26]} castShadow>
          <planeGeometry args={[1.5, 2.5]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Binding */}
        <mesh position={[-1.5, 0, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 4, 16]} />
          <meshStandardMaterial color="#06382b" roughness={0.4} metalness={0.1} />
        </mesh>

        <Sparkles count={50} scale={6} size={2} speed={0.4} color="#d4af37" opacity={0.5} />
      </group>
    </Float>
  );
}
