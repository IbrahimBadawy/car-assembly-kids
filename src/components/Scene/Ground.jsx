import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Ground() {
  const ref = useRef()

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <circleGeometry args={[20, 64]} />
      <meshStandardMaterial
        color="#90EE90"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}
