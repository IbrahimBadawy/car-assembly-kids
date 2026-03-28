import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useAppStore from '../../../stores/useAppStore'

function LEDLight({ position, color = '#FFEB3B' }) {
  const ref = useRef()
  const selectedPart = useAppStore((s) => s.selectedPart)
  const isSelected = selectedPart === 'rc-lights'

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.emissiveIntensity = isSelected
        ? 1.5 + Math.sin(state.clock.elapsedTime * 4) * 0.5
        : 0.3
    }
  })

  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#333" roughness={0.4} />
      </mesh>
      <mesh ref={ref} position={[0, 0, -0.03]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      {isSelected && (
        <pointLight position={[0, 0, -0.3]} intensity={1} distance={3} color={color} />
      )}
    </group>
  )
}

export default function LEDLights() {
  return (
    <group>
      {/* Front LEDs */}
      <LEDLight position={[-0.4, 0.05, -1.28]} color="#FFEB3B" />
      <LEDLight position={[0.4, 0.05, -1.28]} color="#FFEB3B" />
      {/* Rear LEDs */}
      <LEDLight position={[-0.4, 0.05, 1.28]} color="#F44336" />
      <LEDLight position={[0.4, 0.05, 1.28]} color="#F44336" />
    </group>
  )
}
