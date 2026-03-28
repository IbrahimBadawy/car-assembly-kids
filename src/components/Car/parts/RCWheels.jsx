import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

function RCWheel({ position }) {
  const spinRef = useRef()
  const isExploded = useAppStore((s) => s.isExploded)

  useFrame((_, delta) => {
    if (spinRef.current && !isExploded) {
      spinRef.current.rotation.x += delta * 5
    }
  })

  return (
    <group position={position}>
      <group ref={spinRef}>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[0.22, 0.09, 12, 24]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.07, 12]} />
          <meshStandardMaterial color="#FF9800" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

export default function RCWheels() {
  return (
    <group>
      <RCWheel position={[-0.75, -0.35, -0.85]} />
      <RCWheel position={[0.75, -0.35, -0.85]} />
      <RCWheel position={[-0.75, -0.35, 0.85]} />
      <RCWheel position={[0.75, -0.35, 0.85]} />
    </group>
  )
}
