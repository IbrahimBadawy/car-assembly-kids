import useAppStore from '../../stores/useAppStore'
import { PARTS_DATA } from '../../data/partsData'

export default function ProgressTracker() {
  const discoveredParts = useAppStore((s) => s.discoveredParts)
  const count = discoveredParts.length
  const total = PARTS_DATA.length

  return (
    <div className="fixed top-6 left-6 z-40">
      <div
        className="rounded-2xl shadow-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          minWidth: '220px',
          padding: '18px 20px',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '14px' }}>
          <span className="text-base font-extrabold text-gray-800">
            اكتشف الأجزاء ⭐
          </span>
          <span
            className="text-sm font-bold rounded-full"
            style={{
              background: count === total ? '#06D6A0' : '#F3F4F6',
              color: count === total ? 'white' : '#6B7280',
              padding: '3px 12px',
            }}
          >
            {count} / {total}
          </span>
        </div>

        {/* Stars grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '14px' }}>
          {PARTS_DATA.map((part, index) => {
            const isDiscovered = discoveredParts.includes(part.id)
            return (
              <div
                key={part.id}
                className={`flex items-center justify-center text-base font-bold transition-all duration-500 ${
                  isDiscovered ? 'animate-star-pop shadow-md' : ''
                }`}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: isDiscovered ? part.color : 'transparent',
                  border: isDiscovered ? 'none' : '2px dashed #D1D5DB',
                  animationDelay: `${index * 0.05}s`,
                  color: isDiscovered ? 'white' : '#D1D5DB',
                }}
                title={part.nameAr}
              >
                {isDiscovered ? '⭐' : '?'}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="rounded-full overflow-hidden" style={{ height: '10px', background: '#F3F4F6' }}>
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${(count / total) * 100}%`,
              background: count === total
                ? '#06D6A0'
                : 'linear-gradient(90deg, #FF6B35, #FFD166, #06D6A0)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
