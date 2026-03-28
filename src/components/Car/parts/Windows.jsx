import useAppStore from '../../../stores/useAppStore'

export default function Windows() {
  const isXray = useAppStore((s) => s.isXray)
  const opacity = isXray ? 0.08 : 0.4
  const windshieldOpacity = isXray ? 0.05 : 0.35

  return (
    <group>
      {/* Left windows */}
      <mesh position={[-1.02, 0.55, -0.3]} castShadow raycast={isXray ? () => {} : undefined}>
        <boxGeometry args={[0.04, 0.45, 0.55]} />
        <meshStandardMaterial color="#00CED1" transparent opacity={opacity} roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh position={[-1.02, 0.55, 0.4]} castShadow raycast={isXray ? () => {} : undefined}>
        <boxGeometry args={[0.04, 0.45, 0.55]} />
        <meshStandardMaterial color="#00CED1" transparent opacity={opacity} roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Right windows */}
      <mesh position={[1.02, 0.55, -0.3]} castShadow raycast={isXray ? () => {} : undefined}>
        <boxGeometry args={[0.04, 0.45, 0.55]} />
        <meshStandardMaterial color="#00CED1" transparent opacity={opacity} roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh position={[1.02, 0.55, 0.4]} castShadow raycast={isXray ? () => {} : undefined}>
        <boxGeometry args={[0.04, 0.45, 0.55]} />
        <meshStandardMaterial color="#00CED1" transparent opacity={opacity} roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.6, -1.05]} rotation={[0.3, 0, 0]} castShadow raycast={isXray ? () => {} : undefined}>
        <boxGeometry args={[1.8, 0.6, 0.04]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={windshieldOpacity} roughness={0.05} metalness={0.1} />
      </mesh>

      {/* Rear window */}
      <mesh position={[0, 0.6, 1.1]} rotation={[-0.3, 0, 0]} castShadow raycast={isXray ? () => {} : undefined}>
        <boxGeometry args={[1.6, 0.5, 0.04]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={windshieldOpacity} roughness={0.05} metalness={0.1} />
      </mesh>
    </group>
  )
}
