import { useEffect, useRef } from 'react'
import useAppStore from '../../stores/useAppStore'
import { PARTS_DATA } from '../../data/partsData'
import { assetPath } from '../../utils/assetPath'

export default function PartInfoPanel() {
  const selectedPart = useAppStore((s) => s.selectedPart)
  const deselectPart = useAppStore((s) => s.deselectPart)
  const isMuted = useAppStore((s) => s.isMuted)
  const setNarrating = useAppStore((s) => s.setNarrating)
  const isNarrating = useAppStore((s) => s.isNarrating)
  const triggerCelebration = useAppStore((s) => s.triggerCelebration)
  const audioRef = useRef(null)

  const part = PARTS_DATA.find((p) => p.id === selectedPart)

  useEffect(() => {
    if (part && !isMuted) {
      const audioPath = assetPath(`assets/audio/${part.id}.wav`)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      const audio = new Audio(audioPath)
      audioRef.current = audio
      audio.volume = 0.8
      audio.onplay = () => setNarrating(true)
      audio.onended = () => {
        setNarrating(false)
        // After narration finishes, check if celebration is pending
        setTimeout(() => triggerCelebration(), 500)
      }
      audio.onerror = () => {
        setNarrating(false)
        setTimeout(() => triggerCelebration(), 500)
      }
      audio.play().catch(() => {})
    }

    if (part && isMuted) {
      // If muted, trigger celebration after a short delay
      setTimeout(() => triggerCelebration(), 1500)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
        setNarrating(false)
      }
    }
  }, [selectedPart, isMuted])

  if (!part) return null

  return (
    <div className="fixed right-5 top-1/2 z-40" style={{ transform: 'translateY(-50%)' }}>
      <div
        className="rounded-3xl overflow-hidden shadow-2xl animate-bounce-in"
        style={{
          width: '300px',
          background: 'white',
          border: `4px solid ${part.color}`,
        }}
      >
        {/* Close button */}
        <button
          onClick={deselectPart}
          className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold cursor-pointer transition-all duration-200 hover:scale-110 active:scale-90 text-lg shadow-md"
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: '#666',
          }}
        >
          ✕
        </button>

        {/* Part image section */}
        <div
          className="w-full flex items-center justify-center"
          style={{ height: '176px', backgroundColor: `${part.color}12`, padding: '16px' }}
        >
          <img
            src={assetPath(`assets/images/${part.id}.png`)}
            alt={part.nameAr}
            className="max-w-full max-h-full object-contain drop-shadow-lg"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<span style="font-size: 5rem">${part.icon}</span>`
            }}
          />
        </div>

        {/* Content section */}
        <div style={{ padding: '20px 24px' }}>
          {/* Part name */}
          <h2
            className="text-center font-black"
            style={{ fontSize: '1.5rem', color: part.color, marginBottom: '10px' }}
          >
            {part.icon} {part.nameAr}
          </h2>

          {/* Divider */}
          <div
            className="rounded-full mx-auto"
            style={{ width: '48px', height: '4px', backgroundColor: part.color, marginBottom: '12px' }}
          />

          {/* Description */}
          <p
            className="text-gray-600 text-center font-semibold"
            style={{ fontSize: '1rem', lineHeight: '1.8', marginBottom: '12px' }}
          >
            {part.description}
          </p>

          {/* Audio wave indicator */}
          {isNarrating && (
            <div className="flex items-center justify-center" style={{ gap: '8px', padding: '8px 0' }}>
              <div className="flex items-end" style={{ gap: '3px', height: '20px' }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: '3px',
                      backgroundColor: part.color,
                      animation: `wave 0.5s ease-in-out ${i * 0.08}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-bold">جاري الشرح...</span>
            </div>
          )}
        </div>

        <style>{`
          @keyframes wave {
            0% { height: 4px; }
            100% { height: 18px; }
          }
        `}</style>
      </div>
    </div>
  )
}
