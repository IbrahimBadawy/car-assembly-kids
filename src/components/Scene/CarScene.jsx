import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, ContactShadows } from '@react-three/drei'
import CarModel from '../Car/CarModel'
import Ground from './Ground'
import useAppStore from '../../stores/useAppStore'

function SceneControls() {
  const isExploded = useAppStore((s) => s.isExploded)
  const selectedPart = useAppStore((s) => s.selectedPart)
  const shouldAutoRotate = !isExploded && !selectedPart

  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      minDistance={5}
      maxDistance={18}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      enableDamping
      dampingFactor={0.05}
      autoRotate={shouldAutoRotate}
      autoRotateSpeed={0.8}
    />
  )
}

export default function CarScene() {
  return (
    <Canvas
      camera={{ position: [8, 5, 10], fov: 45 }}
      shadows
      dpr={[1, 2]}
      style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B5E3F5 40%, #D4F0D4 100%)' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[10, 12, 8]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-8, 6, -5]} intensity={0.4} color="#FFE4B5" />
      <pointLight position={[5, 4, 5]} intensity={0.3} color="#ADD8E6" />
      <hemisphereLight intensity={0.4} groundColor="#8B4513" color="#87CEEB" />

      <Stars radius={100} depth={50} count={800} factor={3} saturation={0.5} fade speed={0.3} />

      <CarModel />

      <Ground />
      <ContactShadows
        position={[0, -1.01, 0]}
        opacity={0.5}
        scale={25}
        blur={2.5}
        far={5}
      />

      <SceneControls />
    </Canvas>
  )
}
