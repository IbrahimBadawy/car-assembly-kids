import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function Trunk() {
  const lidRef = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'trunk'

  useFrame((state) => {
    if (lidRef.current) {
      const targetRotation = isSelected ? -0.6 : 0
      lidRef.current.rotation.x += (targetRotation - lidRef.current.rotation.x) * 0.05
    }
  })

  return (
    <group>
      {/* Trunk box */}
      <mesh position={[0, -0.05, 1.5]} castShadow>
        <boxGeometry args={[1.6, 0.5, 0.7]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.35} metalness={0.15} />
      </mesh>
      {/* Trunk lid (animated) */}
      <group position={[0, 0.22, 1.15]}>
        <mesh ref={lidRef} castShadow>
          <boxGeometry args={[1.55, 0.06, 0.7]} />
          <meshStandardMaterial color="#2DC4B4" roughness={0.3} metalness={0.15} />
        </mesh>
      </group>
      {/* Handle */}
      <mesh position={[0, 0.1, 1.87]}>
        <boxGeometry args={[0.3, 0.04, 0.04]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}
