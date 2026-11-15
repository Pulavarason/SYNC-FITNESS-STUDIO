"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

type SceneProps = {
  reduced: boolean;
  mobile: boolean;
  /** Pause rendering when the hero is off-screen or the loader is still up. */
  active: boolean;
};

/* ---------- Chrome dumbbell, built from primitives (no external assets) ---------- */

function Chrome({ color = "#e9e9e9", rough = 0.1 }: { color?: string; rough?: number }) {
  return <meshStandardMaterial color={color} metalness={1} roughness={rough} envMapIntensity={1.55} />;
}

/** Revolved profile: slightly domed face + soft bevel, so chrome reflections roll across the surface. */
function discGeometry(r: number, half: number, seg: number) {
  const b = Math.min(0.07, r * 0.12);
  const dome = half * 0.7;
  const pts = [
    new THREE.Vector2(0.0001, half + dome),
    new THREE.Vector2(r * 0.35, half + dome * 0.75),
    new THREE.Vector2(r * 0.8, half + dome * 0.2),
    new THREE.Vector2(r - b, half),
    new THREE.Vector2(r - b * 0.3, half - b * 0.35),
    new THREE.Vector2(r, half - b),
    new THREE.Vector2(r, -half + b),
    new THREE.Vector2(r - b * 0.3, -half + b * 0.35),
    new THREE.Vector2(r - b, -half),
    new THREE.Vector2(r * 0.8, -half - dome * 0.2),
    new THREE.Vector2(r * 0.35, -half - dome * 0.75),
    new THREE.Vector2(0.0001, -half - dome),
  ];
  // Lathe wants the profile running bottom → top so normals face outward
  return new THREE.LatheGeometry(pts.reverse(), seg);
}

function Disc({ r, half, seg, x = 0, rough = 0.12 }: { r: number; half: number; seg: number; x?: number; rough?: number }) {
  const geo = useMemo(() => discGeometry(r, half, seg), [r, half, seg]);
  return (
    <mesh geometry={geo} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <Chrome rough={rough} />
    </mesh>
  );
}

function Plate({ x, seg }: { x: number; seg: number }) {
  const s = Math.sign(x);
  return (
    <group position={[x, 0, 0]}>
      <Disc r={0.78} half={0.15} seg={seg} rough={0.2} />
      <Disc r={0.56} half={0.12} seg={seg} x={s * 0.28} rough={0.24} />
      {/* Brand-green accent band — the single hint of colour on the object */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[s * 0.28, 0, 0]}>
        <cylinderGeometry args={[0.572, 0.572, 0.03, seg]} />
        <meshStandardMaterial color="#65CC00" emissive="#65CC00" emissiveIntensity={0.55} metalness={0.6} roughness={0.35} />
      </mesh>
      <Disc r={0.22} half={0.09} seg={seg} x={s * 0.5} rough={0.2} />
    </group>
  );
}

