function Seat({ position }) {
  return (
    <group position={position}>
      {/* Seat base */}
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color="#9370DB" roughness={0.6} />
      </mesh>
      {/* Seat back */}
      <mesh position={[0, 0.3, 0.2]} castShadow>
        <boxGeometry args={[0.48, 0.55, 0.1]} />
        <meshStandardMaterial color="#9370DB" roughness={0.6} />
      </mesh>
      {/* Headrest */}
      <mesh position={[0, 0.62, 0.2]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.08]} />
        <meshStandardMaterial color="#7B5EA7" roughness={0.5} />
      </mesh>
    </group>
  )
}

export default function Seats() {
  return (
    <group>
      {/* Front seats */}
      <Seat position={[-0.45, -0.1, -0.3]} />
      <Seat position={[0.45, -0.1, -0.3]} />
      {/* Back seats */}
      <Seat position={[-0.45, -0.1, 0.5]} />
      <Seat position={[0.45, -0.1, 0.5]} />
    </group>
  )
}
