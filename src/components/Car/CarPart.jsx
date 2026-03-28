import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { animated, useSpring } from '@react-spring/three'
import useAppStore from '../../stores/useAppStore'

export default function CarPart({ partId, children, assembledPosition, explodedPosition, color }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const isExploded = useAppStore((s) => s.isExploded)
  const selectedPart = useAppStore((s) => s.selectedPart)
  const selectPart = useAppStore((s) => s.selectPart)
  const setHoveredPart = useAppStore((s) => s.setHoveredPart)
  const isSelected = selectedPart === partId

  const targetPos = isExploded ? explodedPosition : assembledPosition
  const floatOffset = isExploded ? Math.sin(Date.now() * 0.001 + partId.length) * 0.1 : 0

  const { position, scale } = useSpring({
    position: [targetPos[0], targetPos[1] + floatOffset, targetPos[2]],
    scale: isSelected ? 1.15 : hovered ? 1.08 : 1,
    config: { mass: 1, tension: 170, friction: 26 },
  })

  useFrame((state) => {
    if (ref.current && isExploded) {
      ref.current.position.y = targetPos[1] + Math.sin(state.clock.elapsedTime * 1.5 + partId.length) * 0.08
    }
  })

  return (
    <animated.group
      ref={ref}
      position={position}
      scale={scale}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredPart(partId)
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={() => {
        setHovered(false)
        setHoveredPart(null)
        document.body.style.cursor = 'default'
      }}
      onClick={(e) => {
        e.stopPropagation()
        selectPart(partId)
      }}
    >
      {children}
    </animated.group>
  )
}
