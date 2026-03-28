import { useState, useEffect, useRef } from 'react'
import useAppStore from '../../stores/useAppStore'
import { assetPath } from '../../utils/assetPath'

const CONFETTI_COLORS = ['#FF6B35', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#9B5DE5', '#F15BB5', '#00BBF9']

function ConfettiPiece({ index }) {
  const left = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 3
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length]
  const size = 8 + Math.random() * 12

  return (
    <div className="absolute" style={{ left: `${left}%`, top: '-5%', width: `${size}px`, height: `${size}px`, backgroundColor: color, borderRadius: Math.random() > 0.5 ? '50%' : '2px', animation: `confetti-fall ${duration}s linear ${delay}s infinite`, transform: `rotate(${Math.random() * 360}deg)` }} />
  )
}

export default function Celebration() {
  const screen = useAppStore((s) => s.screen)
  const carMode = useAppStore((s) => s.carMode)
  const isMuted = useAppStore((s) => s.isMuted)
  const resetProgress = useAppStore((s) => s.resetProgress)
  const goToModeSelect = useAppStore((s) => s.goToModeSelect)
  const [show, setShow] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (screen === 'celebration') {
      setShow(true)
      if (!isMuted) {
        const audio = new Audio(assetPath('assets/audio/complete.wav'))
        audio.volume = 0.9
        audioRef.current = audio
        audio.play().catch(() => {})
      }
    }
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    }
  }, [screen, isMuted])

  if (!show) return null

  const isRC = carMode === 'rc'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => <ConfettiPiece key={i} index={i} />)}
      </div>
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center animate-bounce-in">
        <div className="rounded-3xl shadow-2xl" style={{ background: 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(15px)', padding: '40px 36px', maxWidth: '420px', margin: '0 16px' }}>
          <img src={assetPath('assets/images/LOGO.jpg')} alt="مدرسة الأرض" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid #06D6A0' }} />

          <div style={{ fontSize: '5rem', marginBottom: '12px' }}>🏆</div>

          <div className="flex justify-center" style={{ gap: '10px', marginBottom: '16px' }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="animate-star-pop" style={{ fontSize: '3rem', animationDelay: `${0.3 + i * 0.2}s` }}>⭐</span>
            ))}
          </div>

          <h2 className="font-black" style={{ fontSize: '2rem', color: isRC ? '#7C4DFF' : '#1B5E20', marginBottom: '12px' }}>
            برافو يا بطل! 🎉
          </h2>

          <p className="text-gray-600 font-semibold" style={{ fontSize: '1.1rem', lineHeight: '1.9', marginBottom: '24px' }}>
            {isRC
              ? 'أنت اتعلمت كل أجزاء عربية الريموت كونترول الكهربائية! ⚡🎮'
              : 'أنت اتعلمت كل أجزاء العربية العادية! 🚗🌟'
            }
            <br />
            مدرسة الأرض فخورة بيك! 🌍
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null } setShow(false); resetProgress() }}
              className="text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer font-black"
              style={{ fontSize: '1.2rem', padding: '12px 28px', background: 'linear-gradient(135deg, #1B5E20, #43A047)' }}
            >
              العب تاني! 🔄
            </button>
            <button
              onClick={() => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null } setShow(false); goToModeSelect() }}
              className="text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer font-black"
              style={{ fontSize: '1.2rem', padding: '12px 28px', background: 'linear-gradient(135deg, #7C4DFF, #3F51B5)' }}
            >
              {isRC ? '🚗 جرب العادية' : '🎮 جرب الريموت'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
