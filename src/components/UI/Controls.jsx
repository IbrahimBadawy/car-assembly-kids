import useAppStore from '../../stores/useAppStore'

export default function Controls() {
  const isExploded = useAppStore((s) => s.isExploded)
  const toggleExplode = useAppStore((s) => s.toggleExplode)
  const isXray = useAppStore((s) => s.isXray)
  const toggleXray = useAppStore((s) => s.toggleXray)
  const isMuted = useAppStore((s) => s.isMuted)
  const toggleMute = useAppStore((s) => s.toggleMute)
  const resetProgress = useAppStore((s) => s.resetProgress)
  const goToModeSelect = useAppStore((s) => s.goToModeSelect)
  const carMode = useAppStore((s) => s.carMode)

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div
        className="flex items-center rounded-full shadow-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(14px)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          padding: '10px 14px',
          gap: '10px',
        }}
      >
        {/* Explode/Assemble */}
        <button
          onClick={toggleExplode}
          className="rounded-full text-white font-extrabold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          style={{
            fontSize: '1rem',
            padding: '11px 20px',
            background: isExploded
              ? 'linear-gradient(135deg, #06D6A0, #0EA5E9)'
              : 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
          }}
        >
          {isExploded ? '🔧 ركّب' : '💥 فكّك'}
        </button>

        {/* X-ray */}
        <button
          onClick={toggleXray}
          className="rounded-full font-extrabold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          style={{
            fontSize: '1rem',
            padding: '11px 20px',
            background: isXray
              ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)'
              : 'linear-gradient(135deg, #E9D5FF, #DDD6FE)',
            color: isXray ? 'white' : '#6D28D9',
          }}
        >
          {isXray ? '👁️ عادي' : '🔍 أشعة'}
        </button>

        <div style={{ width: '1px', height: '30px', background: '#D1D5DB' }} />

        {/* Switch mode */}
        <button
          onClick={goToModeSelect}
          className="rounded-full font-extrabold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          style={{
            fontSize: '0.9rem',
            padding: '10px 16px',
            background: carMode === 'rc'
              ? 'linear-gradient(135deg, #E91E63, #AD1457)'
              : 'linear-gradient(135deg, #43A047, #2E7D32)',
            color: 'white',
          }}
        >
          {carMode === 'rc' ? '🚗 عادي' : '🎮 ريموت'}
        </button>

        <div style={{ width: '1px', height: '30px', background: '#D1D5DB' }} />

        {/* Mute */}
        <button
          onClick={toggleMute}
          className="flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-md rounded-full"
          style={{ width: '42px', height: '42px', background: isMuted ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #10B981, #059669)', color: 'white' }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Reset */}
        <button
          onClick={resetProgress}
          className="flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-md rounded-full"
          style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)' }}
        >
          🔄
        </button>
      </div>
    </div>
  )
}
