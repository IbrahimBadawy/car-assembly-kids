import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

export default function SteeringServo() {
  const armRef = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'rc-servo'

  useFrame((state) => {
    if (armRef.current && isSelected) {
      armRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.5
    }
  })

  return (
    <group>
      {/* Servo body */}
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.18, 0.12]} />
        <meshStandardMaterial color="#607D8B" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Mounting tabs */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.3, 0.03, 0.14]} />
        <meshStandardMaterial color="#455A64" roughness={0.5} />
      </mesh>
      {/* Output shaft */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.06, 8]} />
        <meshStandardMaterial color="#CFD8DC" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Servo arm (animated) */}
      <group ref={armRef} position={[0, 0.16, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.02, 0.03]} />
          <meshStandardMaterial color="#B0BEC5" metalness={0.6} roughness={0.2} />
        </mesh>
        {/* Arm tip ball */}
        <mesh position={[0.1, 0, 0]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color="#ECEFF1" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[-0.1, 0, 0]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color="#ECEFF1" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
      {/* Wire connector */}
      <mesh position={[-0.13, 0, 0]}>
        <boxGeometry args={[0.04, 0.06, 0.08]} />
        <meshStandardMaterial color="#37474F" roughness={0.5} />
      </mesh>
      {/* Wires */}
      {[['#F44336', -0.02], ['#1a1a1a', 0], ['#FFC107', 0.02]].map(([color, z], i) => (
        <mesh key={i} position={[-0.18, 0, z]}>
          <cylinderGeometry args={[0.005, 0.005, 0.1, 4]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}
