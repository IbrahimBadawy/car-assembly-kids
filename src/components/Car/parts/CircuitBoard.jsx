import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function CircuitBoard() {
  const ref = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'rc-circuit'

  useFrame((state) => {
    if (ref.current && isSelected) {
      // Blink the chip LEDs
      ref.current.children.forEach((child, i) => {
        if (child.material?.emissive) {
          child.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 4 + i) * 0.3
        }
      })
    }
  })

  return (
    <group ref={ref}>
      {/* PCB board */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.04, 0.5]} />
        <meshStandardMaterial color="#009688" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Main chip */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[0.18, 0.05, 0.18]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      {/* Small components */}
      {[[-0.2, 0.04, -0.15], [0.2, 0.04, 0.15], [-0.15, 0.04, 0.12], [0.25, 0.04, -0.1]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.06, 0.03, 0.04]} />
          <meshStandardMaterial
            color={['#F44336', '#2196F3', '#FF9800', '#9C27B0'][i]}
            emissive={['#F44336', '#2196F3', '#FF9800', '#9C27B0'][i]}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      {/* Traces (circuit lines) */}
      {[[-0.1, 0.025, 0], [0.1, 0.025, 0.05], [0, 0.025, -0.1]].map((pos, i) => (
        <mesh key={`t${i}`} position={pos}>
          <boxGeometry args={[0.25, 0.005, 0.01]} />
          <meshStandardMaterial color="#B2DFDB" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}
