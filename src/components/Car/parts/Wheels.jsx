import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

function Wheel({ position }) {
  const spinRef = useRef()
  const isExploded = useAppStore((s) => s.isExploded)

  useFrame((_, delta) => {
    if (spinRef.current && !isExploded) {
      spinRef.current.rotation.x += delta * 3
    }
  })

  return (
    <group position={position}>
      {/* Spinning group - rotates around X axis (the left-right axle) */}
      <group ref={spinRef}>
        {/*
          Torus default: ring in XZ plane, hole along Y.
          Need: ring in YZ plane, hole along X (axle goes left-right).
          Fix: rotate 90° around Z → ring goes XZ→YZ, hole goes Y→-X ✓
          Result: from SIDE view = see full tire circle, from FRONT view = see narrow tread ✓
        */}
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.35, 0.14, 16, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        {/* Hub cap - cylinder along X axis (same as axle) */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 16]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.85} roughness={0.15} />
        </mesh>
      </group>
    </group>
  )
}

export default function Wheels() {
  return (
    <group>
      <Wheel position={[-1.15, -0.55, -1.3]} />
      <Wheel position={[1.15, -0.55, -1.3]} />
      <Wheel position={[-1.15, -0.55, 1.3]} />
      <Wheel position={[1.15, -0.55, 1.3]} />
    </group>
  )
}
