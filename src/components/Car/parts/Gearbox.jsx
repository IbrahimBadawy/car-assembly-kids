import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function Gearbox() {
  const gearRef = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'rc-gearbox'

  useFrame((_, delta) => {
    if (gearRef.current && isSelected) {
      gearRef.current.rotation.x += delta * 4
    }
  })

  return (
    <group>
      {/* Gearbox housing */}
      <mesh castShadow>
        <boxGeometry args={[0.35, 0.25, 0.4]} />
        <meshStandardMaterial color="#795548" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Large gear */}
      <mesh ref={gearRef} position={[-0.05, 0, -0.22]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.025, 8, 12]} />
        <meshStandardMaterial color="#A1887F" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Small gear */}
      <mesh position={[0.08, 0.05, -0.22]}>
        <torusGeometry args={[0.06, 0.02, 8, 10]} />
        <meshStandardMaterial color="#BCAAA4" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Output shaft */}
      <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Input shaft */}
      <mesh position={[0, 0, -0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.15} />
      </mesh>
    </group>
  )
}
