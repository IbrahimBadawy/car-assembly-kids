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
import RCBody from './parts/RCBody'
import RCWheels from './parts/RCWheels'
import ElectricMotor from './parts/ElectricMotor'
import Battery from './parts/Battery'
import CircuitBoard from './parts/CircuitBoard'
import RemoteControl from './parts/RemoteControl'
import Antenna from './parts/Antenna'
import LEDLights from './parts/LEDLights'
import Gearbox from './parts/Gearbox'
import SteeringServo from './parts/SteeringServo'
import { getPartsData } from '../../data/partsData'
import useAppStore from '../../stores/useAppStore'

const NORMAL_COMPONENTS = {
  body: CarBody,
  wheels: Wheels,
  engine: Engine,
  steering: SteeringWheel,
  doors: Doors,
  windows: Windows,
  headlights: Headlights,
  seats: Seats,
  brakes: Brakes,
  trunk: Trunk,
}

const RC_COMPONENTS = {
  'rc-body': RCBody,
  'rc-wheels': RCWheels,
  'rc-motor': ElectricMotor,
  'rc-battery': Battery,
  'rc-circuit': CircuitBoard,
  'rc-remote': RemoteControl,
  'rc-antenna': Antenna,
  'rc-lights': LEDLights,
  'rc-gearbox': Gearbox,
  'rc-servo': SteeringServo,
}

export default function CarModel() {
  const carMode = useAppStore((s) => s.carMode)
  const partsData = getPartsData(carMode)
  const components = carMode === 'rc' ? RC_COMPONENTS : NORMAL_COMPONENTS

  return (
    <group position={[0, 0.5, 0]}>
      {partsData.map((part) => {
        const Component = components[part.id]
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
