"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  PALETTE                                                             */
/* ------------------------------------------------------------------ */

const C = {
  indigo: new THREE.Color("#6366f1"),
  blue: new THREE.Color("#818cf8"),
  purple: new THREE.Color("#a855f7"),
  lavender: new THREE.Color("#c4b5fd"),
  cyan: new THREE.Color("#22d3ee"),
  white: new THREE.Color("#ffffff"),
};

/* ------------------------------------------------------------------ */
/*  SPHERE CONFIGS                                                      */
/* ------------------------------------------------------------------ */

interface SConf {
  id: number;
  size: number;
  orbitR: number;
  speed: number;
  tiltX: number;
  tiltZ: number;
  yOff: number;
  ySpd: number;
  yAmp: number;
  baseAngle: number;
  color: THREE.Color;
  glowIntensity: number;
}

function mkSpheres(count: number): SConf[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / count;
    return {
      id: i,
      size: 0.06 + Math.random() * 0.14,
      orbitR: 1.4 + t * 3.2 + Math.random() * 0.6,
      speed: 0.04 + Math.random() * 0.12,
      tiltX: (Math.random() - 0.5) * 1.4,
      tiltZ: (Math.random() - 0.5) * 1.4,
      yOff: (Math.random() - 0.5) * 1.2,
      ySpd: 0.15 + Math.random() * 0.35,
      yAmp: 0.08 + Math.random() * 0.25,
      baseAngle: Math.random() * Math.PI * 2,
      color: [C.indigo, C.blue, C.purple, C.lavender, C.cyan][i % 5],
      glowIntensity: 0.4 + Math.random() * 1.2,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  POSITION HELPER                                                     */
/* ------------------------------------------------------------------ */

function spherePos(s: SConf, t: number): THREE.Vector3 {
  const a = s.baseAngle + t * s.speed;
  const local = new THREE.Vector3(
    Math.cos(a) * s.orbitR,
    s.yOff + Math.sin(t * s.ySpd + s.baseAngle) * s.yAmp,
    Math.sin(a) * s.orbitR
  );
  local.applyEuler(new THREE.Euler(s.tiltX, 0, s.tiltZ));
  return local;
}

/* ------------------------------------------------------------------ */
/*  CORE ENERGY                                                         */
/* ------------------------------------------------------------------ */

function CoreEnergy() {
  const g = useRef<THREE.Group>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.rotation.y = t * 0.025;
      g.current.rotation.z = Math.sin(t * 0.04) * 0.04;
    }
    if (r1.current) r1.current.rotation.z = t * 0.04;
    if (r2.current) r2.current.rotation.x = t * 0.03;
  });

  return (
    <group ref={g}>
      <mesh>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial
          color="#060614"
          emissive={C.indigo}
          emissiveIntensity={5}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>

      <mesh scale={1.2}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color={C.blue}
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.6}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color={C.purple}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={2.0}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color={C.lavender}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[0.8, 0, 0]}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial
          color={C.lavender}
          transparent
          opacity={0.06}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.004, 16, 120]} />
        <meshBasicMaterial
          color={C.blue}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={r2} rotation={[0.4, 0.6, 0]}>
        <torusGeometry args={[0.9, 0.003, 16, 120]} />
        <meshBasicMaterial
          color={C.purple}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight color={C.indigo} intensity={5} distance={12} />
      <pointLight position={[2, 1.5, 1]} color={C.blue} intensity={2} distance={8} />
      <pointLight position={[-2, -1, -1]} color={C.purple} intensity={1.5} distance={8} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  FLOATING SPHERE                                                     */
/* ------------------------------------------------------------------ */

