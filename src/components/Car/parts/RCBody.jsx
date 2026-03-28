import { Mesh } from 'three'
import useAppStore from '../../../stores/useAppStore'

const defaultRaycast = Mesh.prototype.raycast
const noopRaycast = () => {}

export default function RCBody() {
  const isXray = useAppStore((s) => s.isXray)
  const opacity = isXray ? 0.15 : 1

  return (
    <group>
      {/* Main body - smaller RC car */}
      <mesh position={[0, 0, 0]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[1.4, 0.4, 2.4]} />
        <meshStandardMaterial color="#E91E63" roughness={0.25} metalness={0.1} transparent opacity={opacity} />
      </mesh>
      {/* Cabin bump */}
      <mesh position={[0, 0.35, -0.1]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[1.2, 0.3, 1.2]} />
        <meshStandardMaterial color="#C2185B" roughness={0.25} metalness={0.1} transparent opacity={opacity} />
      </mesh>
      {/* Spoiler */}
      <mesh position={[0, 0.25, 1.1]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[1.3, 0.06, 0.3]} />
        <meshStandardMaterial color="#AD1457" roughness={0.3} transparent opacity={opacity} />
      </mesh>
      {/* Front bumper */}
      <mesh position={[0, -0.1, -1.25]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[1.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#880E4F" roughness={0.4} transparent opacity={opacity} />
      </mesh>
      {/* Rear bumper */}
      <mesh position={[0, -0.1, 1.25]} castShadow raycast={isXray ? noopRaycast : defaultRaycast}>
        <boxGeometry args={[1.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#880E4F" roughness={0.4} transparent opacity={opacity} />
      </mesh>
    </group>
  )
}
