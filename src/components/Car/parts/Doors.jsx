import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

function Door({ position, scaleX = 1 }) {
  const ref = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isXray = useAppStore((s) => s.isXray)
  const isSelected = selectedPart === 'doors'

  useFrame((state) => {
    if (ref.current && isSelected) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3 * scaleX
    }
  })

  const opacity = isXray ? 0.15 : 1

  return (
    <group position={position} ref={ref}>
      {/* Door panel */}
      <mesh castShadow raycast={isXray ? () => {} : undefined}>
        <boxGeometry args={[0.08, 0.8, 1.4]} />
        <meshStandardMaterial color="#4169E1" roughness={0.3} metalness={0.2} transparent opacity={opacity} />
      </mesh>
      {/* Door handle */}
      <mesh position={[0.05 * scaleX, 0.1, 0.2]} raycast={isXray ? () => {} : undefined}>
        <boxGeometry args={[0.03, 0.04, 0.18]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} transparent opacity={opacity} />
      </mesh>
    </group>
  )
}

export default function Doors() {
  return (
    <group>
      <Door position={[-1.05, 0.1, 0]} scaleX={-1} />
      <Door position={[1.05, 0.1, 0]} scaleX={1} />
    </group>
  )
}
