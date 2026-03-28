import { Suspense } from 'react'
import useAppStore from './stores/useAppStore'
import WelcomeScreen from './components/UI/WelcomeScreen'
import HUD from './components/UI/HUD'
import Celebration from './components/UI/Celebration'
import CarScene from './components/Scene/CarScene'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #87CEEB, #E0F7FA)' }}
    >
      <div className="text-6xl mb-6 animate-float">🚗</div>
      <div className="text-2xl font-bold text-gray-700 mb-4">جاري التحميل...</div>
      <div className="w-48 h-3 bg-white/50 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #FF6B35, #FFD166)',
            animation: 'loading 1.5s ease-in-out infinite',
            width: '60%',
          }}
        />
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}

export default function App() {
  const screen = useAppStore((s) => s.screen)

  return (
    <div className="w-full h-full relative" style={{ direction: 'rtl' }}>
      {screen === 'welcome' && <WelcomeScreen />}

      {screen !== 'welcome' && (
        <>
          <Suspense fallback={<LoadingScreen />}>
            <CarScene />
          </Suspense>
          <HUD />
          <Celebration />
        </>
      )}
    </div>
  )
}
