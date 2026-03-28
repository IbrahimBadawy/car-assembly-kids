import CarPart from './CarPart'
import Wheels from './parts/Wheels'
import Engine from './parts/Engine'
import SteeringWheel from './parts/SteeringWheel'
import Doors from './parts/Doors'
import Windows from './parts/Windows'
import CarBody from './parts/CarBody'
import Headlights from './parts/Headlights'
import Seats from './parts/Seats'
import Brakes from './parts/Brakes'
import Trunk from './parts/Trunk'
import { PARTS_DATA } from '../../data/partsData'

const PART_COMPONENTS = {
  wheels: Wheels,
  engine: Engine,
  steering: SteeringWheel,
  doors: Doors,
  windows: Windows,
  body: CarBody,
  headlights: Headlights,
  seats: Seats,
  brakes: Brakes,
  trunk: Trunk,
}

export default function CarModel() {
  return (
    <group position={[0, 0.5, 0]}>
      {PARTS_DATA.map((part) => {
        const Component = PART_COMPONENTS[part.id]
        if (!Component) return null
        return (
          <CarPart
            key={part.id}
            partId={part.id}
            assembledPosition={part.assembledPosition}
            explodedPosition={part.explodedPosition}
            color={part.color}
          >
            <Component />
          </CarPart>
        )
      })}
    </group>
  )
}
