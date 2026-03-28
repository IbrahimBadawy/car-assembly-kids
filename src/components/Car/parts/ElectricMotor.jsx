import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function ElectricMotor() {
  const shaftRef = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'rc-motor'

  useFrame((_, delta) => {
    if (shaftRef.current && isSelected) {
      shaftRef.current.rotation.x += delta * 10
    }
  })

  return (
    <group>
      {/* Motor cylinder body */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
        <meshStandardMaterial color="#FF5722" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Motor end cap */}
      <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
        <meshStandardMaterial color="#BF360C" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Spinning shaft */}
      <mesh ref={shaftRef} position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Wire connectors */}
      <mesh position={[0.15, 0.2, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#F44336" emissive="#F44336" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.15, -0.2, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#2196F3" emissive="#2196F3" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
