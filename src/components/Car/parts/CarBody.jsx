import { Mesh } from 'three'
import useAppStore from '../../../stores/useAppStore'

const defaultRaycast = Mesh.prototype.raycast
const noopRaycast = () => {}

export default function CarBody() {
  const isXray = useAppStore((s) => s.isXray)
  const opacity = isXray ? 0.15 : 1
  const bodyColor = isXray ? '#90EE90' : '#32CD32'
  const cabinColor = isXray ? '#7CCD7C' : '#228B22'
  const accentColor = isXray ? '#A0D8A0' : '#2ECC40'

  return (
    <group>
      {/* Main body - lower */}
      <mesh position={[0, -0.05, 0]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[2.1, 0.65, 3.8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.15} transparent opacity={opacity} />
      </mesh>

      {/* Cabin - upper */}
      <mesh position={[0, 0.55, 0.1]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[1.9, 0.55, 2.2]} />
        <meshStandardMaterial color={cabinColor} roughness={0.3} metalness={0.15} transparent opacity={opacity} />
      </mesh>

      {/* Hood slope (front) */}
      <mesh position={[0, 0.25, -1.35]} rotation={[0.15, 0, 0]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[2.0, 0.1, 0.8]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.15} transparent opacity={opacity} />
      </mesh>

      {/* Trunk slope (rear) */}
      <mesh position={[0, 0.2, 1.4]} rotation={[-0.1, 0, 0]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[1.9, 0.08, 0.7]} />
        <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.15} transparent opacity={opacity} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[0, -0.25, -1.95]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[2.0, 0.3, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} transparent opacity={opacity} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[0, -0.25, 1.95]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[2.0, 0.3, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} transparent opacity={opacity} />
      </mesh>

      {/* Roof rack accent */}
      <mesh position={[0, 0.84, 0.1]} raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[1.4, 0.03, 1.6]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} transparent opacity={opacity} />
      </mesh>
    </group>
  )
}
