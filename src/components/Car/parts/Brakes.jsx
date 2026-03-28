function BrakeDisc({ position }) {
  return (
    <group position={position}>
      {/* Brake disc - aligned with wheel: cylinder along X axis (axle) */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.04, 24]} />
        <meshStandardMaterial color="#FF69B4" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Caliper on top */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.1, 0.12, 0.12]} />
        <meshStandardMaterial color="#C71585" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

export default function Brakes() {
  return (
    <group>
      <BrakeDisc position={[-1.15, -0.55, -1.3]} />
      <BrakeDisc position={[1.15, -0.55, -1.3]} />
      <BrakeDisc position={[-1.15, -0.55, 1.3]} />
      <BrakeDisc position={[1.15, -0.55, 1.3]} />
    </group>
  )
}
