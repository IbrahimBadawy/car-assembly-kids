import useAppStore from '../../stores/useAppStore'
import { assetPath } from '../../utils/assetPath'

export default function ModeSelect() {
  const setCarMode = useAppStore((s) => s.setCarMode)

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 40%, #1565C0 100%)',
      }}
    >
      {/* Logo */}
      <img
        src={assetPath('assets/images/LOGO.jpg')}
        alt="مدرسة الأرض"
        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', border: '3px solid rgba(255,255,255,0.5)' }}
      />

      <h2 className="text-white font-black text-center" style={{ fontSize: '2rem', marginBottom: '8px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        اختار نوع العربية! 🚗
      </h2>
      <p className="text-white/70 font-semibold text-center" style={{ fontSize: '1rem', marginBottom: '32px' }}>
        كل نوع فيه أجزاء مختلفة هتتعلمها
      </p>

      {/* Mode cards */}
      <div className="flex gap-6 flex-wrap justify-center" style={{ padding: '0 20px' }}>
        {/* Normal Car */}
        <button
          onClick={() => setCarMode('normal')}
          className="rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-right"
          style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '28px 24px',
            width: '280px',
            border: '4px solid transparent',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4CAF50'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          <div className="text-center" style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '4rem' }}>🚗</span>
          </div>
          <h3 className="font-black text-center" style={{ fontSize: '1.5rem', color: '#2E7D32', marginBottom: '8px' }}>
            عربية عادية
          </h3>
          <p className="text-gray-500 font-semibold text-center" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
            اتعلم أجزاء العربية الحقيقية
            <br />
            المحرك والدركسيون والفرامل وأكتر!
          </p>
          <div className="text-center" style={{ marginTop: '12px' }}>
            <span className="font-bold text-sm" style={{ color: '#4CAF50', background: '#E8F5E9', padding: '4px 14px', borderRadius: '20px' }}>
              10 أجزاء ⭐
            </span>
          </div>
        </button>

        {/* RC Car */}
        <button
          onClick={() => setCarMode('rc')}
          className="rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-right"
          style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '28px 24px',
            width: '280px',
            border: '4px solid transparent',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#7C4DFF'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          <div className="text-center" style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '4rem' }}>🎮</span>
          </div>
          <h3 className="font-black text-center" style={{ fontSize: '1.5rem', color: '#4A148C', marginBottom: '8px' }}>
            عربية ريموت كونترول
          </h3>
          <p className="text-gray-500 font-semibold text-center" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
            اتعلم أجزاء عربية الريموت الكهربائية
            <br />
            الموتور والبطارية والدايرة والريموت!
          </p>
          <div className="text-center" style={{ marginTop: '12px' }}>
            <span className="font-bold text-sm" style={{ color: '#7C4DFF', background: '#EDE7F6', padding: '4px 14px', borderRadius: '20px' }}>
              8 أجزاء ⚡
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}
