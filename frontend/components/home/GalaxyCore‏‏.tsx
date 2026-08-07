"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS                                                       */
/* ------------------------------------------------------------------ */

const PALETTE = {
  white: new THREE.Color("#ffffff"),
  softBlue: new THREE.Color("#a5b4fc"),
  indigo: new THREE.Color("#6366f1"),
  purple: new THREE.Color("#a855f7"),
  lavender: new THREE.Color("#c4b5fd"),
} as const;

const COLORS = [
  PALETTE.white,
  PALETTE.softBlue,
  PALETTE.indigo,
  PALETTE.purple,
  PALETTE.lavender,
];

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/* ------------------------------------------------------------------ */

interface SphereData {
  id: number;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitTiltX: number;
  orbitTiltZ: number;
  yOffset: number;
  ySpeed: number;
  yAmp: number;
  color: THREE.Color;
  emissiveIntensity: number;
}

const SPHERES: SphereData[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  radius: 0.08 + Math.random() * 0.22,
  orbitRadius: 1.2 + Math.random() * 2.8,
  orbitSpeed: 0.05 + Math.random() * 0.15,
  orbitTiltX: (Math.random() - 0.5) * 1.2,
  orbitTiltZ: (Math.random() - 0.5) * 1.2,
  yOffset: (Math.random() - 0.5) * 1.5,
  ySpeed: 0.2 + Math.random() * 0.4,
  yAmp: 0.1 + Math.random() * 0.3,
  color: COLORS[i % COLORS.length],
  emissiveIntensity: 0.5 + Math.random() * 1.5,
}));

const CONNECTION_PAIRS: [number, number][] = [
  [0, 3], [1, 5], [2, 7], [4, 8], [6, 9], [3, 10], [5, 11], [0, 8],
];

/* ------------------------------------------------------------------ */
/*  CORE SPHERE                                                         */
/* ------------------------------------------------------------------ */

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
      const s = 1 + Math.sin(t * 0.6) * 0.03;
      meshRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.04;
      const s2 = 1 + Math.sin(t * 0.5 + 1) * 0.05;
      glowRef.current.scale.setScalar(s2);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.03;
      ringRef.current.rotation.x = Math.sin(t * 0.02) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive={PALETTE.indigo}
          emissiveIntensity={3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color={PALETTE.softBlue}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial
          color={PALETTE.purple}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75, 0.008, 16, 100]} />
        <meshBasicMaterial
          color={PALETTE.lavender}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight color={PALETTE.indigo} intensity={4} distance={10} />
      <pointLight
        position={[2, 1, 1]}
        color={PALETTE.softBlue}
        intensity={2}
        distance={8}
      />
      <pointLight
        position={[-2, -1, -1]}
        color={PALETTE.purple}
        intensity={1.5}
        distance={8}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  ORBITING SPHERE                                                     */
/* ------------------------------------------------------------------ */

function OrbitingSphere({ data }: { data: SphereData }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const {
    radius,
    orbitRadius,
    orbitSpeed,
    orbitTiltX,
    orbitTiltZ,
    yOffset,
    ySpeed,
    yAmp,
    color,
    emissiveIntensity,
  } = data;

  const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current || !meshRef.current) return;

    const angle = startAngle + t * orbitSpeed;
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const y = yOffset + Math.sin(t * ySpeed + startAngle) * yAmp;

    groupRef.current.position.set(x, y, z);
    meshRef.current.rotation.y = t * 0.2 + startAngle;
    meshRef.current.rotation.z = t * 0.1;
  });

  return (
    <group ref={groupRef} rotation={[orbitTiltX, 0, orbitTiltZ]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.1}
          metalness={0.1}
          transmission={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  PARTICLE FIELD                                                      */
/* ------------------------------------------------------------------ */

function ParticleField({ count = 180 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 12,
      z: (Math.random() - 0.5) * 12,
      speed: 0.02 + Math.random() * 0.04,
      size: 0.01 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.phase) * 0.3,
        p.y + Math.cos(t * p.speed * 0.7 + p.phase) * 0.2,
        p.z + Math.sin(t * p.speed * 0.5 + p.phase) * 0.3
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color={PALETTE.white}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/*  CONNECTION LINES                                                    */
/* ------------------------------------------------------------------ */

function ConnectionLines() {
  const groupRef = useRef<THREE.Group>(null);

  const linesData = useMemo(() => {
    return CONNECTION_PAIRS.map(([a, b]) => ({
      a: SPHERES[a],
      b: SPHERES[b],
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line;
      const { a, b, phase } = linesData[i];

      const angleA = a.id * 0.5 + t * a.orbitSpeed;
      const angleB = b.id * 0.7 + t * b.orbitSpeed;

      const x1 = Math.cos(angleA) * a.orbitRadius;
      const z1 = Math.sin(angleA) * a.orbitRadius;
      const y1 = a.yOffset + Math.sin(t * a.ySpeed) * a.yAmp;

      const x2 = Math.cos(angleB) * b.orbitRadius;
      const z2 = Math.sin(angleB) * b.orbitRadius;
      const y2 = b.yOffset + Math.sin(t * b.ySpeed) * b.yAmp;

      const positions = line.geometry.attributes.position
        .array as Float32Array;
      positions[0] = x1;
      positions[1] = y1;
      positions[2] = z1;
      positions[3] = x2;
      positions[4] = y2;
      positions[5] = z2;
      line.geometry.attributes.position.needsUpdate = true;

      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = (Math.sin(t * 0.3 + phase) + 1) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {linesData.map((_, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position"
              args={[new Float32Array(6), 3]}
              
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={PALETTE.softBlue}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  CAMERA RIG                                                          */
/* ------------------------------------------------------------------ */

function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(() => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const sy = scrollRef.current;

    const targetX = mx * 1.5 + Math.sin(performance.now() * 0.0001) * 0.2;
    const targetY = my * 0.8 + Math.cos(performance.now() * 0.00008) * 0.15 + sy * 0.5;
    const targetZ = 6 + Math.sin(performance.now() * 0.00005) * 0.3;

    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  SCENE                                                               */
/* ------------------------------------------------------------------ */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <CameraRig />
      <CoreSphere />
      <ParticleField count={180} />
      {SPHERES.map((sphere) => (
        <OrbitingSphere key={sphere.id} data={sphere} />
      ))}
      <ConnectionLines />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPORT                                                              */
/* ------------------------------------------------------------------ */

export function GalaxyCore(): React.ReactElement {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
