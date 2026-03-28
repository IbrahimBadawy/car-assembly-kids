import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function Engine() {
  const ref = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'engine'

  useFrame((state) => {
    if (ref.current && isSelected) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 15) * 0.01
      ref.current.position.x = Math.cos(state.clock.elapsedTime * 20) * 0.005
    }
  })

  return (
    <group ref={ref}>
      {/* Engine block */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[1.2, 0.7, 0.9]} />
        <meshStandardMaterial color="#DC143C" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Cylinders on top */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
          <meshStandardMaterial color="#8B0000" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {/* Exhaust pipe */}
      <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.06, 0.4, 12]} />
        <meshStandardMaterial color="#696969" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}
