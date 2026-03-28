import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function Battery() {
  const ref = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'rc-battery'

  useFrame((state) => {
    if (ref.current && isSelected) {
      ref.current.children[2].material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.4
    }
  })

  return (
    <group ref={ref}>
      {/* Battery body */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.22, 0.5]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Battery label strip */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.75, 0.02, 0.45]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.5} />
      </mesh>
      {/* Power indicator light */}
      <mesh position={[0.35, 0.08, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#76FF03" emissive="#76FF03" emissiveIntensity={0.5} />
      </mesh>
      {/* Positive terminal */}
      <mesh position={[0.3, 0.15, 0.15]}>
        <cylinderGeometry args={[0.03, 0.03, 0.06, 8]} />
        <meshStandardMaterial color="#F44336" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Negative terminal */}
      <mesh position={[0.3, 0.15, -0.15]}>
        <cylinderGeometry args={[0.03, 0.03, 0.06, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  )
}
