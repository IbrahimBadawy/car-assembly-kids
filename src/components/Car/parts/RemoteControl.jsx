export default function RemoteControl() {
  return (
    <group>
      {/* Remote body */}
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.12, 0.8]} />
        <meshStandardMaterial color="#3F51B5" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Joystick left */}
      <mesh position={[-0.12, 0.1, -0.15]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
        <meshStandardMaterial color="#1A237E" roughness={0.3} />
      </mesh>
      <mesh position={[-0.12, 0.16, -0.15]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#C5CAE9" roughness={0.3} />
      </mesh>
      {/* Joystick right */}
      <mesh position={[0.12, 0.1, -0.15]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
        <meshStandardMaterial color="#1A237E" roughness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.16, -0.15]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#C5CAE9" roughness={0.3} />
      </mesh>
      {/* Buttons */}
      {[[0.1, 0.07, 0.15, '#F44336'], [-0.1, 0.07, 0.15, '#4CAF50'], [0, 0.07, 0.25, '#FF9800']].map(([x, y, z, color], i) => (
        <mesh key={i} position={[x, y, z]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* Remote antenna */}
      <mesh position={[0.2, 0.2, -0.35]}>
        <cylinderGeometry args={[0.01, 0.008, 0.35, 6]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen area */}
      <mesh position={[0, 0.065, 0.02]}>
        <boxGeometry args={[0.2, 0.01, 0.15]} />
        <meshStandardMaterial color="#E8EAF6" emissive="#7986CB" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}