function FloatingSphere({ s }: { s: SConf }) {
  const mesh = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = spherePos(s, t);
    if (mesh.current) {
      mesh.current.position.copy(p);
      mesh.current.rotation.y = t * 0.15 + s.baseAngle;
    }
    if (glow.current) {
      glow.current.position.copy(p);
      const pulse = 1 + Math.sin(t * 0.8 + s.baseAngle) * 0.08;
      glow.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[s.size, 32, 32]} />
        <meshStandardMaterial
          color={s.color}
          emissive={s.color}
          emissiveIntensity={s.glowIntensity}
          roughness={0.05}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh ref={glow} scale={1.4}>
        <sphereGeometry args={[s.size, 16, 16]} />
        <meshBasicMaterial
          color={s.color}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  PARTICLES                                                           */
/* ------------------------------------------------------------------ */

function Particles({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 14,
      z: (Math.random() - 0.5) * 14,
      speed: 0.015 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
      size: 0.008 + Math.random() * 0.018,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.phase) * 0.4,
        p.y + Math.cos(t * p.speed * 0.6 + p.phase) * 0.3,
        p.z + Math.sin(t * p.speed * 0.4 + p.phase) * 0.4
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={C.white}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/*  CONSTELLATIONS                                                      */
/* ------------------------------------------------------------------ */

const PAIRS = [
  [0, 3], [1, 5], [2, 7], [4, 9], [6, 11], [8, 13], [10, 15], [3, 12], [5, 14]
];

function Constellations({ spheres }: { spheres: SConf[] }) {
  const { geometries, materials } = useMemo(() => {
    const geo = PAIRS.map(() => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      return g;
    });
    const mat = PAIRS.map(() =>
      new THREE.LineBasicMaterial({
        color: C.blue,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    return { geometries: geo, materials: mat };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    PAIRS.forEach((pair, i) => {
      const a = spheres[pair[0]];
      const b = spheres[pair[1]];
      if (!a || !b) return;

      const pa = spherePos(a, t);
      const pb = spherePos(b, t);
      const pos = geometries[i].attributes.position.array as Float32Array;
      pos[0] = pa.x; pos[1] = pa.y; pos[2] = pa.z;
      pos[3] = pb.x; pos[4] = pb.y; pos[5] = pb.z;
      geometries[i].attributes.position.needsUpdate = true;

      materials[i].opacity = (Math.sin(t * 0.25 + i * 0.7) + 1) * 0.08;
    });
  });

 return (
  <group>
    {geometries.map((geo, i) => (
      <primitive
        key={i}
        object={new THREE.Line(geo, materials[i])}
      />
    ))}
  </group>
);}

/* ------------------------------------------------------------------ */
/*  ENERGY RINGS                                                        */
/* ------------------------------------------------------------------ */

function EnergyRings() {
  const configs = useMemo(() => [
    { r: 2.2, speed: 0.015, tilt: [0.5, 0.3, 0] as const, color: C.indigo, opacity: 0.2 },
    { r: 3.0, speed: -0.012, tilt: [0.3, 0.5, 0] as const, color: C.blue, opacity: 0.15 },
    { r: 3.8, speed: 0.01, tilt: [0.6, 0.2, 0] as const, color: C.purple, opacity: 0.12 },
    { r: 4.6, speed: -0.008, tilt: [0.4, 0.6, 0] as const, color: C.lavender, opacity: 0.1 },
  ], []);

  return (
    <group>
      {configs.map((cfg, i) => (
        <Ring key={i} {...cfg} />
      ))}
    </group>
  );
}

function Ring({ r, speed, tilt, color, opacity }: {
  r: number; speed: number; tilt: readonly [number, number, number];
  color: THREE.Color; opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt[0], tilt[1], tilt[2]]}>
      <torusGeometry args={[r, 0.008, 16, 120]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  CAMERA RIG                                                          */
/* ------------------------------------------------------------------ */

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scroll.current = window.scrollY / (window.innerHeight || 1);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(() => {
    if (reducedMotion) return;
    const mx = mouse.current.x;
    const my = mouse.current.y;
    const sy = scroll.current;

    const time = performance.now() * 0.0001;
    const breatheX = Math.sin(time) * 0.05;
    const breatheY = Math.cos(time * 0.8) * 0.04;

    camera.position.x += (mx * 0.25 + breatheX - camera.position.x) * 0.015;
    camera.position.y += (-my * 0.15 + breatheY + sy * 0.3 - camera.position.y) * 0.015;
    camera.position.z += (8.5 + sy * 0.2 - camera.position.z) * 0.015;

    camera.rotation.x += (-my * 0.015 + breatheY * 0.02 - camera.rotation.x) * 0.02;
    camera.rotation.y += (mx * 0.015 + breatheX * 0.02 - camera.rotation.y) * 0.02;
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  SCENE                                                               */
/* ------------------------------------------------------------------ */

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x02040a, 0.035);
    return () => { scene.fog = null; };
  }, [scene]);

  const spheres = useMemo(() => mkSpheres(16), []);

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color={C.blue} />
      <CameraRig reducedMotion={reducedMotion} />
      <CoreEnergy />
      <EnergyRings />
      <Particles count={300} />
      {spheres.map((s) => (
        <FloatingSphere key={s.id} s={s} />
      ))}
      <Constellations spheres={spheres} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPORT                                                              */
/* ------------------------------------------------------------------ */

export function GalaxyScene3D(): React.ReactElement {
  const [reduced, setReduced] = React.useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene reducedMotion={reduced} />
      </Canvas>
    </div>
  );
}
