import { useState } from 'react'
import useAppStore from '../../stores/useAppStore'
import { assetPath } from '../../utils/assetPath'

export default function WelcomeScreen() {
  const setScreen = useAppStore((s) => s.setScreen)
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(() => setScreen('playing'), 600)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
      style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 30%, #43A047 60%, #66BB6A 100%)',
      }}
    >
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🚗', '🛞', '⚙️', '💡', '🔧', '🏎️'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.4,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="text-center animate-bounce-in">
        {/* School logo */}
        <img
          src={assetPath('assets/images/LOGO.jpg')}
          alt="مدرسة الأرض"
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '0 auto 16px',
            border: '4px solid rgba(255,255,255,0.6)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          }}
        />

        {/* School name */}
        <p className="text-white/80 text-lg font-bold" style={{ marginBottom: '8px' }}>
          مدرسة الأرض تقدم
        </p>

        {/* Title */}
        <h1
          className="font-black text-white"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
            marginBottom: '8px',
          }}
        >
          🚙 تركيب السيارة
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 font-semibold" style={{ fontSize: '1.3rem', marginBottom: '32px' }}>
          يلا نتعلم أجزاء العربية مع بعض! 🌟
        </p>

        {/* Start button */}
        <button
          onClick={handleStart}
          className="text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer font-black"
          style={{
            fontSize: '1.6rem',
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
            boxShadow: '0 8px 30px rgba(255, 107, 53, 0.5)',
          }}
        >
          ابدأ المغامرة! 🚀
        </button>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-6 text-white/50 text-sm font-medium">
        للأطفال من سن 6 سنوات 🌍
      </div>
    </div>
  )
}
