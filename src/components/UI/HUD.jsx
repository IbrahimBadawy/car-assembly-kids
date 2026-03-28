import PartInfoPanel from './PartInfoPanel'
import ProgressTracker from './ProgressTracker'
import Controls from './Controls'
import useAppStore from '../../stores/useAppStore'

export default function HUD() {
  const selectedPart = useAppStore((s) => s.selectedPart)

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {/* Top bar - instruction hint */}
      {!selectedPart && (
        <div className="flex justify-center" style={{ paddingTop: '24px' }}>
          <div
            className="pointer-events-auto rounded-full shadow-lg animate-bounce-in"
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
              padding: '10px 24px',
            }}
          >
            <p className="text-gray-700 font-bold text-base" style={{ margin: 0 }}>
              👆 اضغط على أي جزء من العربية عشان تتعلم عنه!
            </p>
          </div>
        </div>
      )}

      {/* School logo - top right */}
      <div className="pointer-events-auto fixed top-5 right-5 z-40">
        <div
          className="rounded-2xl shadow-xl flex items-center"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            padding: '8px 14px',
            gap: '10px',
          }}
        >
          <img
            src="/assets/images/LOGO.jpg"
            alt="مدرسة الأرض"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span className="font-extrabold text-sm" style={{ color: '#1B5E20' }}>
            مدرسة الأرض
          </span>
        </div>
      </div>

      {/* Progress tracker - top left */}
      <div className="pointer-events-auto">
        <ProgressTracker />
      </div>

      {/* Info panel - right side */}
      <div className="pointer-events-auto">
        <PartInfoPanel />
      </div>

      {/* Bottom controls */}
      <div className="pointer-events-auto">
        <Controls />
      </div>
    </div>
  )
}
