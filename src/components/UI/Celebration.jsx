import { useState, useEffect, useRef } from 'react'
import useAppStore from '../../stores/useAppStore'

const CONFETTI_COLORS = ['#FF6B35', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#9B5DE5', '#F15BB5', '#00BBF9']

function ConfettiPiece({ index }) {
  const left = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 3
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length]
  const size = 8 + Math.random() * 12
  const rotation = Math.random() * 360

  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        top: '-5%',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        animation: `confetti-fall ${duration}s linear ${delay}s infinite`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  )
}

export default function Celebration() {
  const screen = useAppStore((s) => s.screen)
  const isMuted = useAppStore((s) => s.isMuted)
  const resetProgress = useAppStore((s) => s.resetProgress)
  const [show, setShow] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (screen === 'celebration') {
      setShow(true)

      // Play completion narration
      if (!isMuted) {
        const audio = new Audio('/assets/audio/complete.wav')
        audio.volume = 0.9
        audioRef.current = audio
        audio.play().catch(() => {})
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [screen, isMuted])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <ConfettiPiece key={i} index={i} />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center animate-bounce-in">
        <div
          className="rounded-3xl shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(15px)',
            padding: '40px 36px',
            maxWidth: '420px',
            margin: '0 16px',
          }}
        >
          {/* School logo */}
          <img
            src="/assets/images/LOGO.jpg"
            alt="مدرسة الأرض"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              margin: '0 auto 16px',
              border: '3px solid #06D6A0',
            }}
          />

          {/* Trophy */}
          <div style={{ fontSize: '5rem', marginBottom: '12px' }}>🏆</div>

          {/* Stars */}
          <div className="flex justify-center" style={{ gap: '10px', marginBottom: '16px' }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-star-pop"
                style={{ fontSize: '3rem', animationDelay: `${0.3 + i * 0.2}s` }}
              >
                ⭐
              </span>
            ))}
          </div>

          {/* Title */}
          <h2
            className="font-black"
            style={{
              fontSize: '2.2rem',
              color: '#1B5E20',
              textShadow: '2px 2px 4px rgba(0,0,0,0.08)',
              marginBottom: '12px',
            }}
          >
            برافو يا بطل! 🎉
          </h2>

          {/* Message */}
          <p
            className="text-gray-600 font-semibold"
            style={{
              fontSize: '1.15rem',
              lineHeight: '1.9',
              marginBottom: '24px',
            }}
          >
            أنت اتعلمت كل أجزاء العربية!
            <br />
            أنت شاطر جداً ومدرسة الأرض فخورة بيك! 🌍🌟
          </p>

          {/* Play again button */}
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
              }
              setShow(false)
              resetProgress()
            }}
            className="text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer font-black"
            style={{
              fontSize: '1.4rem',
              padding: '14px 40px',
              background: 'linear-gradient(135deg, #1B5E20, #43A047)',
              boxShadow: '0 6px 20px rgba(27, 94, 32, 0.4)',
            }}
          >
            العب تاني! 🔄
          </button>
        </div>
      </div>
    </div>
  )
}
