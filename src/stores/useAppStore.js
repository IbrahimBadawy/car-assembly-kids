import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // App state
  screen: 'welcome', // 'welcome' | 'loading' | 'playing' | 'celebration'

  // Car state
  isExploded: false,
  isXray: false,
  selectedPart: null,
  hoveredPart: null,

  // Progress
  discoveredParts: [],

  // Audio
  isMuted: false,
  isNarrating: false,

  // Actions
  setScreen: (screen) => set({ screen }),

  toggleExplode: () => set((state) => ({
    isExploded: !state.isExploded,
    selectedPart: null,
  })),

  toggleXray: () => set((state) => ({ isXray: !state.isXray })),

  selectPart: (partId) => {
    const state = get()
    const newDiscovered = state.discoveredParts.includes(partId)
      ? state.discoveredParts
      : [...state.discoveredParts, partId]

    set({
      selectedPart: partId,
      discoveredParts: newDiscovered,
    })

    // Celebration triggers ONLY after narration ends (handled in PartInfoPanel)
    if (newDiscovered.length === 10 && !state.discoveredParts.includes(partId)) {
      set({ _pendingCelebration: true })
    }
  },

  triggerCelebration: () => {
    const state = get()
    if (state._pendingCelebration) {
      set({ screen: 'celebration', _pendingCelebration: false })
    }
  },

  _pendingCelebration: false,

  deselectPart: () => set({ selectedPart: null }),

  setHoveredPart: (partId) => set({ hoveredPart: partId }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  setNarrating: (val) => set({ isNarrating: val }),

  resetProgress: () => set({
    discoveredParts: [],
    selectedPart: null,
    isExploded: false,
    isXray: false,
    screen: 'playing',
    _pendingCelebration: false,
  }),
}))

export default useAppStore
