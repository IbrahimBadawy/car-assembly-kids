import { useState } from 'react'
import useAppStore from '../../stores/useAppStore'
import { assetPath } from '../../utils/assetPath'

export default function WelcomeScreen() {
  const setScreen = useAppStore((s) => s.setScreen)
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(() => setScreen('modeSelect'), 600)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
      style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 30%, #43A047 60%, #66BB6A 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🚗', '🛞', '⚙️', '💡', '🎮', '🔋'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float"
            style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`, animationDelay: `${i * 0.4}s`, opacity: 0.4 }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="text-center animate-bounce-in">
        <img
          src={assetPath('assets/images/LOGO.jpg')}
          alt="مدرسة الأرض"
          style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 14px', border: '4px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
        />
        <p className="text-white/80 text-lg font-bold" style={{ marginBottom: '6px' }}>مدرسة الأرض تقدم</p>
        <h1 className="font-black text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', textShadow: '3px 3px 6px rgba(0,0,0,0.3)', marginBottom: '6px' }}>
          🚙 تركيب السيارة
        </h1>
        <p className="text-white/90 font-semibold" style={{ fontSize: '1.2rem', marginBottom: '28px' }}>
          يلا نتعلم أجزاء العربية مع بعض! 🌟
        </p>
        <button
          onClick={handleStart}
          className="text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer font-black"
          style={{ fontSize: '1.5rem', padding: '14px 44px', background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)', boxShadow: '0 8px 30px rgba(255, 107, 53, 0.5)' }}
        >
          ابدأ المغامرة! 🚀
        </button>
      </div>

      <div className="absolute bottom-6 text-white/50 text-sm font-medium">للأطفال من سن 6 سنوات 🌍</div>
    </div>
  )
}
