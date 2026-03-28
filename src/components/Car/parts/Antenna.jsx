import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function Antenna() {
  const tipRef = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'rc-antenna'

  useFrame((state) => {
    if (tipRef.current && isSelected) {
      tipRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 6) * 0.5
    }
  })

  return (
    <group>
      {/* Antenna base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
        <meshStandardMaterial color="#9C27B0" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Antenna rod - lower */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.45, 6]} />
        <meshStandardMaterial color="#CE93D8" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Antenna rod - upper (thinner) */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.008, 0.01, 0.25, 6]} />
        <meshStandardMaterial color="#E1BEE7" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Antenna tip - glowing ball */}
      <mesh ref={tipRef} position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#E040FB" emissive="#E040FB" emissiveIntensity={0.5} />
      </mesh>
      {/* Signal rings (visible when selected) */}
      {isSelected && [0.3, 0.45, 0.6].map((y, i) => (
        <mesh key={i} position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.08 + i * 0.06, 0.005, 8, 16]} />
          <meshStandardMaterial
            color="#E040FB"
            emissive="#E040FB"
            emissiveIntensity={0.4}
            transparent
            opacity={0.6 - i * 0.15}
          />
        </mesh>
      ))}
    </group>
  )
}
