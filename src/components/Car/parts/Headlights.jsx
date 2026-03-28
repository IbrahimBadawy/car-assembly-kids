import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

function Headlight({ position }) {
  const ref = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'headlights'

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity = isSelected
        ? 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5
        : 0.3
    }
  })

  return (
    <group position={position}>
      {/* Housing */}
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.25, 0.15]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>
      {/* Lens */}
      <mesh ref={ref} position={[0, 0, -0.08]}>
        <boxGeometry args={[0.35, 0.2, 0.02]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Light beam (visible when selected) */}
      {isSelected && (
        <pointLight position={[0, 0, -0.5]} intensity={2} distance={5} color="#FFD700" />
      )}
    </group>
  )
}

export default function Headlights() {
  return (
    <group>
      <Headlight position={[-0.65, 0.05, -1.95]} />
      <Headlight position={[0.65, 0.05, -1.95]} />
      {/* Tail lights */}
      <mesh position={[-0.65, 0.05, 1.95]}>
        <boxGeometry args={[0.35, 0.2, 0.08]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.65, 0.05, 1.95]}>
        <boxGeometry args={[0.35, 0.2, 0.08]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}
