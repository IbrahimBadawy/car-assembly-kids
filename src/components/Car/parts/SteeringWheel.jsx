import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function SteeringWheel() {
  const ref = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'steering'

  useFrame((state) => {
    if (ref.current && isSelected) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <group ref={ref}>
      {/* Wheel ring */}
      <mesh rotation={[3*Math.PI / 4, 0, 0]} castShadow>
        <torusGeometry args={[0.25, 0.04, 16, 32]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Center */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
        <meshStandardMaterial color="#DAA520" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Spokes */}
      {[0, Math.PI *1.5, Math.PI, Math.PI*1.5].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 0.12, Math.sin(angle) * 0.12 * 0.7, Math.sin(angle) * 0.12 * 0.7]}
          rotation={[Math.PI / 4, 0, angle]}
        >
          <boxGeometry args={[0.22, 0.02, 0.02]} />
          <meshStandardMaterial color="#DAA520" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
      {/* Column */}
      <mesh position={[0, -0.2, -0.2]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#696969" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}