function Dumbbell({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const root = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const t0 = useRef<number | null>(null);
  const { viewport } = useThree();
  const seg = mobile ? 48 : 96;

  // Responsive framing: right-of-centre on wide screens, above the copy on phones
  const wide = viewport.width / viewport.height > 0.95;
  const scale = wide ? Math.min(0.95, viewport.height / 3.9) : viewport.width / 6.6;
  const baseX = wide ? viewport.width * 0.22 : 0;
  const baseY = wide ? 0.05 : viewport.height * 0.31;

  useFrame((state) => {
    const g = root.current;
    const inner = tilt.current;
    if (!g || !inner) return;
    const t = state.clock.elapsedTime;
    if (t0.current === null) t0.current = t;

    // Cinematic entrance: rises, scales and swings in over ~2.4s
    const p = reduced ? 1 : Math.min(1, Math.max(0, (t - t0.current) / 2.4));
    const e = 1 - Math.pow(1 - p, 4);

    g.scale.setScalar(scale * (0.55 + 0.45 * e));
    g.position.x = baseX;
    g.position.y = baseY + (1 - e) * -1.1 + (reduced ? 0 : Math.sin(t * 0.9) * 0.09);

    // Slow, wide sweep that stays in a three-quarter view (never end-on)
    const sweep = reduced ? 0.35 : 0.2 + Math.sin(t * 0.38) * 0.55;
    g.rotation.y = sweep - (1 - e) * 2.4;

    // Mouse-responsive tilt (eased)
    const px = reduced || mobile ? 0 : state.pointer.x;
    const py = reduced || mobile ? 0 : state.pointer.y;
    inner.rotation.z = THREE.MathUtils.lerp(inner.rotation.z, -0.32 + py * 0.12, 0.05);
    inner.rotation.x = THREE.MathUtils.lerp(inner.rotation.x, 0.18 - py * 0.1 + px * 0.04, 0.05);
    inner.rotation.y = THREE.MathUtils.lerp(inner.rotation.y, px * 0.28, 0.05);
  });

  return (
    <group ref={root}>
      <group ref={tilt}>
        {/* Handle */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 2.5, seg]} />
          <Chrome rough={0.16} />
        </mesh>
        {/* Knurled grip bands */}
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, Math.PI / 2]} position={[(i - 4) * 0.11, 0, 0]}>
            <cylinderGeometry args={[0.112, 0.112, 0.045, seg]} />
            <Chrome rough={0.32} color="#bdbdbd" />
          </mesh>
        ))}
        {/* Collars */}
        {[-1, 1].map((s) => (
          <mesh key={s} rotation={[0, 0, Math.PI / 2]} position={[s * 1.28, 0, 0]}>
            <cylinderGeometry args={[0.17, 0.17, 0.1, seg]} />
            <Chrome rough={0.2} />
          </mesh>
        ))}
        <Plate x={-1.6} seg={seg} />
        <Plate x={1.6} seg={seg} />
      </group>
    </group>
  );
}

function Rig({ mobile }: { mobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.12} />
      <spotLight position={[4, 6, 5]} angle={0.4} penumbra={1} intensity={mobile ? 90 : 140} color="#ffffff" />
      {/* Low green rim — gentle reflections only */}
      <pointLight position={[-6, -2.5, -1]} intensity={mobile ? 5 : 8} color="#65CC00" distance={14} />
      <pointLight position={[6, 2, -4]} intensity={5} color="#80FF00" distance={12} />
      {/* Self-contained studio reflections (no HDR download) */}
      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 4, 0, 0]}>
          <Lightformer form="rect" intensity={5} position={[0, 6, -4]} scale={[12, 3, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={2.6} position={[-6, 1, 0]} scale={[2.5, 8, 1]} color="#f2f2f2" />
          <Lightformer form="ring" intensity={1.6} position={[0, -3, 5]} scale={4} color="#ffffff" />
          <Lightformer form="rect" intensity={0.8} position={[0, 1, 8]} scale={[10, 1.4, 1]} color="#ffffff" />
        </group>
        {/* Large soft boxes so flat plate faces always catch a clean highlight */}
        <Lightformer form="rect" intensity={0.22} position={[-4, 3.5, 7]} scale={[4, 2.2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={0.15} position={[6, -2.5, 6]} scale={[2.5, 2.5, 1]} color="#e8e8e8" />
      </Environment>
    </>
  );
}

export default function HeroScene({ reduced, mobile, active }: SceneProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, mobile ? 1.5 : 2]}
      frameloop={active && !reduced ? "always" : "demand"}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden
    >
      <Rig mobile={mobile} />
      <Dumbbell reduced={reduced} mobile={mobile} />
      {!mobile && (
        <ContactShadows position={[0, -1.55, 0]} opacity={0.65} scale={12} blur={2.8} far={3.5} resolution={512} color="#000000" frames={1} />
      )}
    </Canvas>
  );
}
